import {
    Gauge,
    Search,
    ShieldCheck,
    Accessibility,
} from "lucide-react";

interface ScoreCardsProps {
    performance: number;
    seo: number;
    accessibility: number;
    bestPractices: number;
}

const cards = [
    {
        key: "performance",
        title: "Performance",
        icon: Gauge,
    },
    {
        key: "seo",
        title: "SEO",
        icon: Search,
    },
    {
        key: "accessibility",
        title: "Accessibility",
        icon: Accessibility,
    },
    {
        key: "bestPractices",
        title: "Best Practices",
        icon: ShieldCheck,
    },
];

export default function ScoreCards({
    performance,
    seo,
    accessibility,
    bestPractices,
}: ScoreCardsProps) {
    const values = {
        performance,
        seo,
        accessibility,
        bestPractices,
    };

    const getColor = (score: number) => {
        if (score >= 90) return "text-green-500";
        if (score >= 70) return "text-yellow-500";
        return "text-red-500";
    };

    const getRing = (score: number) => {
        if (score >= 90) return "stroke-green-500";
        if (score >= 70) return "stroke-yellow-500";
        return "stroke-red-500";
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {cards.map((card) => {

                const score =
                    values[card.key as keyof typeof values];

                const Icon = card.icon;

                const radius = 40;
                const circumference = 2 * Math.PI * radius;
                const offset =
                    circumference -
                    (score / 100) * circumference;

                return (
                    <div
                        key={card.key}
                        className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-lg transition"
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <Icon className="text-primary" size={20} />
                            <h3 className="font-semibold">
                                {card.title}
                            </h3>
                        </div>

                        <div className="flex justify-center">

                            <div className="relative w-28 h-28">

                                <svg
                                    className="w-28 h-28 rotate-[-90deg]"
                                    viewBox="0 0 100 100"
                                >
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r={radius}
                                        strokeWidth="8"
                                        className="stroke-muted"
                                        fill="none"
                                    />

                                    <circle
                                        cx="50"
                                        cy="50"
                                        r={radius}
                                        strokeWidth="8"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={offset}
                                        className={`${getRing(score)} transition-all duration-1000`}
                                    />
                                </svg>

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span
                                        className={`text-2xl font-bold ${getColor(score)}`}
                                    >
                                        {score}
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}