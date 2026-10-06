declare module "recharts";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
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
    { subject: "SEO", value: seo },
    { subject: "Performance", value: performance },
    { subject: "Accessibility", value: accessibility },
    { subject: "Best", value: bestPractices },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
      </RadarChart>
    </ResponsiveContainer>
  );
}