import { useEffect, useState } from "react";
import { exportComparisonPDF } from "../utils/comparisonPdfExport";
interface Analysis {
  _id: string;
  url: string;
  overallScore: number;
  createdAt: string;
  categories: {
    seo: number;
    performance: number;
    accessibility: number;
    bestPractices: number;
  };
  metrics: {
    fcp: string;
    lcp: string;
    cls: string;
    tbt: string;
  };
}

interface CompareRowProps {
  title: string;
  a: number;
  b: number;
}

function CompareRow({ title, a, b }: CompareRowProps) {
  const diff = b - a;

  return (
    <tr className="border-b">
      <td className="p-4 font-medium">{title}</td>
      <td className="text-center">{a}</td>
      <td className="text-center">{b}</td>
      <td
        className={`text-center font-bold ${
          diff > 0 ? "text-green-600" : diff < 0 ? "text-red-600" : "text-gray-500"
        }`}
      >
        {diff > 0 ? "+" : ""}
        {diff}
      </td>
    </tr>
  );
}

interface CompareMetricProps {
  title: string;
  a: string;
  b: string;
}

function CompareMetric({
  title,
  a,
  b,
}: CompareMetricProps) {
  return (
    <tr className="border-b">
      <td className="p-4 font-medium">
        {title}
      </td>

      <td className="text-center">
        {a}
      </td>

      <td className="text-center">
        {b}
      </td>

      <td className="text-center text-blue-600">
        Compare
      </td>
    </tr>
  );
}

export default function Compare() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [firstId, setFirstId] = useState("");
  const [secondId, setSecondId] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/history")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAnalyses(data.history);
        }
      });
  }, []);

  const first = analyses.find((a) => a._id === firstId);
  const second = analyses.find((a) => a._id === secondId);

  const generateSummary = () => {
  if (!first || !second) return [] as string[];

  const messages: string[] = [];

  const scoreDiff = second.overallScore - first.overallScore;

  if (scoreDiff > 0) {
    messages.push(`Overall SEO Score improved by ${scoreDiff} points.`);
  } else if (scoreDiff < 0) {
    messages.push(`Overall SEO Score decreased by ${Math.abs(scoreDiff)} points.`);
  } else {
    messages.push("Overall SEO Score remained unchanged.");
  }

  if (second.categories.performance > first.categories.performance) {
    messages.push("Performance has improved.");
  }

  if (second.categories.accessibility > first.categories.accessibility) {
    messages.push("Accessibility has improved.");
  }

  if (second.categories.bestPractices > first.categories.bestPractices) {
    messages.push("Best Practices score has improved.");
  }

  if (second.categories.seo > first.categories.seo) {
    messages.push("SEO score has improved.");
  }

  messages.push("Recommendation: Continue optimizing Core Web Vitals and fix remaining SEO issues.");

  return messages;
};
  return (
    <div className="min-h-screen pt-24 max-w-7xl mx-auto px-6">
      <h1 className="text-3xl font-bold mb-8">Website Comparison</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <select
          value={firstId}
          onChange={(e) => setFirstId(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">Select First Analysis</option>
          {analyses.map((a) => (
            <option key={a._id} value={a._id}>
              {a.url} ({new Date(a.createdAt).toLocaleDateString()})
            </option>
          ))}
        </select>

        <select
          value={secondId}
          onChange={(e) => setSecondId(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">Select Second Analysis</option>
          {analyses.map((a) => (
            <option key={a._id} value={a._id}>
              {a.url} ({new Date(a.createdAt).toLocaleDateString()})
            </option>
          ))}
        </select>
      </div>

{first && second && (
  <>

    <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800 p-6">

      <h2 className="text-xl font-bold mb-4">
        🤖 AI Comparison Summary
      </h2>

      <ul className="space-y-2">
        {generateSummary().map((item, index) => (
          <li key={index}>
            • {item}
          </li>
        ))}
      </ul>

    </div>

    <button
      onClick={() =>
        exportComparisonPDF({
          first,
          second,
          summary: generateSummary(),
        })
      }
      className="mb-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 font-semibold transition"
    >
      ⬇ Download Comparison Report
    </button>
        <div className="overflow-x-auto">
            <table className="w-full border rounded-xl overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4 text-left">Metric</th>
                <th className="p-4 text-center">Analysis 1</th>
                <th className="p-4 text-center">Analysis 2</th>
                <th className="p-4 text-center">Difference</th>
              </tr>
            </thead>

            <tbody>

  <CompareRow
    title="Overall SEO Score"
    a={first.overallScore}
    b={second.overallScore}
  />

  <CompareRow
    title="SEO"
    a={first.categories.seo}
    b={second.categories.seo}
  />

  <CompareRow
    title="Performance"
    a={first.categories.performance}
    b={second.categories.performance}
  />

  <CompareRow
    title="Accessibility"
    a={first.categories.accessibility}
    b={second.categories.accessibility}
  />

  <CompareRow
    title="Best Practices"
    a={first.categories.bestPractices}
    b={second.categories.bestPractices}
  />

  <CompareMetric
    title="FCP"
    a={first.metrics.fcp}
    b={second.metrics.fcp}
  />

  <CompareMetric
    title="LCP"
    a={first.metrics.lcp}
    b={second.metrics.lcp}
  />

  <CompareMetric
    title="CLS"
    a={first.metrics.cls}
    b={second.metrics.cls}
  />

  <CompareMetric
    title="TBT"
    a={first.metrics.tbt}
    b={second.metrics.tbt}
  />

</tbody>
          </table>
        </div>
      </>
      )}
    </div>
  );
}
