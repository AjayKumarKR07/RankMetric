import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Analysis {
  overallScore: number;
  createdAt: string;
}

interface Props {
  analyses: Analysis[];
}

export default function ScoreTrendChart({ analyses }: Props) {

  const chartData = analyses
    .slice()
    .reverse()
    .map((item) => ({
      date: new Date(item.createdAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      score: item.overallScore,
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />

        <YAxis domain={[0, 100]} />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="score"
          stroke="#2563eb"
          strokeWidth={3}
          dot={{ r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}