import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon, ArrowRightIcon, BarChart3Icon, GlobeIcon, TrendingUpIcon } from "lucide-react";
import AnalysesCard from "../components/AnalysesCard";
import ScoreTrendChart from "../components/charts/ScoreTrendChart";
import LighthouseChart from "../components/charts/LighthouseChart";
import IssuesPieChart from "../components/charts/IssuesPieChart";
import CoreVitalsChart from "../components/charts/CoreVitalsChart";


interface AnalysisSummary {
    _id: string;
    url: string;
    overallScore: number;
    status: string;
    createdAt: string;
    categories: {
        seo: number;
        performance: number;
        accessibility: number;
        bestPractices: number;
    };
}

export default function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();
    const [url, setUrl] = useState("");
    // use a loose type here because some child components expect the full Analysis shape
    // while the API returns a lighter AnalysisSummary. Keep as any[] to avoid type conflicts.
    const [analyses, setAnalyses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeFilter, setTimeFilter] = useState("all");

   const fetchRecent = async () => {
  try {
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/history");

    console.log("Status:", res.status);

    const data = await res.json();

    console.log("API Response:", data);

    if (data.success) {
      console.log("History Length:", data.history.length);
      setAnalyses(data.history);
    }

  } catch (err) {
    console.error("Fetch Error:", err);
  } finally {
    setLoading(false);
  }
};

    const handleAnalyze = (e: React.SubmitEvent) => {
        e.preventDefault();
        if (url.trim()) {
            navigate(`/analyze?url=${encodeURIComponent(url)}`);
        }
    };

    const filteredAnalyses = analyses.filter((analysis) => {

    const analysisDate = new Date(analysis.createdAt);
    const now = new Date();

    switch (timeFilter) {

        case "today":
            return (
                analysisDate.toDateString() ===
                now.toDateString()
            );

        case "7days":
            return (
                now.getTime() - analysisDate.getTime()
            ) <= 7 * 24 * 60 * 60 * 1000;

        case "30days":
            return (
                now.getTime() - analysisDate.getTime()
            ) <= 30 * 24 * 60 * 60 * 1000;

        default:
            return true;
    }

});

    const completedAnalyses = filteredAnalyses.filter(
      (a) => a.status === "completed"
    );

const avgScore = completedAnalyses.length
  ? Math.round(
      completedAnalyses.reduce(
        (sum, a) => sum + a.overallScore,
        0
      ) / completedAnalyses.length
    )
  : 0;
    // const totalIssues = completedAnalyses.length;

    const getScoreClass = (s: number) => {
        if (s >= 80) return "score-good";
        if (s >= 50) return "score-medium";
        return "score-poor";
    };

    // compute average category scores for charts
    const avgCategories = completedAnalyses.reduce(
    (acc, analysis) => {
        acc.seo += analysis.categories?.seo || 0;
        acc.performance += analysis.categories?.performance || 0;
        acc.accessibility += analysis.categories?.accessibility || 0;
        acc.bestPractices += analysis.categories?.bestPractices || 0;

        return acc;
    },
    {
        seo: 0,
        performance: 0,
        accessibility: 0,
        bestPractices: 0,
    }
);

if (completedAnalyses.length > 0) {
    avgCategories.seo = Math.round(avgCategories.seo / completedAnalyses.length);
    avgCategories.performance = Math.round(avgCategories.performance / completedAnalyses.length);
    avgCategories.accessibility = Math.round(avgCategories.accessibility / completedAnalyses.length);
    avgCategories.bestPractices = Math.round(avgCategories.bestPractices / completedAnalyses.length);
}

   useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }

    fetchRecent();
  }, []);

    return (
        <div className="min-h-screen pt-16 md:pt-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-medium text-foreground mb-1">
                        Welcome back, <span className="gradient-text">
    {user?.name || "User"}
</span>
                    </h1>
                    <p className="text-muted-foreground text-sm">Analyze websites and boost your SEO performance.</p>
                </div>
                <div className="mt-4">
    <button
        onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
        }}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
    >
        Logout
    </button>
