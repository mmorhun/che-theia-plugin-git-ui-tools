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

import { ToolInformation } from "./tools-manager";

export const GIT_TOOLS_CONFIGURATION: ToolInformation[] = [
    {
        id: 'git-gui',
        name: 'Git GUI',
        command: 'git gui',
        icon: 'resources/git-tools/git-gui.svg'
    },
    {
        id: 'gitk',
        name: 'Gitk',
        command: 'gitk'
    },
    {
        id: 'gitg',
        name: 'Gitg',
        command: 'gitg',
        icon: 'resources/git-tools/gitg.png'
    },
    {
        id: 'git-cola',
        name: 'Git Cola',
        command: 'git-cola',
        icon: 'resources/git-tools/git-cola.svg'
    },
    {
        id: 'qgit',
        name: 'QGit',
        command: 'qgit',
        icon: 'resources/git-tools/qgit.png'
    },
    {
        id: 'meld',
        name: 'Meld',
        command: 'meld .',
        icon: 'resources/git-tools/meld.svg'
    },
    {
        id: 'diffuse',
        name: 'Diffuse',
        command: 'diffuse -m',
        icon: 'resources/git-tools/diffuse.svg'
    },
    {
        id: 'kdiff3',
        name: 'KDiff3',
        command: 'kdiff3',
        icon: 'resources/git-tools/kdiff3.svg'
    }
];
