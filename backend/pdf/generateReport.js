const PDFDocument = require("pdfkit");
const fs = require("fs");
const QRCode = require("qrcode");

function sectionTitle(doc, title) {

    doc.moveDown();

    // Reset X position before drawing title
    doc.x = 50;

    doc
        .font("Helvetica-Bold")
        .fontSize(18)
        .fillColor("#2563eb")
        .text(title, 50, doc.y, {
            width: 495,
            align: "center",
            lineBreak: false
        });

    doc.moveDown(0.2);

    doc
        .strokeColor("#d1d5db")
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke();

    doc.moveDown(1.5);

    // Reset for body text
    doc.x = 50;
    doc.font("Helvetica");
    doc.fillColor("black");
}

function scoreCard(doc, x, y, title, score, color) {

  const label = getScoreLabel(score);

  doc
    .roundedRect(x, y, 110, 85, 8)
    .fillAndStroke(color, "#d1d5db");

  // Title
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#ffffff")
    .text(title, x + 5, y + 10, {
      width: 100,
      align: "center",
      lineBreak: false
    });

  // Score
  doc
    .font("Helvetica-Bold")
    .fontSize(24)
    .fillColor("#ffffff")
    .text(String(score), x + 5, y + 32, {
      width: 100,
      align: "center",
      lineBreak: false
    });

  // Status
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#ffffff")
    .text(label, x + 5, y + 64, {
      width: 100,
      align: "center",
      lineBreak: false
    });

  doc.fillColor("#111827");
}

function getSEOGrade(score) {
  const value = Number(score) || 0;

  if (value >= 95) return "A+";
  if (value >= 90) return "A";
  if (value >= 80) return "B";
  if (value >= 70) return "C";
  if (value >= 60) return "D";

  return "F";
}

function getScoreColor(score) {

    if (score >= 90) return "#22c55e";

    if (score >= 70) return "#f59e0b";

    return "#ef4444";

}
function getScoreLabel(score) {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Needs Improvement";
  return "Poor";
}
  // Reset color for later text
function fullWidthText(doc, text, options = {}) {
  doc.text(
    text,
    50,
    doc.y,
    {
      width: 495,
      ...options,
    }
  );
}


