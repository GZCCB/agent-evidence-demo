# Agent Evidence Demo

A lightweight, runnable AI workflow demo for generating real project evidence.

This repository turns raw project notes into structured outputs that look professional and are easy to verify. Instead of relying on fabricated screenshots or vague claims, it produces a real local workflow with visible inputs, consistent outputs, and reusable artifacts.

## Overview

The demo simulates an operator-assist or delivery-support agent. A user pastes project notes, standup updates, ticket summaries, or internal workflow text, and the system:

- classifies the input at a high level
- extracts a short summary
- identifies action items
- flags risk-related language
- writes persistent JSON, log, and Markdown artifacts

The result is a small but credible project that is useful for:

- GitHub portfolio presentation
- AI application forms that ask for project proof
- screenshot and screen-recording evidence
- showing understanding of agent workflow design

## Why this project is useful

Many evaluation or grant forms ask for supporting material such as:

- GitHub project links
- product demos
- workflow screenshots
- terminal logs
- concrete examples of AI-driven delivery

This project provides those materials in a truthful way. It is intentionally simple enough to run locally in minutes, while still showing the shape of a real AI workflow pipeline.

## Core features

- Zero-dependency Node.js implementation
- Browser-based demo page for paste-and-run usage
- CLI workflow for fast artifact generation
- Automatic creation of structured run outputs
- Clean repository shape for portfolio and review use

## Workflow

1. Accept free-form project text.
2. Detect key themes and likely project type.
3. Extract summary sentences, actions, and risk signals.
4. Save the results as reusable artifacts for review or sharing.

## Generated artifacts

Each run writes three output files:

- `runs/run-...json`: structured machine-readable result
- `runs/run-...log`: terminal-style execution log
- `reports/run-...md`: presentation-friendly Markdown report

These artifacts are helpful because they create a visible bridge between:

- source input
- workflow processing
- reviewable output

## Quick start

Requirements:

- Node.js 18+

Start the web demo:

```bash
npm start
```

Open:

```text
http://localhost:3000
```

Run the CLI version:

```bash
npm run demo
```

## Suggested demo flow

1. Start the app with `npm start`.
2. Open `http://localhost:3000`.
3. Click `Load Sample`.
4. Click `Run Analysis`.
5. Open the generated files in `runs/` and `reports/`.
6. Capture screenshots of the UI and the generated artifacts.

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

## Positioning

This repository is not a full production agent platform. It is a compact, presentation-ready demo that emphasizes:

- workflow clarity
- observable outputs
- reproducibility
- portfolio usefulness

It can later be extended with:

- real LLM API calls
- approval steps
- multi-agent coordination
- external data sources
- dashboards or evaluation metrics

## Submission-ready description

You can reuse or adapt this text:

> I built a runnable local agent workflow demo that converts raw project notes into structured outputs such as summaries, action items, risk flags, and reusable reports. The project is designed to simulate the kind of operator-assist automation used in delivery and internal support scenarios. It includes a browser-based interface for demonstrations and a CLI mode that generates timestamped logs and Markdown artifacts, making the workflow easy to verify, review, and present as a real AI-driven project.

## Notes

- The current version runs locally without external API dependencies.
- Generated run artifacts are ignored by Git through `.gitignore`.
- The repository is intended to be easy to demo, explain, and extend.
