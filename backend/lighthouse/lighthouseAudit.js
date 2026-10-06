const chromeLauncher = require("chrome-launcher");

async function runLighthouse(url) {
  const { default: lighthouse } = await import("lighthouse");

  const chrome = await chromeLauncher.launch({
  chromeFlags: [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-dev-shm-usage",
  ],
});

  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      output: "json",
      onlyCategories: [
        "performance",
        "accessibility",
        "best-practices",
        "seo",
      ],
    });

    const report = result.lhr;

   const opportunities = [
  "render-blocking-resources",
  "unused-css-rules",
  "unused-javascript",
  "modern-image-formats",
  "offscreen-images",
  "uses-text-compression",
  "uses-responsive-images",
  "efficient-animated-content",
  "unminified-css",
  "unminified-javascript",
]
  .map((id) => {
    const audit = report.audits[id];
    if (!audit) return null;

    return {
      id,
      title: audit.title,
      description: audit.description,
      score: audit.score,
      displayValue: audit.displayValue || "",
    };
  })
  .filter(Boolean);

const diagnostics = [
  "server-response-time",
  "mainthread-work-breakdown",
  "bootup-time",
  "dom-size",
  "network-requests",
]
  .map((id) => {
    const audit = report.audits[id];
    if (!audit) return null;

    return {
      id,
      title: audit.title,
      description: audit.description,
      score: audit.score,
      displayValue: audit.displayValue || "",
    };
  })
  .filter(Boolean);

return {
  performance: Math.round(report.categories.performance.score * 100),
  accessibility: Math.round(report.categories.accessibility.score * 100),
  bestPractices: Math.round(report.categories["best-practices"].score * 100),
  seo: Math.round(report.categories.seo.score * 100),

  metrics: {
    fcp: report.audits["first-contentful-paint"].displayValue,
    lcp: report.audits["largest-contentful-paint"].displayValue,
    cls: report.audits["cumulative-layout-shift"].displayValue,
    tbt: report.audits["total-blocking-time"].displayValue,
    speedIndex: report.audits["speed-index"].displayValue,
  },

  opportunities,
  diagnostics,
};
  }
  finally {
  try {
    if (chrome) {
      await chrome.kill();
    }
  } catch (e) {
    console.warn("Ignoring Chrome cleanup error:", e.message);
  }
}

}

module.exports = runLighthouse;