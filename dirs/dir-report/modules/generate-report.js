import {analyzeFolder} from "./analyze-folder.js";

import * as fs from "node:fs";

export async function generateReport(folder) {
    const reportFile = 'report.json';
    const stats = await analyzeFolder(folder);
    const reportData = {
        folder: folder,
        files: stats.fileCount,
        folders: stats.folderCount,
        totalSize: stats.totalSize,
    };

    fs.writeFile(reportFile, JSON.stringify(reportData, null, 2), (err) => {
        if (err) {
            process.stderr.write('Error while saving report:', err);
            process.exit(1);
        }
       process.stdout.write(`Report was saved to ${reportFile}\n`);
    });
}