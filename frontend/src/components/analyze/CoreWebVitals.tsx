import {
    Zap,
    Gauge,
    Timer,
    Activity,
    BarChart3,
} from "lucide-react";

interface CoreWebVitalsProps {
    fcp: string;
    lcp: string;
    cls: string;
    tbt: string;
    speedIndex: string;
}

export default function CoreWebVitals({
    fcp,
    lcp,
    cls,
    tbt,
    speedIndex,
}: CoreWebVitalsProps) {

    const vitals = [
        {
            title: "First Contentful Paint",
            short: "FCP",
            value: fcp,
            icon: Zap,
        },
        {
            title: "Largest Contentful Paint",
            short: "LCP",
            value: lcp,
            icon: Gauge,
        },
        {
            title: "Cumulative Layout Shift",
            short: "CLS",
            value: cls,
            icon: Activity,
        },
        {
            title: "Total Blocking Time",
            short: "TBT",
            value: tbt,
            icon: Timer,
        },
        {
            title: "Speed Index",
            short: "SI",
            value: speedIndex,
            icon: BarChart3,
        },
    ];

    return (
        <div className="mt-6">

            <h2 className="text-xl font-semibold mb-4">
                Core Web Vitals
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

                {vitals.map((item) => {

                    const Icon = item.icon;

                    return (
                        <div
                            key={item.short}
                            className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-lg transition"
                        >

                            <div className="flex items-center justify-between">

                                <Icon
                                    className="text-primary"
                                    size={22}
                                />

                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                    {item.short}
                                </span>

                            </div>

                            <h3 className="mt-4 text-sm font-medium">
                                {item.title}
                            </h3>

                            <p className="mt-3 text-3xl font-bold">
                                {item.value || "-"}
                            </p>

                        </div>
                    );
                })}

            </div>

        </div>
    );
}