const fs = require("fs");
const path = require("path");
const { analyzeDocument } = require("../lib/analyzer");
const { writeRunArtifacts } = require("../lib/reporting");

const samplePath = path.join(__dirname, "..", "sample-input", "project-update.txt");
const sourceText = fs.readFileSync(samplePath, "utf8");
const result = analyzeDocument(sourceText);
const artifacts = writeRunArtifacts(result, sourceText);

console.log(`Run completed: ${result.runId}`);
console.log(`Project type: ${result.projectType}`);
console.log(`Summary items: ${result.summary.length}`);
console.log(`Action items: ${result.actionItems.length}`);
console.log(`Artifacts:`);
console.log(`- ${artifacts.jsonPath}`);
console.log(`- ${artifacts.logPath}`);
console.log(`- ${artifacts.reportPath}`);