</div>

                {/* Quick Analyze */}
                <form onSubmit={handleAnalyze} className="mb-10" style={{ animationDelay: "100ms" }}>
                    <div className="border border-primary/20 rounded-full p-2 flex items-center gap-2 max-w-2xl">
                        <div className="flex items-center gap-3 flex-1 px-3">
                            <SearchIcon size={20} className="text-muted-foreground shrink-0" />
                            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter a URL to analyze..." className="w-full bg-transparent text-foreground placeholder-muted-foreground outline-none text-sm py-3" id="dashboard-url-input" />
                        </div>
                        <button type="submit" className="bg-primary px-5 py-3 rounded-full text-primary-foreground text-sm hover:opacity-90 transition-opacity shrink-0 flex items-center gap-2" style={{ color: "var(--background)" }} id="dashboard-analyze-btn">
                            Analyze
                            <ArrowRightIcon size={16} />
                        </button>
                    </div>
                </form>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    <div className="glass rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <GlobeIcon size={22} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">{filteredAnalyses.length}</p>
                            <p className="text-xs text-muted-foreground">Total Scans</p>
                        </div>
                    </div>
                    <div className="glass rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <TrendingUpIcon size={22} />
                        </div>
                        <div>
                            <p className={`text-2xl font-bold ${getScoreClass(avgScore)}`}>{avgScore}</p>
                            <p className="text-xs text-muted-foreground">Avg Score</p>
                        </div>
                    </div>
                    <div className="glass rounded-2xl p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                            <BarChart3Icon size={22} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-foreground">{user?.plan === "free" ? `${5 - (user?.analysisCount || 0)}` : "∞"}</p>
                            <p className="text-xs text-muted-foreground">Scans Left Today</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">

    <button
        onClick={() => setTimeFilter("today")}
        className={`px-4 py-2 rounded-lg ${
            timeFilter === "today"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
        }`}
    >
        📅 Today
    </button>

    <button
        onClick={() => setTimeFilter("7days")}
        className={`px-4 py-2 rounded-lg ${
            timeFilter === "7days"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
        }`}
    >
        Last 7 Days
    </button>

    <button
        onClick={() => setTimeFilter("30days")}
        className={`px-4 py-2 rounded-lg ${
            timeFilter === "30days"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
        }`}
    >
        Last 30 Days
    </button>

    <button
        onClick={() => setTimeFilter("all")}
        className={`px-4 py-2 rounded-lg ${
            timeFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700"
        }`}
    >
        All Time
    </button>

</div>
                {/* Dashboard Analytics */}
<div className="mb-10">
    <h2 className="text-xl font-semibold text-foreground mb-6">
        Dashboard Analytics
    </h2>

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-medium mb-4">
                📈 SEO Score Trend
            </h3>
            <ScoreTrendChart analyses={filteredAnalyses} />
        </div>

        <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-medium mb-4">
                🥧 Lighthouse Scores
            </h3>
            <LighthouseChart
                seo={avgCategories.seo}
                performance={avgCategories.performance}
                accessibility={avgCategories.accessibility}
                bestPractices={avgCategories.bestPractices}
            />
        </div>

        <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-medium mb-4">
                ⚠ SEO Issues Breakdown
            </h3>
            <IssuesPieChart analyses={filteredAnalyses} />
        </div>

        <div className="glass rounded-2xl p-6">
            <h3 className="text-lg font-medium mb-4">
                ⚡ Core Web Vitals
            </h3>
            <CoreVitalsChart analyses={filteredAnalyses} />
        </div>

    </div>
</div>

                {/* Recent Analyses */}
                <div style={{ animationDelay: "300ms" }}>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-semibold text-foreground">Recent Analyses</h2>
                    {filteredAnalyses.length > 0 && (
                            <Link to="/history" className="text-sm text-primary hover:underline flex items-center gap-1">
                                View All <ArrowRightIcon size={14} />
                            </Link>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-30">
                            <div className="size-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : filteredAnalyses.length === 0 ? (
                        <div className="glass rounded-2xl p-12 text-center">
                            <SearchIcon size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">No analyses yet</h3>
                            <p className="text-sm text-muted-foreground mb-6">Enter a URL above to run your first SEO analysis.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredAnalyses.map((a) => (
                                <AnalysesCard key={a._id} analysis={a} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
