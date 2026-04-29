const fs = require("fs");
const path = require("path");

function ensureDirectory(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeRunArtifacts(result, sourceText) {
  const root = process.cwd();
  const runsDir = path.join(root, "runs");
  const reportsDir = path.join(root, "reports");
  ensureDirectory(runsDir);
  ensureDirectory(reportsDir);

  const logLines = [
    `[${result.startedAt}] START ${result.runId}`,
    `[${new Date().toISOString()}] INPUT chars=${result.stats.characters} sentences=${result.stats.sentences}`,
    `[${new Date().toISOString()}] TYPE ${result.projectType}`,
    `[${new Date().toISOString()}] THEMES ${result.themes.join(", ") || "none"}`,
    `[${new Date().toISOString()}] ACTIONS ${result.actionItems.length}`,
    `[${new Date().toISOString()}] RISKS ${result.risks.length}`,
    `[${new Date().toISOString()}] END ${result.runId}`
  ];

  const jsonPath = path.join(runsDir, `${result.runId}.json`);
  const logPath = path.join(runsDir, `${result.runId}.log`);
  const reportPath = path.join(reportsDir, `${result.runId}.md`);

  fs.writeFileSync(jsonPath, JSON.stringify({ ...result, sourceText }, null, 2), "utf8");
  fs.writeFileSync(logPath, logLines.join("\n"), "utf8");
  fs.writeFileSync(reportPath, buildMarkdownReport(result), "utf8");

  return {
    jsonPath,
    logPath,
    reportPath
  };
}

function buildMarkdownReport(result) {
  const lines = [
    `# Agent Evidence Report`,
    ``,
    `- Run ID: \`${result.runId}\``,
    `- Started At: \`${result.startedAt}\``,
    `- Project Type: \`${result.projectType}\``,
    ``,
    `## Summary`,
    ...result.summary.map((item) => `- ${item}`),
    ``,
    `## Action Items`,
    ...(result.actionItems.length ? result.actionItems.map((item) => `- ${item}`) : ["- No explicit action items detected."]),
    ``,
    `## Risks`,
    ...(result.risks.length ? result.risks.map((item) => `- ${item}`) : ["- No obvious risk sentence detected."]),
    ``,
    `## Themes`,
    `- ${result.themes.join(", ") || "No theme keywords detected."}`,
    ``,
    `## Narrative`,
    ...result.narrative.map((item) => `- ${item}`)
  ];

  return lines.join("\n");
}

module.exports = {
  writeRunArtifacts,
  buildMarkdownReport
};
