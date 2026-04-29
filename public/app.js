const sourceText = document.getElementById("source-text");
const loadSampleButton = document.getElementById("load-sample");
const runButton = document.getElementById("run-analysis");
const statusNode = document.getElementById("status");

const summaryList = document.getElementById("summary-list");
const actionList = document.getElementById("action-list");
const riskList = document.getElementById("risk-list");
const artifactList = document.getElementById("artifact-list");

function renderList(element, items, emptyText) {
  element.innerHTML = "";
  const content = items.length ? items : [emptyText];
  for (const item of content) {
    const li = document.createElement("li");
    li.textContent = item;
    element.appendChild(li);
  }
}

async function loadSample() {
  statusNode.textContent = "Loading sample input...";
  const response = await fetch("/api/sample");
  const payload = await response.json();
  sourceText.value = payload.text;
  statusNode.textContent = "Sample input loaded. Ready to run.";
}

async function runAnalysis() {
  const text = sourceText.value.trim();
  if (!text) {
    statusNode.textContent = "Please paste some project notes first.";
    return;
  }

  statusNode.textContent = "Running workflow and writing artifacts...";
  runButton.disabled = true;

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "Request failed");
    }

    renderList(summaryList, payload.summary, "No summary sentences extracted.");
    renderList(actionList, payload.actionItems, "No action items detected.");
    renderList(riskList, payload.risks, "No risks detected.");
    renderList(
      artifactList,
      [
        `JSON: ${payload.artifacts.jsonPath}`,
        `Log: ${payload.artifacts.logPath}`,
        `Markdown report: ${payload.artifacts.reportPath}`
      ],
      "No artifacts written."
    );

    statusNode.textContent = `Completed ${payload.runId} with ${payload.stats.sentences} sentences analyzed.`;
  } catch (error) {
    statusNode.textContent = `Workflow failed: ${error.message}`;
  } finally {
    runButton.disabled = false;
  }
}

loadSampleButton.addEventListener("click", loadSample);
runButton.addEventListener("click", runAnalysis);
