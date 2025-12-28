import { readdir, stat } from 'fs/promises';
import path from 'path';

export async function analyzeFolder(folder) {
    const entries = await readdir(folder, { withFileTypes: true });
    let totalSize = 0;
    let fileCount = 0;
    let folderCount = 0;

    for (const entry of entries) {
        const fullPath = path.join(folder, entry.name);
        if (entry.isDirectory()) {
            folderCount++;
            const { totalSize: folderSize, fileCount: folderFiles, folderCount: subFolderCount } = await analyzeFolder(fullPath);
            totalSize += folderSize;
            fileCount += folderFiles;
            folderCount += subFolderCount;
        } else if (entry.isFile()) {
            const fileStats = await stat(fullPath);
            fileCount++;
            totalSize += fileStats.size;
        }
    }

    return { totalSize, fileCount, folderCount };
}