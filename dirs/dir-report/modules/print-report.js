import {analyzeFolder} from "./analyze-folder.js";

export async function printReport(folder) {
    const stats = await analyzeFolder(folder);
    process.stdout.write(`Folder: ${folder}\n`);
    process.stdout.write(`File count: ${stats.fileCount}\n`);
    process.stdout.write(`Folder count: ${stats.folderCount}\n`);
    process.stdout.write(`File size: ${stats.totalSize} bytes\n`);
}