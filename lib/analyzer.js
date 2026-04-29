const KEYWORD_GROUPS = {
  risk: ["risk", "issue", "blocker", "delay", "error", "bug", "missing", "风险", "阻塞", "异常", "报错", "延迟"],
  delivery: ["launch", "deploy", "release", "ship", "上线", "交付", "发布"],
  collaboration: ["review", "owner", "team", "coordination", "协作", "负责人", "评审"],
  data: ["metric", "latency", "cost", "token", "usage", "指标", "成本", "延迟", "吞吐"]
};

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "to", "of", "in", "on", "for", "with", "is", "are", "be", "this",
  "that", "we", "it", "as", "by", "from", "our", "was", "were", "at", "will", "can", "into", "about"
]);

function splitSentences(text) {
  return text
    .replace(/\r/g, "")
    .split(/(?<=[.!?。！？；;\n])/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function tokenize(text) {
  const englishWords = text.toLowerCase().match(/[a-z]{3,}/g) || [];
  const chineseBlocks = text.match(/[\u4e00-\u9fff]{2,}/g) || [];
  return englishWords.concat(chineseBlocks).filter((word) => !STOPWORDS.has(word));
}

function buildFrequencyMap(tokens) {
  const frequencies = new Map();
  for (const token of tokens) {
    frequencies.set(token, (frequencies.get(token) || 0) + 1);
  }
  return frequencies;
}

function scoreSentence(sentence, frequencies) {
  const tokens = tokenize(sentence);
  if (!tokens.length) {
    return 0;
  }

  const baseScore = tokens.reduce((sum, token) => sum + (frequencies.get(token) || 0), 0) / tokens.length;
  const bonus = sentence.length > 30 ? 1 : 0;
  return baseScore + bonus;
}

function unique(items) {
  return [...new Set(items)];
}

function extractKeyThemes(text) {
  const lower = text.toLowerCase();
  const themes = [];

  for (const [label, words] of Object.entries(KEYWORD_GROUPS)) {
    if (words.some((word) => lower.includes(word))) {
      themes.push(label);
    }
  }

  const tokens = tokenize(text)
    .filter((token) => token.length >= 3)
    .slice(0, 200);
  const topTokens = [...buildFrequencyMap(tokens).entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([token]) => token);

  return unique(themes.concat(topTokens)).slice(0, 8);
}

function extractActionItems(text) {
  const lines = text.replace(/\r/g, "").split("\n").map((line) => line.trim()).filter(Boolean);
  const markers = ["todo", "next", "action", "follow-up", "need to", "should", "plan", "待办", "下一步", "行动", "需要", "计划"];

  const matched = lines.filter((line) => {
    const lower = line.toLowerCase();
    return /^[-*•\d]/.test(line) || markers.some((marker) => lower.includes(marker));
  });

  if (matched.length >= 3) {
    return matched.slice(0, 5);
  }

  const sentences = splitSentences(text);
  return sentences
    .filter((sentence) => markers.some((marker) => sentence.toLowerCase().includes(marker)))
    .slice(0, 5);
}

function extractRisks(text) {
  const sentences = splitSentences(text);
  return sentences
    .filter((sentence) => KEYWORD_GROUPS.risk.some((word) => sentence.toLowerCase().includes(word)))
    .slice(0, 4);
}

function summarize(text) {
  const sentences = splitSentences(text);
  if (!sentences.length) {
    return [];
  }

  const frequencies = buildFrequencyMap(tokenize(text));
  return [...sentences]
    .sort((a, b) => scoreSentence(b, frequencies) - scoreSentence(a, frequencies))
    .slice(0, 3);
}

function detectProjectType(text) {
  const lower = text.toLowerCase();
  if (lower.includes("api") || lower.includes("backend") || lower.includes("服务")) {
    return "backend-service";
  }
  if (lower.includes("frontend") || lower.includes("ui") || lower.includes("页面")) {
    return "frontend-app";
  }
  if (lower.includes("data") || lower.includes("sql") || lower.includes("报表")) {
    return "data-workflow";
  }
  return "general-workflow";
}

function createNarrative(summary, actions, risks, themes, projectType) {
  const headline = `This run classified the input as ${projectType} and highlighted ${themes.slice(0, 3).join(", ") || "general delivery work"}.`;
  const impact = summary[0] || "The workflow extracted the most representative sentence from the source material.";
  const nextStep = actions[0] || "No explicit action item was found, so the operator should define the next milestone manually.";
  const warning = risks[0] || "No blocking risk keywords were detected in the source text.";
  return [headline, impact, `Recommended next step: ${nextStep}`, `Watch item: ${warning}`];
}

function analyzeDocument(text) {
  const startedAt = new Date();
  const summary = summarize(text);
  const actionItems = extractActionItems(text);
  const risks = extractRisks(text);
  const themes = extractKeyThemes(text);
  const projectType = detectProjectType(text);

  return {
    runId: `run-${startedAt.toISOString().replace(/[:.]/g, "-")}`,
    startedAt: startedAt.toISOString(),
    projectType,
    summary,
    actionItems,
    risks,
    themes,
    narrative: createNarrative(summary, actionItems, risks, themes, projectType),
    stats: {
      characters: text.length,
      sentences: splitSentences(text).length,
      extractedActions: actionItems.length,
      extractedRisks: risks.length
    }
  };
}

module.exports = {
  analyzeDocument
};
