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
import { ToolInformation } from './tools-manager';

export const LAUNCH_GIT_UI_TOOL_COMMAND_ID = 'che-theia-git-ui-tools-launch';
export const OPEN_GIT_TOOLS_DESKTOP_COMMAND_ID = 'che-theia-git-ui-tools-open-desktop';

const OPEN_DESKTOP_ITEM_ID = 'open-desktop';

export class GitUiToolsTreeDataProvider implements theia.TreeDataProvider<ToolInformation> {

    constructor(
        private toolsInfo: ToolInformation[]
    ) {
        // Add open desktop item
        toolsInfo.push({
            id: OPEN_DESKTOP_ITEM_ID,
            name: '',
            command: ''
        });
    }

    getTreeItem(element: ToolInformation): theia.TreeItem | PromiseLike<theia.TreeItem> {
        if (element.id === OPEN_DESKTOP_ITEM_ID) {
            return {
                id: OPEN_DESKTOP_ITEM_ID,
                label: 'Open desktop',
                tooltip: 'Opens desktop with git tools in a new tab',
                iconPath: 'resources/desktop.svg',
                command: {
                    id: OPEN_GIT_TOOLS_DESKTOP_COMMAND_ID
                },
                collapsibleState: theia.TreeItemCollapsibleState.None
            }
        }

        return {
            id: element.id,
            label: element.name,
            tooltip: 'Launch ' + element.name,
            iconPath: element.icon ? element.icon : 'resources/git-tools/git-default.svg',
            command: {
                id: LAUNCH_GIT_UI_TOOL_COMMAND_ID,
                arguments: [element.id]
            },
            collapsibleState: theia.TreeItemCollapsibleState.None
        };
    }

    getChildren(element?: ToolInformation | undefined): theia.ProviderResult<ToolInformation[]> {
        if (element) {
            // The tree is actually a list, so no child nodes
            return undefined;
        }
        // Return list of tools
        return this.toolsInfo;
    }

}
