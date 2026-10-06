import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Metrics {
  fcp: string;
  lcp: string;
  cls: string;
  tbt: string;
}

interface Analysis {
  metrics: Metrics;
}

interface Props {
  analyses: Analysis[];
}

export default function CoreVitalsChart({ analyses }: Props) {

  // Use the latest analysis
  const latest = analyses.length > 0 ? analyses[0] : null;

  const toNumber = (value?: string) => {
    if (!value) return 0;

    return Number(
      value.replace(/[^\d.]/g, "")
    );
  };

  const data = [
    {
      name: "FCP",
      value: latest ? toNumber(latest.metrics?.fcp) : 0,
    },
    {
      name: "LCP",
      value: latest ? toNumber(latest.metrics?.lcp) : 0,
    },
    {
      name: "CLS",
      value: latest ? toNumber(latest.metrics?.cls) : 0,
    },
    {
      name: "TBT",
      value: latest ? toNumber(latest.metrics?.tbt) : 0,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#3b82f6"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}