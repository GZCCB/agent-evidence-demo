const http = require("http");
const fs = require("fs");
const path = require("path");
const { analyzeDocument } = require("./lib/analyzer");
const { writeRunArtifacts } = require("./lib/reporting");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const SAMPLE_FILE = path.join(__dirname, "sample-input", "project-update.txt");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload));
}

function serveStatic(req, res) {
  const requestPath = req.url === "/" ? "/index.html" : req.url;
  const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    sendJson(res, 403, { error: "Forbidden" });
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      sendJson(res, 404, { error: "Not found" });
      return;
    }

    const extension = path.extname(filePath);
    res.writeHead(200, { "Content-Type": MIME_TYPES[extension] || "application/octet-stream" });
    res.end(content);
  });
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString("utf8");
      if (body.length > 2_000_000) {
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

async function handleAnalyze(req, res) {
  try {
    const rawBody = await readRequestBody(req);
    const payload = rawBody ? JSON.parse(rawBody) : {};
    const sourceText = (payload.text || "").trim();

    if (!sourceText) {
      sendJson(res, 400, { error: "text is required" });
      return;
    }

    const result = analyzeDocument(sourceText);
    const artifacts = writeRunArtifacts(result, sourceText);
    sendJson(res, 200, { ...result, artifacts });
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Unexpected error" });
  }
}

function handleSample(res) {
  const text = fs.readFileSync(SAMPLE_FILE, "utf8");
  sendJson(res, 200, { text });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/api/sample") {
    handleSample(res);
    return;
  }

  if (req.method === "POST" && req.url === "/api/analyze") {
    await handleAnalyze(req, res);
    return;
  }

  if (req.method === "GET") {
    serveStatic(req, res);
    return;
  }

  sendJson(res, 405, { error: "Method not allowed" });
});

server.listen(PORT, () => {
  console.log(`Agent Evidence Demo running at http://localhost:${PORT}`);
});
