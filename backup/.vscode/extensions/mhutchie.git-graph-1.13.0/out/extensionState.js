"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const utils_1 = require("./utils");
const AVATAR_STORAGE_FOLDER = '/avatars';
const AVATAR_CACHE = 'avatarCache';
const IGNORED_REPOS = 'ignoredRepos';
const LAST_ACTIVE_REPO = 'lastActiveRepo';
const LAST_KNOWN_GIT_PATH = 'lastKnownGitPath';
const REPO_STATES = 'repoStates';
exports.DEFAULT_REPO_STATE = {
    columnWidths: null,
    showRemoteBranches: true
};
class ExtensionState {
    constructor(context) {
        this.avatarStorageAvailable = false;
        this.globalState = context.globalState;
        this.workspaceState = context.workspaceState;
        this.globalStoragePath = utils_1.getPathFromStr(context.globalStoragePath);
        fs.stat(this.globalStoragePath + AVATAR_STORAGE_FOLDER, (err) => {
            if (!err) {
                this.avatarStorageAvailable = true;
            }
            else {
                fs.mkdir(this.globalStoragePath, () => {
                    fs.mkdir(this.globalStoragePath + AVATAR_STORAGE_FOLDER, (err) => {
                        if (!err)
                            this.avatarStorageAvailable = true;
                    });
                });
            }
        });
    }
    getRepos() {
        const repoSet = this.workspaceState.get(REPO_STATES, {});
        Object.keys(repoSet).forEach(repo => {
            repoSet[repo] = Object.assign({}, exports.DEFAULT_REPO_STATE, repoSet[repo]);
        });
        return repoSet;
    }
    saveRepos(gitRepoSet) {
        this.workspaceState.update(REPO_STATES, gitRepoSet);
    }
    getIgnoredRepos() {
        return this.workspaceState.get(IGNORED_REPOS, []);
    }
    setIgnoredRepos(ignoredRepos) {
        return this.workspaceState.update(IGNORED_REPOS, ignoredRepos);
    }
    getLastActiveRepo() {
        return this.workspaceState.get(LAST_ACTIVE_REPO, null);
    }
    setLastActiveRepo(repo) {
        this.workspaceState.update(LAST_ACTIVE_REPO, repo);
    }
    getLastKnownGitPath() {
        return this.globalState.get(LAST_KNOWN_GIT_PATH, null);
    }
    setLastKnownGitPath(path) {
        this.globalState.update(LAST_KNOWN_GIT_PATH, path);
    }
    isAvatarStorageAvailable() {
        return this.avatarStorageAvailable;
    }
    getAvatarStoragePath() {
        return this.globalStoragePath + AVATAR_STORAGE_FOLDER;
    }
    getAvatarCache() {
        return this.globalState.get(AVATAR_CACHE, {});
    }
    saveAvatar(email, avatar) {
        let avatars = this.getAvatarCache();
        avatars[email] = avatar;
        this.globalState.update(AVATAR_CACHE, avatars);
    }
    removeAvatarFromCache(email) {
        let avatars = this.getAvatarCache();
        delete avatars[email];
        this.globalState.update(AVATAR_CACHE, avatars);
    }
    clearAvatarCache() {
        this.globalState.update(AVATAR_CACHE, {});
        fs.readdir(this.globalStoragePath + AVATAR_STORAGE_FOLDER, (err, files) => {
            if (err)
                return;
            for (let i = 0; i < files.length; i++) {
                fs.unlink(this.globalStoragePath + AVATAR_STORAGE_FOLDER + '/' + files[i], () => { });
            }
        });
    }
}
exports.ExtensionState = ExtensionState;
//# sourceMappingURL=extensionState.js.map