async function generateReport(data, filePath) {

  const qrDataUrl = await QRCode.toDataURL(
  data.url || "https://example.com"
);

const qrBuffer = Buffer.from(
  qrDataUrl.split(",")[1],
  "base64"
);
    const doc = new PDFDocument({
  margin: 50,
  size: "A4",
});

doc.pipe(fs.createWriteStream(filePath));

 // ===========================
// Professional Report Header
// ===========================

const headerY = 45;

// RankFlow Brand
doc
  .font("Helvetica-Bold")
  .fontSize(28)
  .fillColor("#2563eb")
  .text("RankFlow", 50, headerY);

// Report label
doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor("#6b7280")
  .text(
    "AI-POWERED SEO INTELLIGENCE",
    50,
    headerY + 34
  );

// Report title
doc
  .font("Helvetica-Bold")
  .fontSize(22)
  .fillColor("#111827")
  .text(
    "Website SEO Audit Report",
    50,
    headerY + 75
  );

// Subtitle
doc
  .font("Helvetica")
  .fontSize(11)
  .fillColor("#6b7280")
  .text(
    "Comprehensive performance, technical SEO and AI-powered recommendations",
    50,
    headerY + 105,
    {
      width: 495
    }
  );

// Divider
doc
  .strokeColor("#e5e7eb")
  .lineWidth(1)
  .moveTo(50, headerY + 135)
  .lineTo(545, headerY + 135)
  .stroke();


// ===========================
// Website Information Card
// ===========================

const infoY = headerY + 160;

doc
  .roundedRect(
    50,
    infoY,
    495,
    100,
    10
  )
  .fillAndStroke(
    "#f8fafc",
    "#e5e7eb"
  );

// Website
doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor("#6b7280")
  .text(
    "WEBSITE",
    70,
    infoY + 18
  );

doc
  .font("Helvetica")
  .fontSize(12)
  .fillColor("#111827")
  .text(
    data.url || "Unknown",
    70,
    infoY + 35,
    {
      width: 300
    }
  );

// Generated Date
doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor("#6b7280")
  .text(
    "GENERATED",
    70,
    infoY + 60
  );

doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor("#111827")
  .text(
    new Date().toLocaleString(),
    70,
    infoY + 76
  );


// ===========================
// Overall Score Badge
// ===========================

const overallScore =
  data.overallScore ?? 0;

const overallColor =
  getScoreColor(overallScore);

  const overallLabel =
  getScoreLabel(overallScore);

  const seoGrade =
  getSEOGrade(overallScore);

doc
  .roundedRect(
    415,
    infoY + 15,
    105,
    70,
    10
  )
  .fill(overallColor);

// Overall score number
doc
  .font("Helvetica-Bold")
  .fontSize(24)
  .fillColor("#ffffff")
  .text(
    `${overallScore}`,
    415,
    infoY + 23,
    {
      width: 105,
      align: "center",
      lineBreak: false
    }
  );

// Score status
doc
  .font("Helvetica-Bold")
  .fontSize(8)
  .fillColor("#ffffff")
  .text(
    overallLabel,
    415,
    infoY + 52,
    {
      width: 105,
      align: "center",
      lineBreak: false
    }
  );

// Label
doc
  .font("Helvetica")
  .fontSize(7)
  .fillColor("#ffffff")
  .text(
    "OVERALL SCORE",
    415,
    infoY + 68,
    {
      width: 105,
      align: "center",
      lineBreak: false
    }
  );
// Move cursor below card
doc.y = infoY + 125;
doc.x = 50;


// ===========================
// Executive Summary
// ===========================

const criticalIssues =
  data.issues?.filter(
    (issue) =>
      String(issue.severity).toLowerCase() === "critical"
  ).length ?? 0;

const warningIssues =
  data.issues?.filter(
    (issue) =>
      String(issue.severity).toLowerCase() === "warning"
  ).length ?? 0;

const totalIssues =
  data.issues?.length ?? 0;

sectionTitle(doc, "Executive Summary");

const summaryY = doc.y;

// Overall Score
statCard(
  doc,
  50,
  summaryY,
  "Overall Score",
  `${overallScore}/100`
);

// Critical Issues
statCard(
  doc,
  222,
  summaryY,
  "Critical Issues",
  criticalIssues
);

// Warnings
statCard(
  doc,
  395,
  summaryY,
  "Warnings",
  warningIssues
);

// Summary text
doc.y = summaryY + 85;
doc.x = 50;

// ===========================
// SEO Grade Badge
// ===========================

const gradeY = doc.y;

doc
  .roundedRect(
    50,
    gradeY,
    495,
    55,
    8
  )
  .fillAndStroke(
    "#f8fafc",
    "#e5e7eb"
  );

// Label
doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor("#6b7280")
  .text(
    "SEO GRADE",
    70,
    gradeY + 12,
    {
      width: 100,
      lineBreak: false
    }
  );

// Grade
doc
  .font("Helvetica-Bold")
  .fontSize(24)
  .fillColor(overallColor)
  .text(
    seoGrade,
    180,
    gradeY + 10,
    {
      width: 60,
      lineBreak: false
    }
  );

// Status
doc
  .font("Helvetica-Bold")
  .fontSize(11)
  .fillColor(overallColor)
  .text(
    overallLabel,
    260,
    gradeY + 18,
    {
      width: 180,
      lineBreak: false
    }
  );

// Score
doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor("#6b7280")
  .text(
    `${overallScore}/100`,
    450,
    gradeY + 18,
    {
      width: 70,
      align: "right",
      lineBreak: false
    }
  );

// Move below grade badge
doc.y = gradeY + 75;
doc.x = 50;

doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor("#4b5563")
  .text(
    `RankFlow analyzed this website and identified ${totalIssues} SEO issue${
      totalIssues === 1 ? "" : "s"
    }. The website received an overall score of ${overallScore}/100 (${overallLabel}). ${
      criticalIssues > 0
        ? `Immediate attention is recommended for ${criticalIssues} critical issue${
            criticalIssues === 1 ? "" : "s"
          }.`
        : "No critical SEO issues were detected."
    }`,
    50,
    doc.y,
    {
      width: 495,
      lineGap: 3
    }
  );

doc.moveDown(1.5);
doc.x = 50;

  // ===========================
  // Lighthouse Scores
  // ===========================
  checkPage(doc);
    sectionTitle(doc,"Lighthouse Scores");
  doc.moveDown(0.5);

  const y = doc.y;

const seo = data.categories?.seo ?? 0;
const performance = data.categories?.performance ?? 0;
const accessibility = data.categories?.accessibility ?? 0;
const bestPractices = data.categories?.bestPractices ?? 0;

scoreCard(
  doc,
  50,
  y,
  "SEO",
  seo,
  getScoreColor(seo)
);

scoreCard(
  doc,
  180,
  y,
  "Performance",
  performance,
  getScoreColor(performance)
);

scoreCard(
  doc,
  310,
  y,
  "Accessibility",
  accessibility,
  getScoreColor(accessibility)
);

scoreCard(
  doc,
  440,
  y,
  "Best Practices",
  bestPractices,
  getScoreColor(bestPractices)
);
doc.y = y + 105;

function getSeverityColor(severity) {
  const level = String(severity || "").toLowerCase();

  if (level === "critical") return "#ef4444";
  if (level === "warning") return "#f59e0b";
  if (level === "info") return "#3b82f6";

  return "#6b7280";
}
function statCard(doc, x, y, title, value) {

  // Save current cursor position
  const oldX = doc.x;
  const oldY = doc.y;

  // Draw card
  doc
    .roundedRect(x, y, 150, 65, 8)
    .fillAndStroke("#f8fafc", "#e5e7eb");

  // Title
  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#6b7280")
    .text(
      title,
      x + 10,
      y + 12,
      {
        width: 130,
        align: "center",
        lineBreak: false
      }
    );

  // Value
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor("#2563eb")
    .text(
      String(value ?? "-"),
      x + 10,
      y + 34,
      {
        width: 130,
        align: "center",
        lineBreak: false
      }
    );

  // Restore cursor
  doc.x = oldX;
  doc.y = oldY;
}

function getPriorityFromSeverity(severity) {
  const level = String(severity || "").toLowerCase();

  if (level === "critical") {
    return {
      label: "HIGH PRIORITY",
      color: "#dc2626"
    };
  }

  if (level === "warning") {
    return {
      label: "MEDIUM PRIORITY",
      color: "#f59e0b"
    };
  }

  return {
    label: "LOW PRIORITY",
    color: "#2563eb"
  };
}
  // ===========================
  // Core Web Vitals
  // ===========================

  if (data.metrics) {
  checkPage(doc);

  sectionTitle(doc, "Core Web Vitals");

  const metricsY = doc.y;

  metricCard(
    doc,
    50,
    metricsY,
    "FCP",
    data.metrics.fcp
  );

  metricCard(
    doc,
    150,
    metricsY,
    "LCP",
    data.metrics.lcp
  );

  metricCard(
    doc,
    250,
    metricsY,
    "CLS",
    data.metrics.cls
  );

  metricCard(
    doc,
    350,
    metricsY,
    "TBT",
    data.metrics.tbt
  );

  metricCard(
    doc,
    450,
    metricsY,
    "Speed Index",
    data.metrics.speedIndex
  );

  // Move cursor below cards
  doc.y = metricsY + 100;
  doc.x = 50;
}

function getMetricStatus(type, value) {
  const num = parseFloat(String(value).replace(/[^0-9.]/g, ""));

  if (isNaN(num)) {
    return {
      label: "Unknown",
      color: "#6b7280"
    };
  }

  switch (type) {
    case "FCP":
      if (num <= 1.8) return { label: "Good", color: "#22c55e" };
      if (num <= 3.0) return { label: "Needs Improvement", color: "#f59e0b" };
      return { label: "Poor", color: "#ef4444" };

    case "LCP":
      if (num <= 2.5) return { label: "Good", color: "#22c55e" };
      if (num <= 4.0) return { label: "Needs Improvement", color: "#f59e0b" };
      return { label: "Poor", color: "#ef4444" };

    case "CLS":
      if (num <= 0.1) return { label: "Good", color: "#22c55e" };
      if (num <= 0.25) return { label: "Needs Improvement", color: "#f59e0b" };
      return { label: "Poor", color: "#ef4444" };

    case "TBT":
      if (num <= 200) return { label: "Good", color: "#22c55e" };
      if (num <= 600) return { label: "Needs Improvement", color: "#f59e0b" };
      return { label: "Poor", color: "#ef4444" };

    case "Speed Index":
      if (num <= 3.4) return { label: "Good", color: "#22c55e" };
      if (num <= 5.8) return { label: "Needs Improvement", color: "#f59e0b" };
      return { label: "Poor", color: "#ef4444" };

    default:
      return {
        label: "Unknown",
        color: "#6b7280"
      };
  }
}
function metricCard(doc, x, y, title, value) {

  const status = getMetricStatus(title, value);

  doc
    .roundedRect(x, y, 90, 80, 8)
    .fillAndStroke("#f8fafc", "#e5e7eb");

  // Metric name
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor("#6b7280")
    .text(title, x + 5, y + 10, {
      width: 80,
      align: "center",
      lineBreak: false
    });

  // Metric value
  doc
    .font("Helvetica-Bold")
    .fontSize(14)
    .fillColor("#2563eb")
    .text(String(value ?? "-"), x + 5, y + 32, {
      width: 80,
      align: "center",
      lineBreak: false
    });

  // Status
  doc
    .font("Helvetica-Bold")
    .fontSize(7)
    .fillColor(status.color)
    .text(status.label, x + 3, y + 58, {
      width: 84,
      align: "center",
      lineBreak: false
    });

  doc.fillColor("#111827");
}

function renderAIAdvice(doc, advice) {
  const lines = String(advice || "").split("\n");

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      doc.moveDown(0.5);
      return;
    }

    // Markdown heading: **1. Overall Analysis**
    if (
      line.startsWith("**") &&
      line.endsWith("**")
    ) {
      checkPage(doc);

      const heading = line
        .replace(/\*\*/g, "")
        .trim();

      doc.moveDown(0.5);

      doc
        .font("Helvetica-Bold")
        .fontSize(13)
        .fillColor("#2563eb")
        .text(heading, 70, doc.y, {
          width: 445,
        });

      doc.moveDown(0.4);
      return;
    }

    // Markdown bullet: * Something
    if (
      line.startsWith("* ") ||
      line.startsWith("- ")
    ) {
      checkPage(doc);

      const bulletText = line
        .replace(/^(\*|-)\s+/, "")
        .replace(/\*\*/g, "");

      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#1f2937")
        .text(`• ${bulletText}`, 80, doc.y, {
          width: 430,
          lineGap: 3,
        });

      doc.moveDown(0.3);
      return;
    }

    // Numbered list: 1. **Keyword Research**: Description
    if (/^\d+\.\s/.test(line)) {
      checkPage(doc);

      const cleanText = line
        .replace(/\*\*/g, "");

      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#1f2937")
        .text(cleanText, 80, doc.y, {
          width: 430,
          lineGap: 3,
        });

      doc.moveDown(0.4);
      return;
    }

    // Normal paragraph
    checkPage(doc);

    const cleanParagraph = line
      .replace(/\*\*/g, "");

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#1f2937")
      .text(cleanParagraph, 70, doc.y, {
        width: 445,
        lineGap: 3,
        align: "left",
      });

    doc.moveDown(0.4);
  });
}

