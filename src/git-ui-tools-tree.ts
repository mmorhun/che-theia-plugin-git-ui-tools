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

export class GitUiToolsTreeDataProvider implements theia.TreeDataProvider<ToolInformation> {

    constructor(
        private toolsInfo: ToolInformation[]
    ) { }

    getTreeItem(element: ToolInformation): theia.TreeItem | PromiseLike<theia.TreeItem> {
        return {
            id: element.id,
            label: element.name,
            tooltip: 'Launch ' + element.name,
            iconPath: 'fa-window-maximize medium-grey',
            command: {
                command: LAUNCH_GIT_UI_TOOL_COMMAND_ID,
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
