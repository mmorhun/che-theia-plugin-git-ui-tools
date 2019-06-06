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

import * as fs from 'fs';
import * as path from 'path';

export const PROJECTS_ROOT = '/projects';

const fsRoot = path.parse(process.cwd()).root

/**
 * Searches for project root by a file which belongs to this project.
 *
 * @param projectFile path to a file within project
 * @returns path to project root (where .git directory is located) or undefined if git repository not found.
 */
export function getProjectRoot(projectFile: string): string | undefined {
    let currentDirectory = projectFile;
    while (currentDirectory !== fsRoot) {
        currentDirectory = path.dirname(currentDirectory);
        if (fs.existsSync(currentDirectory + path.sep + '.git')) {
            return currentDirectory;
        }
    }
    return undefined;
}
