import { SearchIcon, ArrowRightIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeWave } from "../../assets/assets";
import Globe from "./Globe";
import * as React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    Tooltip,
} from "recharts";
export default function Hero() {
    const [url, setUrl] = useState("");
    const [score, setScore] = useState(0);
    const [performance, setPerformance] = useState(0);
const [accessibility, setAccessibility] = useState(0);
const [seo, setSeo] = useState(0);
const chartData = [
    { month: "Jan", score: 72 },
    { month: "Feb", score: 78 },
    { month: "Mar", score: 82 },
    { month: "Apr", score: 88 },
    { month: "May", score: 94 },
];
const activities = [
    {
        icon: "✅",
        title: "google.com analyzed",
        time: "2 min ago",
    },
    {
        icon: "📈",
        title: "SEO Score improved",
        time: "8 min ago",
    },
    {
        icon: "⚡",
        title: "Report generated",
        time: "15 min ago",
    },
];

    const navigate = useNavigate();

    useEffect(() => {
    let currentScore = 0;
    let currentPerformance = 0;
    let currentAccessibility = 0;
    let currentSeo = 0;

    const interval = setInterval(() => {

        if (currentScore < 94) {
            currentScore++;
            setScore(currentScore);
        }

        if (currentPerformance < 90) {
            currentPerformance += 2;
            if (currentPerformance > 90) currentPerformance = 90;
            setPerformance(currentPerformance);
        }

        if (currentAccessibility < 100) {
            currentAccessibility += 2;
            if (currentAccessibility > 100) currentAccessibility = 100;
            setAccessibility(currentAccessibility);
        }

        if (currentSeo < 96) {
            currentSeo += 2;
            if (currentSeo > 96) currentSeo = 96;
            setSeo(currentSeo);
        }

        if (
            currentScore >= 94 &&
            currentPerformance >= 90 &&
            currentAccessibility >= 100 &&
            currentSeo >= 96
        ) {
            clearInterval(interval);
        }

    }, 20);

    return () => clearInterval(interval);
}, []);

const handleQuickAnalyze = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
    navigate("/login");
    return;
}

    navigate(`/analyze?url=${encodeURIComponent(url)}`);
};
    return (
       <section className="relative overflow-hidden max-w-7xl mx-auto px-6 py-32 min-h-screen flex items-center">
          <div className="hero-grid"></div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="particle"></div>
    <div className="particle"></div>
    <div className="particle"></div>
    <div className="particle"></div>
</div>
            {/* Background Glow */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>

                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px] animate-pulse"></div>

                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-400/20 rounded-full blur-[140px] animate-pulse"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center w-full">

                {/* LEFT SIDE */}
                <div>

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full text-xs text-primary mb-6 border border-primary/10">

                        <div className="relative flex items-center justify-center">
                            <div className="absolute bg-blue-600 size-2 rounded-full animate-ping"></div>
                            <div className="bg-blue-600 size-1.5 rounded-full"></div>
                        </div>

                        Powered by OpenAI

                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-tight mb-6 text-foreground">
                        AI-Powered SEO Analyzer{" "}
                        <span className="gradient-text dm-serif">
                            Analyze, Monitor & Improve Your Search Rankings
                        </span>
                    </h1>

                    <p className="text-muted-foreground max-w-xl mb-10 leading-relaxed">
                        Get instant AI-powered SEO audits for any website.
                        Uncover hidden issues, optimize performance,
                        and outrank your competition.
                    </p>

                    <form onSubmit={handleQuickAnalyze} className="max-w-xl">

                        <div
  className="bg-card border border-border rounded-full px-2 py-1.5 flex items-center gap-2"
  style={{
    position: "relative",
    zIndex: 9999,
  }}
>

                            <div className="flex items-center gap-2 flex-1 px-3">

                                <SearchIcon
                                    size={16}
                                    className="text-muted-foreground"
                                />

                                <input
                                    type="text"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="Enter website URL"
                                    className="flex-1 bg-transparent outline-none"
                                />

                            </div>
<button
    type="submit"
    className="bg-primary px-5 py-2.5 rounded-full flex items-center gap-2"
    style={{ color: "var(--background)" }}
>
    Analyze
    <ArrowRightIcon size={14} />
</button>

</div>

                    </form>

                    <p className="text-muted-foreground text-sm mt-6">
                        Free • No credit card required • 3 website scans per account
                    </p>

                </div>

               {/* RIGHT SIDE */}

<div className="hidden lg:flex justify-center items-start relative">
     {/* 3D Globe */}
    <div className="absolute -top-24 right-24 opacity-70 -z-10 pointer-events-none">
        <Globe />
    </div>

   {/* Main Card */}
<div className="relative w-[460px] min-h-[760px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-2xl animate-float">

    {/* Header */}
    <div className="flex justify-between items-center mb-8">

        <div>
            <p className="text-sm text-gray-400">
                SEO Score
            </p>

            <h2 className="text-5xl font-bold text-green-400">
                {score}
            </h2>
        </div>

        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-2xl">
            🚀
        </div>

    </div>

    {/* Performance */}

    <div className="space-y-6">

        <div>

            <div className="flex justify-between mb-2">
                <span>Performance</span>
                <span>{performance}%</span>
            </div>

            <div className="h-2 rounded-full bg-gray-700">

                <div
                    className="h-2 rounded-full bg-green-400 transition-all duration-700"
                    style={{ width: `${performance}%` }}
                />

            </div>

        </div>

        {/* Accessibility */}

        <div>

            <div className="flex justify-between mb-2">
                <span>Accessibility</span>
                <span>{accessibility}%</span>
            </div>

            <div className="h-2 rounded-full bg-gray-700">

                <div
                    className="h-2 rounded-full bg-blue-500 transition-all duration-700"
                    style={{ width: `${accessibility}%` }}
                />

            </div>

        </div>

        {/* SEO */}

        <div>

            <div className="flex justify-between mb-2">
                <span>SEO</span>
                <span>{seo}%</span>
            </div>

            <div className="h-2 rounded-full bg-gray-700">

                <div
                    className="h-2 rounded-full bg-purple-500 transition-all duration-700"
                    style={{ width: `${seo}%` }}
                />

            </div>

        </div>

    </div>

    {/* Chart */}

    <div className="mt-10">

        <div className="flex justify-between mb-4">

            <h3 className="font-semibold">
                SEO Trend
            </h3>

            <span className="text-green-400">
                +22%
            </span>

        </div>

        <div className="h-56">

            <ResponsiveContainer width="100%" height="100%">

                <LineChart data={chartData}>

                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#3b82f6"
                        strokeWidth={3}
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    </div>

</div>
<div className="absolute -right-20 bottom-10 w-64 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 shadow-xl animate-float">

    <h3 className="font-semibold mb-4">
        🔴 Live Activity
    </h3>

    <div className="space-y-4">

        {activities.map((activity, index) => (

            <div
                key={index}
                className="flex items-start gap-3"
            >
                <span className="text-xl">
                    {activity.icon}
                </span>

                <div>
                    <p className="text-sm font-medium">
                        {activity.title}
                    </p>

                    <p className="text-xs text-gray-400">
                        {activity.time}
                    </p>
                </div>

            </div>

        ))}

    </div>

</div>

    {/* Floating Card 1 */}

    <div className="absolute -top-8 -left-8 rounded-2xl bg-blue-600 text-white px-5 py-4 shadow-xl animate-bounce">

        📈 +18%

        <p className="text-xs opacity-80">
            SEO Growth
        </p>

    </div>

    {/* Floating Card 2 */}

    <div className="absolute -bottom-8 -right-8 rounded-2xl bg-purple-600 text-white px-5 py-4 shadow-xl animate-pulse">

        ⚡ 0.8s

        <p className="text-xs opacity-80">
            Core Web Vitals
        </p>

    </div>

</div>
            </div>

            {/* Wave */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none -z-10">
                <HomeWave />
            </div>

        </section>
    );
}