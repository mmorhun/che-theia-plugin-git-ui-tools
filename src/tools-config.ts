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
        command: 'git-gui'
    },
    {
        id: 'gitk',
        name: 'Gitk',
        command: 'gitk'
    },
    {
        id: 'gitg',
        name: 'Gitg',
        command: 'gitg'
    },
    {
        id: 'git-cola',
        name: 'Git Cola',
        command: 'git-cola'
    },
    {
        id: 'qgit',
        name: 'QGit',
        command: 'qgit'
    },
    {
        id: 'meld',
        name: 'Meld',
        command: 'meld'
    },
    {
        id: 'tkcvs',
        name: 'TkCVS',
        command: 'tkcvs'
    },
    {
        id: 'diffuse',
        name: 'Diffuse',
        command: 'diffuse'
    }
];
