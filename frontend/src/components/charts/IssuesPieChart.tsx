import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Issue {
  severity: string;
}

interface Analysis {
  issues: Issue[];
}

interface Props {
  analyses: Analysis[];
}

const COLORS = [
  "#ef4444",
  "#f59e0b",
  "#22c55e",
];

export default function IssuesPieChart({ analyses }: Props) {

  let critical = 0;
  let warning = 0;
  let passed = 0;

  analyses.forEach((analysis) => {

    if (!analysis.issues || analysis.issues.length === 0) {
      passed++;
      return;
    }

    analysis.issues.forEach((issue) => {

      if (issue.severity?.toLowerCase() === "critical") {
        critical++;
      } else if (issue.severity?.toLowerCase() === "warning") {
        warning++;
      } else {
        passed++;
      }

    });

  });

  const data = [
    { name: "Critical", value: critical },
    { name: "Warning", value: warning },
    { name: "Passed", value: passed },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          label
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>
    </ResponsiveContainer>
  );
}