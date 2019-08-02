/********************************************************************************
 * Copyright (c) 2019 Mykola Morhun
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0, or the Apache License, Version 2.0
 * which is available at https://www.apache.org/licenses/LICENSE-2.0.
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 ********************************************************************************/

import * as theia from '@theia/plugin';
import { GIT_TOOLS_CONFIGURATION } from './tools-config';
import { createToolsManager } from './tools-manager';
import { GitUiToolsTreeDataProvider, LAUNCH_GIT_UI_TOOL_COMMAND_ID, OPEN_GIT_TOOLS_DESKTOP_COMMAND_ID } from './git-ui-tools-tree';
import { getProjectRoot, PROJECTS_ROOT } from './git-utils';

const INITIALIZATION_FAILED_MESSAGE = 'Failed to initialize Git UI Tools plugin';

export async function start(context: theia.PluginContext) {
    const toolsManager = await createToolsManager(GIT_TOOLS_CONFIGURATION);
    if (!toolsManager) {
        theia.window.showErrorMessage(INITIALIZATION_FAILED_MESSAGE);
        console.error(INITIALIZATION_FAILED_MESSAGE);
        return;
    }

    // Create git tools list
    const gitUiToolsTreeDataProvider = new GitUiToolsTreeDataProvider(GIT_TOOLS_CONFIGURATION);
    theia.window.createTreeView('git-ui-tools', { treeDataProvider: gitUiToolsTreeDataProvider });

    // Register launch handler
    const GitUiToolsTreeLauncherCommand: theia.CommandDescription = {
        id: LAUNCH_GIT_UI_TOOL_COMMAND_ID
    };
    context.subscriptions.push(theia.commands.registerCommand(GitUiToolsTreeLauncherCommand, (...args: any[]) => {
        const toolId: string = args[0];
        const openedEditor = theia.window.activeTextEditor;
        const projectDir: string | undefined = openedEditor ? getProjectRoot(openedEditor.document.uri.fsPath) : undefined;

        toolsManager.runTool(toolId, projectDir || PROJECTS_ROOT);
        toolsManager.openDesktop();
    }));
    // Register open desktop handler
    const GitUiToolsOpenDesktopCommand: theia.CommandDescription = {
        id: OPEN_GIT_TOOLS_DESKTOP_COMMAND_ID,
        label: 'Open git UI Tools desktop'
    };
    context.subscriptions.push(theia.commands.registerCommand(GitUiToolsOpenDesktopCommand, (...args: any[]) => {
        toolsManager.openDesktop();
    }));

    // Clean up desktop on plugin start
    toolsManager.closeAllWindows();
    toolsManager.setDesktopWorkspaces(1);
}

export function stop() {

}
