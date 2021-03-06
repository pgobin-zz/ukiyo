"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const utils_1 = require("./utils");
const AVATAR_STORAGE_FOLDER = '/avatars';
const AVATAR_CACHE = 'avatarCache';
const CODE_REVIEWS = 'codeReviews';
const IGNORED_REPOS = 'ignoredRepos';
const LAST_ACTIVE_REPO = 'lastActiveRepo';
const LAST_KNOWN_GIT_PATH = 'lastKnownGitPath';
const REPO_STATES = 'repoStates';
exports.DEFAULT_REPO_STATE = {
    columnWidths: null,
    cdvDivider: 0.5,
    cdvHeight: 250,
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
    transferRepo(oldRepo, newRepo) {
        if (this.getLastActiveRepo() === oldRepo) {
            this.setLastActiveRepo(newRepo);
        }
        let reviews = this.getCodeReviews();
        if (typeof reviews[oldRepo] !== 'undefined') {
            reviews[newRepo] = reviews[oldRepo];
            delete reviews[oldRepo];
            this.setCodeReviews(reviews);
        }
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
    startCodeReview(repo, id, files, lastViewedFile) {
        let reviews = this.getCodeReviews();
        if (typeof reviews[repo] === 'undefined')
            reviews[repo] = {};
        reviews[repo][id] = { lastActive: (new Date()).getTime(), lastViewedFile: lastViewedFile, remainingFiles: files };
        this.setCodeReviews(reviews);
        return Object.assign({ id: id }, reviews[repo][id]);
    }
    endCodeReview(repo, id) {
        let reviews = this.getCodeReviews();
        removeCodeReview(reviews, repo, id);
        this.setCodeReviews(reviews);
    }
    getCodeReview(repo, id) {
        let reviews = this.getCodeReviews();
        if (typeof reviews[repo] !== 'undefined' && typeof reviews[repo][id] !== 'undefined') {
            reviews[repo][id].lastActive = (new Date()).getTime();
            this.setCodeReviews(reviews);
            return Object.assign({ id: id }, reviews[repo][id]);
        }
        else {
            return null;
        }
    }
    updateCodeReviewFileReviewed(repo, id, file) {
        let reviews = this.getCodeReviews();
        if (typeof reviews[repo] !== 'undefined' && typeof reviews[repo][id] !== 'undefined') {
            let i = reviews[repo][id].remainingFiles.indexOf(file);
            if (i > -1)
                reviews[repo][id].remainingFiles.splice(i, 1);
            if (reviews[repo][id].remainingFiles.length > 0) {
                reviews[repo][id].lastViewedFile = file;
                reviews[repo][id].lastActive = (new Date()).getTime();
            }
            else {
                removeCodeReview(reviews, repo, id);
            }
            this.setCodeReviews(reviews);
        }
    }
    expireOldCodeReviews() {
        let reviews = this.getCodeReviews(), change = false, expireReviewsBefore = (new Date()).getTime() - 7776000000;
        Object.keys(reviews).forEach((repo) => {
            Object.keys(reviews[repo]).forEach((id) => {
                if (reviews[repo][id].lastActive < expireReviewsBefore) {
                    delete reviews[repo][id];
                    change = true;
                }
            });
            removeCodeReviewRepoIfEmpty(reviews, repo);
        });
        if (change)
            this.setCodeReviews(reviews);
    }
    endAllWorkspaceCodeReviews() {
        this.setCodeReviews({});
    }
    getCodeReviews() {
        return this.workspaceState.get(CODE_REVIEWS, {});
    }
    setCodeReviews(reviews) {
        this.workspaceState.update(CODE_REVIEWS, reviews);
    }
}
exports.ExtensionState = ExtensionState;
function removeCodeReview(reviews, repo, id) {
    if (typeof reviews[repo] !== 'undefined' && typeof reviews[repo][id] !== 'undefined') {
        delete reviews[repo][id];
        removeCodeReviewRepoIfEmpty(reviews, repo);
    }
}
function removeCodeReviewRepoIfEmpty(reviews, repo) {
    if (typeof reviews[repo] !== 'undefined' && Object.keys(reviews[repo]).length === 0) {
        delete reviews[repo];
    }
}
//# sourceMappingURL=extensionState.js.map