"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const vscode = require("vscode");
const config_1 = require("./config");
const extensionState_1 = require("./extensionState");
const utils_1 = require("./utils");
class RepoManager {
    constructor(dataSource, extensionState, statusBarItem, logger) {
        this.folderWatchers = {};
        this.viewCallback = null;
        this.createEventPaths = [];
        this.changeEventPaths = [];
        this.processCreateEventsTimeout = null;
        this.processChangeEventsTimeout = null;
        this.dataSource = dataSource;
        this.extensionState = extensionState;
        this.statusBarItem = statusBarItem;
        this.logger = logger;
        this.repos = extensionState.getRepos();
        this.ignoredRepos = extensionState.getIgnoredRepos();
        this.maxDepthOfRepoSearch = config_1.getConfig().maxDepthOfRepoSearch();
        this.startupTasks();
        this.folderChangeHandler = vscode.workspace.onDidChangeWorkspaceFolders((e) => __awaiter(this, void 0, void 0, function* () {
            let changes = false, path;
            if (e.added.length > 0) {
                for (let i = 0; i < e.added.length; i++) {
                    path = utils_1.getPathFromUri(e.added[i].uri);
                    if (yield this.searchDirectoryForRepos(path, this.maxDepthOfRepoSearch))
                        changes = true;
                    this.startWatchingFolder(path);
                }
            }
            if (e.removed.length > 0) {
                for (let i = 0; i < e.removed.length; i++) {
                    path = utils_1.getPathFromUri(e.removed[i].uri);
                    if (this.removeReposWithinFolder(path))
                        changes = true;
                    this.stopWatchingFolder(path);
                }
            }
            if (changes)
                this.sendRepos();
        }));
    }
    dispose() {
        if (this.folderChangeHandler !== null) {
            this.folderChangeHandler.dispose();
            this.folderChangeHandler = null;
        }
        let folders = Object.keys(this.folderWatchers);
        for (let i = 0; i < folders.length; i++) {
            this.stopWatchingFolder(folders[i]);
        }
    }
    registerViewCallback(viewCallback) {
        this.viewCallback = viewCallback;
    }
    deregisterViewCallback() {
        this.viewCallback = null;
    }
    maxDepthOfRepoSearchChanged() {
        let newDepth = config_1.getConfig().maxDepthOfRepoSearch();
        if (newDepth > this.maxDepthOfRepoSearch) {
            this.maxDepthOfRepoSearch = newDepth;
            this.searchWorkspaceForRepos();
        }
        else {
            this.maxDepthOfRepoSearch = newDepth;
        }
    }
    startupTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            this.removeReposNotInWorkspace();
            if (!(yield this.checkReposExist()))
                this.sendRepos();
            yield this.searchWorkspaceForRepos();
            this.startWatchingFolders();
        });
    }
    removeReposNotInWorkspace() {
        let rootsExact = [], rootsFolder = [], workspaceFolders = vscode.workspace.workspaceFolders, repoPaths = Object.keys(this.repos), path;
        if (typeof workspaceFolders !== 'undefined') {
            for (let i = 0; i < workspaceFolders.length; i++) {
                path = utils_1.getPathFromUri(workspaceFolders[i].uri);
                rootsExact.push(path);
                rootsFolder.push(path + '/');
            }
        }
        for (let i = 0; i < repoPaths.length; i++) {
            if (rootsExact.indexOf(repoPaths[i]) === -1 && !rootsFolder.find(root => repoPaths[i].startsWith(root)) && !rootsExact.find(root => root.startsWith(repoPaths[i] + '/'))) {
                this.removeRepo(repoPaths[i]);
            }
        }
    }
    registerRepo(path, expandExistingRepos, loadRepo) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            let root = yield this.dataSource.repoRoot(path);
            if (root === null) {
                resolve({ root: null, error: 'The folder "' + path + '" is not a Git repository.' });
            }
            else if (typeof this.repos[root] !== 'undefined') {
                resolve({ root: null, error: 'The folder "' + path + '" is contained within the known repository "' + root + '".' });
            }
            else {
                if (expandExistingRepos) {
                    let reposInFolder = this.getReposInFolder(root);
                    for (let i = 0; i < reposInFolder.length; i++) {
                        if (reposInFolder.findIndex(knownRepo => reposInFolder[i].startsWith(knownRepo + '/')) === -1)
                            this.removeRepo(reposInFolder[i]);
                    }
                }
                if (this.ignoredRepos.includes(root)) {
                    this.ignoredRepos.splice(this.ignoredRepos.indexOf(root), 1);
                    this.extensionState.setIgnoredRepos(this.ignoredRepos);
                }
                this.addRepo(root);
                this.sendRepos(loadRepo ? root : null);
                resolve({ root: root, error: null });
            }
        }));
    }
    ignoreRepo(repo) {
        if (this.isKnownRepo(repo)) {
            if (!this.ignoredRepos.includes(repo))
                this.ignoredRepos.push(repo);
            this.extensionState.setIgnoredRepos(this.ignoredRepos);
            this.removeRepo(repo);
            this.sendRepos();
            return true;
        }
        else {
            return false;
        }
    }
    getRepos() {
        let repoPaths = Object.keys(this.repos).sort(), repos = {};
        for (let i = 0; i < repoPaths.length; i++) {
            repos[repoPaths[i]] = this.repos[repoPaths[i]];
        }
        return repos;
    }
    getRepoContainingFile(path) {
        let repoPaths = Object.keys(this.repos), repo = null;
        for (let i = 0; i < repoPaths.length; i++) {
            if (path.startsWith(repoPaths[i] + '/') && (repo === null || repo.length < repoPaths[i].length))
                repo = repoPaths[i];
        }
        return repo;
    }
    getReposInFolder(path) {
        let pathFolder = path + '/', repoPaths = Object.keys(this.repos), reposInFolder = [];
        for (let i = 0; i < repoPaths.length; i++) {
            if (repoPaths[i] === path || repoPaths[i].startsWith(pathFolder))
                reposInFolder.push(repoPaths[i]);
        }
        return reposInFolder;
    }
    isKnownRepo(repo) {
        return typeof this.repos[repo] !== 'undefined';
    }
    addRepo(repo) {
        this.repos[repo] = Object.assign({}, extensionState_1.DEFAULT_REPO_STATE);
        this.extensionState.saveRepos(this.repos);
        this.logger.log('Added new repo: ' + repo);
    }
    removeRepo(repo) {
        delete this.repos[repo];
        this.extensionState.saveRepos(this.repos);
        this.logger.log('Removed repo: ' + repo);
    }
    removeReposWithinFolder(path) {
        let reposInFolder = this.getReposInFolder(path);
        for (let i = 0; i < reposInFolder.length; i++) {
            this.removeRepo(reposInFolder[i]);
        }
        return reposInFolder.length > 0;
    }
    isDirectoryWithinRepos(path) {
        let repoPaths = Object.keys(this.repos);
        for (let i = 0; i < repoPaths.length; i++) {
            if (path === repoPaths[i] || path.startsWith(repoPaths[i] + '/'))
                return true;
        }
        return false;
    }
    sendRepos(loadRepo) {
        let repos = this.getRepos();
        let numRepos = Object.keys(repos).length;
        this.statusBarItem.setNumRepos(numRepos);
        if (this.viewCallback !== null)
            this.viewCallback(repos, numRepos, loadRepo ? loadRepo : null);
    }
    checkReposExist() {
        return new Promise(resolve => {
            let repoPaths = Object.keys(this.repos), changes = false;
            utils_1.evalPromises(repoPaths, 3, path => this.dataSource.repoRoot(path)).then(results => {
                for (let i = 0; i < repoPaths.length; i++) {
                    if (results[i] === null) {
                        this.removeRepo(repoPaths[i]);
                        changes = true;
                    }
                    else if (repoPaths[i] !== results[i]) {
                        this.transferRepoState(repoPaths[i], results[i]);
                        changes = true;
                    }
                }
                if (changes)
                    this.sendRepos();
                resolve(changes);
            });
        });
    }
    setRepoState(repo, state) {
        this.repos[repo] = state;
        this.extensionState.saveRepos(this.repos);
    }
    transferRepoState(oldRepo, newRepo) {
        this.repos[newRepo] = this.repos[oldRepo];
        delete this.repos[oldRepo];
        this.extensionState.saveRepos(this.repos);
        this.extensionState.transferRepo(oldRepo, newRepo);
        this.logger.log('Transferred repo state: ' + oldRepo + ' -> ' + newRepo);
    }
    searchWorkspaceForRepos() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('Searching workspace for new repos ...');
            let rootFolders = vscode.workspace.workspaceFolders, changes = false;
            if (typeof rootFolders !== 'undefined') {
                for (let i = 0; i < rootFolders.length; i++) {
                    if (yield this.searchDirectoryForRepos(utils_1.getPathFromUri(rootFolders[i].uri), this.maxDepthOfRepoSearch))
                        changes = true;
                }
            }
            this.logger.log('Completed searching workspace for new repos');
            if (changes)
                this.sendRepos();
            return changes;
        });
    }
    searchDirectoryForRepos(directory, maxDepth) {
        return new Promise(resolve => {
            if (this.isDirectoryWithinRepos(directory)) {
                resolve(false);
                return;
            }
            this.dataSource.repoRoot(directory).then(root => {
                if (root !== null) {
                    if (this.ignoredRepos.includes(root)) {
                        resolve(false);
                    }
                    else {
                        this.addRepo(root);
                        resolve(true);
                    }
                }
                else if (maxDepth > 0) {
                    fs.readdir(directory, (err, dirContents) => __awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            resolve(false);
                        }
                        else {
                            let dirs = [];
                            for (let i = 0; i < dirContents.length; i++) {
                                if (dirContents[i] !== '.git' && (yield isDirectory(directory + '/' + dirContents[i]))) {
                                    dirs.push(directory + '/' + dirContents[i]);
                                }
                            }
                            resolve((yield utils_1.evalPromises(dirs, 2, dir => this.searchDirectoryForRepos(dir, maxDepth - 1))).indexOf(true) > -1);
                        }
                    }));
                }
                else {
                    resolve(false);
                }
            }).catch(() => resolve(false));
        });
    }
    startWatchingFolders() {
        let rootFolders = vscode.workspace.workspaceFolders;
        if (typeof rootFolders !== 'undefined') {
            for (let i = 0; i < rootFolders.length; i++) {
                this.startWatchingFolder(utils_1.getPathFromUri(rootFolders[i].uri));
            }
        }
    }
    startWatchingFolder(path) {
        let watcher = vscode.workspace.createFileSystemWatcher(path + '/**');
        watcher.onDidCreate(uri => this.onWatcherCreate(uri));
        watcher.onDidChange(uri => this.onWatcherChange(uri));
        watcher.onDidDelete(uri => this.onWatcherDelete(uri));
        this.folderWatchers[path] = watcher;
    }
    stopWatchingFolder(path) {
        this.folderWatchers[path].dispose();
        delete this.folderWatchers[path];
    }
    onWatcherCreate(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            let path = utils_1.getPathFromUri(uri);
            if (path.indexOf('/.git/') > -1)
                return;
            if (path.endsWith('/.git'))
                path = path.slice(0, -5);
            if (this.createEventPaths.indexOf(path) > -1)
                return;
            this.createEventPaths.push(path);
            if (this.processCreateEventsTimeout !== null)
                clearTimeout(this.processCreateEventsTimeout);
            this.processCreateEventsTimeout = setTimeout(() => this.processCreateEvents(), 1000);
        });
    }
    onWatcherChange(uri) {
        let path = utils_1.getPathFromUri(uri);
        if (path.indexOf('/.git/') > -1)
            return;
        if (path.endsWith('/.git'))
            path = path.slice(0, -5);
        if (this.changeEventPaths.indexOf(path) > -1)
            return;
        this.changeEventPaths.push(path);
        if (this.processChangeEventsTimeout !== null)
            clearTimeout(this.processChangeEventsTimeout);
        this.processChangeEventsTimeout = setTimeout(() => this.processChangeEvents(), 1000);
    }
    onWatcherDelete(uri) {
        let path = utils_1.getPathFromUri(uri);
        if (path.indexOf('/.git/') > -1)
            return;
        if (path.endsWith('/.git'))
            path = path.slice(0, -5);
        if (this.removeReposWithinFolder(path))
            this.sendRepos();
    }
    processCreateEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            let path, changes = false;
            while (path = this.createEventPaths.shift()) {
                if (yield isDirectory(path)) {
                    if (yield this.searchDirectoryForRepos(path, this.maxDepthOfRepoSearch))
                        changes = true;
                }
            }
            this.processCreateEventsTimeout = null;
            if (changes)
                this.sendRepos();
        });
    }
    processChangeEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            let path, changes = false;
            while (path = this.changeEventPaths.shift()) {
                if (!(yield doesPathExist(path))) {
                    if (this.removeReposWithinFolder(path))
                        changes = true;
                }
            }
            this.processChangeEventsTimeout = null;
            if (changes)
                this.sendRepos();
        });
    }
}
exports.RepoManager = RepoManager;
function isDirectory(path) {
    return new Promise(resolve => {
        fs.stat(path, (err, stats) => {
            resolve(err ? false : stats.isDirectory());
        });
    });
}
function doesPathExist(path) {
    return new Promise(resolve => {
        fs.stat(path, err => resolve(!err));
    });
}
//# sourceMappingURL=repoManager.js.map