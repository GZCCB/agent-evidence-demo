# 提交说明文案

这份文案分成中文长版、中文短版、英文版三种，你可以按表单字数直接选用。

## 中文长版

我做了一个真实可运行的本地 Agent 工作流 Demo，用来模拟团队内部对项目笔记、工单摘要和阶段性进度信息的自动处理。它解决的核心痛点是：人工整理上下文、提炼结论、补行动项和识别风险非常耗时，而且输出格式不稳定，导致协作成本高、响应速度慢，也不利于后续复核和沉淀。

这个 Demo 的核心逻辑流包括四步。第一步接收原始项目文本，例如站会记录、任务摘要或内部协作文档；第二步自动提取关键信息并生成摘要；第三步识别待办事项、负责人线索和潜在风险；第四步将结果落成 JSON、运行日志和 Markdown 报告，方便复核、归档和团队共享。当前版本虽然是本地零依赖实现，但整体结构是按真实 Agent 工作流设计的，后续可以继续接入大模型 API、审批节点、外部知识库和多 Agent 协作链路。

我把它整理成了一个可运行的 GitHub 项目，同时提供浏览器演示页和命令行运行方式。这样既能展示具体成果，也能展示我对 AI Agent 工作流、自动化闭环、可验证输出和工程化交付方式的理解。

## 中文短版

我做了一个可运行的本地 Agent 工作流 Demo，用来把项目笔记、工单摘要和进度记录自动转成结构化输出，包括摘要、行动项、风险提示以及可复核的日志和 Markdown 报告。这个项目主要解决人工整理信息效率低、输出不稳定的问题，也体现了我对 AI Agent 工作流、自动化闭环和可验证交付物的理解。目前我已经把它整理成可运行的 GitHub 项目，并提供网页演示和命令行运行方式。

## English Version

I built a runnable local agent workflow demo that simulates how teams can process project notes, task summaries, and progress updates more efficiently. The core problem it addresses is that manually organizing context, extracting conclusions, identifying action items, and spotting risks is slow and inconsistent, which increases collaboration overhead and reduces response speed.

The workflow follows four main steps: it accepts raw project text, generates a concise summary, extracts action items and risk signals, and writes the results into structured JSON, terminal-style logs, and Markdown reports for review and sharing. Although the current version is implemented as a lightweight local demo, it is structured like a real agent workflow and can later be extended with LLM APIs, approval gates, knowledge-base integration, or multi-agent coordination.

I also packaged it as a clean GitHub project with both a browser demo page and a CLI workflow. This helps demonstrate not only a concrete output, but also my understanding of AI agent workflows, automation loops, and verifiable project delivery.