function addPageFooters(doc) {
  const range = doc.bufferedPageRange();

  for (
    let i = range.start;
    i < range.start + range.count;
    i++
  ) {
    doc.switchToPage(i);

    const pageNumber = i + 1;

    // Divider
    doc
      .strokeColor("#e5e7eb")
      .lineWidth(0.5)
      .moveTo(50, 795)
      .lineTo(545, 795)
      .stroke();

    // Left footer
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor("#9ca3af")
      .text(
        "RankFlow • AI Powered SEO Platform",
        50,
        805,
        {
          width: 300,
          lineBreak: false
        }
      );

    // Page number
    doc
      .font("Helvetica")
      .fontSize(8)
      .fillColor("#9ca3af")
      .text(
        `Page ${pageNumber}`,
        450,
        805,
        {
          width: 95,
          align: "right",
          lineBreak: false
        }
      );
  }
}

function metaRow(doc, y, label, value) {
  const exists = Boolean(value);

  // Row background
  doc
    .rect(50, y, 495, 42)
    .fillAndStroke("#f8fafc", "#e5e7eb");

  // Property
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#374151")
    .text(label, 65, y + 8, {
      width: 110,
    });

  // Value
  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(exists ? "#111827" : "#ef4444")
    .text(
      exists ? String(value) : "Missing",
      180,
      y + 8,
      {
        width: 280,
        height: 28,
        ellipsis: true,
      }
    );

  // Status
  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor(exists ? "#16a34a" : "#dc2626")
    .text(
      exists ? "FOUND" : "MISSING",
      465,
      y + 8,
      {
        width: 65,
        align: "center",
      }
    );
}
  // ===========================
