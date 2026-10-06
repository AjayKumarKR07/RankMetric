import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Critical", value: 3 },
  { name: "Warning", value: 5 },
  { name: "Passed", value: 20 },
];

const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];

export default function IssuesPieChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={data} dataKey="value" label>
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}