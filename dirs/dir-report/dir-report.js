import {generateReport} from "./modules/generate-report.js";
import {printReport} from "./modules/print-report.js";

const action = process.argv[2];
const folderPath = process.argv[3];

if (!action || !folderPath) {
    process.stderr.write('Usage: node dir-report.js <action> <folderPath>\n');
    process.exit(1);
}

if (action === 'report') {
    await generateReport(folderPath);
} else if (action === 'print') {
   await printReport(folderPath);
} else {
    process.stderr.write('Unknown action');
}