// Meta Tags Analysis
// ===========================

if (data.metaData) {

  // Meta Tags table is large.
  // Start on a new page if there is not enough space.
  if (doc.y > 350) {
    doc.addPage();
    doc.x = 50;
    doc.y = 50;
  }

  sectionTitle(doc, "Meta Tags Analysis");

  doc.x = 50;
  doc.moveDown(0.5);

  // Table Header
  const headerY = doc.y;

  doc
    .rect(50, headerY, 495, 30)
    .fill("#2563eb");

  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor("#ffffff")
    .text("PROPERTY", 65, headerY + 10);

  doc.text(
    "VALUE",
    180,
    headerY + 10
  );

  doc.text(
    "STATUS",
    465,
    headerY + 10,
    {
      width: 65,
      align: "center",
    }
  );

  let rowY = headerY + 30;

  const metaRows = [
    ["Title", data.metaData.title],
    ["Description", data.metaData.description],
    ["Canonical URL", data.metaData.canonical],
    ["Robots", data.metaData.robots],
    ["Viewport", data.metaData.viewport],
    ["Charset", data.metaData.charset],
    ["OG Title", data.metaData.ogTitle],
    ["OG Description", data.metaData.ogDescription],
    ["OG Image", data.metaData.ogImage],
    ["Twitter Card", data.metaData.twitterCard],
  ];

  metaRows.forEach(([label, value]) => {

    // Check if another row fits
    if (rowY + 42 > 760) {
      doc.addPage();

      rowY = 50;

      // Repeat header on new page
      doc
        .rect(50, rowY, 495, 30)
        .fill("#2563eb");

      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor("#ffffff")
        .text("PROPERTY", 65, rowY + 10);

      doc.text(
        "VALUE",
        180,
        rowY + 10
      );

      doc.text(
        "STATUS",
        465,
        rowY + 10,
        {
          width: 65,
          align: "center",
        }
      );

      rowY += 30;
    }

    metaRow(
      doc,
      rowY,
      label,
      value
    );

    rowY += 42;
  });

  // Move cursor below table
  doc.y = rowY + 20;
  doc.x = 50;
}

// ===========================
// Content Statistics
// ===========================

// Always start Content Statistics on a fresh page
doc.addPage();

doc.x = 50;
doc.y = 50;

sectionTitle(doc, "Content Statistics");

doc.x = 50;
doc.moveDown(0.5);

let statsY = doc.y;

// Row 1
statCard(
  doc,
  50,
  statsY,
  "Word Count",
  data.wordCount ?? "-"
);

statCard(
  doc,
  222,
  statsY,
  "Reading Time",
  data.readingTime
    ? `${data.readingTime} min`
    : "-"
);

statCard(
  doc,
  395,
  statsY,
  "Page Size",
  data.pageSize ?? "-"
);

// Row 2
statsY += 80;

statCard(
  doc,
  50,
  statsY,
  "Load Time",
  data.loadTime ?? "-"
);

statCard(
  doc,
  222,
  statsY,
  "Total Links",
  data.links?.total ?? 0
);

statCard(
  doc,
  395,
  statsY,
  "Total Images",
  data.images?.total ?? 0
);

// Row 3
statsY += 80;

statCard(
  doc,
  50,
  statsY,
  "Missing ALT",
  data.images?.missingAlt ?? 0
);

statCard(
  doc,
  222,
  statsY,
  "Internal Links",
  data.links?.internal ?? 0
);

