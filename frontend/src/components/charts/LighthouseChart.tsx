import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

interface Props {
  seo: number;
  performance: number;
  accessibility: number;
  bestPractices: number;
}

export default function LighthouseChart({
  seo,
  performance,
  accessibility,
  bestPractices,
}: Props) {

  const data = [
    { name: "SEO", score: seo },
    { name: "Performance", score: performance },
    { name: "Accessibility", score: accessibility },
    { name: "Best Practices", score: bestPractices },
  ];

  const getColor = (score: number) => {
    if (score >= 90) return "#22c55e";
    if (score >= 70) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div className="glass rounded-2xl p-6">

      <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
        Lighthouse Scores
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis domain={[0, 100]} />

          <Tooltip />

          <Bar
            dataKey="score"
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={getColor(entry.score)}
              />
            ))}
          </Bar>

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}