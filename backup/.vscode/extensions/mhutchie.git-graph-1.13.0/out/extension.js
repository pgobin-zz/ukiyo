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
const vscode = require("vscode");
const avatarManager_1 = require("./avatarManager");
const commands_1 = require("./commands");
const config_1 = require("./config");
const dataSource_1 = require("./dataSource");
const diffDocProvider_1 = require("./diffDocProvider");
const extensionState_1 = require("./extensionState");
const gitGraphView_1 = require("./gitGraphView");
const logger_1 = require("./logger");
const repoManager_1 = require("./repoManager");
const statusBarItem_1 = require("./statusBarItem");
const utils_1 = require("./utils");
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const logger = new logger_1.Logger();
        logger.log('Starting Git Graph ...');
        const extensionState = new extensionState_1.ExtensionState(context);
        let gitExecutable;
        try {
            gitExecutable = yield utils_1.findGit(extensionState);
            extensionState.setLastKnownGitPath(gitExecutable.path);
            logger.log('Using ' + gitExecutable.path + ' (version: ' + gitExecutable.version + ')');
        }
        catch (_) {
            gitExecutable = null;
            vscode.window.showErrorMessage(utils_1.UNABLE_TO_FIND_GIT_MSG);
            logger.logError(utils_1.UNABLE_TO_FIND_GIT_MSG);
        }
        const dataSource = new dataSource_1.DataSource(gitExecutable, logger);
        const avatarManager = new avatarManager_1.AvatarManager(dataSource, extensionState, logger);
        const statusBarItem = new statusBarItem_1.StatusBarItem();
        const repoManager = new repoManager_1.RepoManager(dataSource, extensionState, statusBarItem, logger);
        context.subscriptions.push(vscode.commands.registerCommand('git-graph.view', args => {
            let loadRepo = null;
            if (typeof args === 'object' && args.rootUri) {
                loadRepo = utils_1.getPathFromUri(args.rootUri);
                if (!repoManager.isKnownRepo(loadRepo)) {
                    repoManager.registerRepo(loadRepo, true, true).then(status => {
                        gitGraphView_1.GitGraphView.createOrShow(context.extensionPath, dataSource, extensionState, avatarManager, repoManager, logger, status.root);
                    });
                    return;
                }
            }
            else if (config_1.getConfig().openToTheRepoOfTheActiveTextEditorDocument() && vscode.window.activeTextEditor) {
                loadRepo = repoManager.getRepoContainingFile(utils_1.getPathFromUri(vscode.window.activeTextEditor.document.uri));
            }
            gitGraphView_1.GitGraphView.createOrShow(context.extensionPath, dataSource, extensionState, avatarManager, repoManager, logger, loadRepo);
        }), vscode.commands.registerCommand('git-graph.addGitRepository', () => {
            commands_1.addGitRepository(gitExecutable, repoManager);
        }), vscode.commands.registerCommand('git-graph.removeGitRepository', () => {
            commands_1.removeGitRepositoy(gitExecutable, repoManager);
        }), vscode.commands.registerCommand('git-graph.clearAvatarCache', () => {
            avatarManager.clearCache();
        }), vscode.workspace.registerTextDocumentContentProvider(diffDocProvider_1.DiffDocProvider.scheme, new diffDocProvider_1.DiffDocProvider(dataSource)), vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('git-graph.showStatusBarItem')) {
                statusBarItem.refresh();
            }
            else if (e.affectsConfiguration('git-graph.dateType') || e.affectsConfiguration('git-graph.useMailmap')) {
                dataSource.generateGitCommandFormats();
            }
            else if (e.affectsConfiguration('git-graph.maxDepthOfRepoSearch')) {
                repoManager.maxDepthOfRepoSearchChanged();
            }
            else if (e.affectsConfiguration('git.path')) {
                utils_1.findGit(extensionState).then(exec => {
                    gitExecutable = exec;
                    extensionState.setLastKnownGitPath(gitExecutable.path);
                    dataSource.setGitExecutable(gitExecutable);
                    logger.log('Using ' + gitExecutable.path + ' (version: ' + gitExecutable.version + ')');
                    repoManager.searchWorkspaceForRepos();
                }, () => {
                    if (gitExecutable === null) {
                        vscode.window.showErrorMessage(utils_1.UNABLE_TO_FIND_GIT_MSG);
                        logger.logError(utils_1.UNABLE_TO_FIND_GIT_MSG);
                    }
                });
            }
        }), repoManager, statusBarItem, avatarManager, dataSource, logger);
        logger.log('Started Git Graph - Ready to use!');
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map