statCard(
  doc,
  395,
  statsY,
  "External Links",
  data.links?.external ?? 0
);

// Move cursor below cards
doc.y = statsY + 90;
doc.x = 50;

 // ===========================
// SEO Issues
// ===========================

checkPage(doc);
sectionTitle(doc, "SEO Issues");

doc.x = 50;
doc.moveDown(0.5);

// ===========================
// Issues Summary Cards
// ===========================

const issueCriticalCount =
  data.issues?.filter(
    (issue) =>
      String(issue.severity).toLowerCase() === "critical"
  ).length ?? 0;

const issueWarningCount =
  data.issues?.filter(
    (issue) =>
      String(issue.severity).toLowerCase() === "warning"
  ).length ?? 0;

const issueInfoCount =
  data.issues?.filter(
    (issue) =>
      String(issue.severity).toLowerCase() === "info"
  ).length ?? 0;

const issuesSummaryY = doc.y;

statCard(
  doc,
  50,
  issuesSummaryY,
  "Critical",
  issueCriticalCount
);

statCard(
  doc,
  222,
  issuesSummaryY,
  "Warnings",
  issueWarningCount
);

statCard(
  doc,
  395,
  issuesSummaryY,
  "Info",
  issueInfoCount
);

// Move below summary cards
doc.y = issuesSummaryY + 85;
doc.x = 50;

