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
import * as che from '@eclipse-che/plugin';

export interface ToolInformation {
    // Identifier of the program
    id: string;
    // Human readable name of the program
    name: string;
    // Command with help of which the program could be run
    command: string;
};

const GIT_TOOLS_CONTAINER_NAME = 'git-ui-tools';

export async function createToolsManager(toolsInfo: ToolInformation[], containerName?: string): Promise<ToolsManager | undefined> {
    if (!containerName) {
        containerName = GIT_TOOLS_CONTAINER_NAME;
    }

    const workspace = await che.workspace.getCurrentWorkspace();
    for (const containerId in workspace.runtime!.machines!) {
        if (containerId.startsWith(containerName)) {
            const container = workspace.runtime!.machines![containerId];
            const desktopRoute = container!.servers!['desktop'];
            if (!desktopRoute || !desktopRoute.url) {
                console.error('Cannot find route to open desktop.');
                return undefined;
            }
            return new ToolsManager(toolsInfo, containerId, desktopRoute.url);
        }
    }
    console.error('Cannot find tools container.');
    return undefined;
}

export class ToolsManager {

    private tools: Map<string, ToolInformation>;
    private terminal: TerminalCommandRunner;
    private desktopRoute: string;

    constructor(toolsInfo: ToolInformation[], toolsContainerId: string, desktopRoute: string) {
        this.tools = new Map<string, ToolInformation>();
        for (const tool of toolsInfo) {
            this.tools.set(tool.id, tool);
        }

        this.terminal = new TerminalCommandRunner(toolsContainerId);
        this.desktopRoute = desktopRoute + '/vnc.html?autoconnect=1&resize=remote';
    }

    public runTool(id: string, workDir?: string): void {
        const command = this.tools.get(id)!.command;
        this.terminal.runCommand(COMMANDS.RUN_TOOL.replace('$1', command));
    }

    public minimizeAllWindows(): void {
        this.terminal.runCommand(COMMANDS.MINIMIZE_ALL_WINDOWS);
    }

    public closeAllWindows(): void {
        this.terminal.runCommand(COMMANDS.CLOSE_ALL_WINDOWS);
    }

    public setDesktopWorkspaces(n: number): void {
        this.terminal.runCommand(COMMANDS.SET_DE_WORKSPACES_NUMBER.replace('$1', String(n)));
    }

    public openDesktop(): void {
        theia.commands.executeCommand('theia.open', [this.desktopRoute]);
    }
}

const COMMANDS = {
    RUN_TOOL: '$1 & disown -h $!',
    MINIMIZE_ALL_WINDOWS: 'wmctrl -k on',
    CLOSE_ALL_WINDOWS: 'for w in $(wmctrl -l | awk "{print $1}"); do wmctrl -ic "$w"; done',
    SET_DE_WORKSPACES_NUMBER: 'wmctrl -n $1'
}

class TerminalCommandRunner {

    constructor(
        private containerId: string
    ) { }

    runCommand(command: string, workDir?: string, timeout?: number): void {
        const terminal = theia.window.createTerminal({
            shellPath: 'bash',
            shellArgs: ['-c', command],
            cwd: workDir,
            attributes: {
                CHE_MACHINE_NAME: this.containerId
            }
        });
        // do not show terminal to not to bother user

        // clean up resources
        setTimeout(() => terminal.dispose(), timeout ? timeout : 5000);
    }
}
