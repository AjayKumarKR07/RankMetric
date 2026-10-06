import { AlertTriangle, AlertCircle, Info } from "lucide-react";

interface IssueSummaryProps {
    critical: number;
    warnings: number;
    info: number;
}

export default function IssueSummary({
    critical,
    warnings,
    info,
}: IssueSummaryProps) {

    const items = [
        {
            title: "Critical",
            value: critical,
            color: "text-red-500",
            bg: "bg-red-500/10",
            icon: AlertTriangle,
        },
        {
            title: "Warnings",
            value: warnings,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            icon: AlertCircle,
        },
        {
            title: "Info",
            value: info,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            icon: Info,
        },
    ];

    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">

            <h2 className="text-xl font-semibold mb-5">
                Issue Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {items.map((item) => {

                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className={`rounded-xl p-5 border border-border ${item.bg}`}
                        >
                            <div className="flex items-center justify-between">

                                <Icon
                                    className={item.color}
                                    size={22}
                                />

                                <span className={`text-3xl font-bold ${item.color}`}>
                                    {item.value}
                                </span>

                            </div>

                            <p className="mt-4 text-sm font-medium">
                                {item.title}
                            </p>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}