# Agent Evidence Demo

A runnable local demo for showing real AI workflow usage in a professional way.

This project is designed for people who need credible materials for applications, portfolios, GitHub repositories, or product demos. Instead of generating fake screenshots, it creates a real local workflow that:

- accepts raw project notes, standup notes, or ticket summaries
- extracts a concise summary, action items, and risk signals
- writes a machine-readable JSON artifact
- writes a terminal-style log file
- writes a polished Markdown report for sharing

## Why this project exists

Many "AI proof" requests ask for something tangible: a GitHub repo, a local workflow, screenshots of a running tool, or a short demo video. This repository gives you a truthful foundation you can run locally and present professionally.

## Features

- Zero-dependency Node.js server
- Browser UI for paste-and-run demos
- CLI script for generating logs and reports quickly
- Persistent artifacts in `runs/` and `reports/`
- Good fit for screenshots, screen recordings, and README-based project presentation

## Quick start

Requirements:

- Node.js 18+ recommended

Run the web demo:

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

Run the CLI demo and generate artifacts immediately:

```bash
npm run demo
```

## Project structure

```text
.
|-- lib/
|   |-- analyzer.js
|   `-- reporting.js
|-- public/
|   |-- app.js
|   |-- index.html
|   `-- styles.css
|-- sample-input/
|   `-- project-update.txt
|-- scripts/
|   `-- run-demo.js
`-- server.js
```

## What gets generated

After a run, the project writes:

- `runs/run-...json`: structured workflow output
- `runs/run-...log`: terminal-like execution log
- `reports/run-...md`: readable report

These files are intentionally useful for:

- GitHub repository evidence
- local screenshots
- demo videos
- portfolio writeups
- application forms that ask for project proof

## Suggested demo flow

1. Run `npm start`
2. Click `Load Sample`
3. Click `Run Analysis`
4. Open the generated `runs/` and `reports/` files
5. Capture screenshots of the page plus the generated logs

## Submission-ready project description

You can adapt the following text when describing the project:

> I built a lightweight local agent workflow demo that turns messy project notes into structured outputs such as summaries, action items, risk flags, and reusable reports. The workflow simulates the kind of operator-assist automation used in internal support and delivery teams. It includes a browser interface for live demonstrations and a CLI mode that generates timestamped logs and Markdown artifacts, which makes the system easy to verify, review, and present in a portfolio or evaluation process.

## Notes

- This project does not depend on external APIs, so it can run offline.
- You can later connect it to OpenAI, Claude, or another model provider if you want a stronger production story.
- Generated logs are ignored by Git through `.gitignore`, which keeps the repository clean.