if (data.issues && data.issues.length) {

  data.issues.forEach((issue, index) => {

    // Estimate card height
    const cardHeight = 130;

    if (doc.y + cardHeight > 760) {
      doc.addPage();
      doc.x = 50;
      doc.y = 50;
    }

    const cardY = doc.y;

    const severityColor =
      getSeverityColor(issue.severity);

    // Card background
    doc
      .roundedRect(
        50,
        cardY,
        495,
        cardHeight,
        8
      )
      .fillAndStroke(
        "#f8fafc",
        "#e5e7eb"
      );

    // Severity indicator
    doc
      .roundedRect(
        50,
        cardY,
        6,
        cardHeight,
        3
      )
      .fill(severityColor);

    // Issue title
    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor("#111827")
      .text(
        `Issue ${index + 1}: ${issue.message}`,
        70,
        cardY + 15,
        {
          width: 455
        }
      );

    // Severity
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(severityColor)
      .text(
        String(issue.severity || "Info").toUpperCase(),
        70,
        cardY + 45
      );

    // Category
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#6b7280")
      .text(
        `Category: ${issue.category || "General"}`,
        160,
        cardY + 45
      );

    // Recommendation
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor("#111827")
      .text(
        "Recommendation",
        70,
        cardY + 70
      );

    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#4b5563")
      .text(
        issue.recommendation ||
          "Review and resolve this SEO issue.",
        70,
        cardY + 88,
        {
          width: 450,
          height: 30
        }
      );

    // Move below card
    doc.y = cardY + cardHeight + 15;
    doc.x = 50;

  });

} else {

  doc
    .roundedRect(
      50,
      doc.y,
      495,
      55,
      8
    )
    .fillAndStroke(
      "#f0fdf4",
      "#bbf7d0"
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#16a34a")
    .text(
      "No SEO issues detected.",
      70,
      doc.y + 18
    );

  doc.moveDown(4);
}
// ===========================
// Top Keywords
// ===========================

if (data.keywords?.length) {

  // Remove invalid / garbage keywords
  const excludedKeywords = new Set([
  "u0026",
  "u003c",
  "u003e",
  "nbsp",
  "itemscenter",
  "itemcenter",
  "devicewidth",
  "deviceheight",
  "initialscale",
  "maximumscale",
  "minimumscale",
  "widthdevice",
  "heightdevice",
  "true",
  "false",
  "null",
  "undefined",
]);

const cleanKeywords = data.keywords
  .filter((keyword) => {

    const word = String(keyword.word || "")
      .trim()
      .toLowerCase();

    // Remove empty words
    if (!word) return false;

    // Remove very short / long words
    if (word.length < 3 || word.length > 30) {
      return false;
    }

    // Remove known technical garbage
    if (excludedKeywords.has(word)) {
      return false;
    }

    // Remove unicode escape values such as u0026
    if (/^u[0-9a-f]{4}$/i.test(word)) {
      return false;
    }

    // Remove words containing only numbers
    if (/^\d+$/.test(word)) {
      return false;
    }

    // Allow only readable keyword characters
    if (!/^[a-z0-9\s-]+$/i.test(word)) {
      return false;
    }

    return true;
  })
  .slice(0, 10);

  if (cleanKeywords.length > 0) {

    // Ensure enough space for table
    if (doc.y > 500) {
      doc.addPage();
      doc.x = 50;
      doc.y = 50;
    }

    sectionTitle(doc, "Top Keywords");

    const headerY = doc.y;

    // ===========================
    // Table Header
    // ===========================

    doc
      .rect(50, headerY, 495, 32)
      .fill("#2563eb");

    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor("#ffffff");

    doc.text("#", 65, headerY + 11);

    doc.text(
      "KEYWORD",
      100,
      headerY + 11
    );

    doc.text(
      "COUNT",
      390,
      headerY + 11,
      {
        width: 60,
        align: "center"
      }
    );

    doc.text(
      "DENSITY",
      465,
      headerY + 11,
      {
        width: 65,
        align: "center"
      }
    );

    let keywordY = headerY + 32;

    // ===========================
    // Keyword Rows
    // ===========================

    cleanKeywords.forEach((keyword, index) => {

      const rowColor =
        index % 2 === 0
          ? "#f8fafc"
          : "#ffffff";

      doc
        .rect(
          50,
          keywordY,
          495,
          35
        )
        .fillAndStroke(
          rowColor,
          "#e5e7eb"
        );

      // Rank
      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor("#2563eb")
        .text(
          String(index + 1),
          65,
          keywordY + 12
        );

      // Keyword
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#111827")
        .text(
          String(keyword.word),
          100,
          keywordY + 11,
          {
            width: 270
          }
        );

      // Count
      doc
        .font("Helvetica-Bold")
        .fontSize(9)
        .fillColor("#374151")
        .text(
          String(keyword.count ?? 0),
          390,
          keywordY + 11,
          {
            width: 60,
            align: "center"
          }
        );

      // Density
      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor("#6b7280")
        .text(
          `${keyword.density ?? 0}%`,
          465,
          keywordY + 11,
          {
            width: 65,
            align: "center"
          }
        );

      keywordY += 35;
    });

    // Move cursor below table
    doc.y = keywordY + 20;
    doc.x = 50;
  }
}
// ===========================
// AI SEO Advisor
// ===========================

if (data.aiAdvice) {

  // Start on a new page if there is not enough space
  if (doc.y > 500) {
    doc.addPage();
    doc.x = 50;
    doc.y = 50;
  }

  sectionTitle(doc, "AI SEO Advisor");

  doc.x = 50;
  doc.moveDown(0.5);

  const adviceText = String(data.aiAdvice);

  // ===========================
  // AI Header Card
  // ===========================

  const aiHeaderY = doc.y;

  doc
    .roundedRect(
      50,
      aiHeaderY,
      495,
      55,
      8
    )
    .fillAndStroke(
      "#eff6ff",
      "#bfdbfe"
    );

  // Left blue accent
  doc
    .roundedRect(
      50,
      aiHeaderY,
      6,
      55,
      3
    )
    .fill("#2563eb");

  // Header
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#2563eb")
    .text(
      "RankFlow AI Recommendation",
      70,
      aiHeaderY + 12,
      {
        width: 450,
        lineBreak: false
      }
    );

  // Subtitle
  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#6b7280")
    .text(
      "AI-generated SEO insights based on your website audit",
      70,
      aiHeaderY + 31,
      {
        width: 450,
        lineBreak: false
      }
    );
    
  // ===========================
  // AI Content
  // ===========================

  doc.x = 70;
  doc.y = aiHeaderY + 75;

  renderAIAdvice(
    doc,
    adviceText
  );

  // Reset position
  doc.x = 50;
  doc.moveDown(1);
}


    // ===========================
// Priority Action Plan
// ===========================

if (data.issues && data.issues.length > 0) {

  // Start on new page if needed
  if (doc.y > 500) {
    doc.addPage();
    doc.x = 50;
    doc.y = 50;
  }

  sectionTitle(doc, "Priority Action Plan");

  doc.x = 50;
  doc.moveDown(0.5);

  // Sort issues by priority
  const priorityOrder = {
    critical: 1,
    warning: 2,
    info: 3
  };

  

  const sortedIssues = [...data.issues].sort((a, b) => {
    const aLevel =
      String(a.severity || "").toLowerCase();

    const bLevel =
      String(b.severity || "").toLowerCase();

    return (
      (priorityOrder[aLevel] || 4) -
      (priorityOrder[bLevel] || 4)
    );
  });

  sortedIssues.forEach((issue, index) => {

    checkPage(doc);

    const priority =
      getPriorityFromSeverity(issue.severity);

    const actionY = doc.y;

    // Priority label
    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor(priority.color)
      .text(
        priority.label,
        50,
        actionY,
        {
          width: 110,
          lineBreak: false
        }
      );

    // Action number
    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor("#111827")
      .text(
        `${index + 1}.`,
        165,
        actionY,
        {
          width: 20,
          lineBreak: false
        }
      );

    // Recommendation
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#374151")
      .text(
        issue.recommendation ||
          issue.message ||
          "Review this SEO issue.",
        190,
        actionY,
        {
          width: 355,
          lineGap: 2
        }
      );

    doc.moveDown(0.8);

    // Divider
    doc
      .strokeColor("#e5e7eb")
      .lineWidth(0.5)
      .moveTo(50, doc.y)
      .lineTo(545, doc.y)
      .stroke();

    doc.moveDown(0.8);
    doc.x = 50;
  });
}

function checklistStatus(status) {
  const value = String(status || "").toLowerCase();

  if (value === "pass") {
    return {
      label: "PASS",
      color: "#16a34a",
      symbol: "OK"
    };
  }

  if (value === "warning") {
    return {
      label: "WARNING",
      color: "#f59e0b",
      symbol: "!"
    };
  }

  return {
    label: "FAIL",
    color: "#dc2626",
    symbol: "X"
  };
}

// ===========================
// SEO Recommendations Checklist
// ===========================

const seoChecklist = [
  {
    title: "HTTPS Enabled",
    status: String(data.url || "").startsWith("https")
      ? "pass"
      : "fail",
    description: "Website is served over a secure HTTPS connection."
  },

  {
    title: "Meta Title",
    status: data.metaData?.title
      ? "pass"
      : "fail",
    description: data.metaData?.title
      ? "Meta title is present."
      : "Meta title is missing."
  },

  {
    title: "Meta Description",
    status: data.metaData?.description
      ? "pass"
      : "fail",
    description: data.metaData?.description
      ? "Meta description is present."
      : "Meta description is missing."
  },

  {
    title: "Canonical URL",
    status: data.metaData?.canonical
      ? "pass"
      : "warning",
    description: data.metaData?.canonical
      ? "Canonical URL is configured."
      : "Canonical URL is missing."
  },

  {
    title: "Image ALT Attributes",
    status:
      (data.images?.missingAlt ?? 0) === 0
        ? "pass"
        : "warning",
    description:
      (data.images?.missingAlt ?? 0) === 0
        ? "All analyzed images contain ALT text."
        : `${data.images?.missingAlt ?? 0} image(s) are missing ALT text.`
  },

  {
    title: "H1 Heading",
    status:
      data.headings?.h1 === 1
        ? "pass"
        : "warning",
    description:
      data.headings?.h1 === 1
        ? "The page contains exactly one H1 heading."
        : `${data.headings?.h1 ?? 0} H1 headings detected.`
  },

  {
    title: "Internal Links",
    status:
      (data.links?.internal ?? 0) > 0
        ? "pass"
        : "warning",
    description:
      `${data.links?.internal ?? 0} internal links detected.`
  }
];


// Start new page if needed
if (doc.y > 450) {
  doc.addPage();
  doc.x = 50;
  doc.y = 50;
}

sectionTitle(
  doc,
  "SEO Recommendations Checklist"
);

doc.x = 50;
doc.moveDown(0.5);

seoChecklist.forEach((item) => {

  // Ensure each checklist row fits
  if (doc.y > 730) {
    doc.addPage();
    doc.x = 50;
    doc.y = 50;
  }

  const status =
    checklistStatus(item.status);

  const rowY = doc.y;

  // Row background
  doc
    .roundedRect(
      50,
      rowY,
      495,
      55,
      8
    )
    .fillAndStroke(
      "#f8fafc",
      "#e5e7eb"
    );

  // Status indicator
  doc
    .roundedRect(
      65,
      rowY + 15,
      25,
      25,
      5
    )
    .fill(status.color);

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#ffffff")
    .text(
      status.symbol,
      65,
      rowY + 22,
      {
        width: 25,
        align: "center",
        lineBreak: false
      }
    );

  // Checklist title
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#111827")
    .text(
      item.title,
      105,
      rowY + 10,
      {
        width: 250,
        lineBreak: false
      }
    );

  // Description
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#6b7280")
    .text(
      item.description,
      105,
      rowY + 29,
      {
        width: 300,
        lineBreak: false
      }
    );

  // PASS / WARNING / FAIL
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .fillColor(status.color)
    .text(
      status.label,
      430,
      rowY + 22,
      {
        width: 90,
        align: "right",
        lineBreak: false
      }
    );

  // Move below row
  doc.y = rowY + 65;
  doc.x = 50;
});
// ===========================
// Overall Assessment
// ===========================

if (doc.y > 520) {
  doc.addPage();
  doc.x = 50;
  doc.y = 50;
}

sectionTitle(doc, "Overall Assessment");

doc.x = 50;
doc.moveDown(0.5);

// Determine website health
let websiteHealth = "Poor";
let healthColor = "#ef4444";

if (overallScore >= 90) {
  websiteHealth = "Excellent";
  healthColor = "#22c55e";
} else if (overallScore >= 70) {
  websiteHealth = "Good";
  healthColor = "#f59e0b";
} else if (overallScore >= 50) {
  websiteHealth = "Needs Improvement";
  healthColor = "#f97316";
}

// Determine priority
let priorityLevel = "Low";

if (criticalIssues > 0) {
  priorityLevel = "High";
} else if (warningIssues > 0) {
  priorityLevel = "Medium";
}

const assessmentY = doc.y;

// Main assessment card
doc
  .roundedRect(
    50,
    assessmentY,
    495,
    160,
    10
  )
  .fillAndStroke(
    "#f8fafc",
    "#e5e7eb"
  );

// Website Health
doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor("#6b7280")
  .text(
    "WEBSITE HEALTH",
    70,
    assessmentY + 20
  );

doc
  .font("Helvetica-Bold")
  .fontSize(18)
  .fillColor(healthColor)
  .text(
    websiteHealth,
    70,
    assessmentY + 38
  );

// Overall Score
doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor("#6b7280")
  .text(
    "OVERALL SCORE",
    300,
    assessmentY + 20
  );

doc
  .font("Helvetica-Bold")
  .fontSize(18)
  .fillColor(overallColor)
  .text(
    `${overallScore}/100`,
    300,
    assessmentY + 38
  );

// Priority
doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor("#6b7280")
  .text(
    "ACTION PRIORITY",
    70,
    assessmentY + 80
  );

doc
  .font("Helvetica-Bold")
  .fontSize(14)
  .fillColor(
    priorityLevel === "High"
      ? "#ef4444"
      : priorityLevel === "Medium"
      ? "#f59e0b"
      : "#22c55e"
  )
  .text(
    priorityLevel,
    70,
    assessmentY + 98
  );

// SEO Grade
doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor("#6b7280")
  .text(
    "SEO GRADE",
    300,
    assessmentY + 80
  );

doc
  .font("Helvetica-Bold")
  .fontSize(18)
  .fillColor(overallColor)
  .text(
    seoGrade,
    300,
    assessmentY + 98
  );

// Final message
doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor("#4b5563")
  .text(
    criticalIssues > 0
      ? `This website requires immediate attention. Resolve the ${criticalIssues} critical SEO issue${criticalIssues === 1 ? "" : "s"} before addressing lower-priority recommendations.`
      : warningIssues > 0
      ? `The website has a solid SEO foundation, but ${warningIssues} warning${warningIssues === 1 ? "" : "s"} should be addressed to improve search visibility and user experience.`
      : "The website demonstrates strong SEO health with no significant issues detected. Continue monitoring performance and maintaining SEO best practices.",
    70,
    assessmentY + 130,
    {
      width: 450,
      lineGap: 2
    }
  );

// Move below assessment
doc.y = assessmentY + 185;
doc.x = 50;

// ===========================
// RankFlow Closing Section
// ===========================

// Always start closing section on a fresh page
doc.addPage();

doc.x = 50;
doc.y = 180;

// Brand
doc
  .font("Helvetica-Bold")
  .fontSize(32)
  .fillColor("#2563eb")
  .text(
    "RankFlow",
    50,
    doc.y,
    {
      width: 495,
      align: "center"
    }
  );

doc.moveDown(0.5);

// Tagline
doc
  .font("Helvetica")
  .fontSize(12)
  .fillColor("#6b7280")
  .text(
    "AI Powered SEO Intelligence",
    {
      width: 495,
      align: "center"
    }
  );

doc.moveDown(3);

// Thank You
doc
  .font("Helvetica-Bold")
  .fontSize(22)
  .fillColor("#111827")
  .text(
    "Thank You for Using RankFlow",
    {
      width: 495,
      align: "center"
    }
  );

doc.moveDown(1);

doc
  .font("Helvetica")
  .fontSize(11)
  .fillColor("#6b7280")
  .text(
    "Your website audit has been successfully completed.",
    {
      width: 495,
      align: "center"
    }
  );

doc.moveDown(3);

// Divider
doc
  .strokeColor("#e5e7eb")
  .lineWidth(1)
  .moveTo(120, doc.y)
  .lineTo(475, doc.y)
  .stroke();

doc.moveDown(2);

// Website
doc
  .font("Helvetica-Bold")
  .fontSize(9)
  .fillColor("#6b7280")
  .text(
    "ANALYZED WEBSITE",
    {
      width: 495,
      align: "center"
    }
  );

doc.moveDown(0.5);

doc
  .font("Helvetica")
  .fontSize(11)
  .fillColor("#2563eb")
  .text(
    data.url || "Unknown",
    {
      width: 495,
      align: "center"
    }
  );

doc.moveDown(2);

// Generated date
doc
  .font("Helvetica-Bold")
  .fontSize(9)
  .fillColor("#6b7280")
  .text(
    "REPORT GENERATED",
    {
      width: 495,
      align: "center"
    }
  );

doc.moveDown(0.5);

doc
  .font("Helvetica")
  .fontSize(10)
  .fillColor("#374151")
  .text(
    new Date().toLocaleString(),
    {
      width: 495,
      align: "center"
    }
  );

doc.moveDown(3);

// Final message
doc
  .font("Helvetica")
  .fontSize(9)
  .fillColor("#9ca3af")
  .text(
    "Use the recommendations in this report to improve your website's search visibility, performance, accessibility, and overall SEO health.",
    {
      width: 495,
      align: "center",
      lineGap: 3
    }
  );

doc.moveDown(3);

// ===========================
// QR Code
// ===========================

doc.moveDown(2);

const qrY = doc.y;

doc.image(
  qrBuffer,
  247,
  qrY,
  {
    width: 100,
    height: 100
  }
);

doc.y = qrY + 115;

doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor("#111827")
  .text(
    "Scan to Visit Website",
    50,
    doc.y,
    {
      width: 495,
      align: "center"
    }
  );

doc.moveDown(0.5);

doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor("#6b7280")
  .text(
    "Scan this QR code to open the analyzed website.",
    50,
    doc.y,
    {
      width: 495,
      align: "center"
    }
  );

doc.moveDown(2);

doc
  .font("Helvetica-Bold")
  .fontSize(10)
  .fillColor("#2563eb")
  .text(
    "RankFlow v1.0",
    {
      width: 495,
      align: "center"
    }
  );
 // ===========================
// Footer
// ===========================

// Keep only one doc.end()
doc.end();

} // End of generateReport()


// ===========================
// Page Break Helper
// ===========================

function checkPage(doc) {
  if (doc.y > 700) {
    doc.addPage();
    doc.x = 50;
    doc.y = 50;
  }
}


// ===========================
// Export
// ===========================

module.exports = generateReport;