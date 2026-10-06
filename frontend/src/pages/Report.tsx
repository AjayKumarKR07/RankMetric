
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ScoreGauge from "../components/ScoreGauge";
import IssueCard from "../components/IssueCard";
import CoreWebVitals from "../components/analyze/CoreWebVitals";
import AIRecommendations from "../components/analyze/AIRecommendations";
import IssueSummary from "../components/analyze/IssueSummary";
import TechnicalSEO from "../components/analyze/TechnicalSEO";
import MetaAnalysis from "../components/analyze/MetaAnalysis";
import ContentAnalysis from "../components/analyze/ContentAnalysis";
import ReportActions from "../components/analyze/ReportActions";
import {
  ArrowLeft,
  Image,
  Link2,
  Heading,
  AlertCircle,
  ExternalLink,
  Type,
} from "lucide-react";
import ScoreCards from "../components/analyze/ScoreCards";
interface AnalysisData {
    status: string;
    aiAdvice: string;
    _id: string;
    url: string;
    overallScore: number;
    readingTime: number;
    createdAt: string;
    loadTime: string;
    pageSize: string;
    wordCount: number;
    categories: {
        seo: number;
        performance: number;
        accessibility: number;
        bestPractices: number;
    };
    metrics: {
    fcp: string;
    lcp: string;
    cls: string;
    tbt: string;
    speedIndex: string;
};
opportunities: {
  id: string;
  title: string;
  description: string;
  score: number;
  displayValue: string;
}[];

diagnostics: {
  id: string;
  title: string;
  description: string;
  score: number;
  displayValue: string;
}[];
    metaData: {
        title: string;
        description: string;
        canonical: string;
        robots: string;
        ogTitle: string;
        ogDescription: string;
        ogImage: string;
        twitterCard: string;
        viewport: string;
        charset: string;
    };
    headings: {
        h1: number;
        h2: number;
        h3: number;
        h4: number;
        h5: number;
        h6: number;
        h1Texts: string[];
    };
    links: {
        internal: number;
        external: number;
        total: number;
    };
    images: {
        total: number;
        missingAlt: number;
        withAlt: number;
    };
    keywords: { word: string; count: number; density: number }[];
    issues: { severity: string; category: string; message: string; recommendation: string }[];
}

export default function Report() {
    const { id } = useParams();
    const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error] = useState("");
    const [activeTab, setActiveTab] = useState("overview");

    const fetchAnalysis = async () => {
    try {
        const result = JSON.parse(
            localStorage.getItem("analysisResult") || "{}"
        );

        if (!result.success) {
            throw new Error("No analysis data found");
        }

        setAnalysis({
             _id: result._id,
            url: result.url,
            status: result.status || "completed",
            aiAdvice: result.aiAdvice || "",
            overallScore: result.overallScore || 0,
            createdAt: result.createdAt || new Date().toISOString(),
            readingTime: result.readingTime || 0,
           loadTime: result.loadTime || "",
pageSize: result.pageSize || "",
            wordCount: result.wordCount || 0,
            categories: {
                seo: result.categories?.seo || 0,
                performance: result.categories?.performance || 0,
                accessibility: result.categories?.accessibility || 0,
                bestPractices: result.categories?.bestPractices || 0,
            },
            metrics: result.metrics || {
    fcp: "",
    lcp: "",
    cls: "",
    tbt: "",
    speedIndex: "",
},
opportunities: result.opportunities || [],

diagnostics: result.diagnostics || [],
            metaData: {
                title: result.metaData?.title || "",
                description: result.metaData?.description || "",
                canonical: result.metaData?.canonical || "",
                robots: "index,follow",
                ogTitle: result.metaData?.ogTitle || "",
                ogDescription: result.metaData?.ogDescription || "",
                ogImage: result.metaData?.ogImage || "",
                twitterCard: result.metaData?.twitterCard || "",
                viewport: "width=device-width, initial-scale=1",
                charset: "utf-8",
            },
            headings: result.headings || {
    h1: 0,
    h2: 0,
    h3: 0,
    h4: 0,
    h5: 0,
    h6: 0,
    h1Texts: [],
},
            
           links: result.links || {
    internal: 0,
    external: 0,
    total: 0,
},
           images: result.images || {
    total: 0,
    missingAlt: 0,
    withAlt: 0,
},
          keywords: result.keywords || [],
            issues: result.issues || [],
        });

        setLoading(false);
    } catch (err) {
        console.log(err);
        setLoading(false);
    }
};


    useEffect(() => {
        (async () => await fetchAnalysis())();
    }, [id]);

    if (loading) {
        
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="size-7 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground text-sm">Loading report...</p>
                </div>
            </div>
        );
    }

    if (error || !analysis) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center bg-card border border-border rounded-2xl p-10">
                    <AlertCircle size={48} className="mx-auto text-danger mb-4" />
                    <h2 className="text-xl font-bold text-foreground mb-2">Report Not Found</h2>
                    <p className="text-muted-foreground text-sm mb-6">{error || "This analysis doesn't exist."}</p>
                    <Link to="/dashboard" className="bg-primary px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground inline-block" style={{ color: "var(--background)" }}>
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }
    const criticalCount = analysis.issues.filter(
    (i) => i.severity === "critical"
).length;

const warningCount = analysis.issues.filter(
    (i) => i.severity === "warning"
).length;

const infoCount = analysis.issues.filter(
    (i) => i.severity === "info"
).length;

    if (analysis.status === "failed") {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center bg-card border border-border rounded-2xl p-10">
                    <AlertCircle size={48} className="mx-auto text-danger mb-4" />
                    <h2 className="text-xl font-bold text-foreground mb-2">Analysis Failed</h2>
                    <p className="text-muted-foreground text-sm mb-6">The AI model might be down. Please try again later.</p>
                    <Link to="/analyze" className="bg-primary px-5 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground inline-block" style={{ color: "var(--background)" }}>
                        Try Again
                    </Link>
                </div>
            </div>
        );
    }

   
    return (
    <div className="min-h-screen pt-16 md:pt-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

            {/* Back + Header */}
            <div className="mb-8">

                {/* Top Bar */}
                <div className="flex items-center justify-between mb-4">

                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>

                    <ReportActions analysisId={analysis._id} />

                </div>

                {/* Website Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl font-medium text-foreground truncate">
                            {(() => {
                                try {
                                    return new URL(analysis.url).hostname;
                                } catch {
                                    return analysis.url;
                                }
                            })()}
                        </h1>
                            <div className="flex items-center gap-3 mt-1">
                                <a href={analysis.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary truncate flex items-center gap-1 transition-colors">
                                    {analysis.url}
                                    <ExternalLink size={12} />
                                </a>
                                <span className="text-xs text-muted-foreground">
                                    {new Date(analysis.createdAt).toLocaleDateString()} at {new Date(analysis.createdAt).toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Score Hero */}
                <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-6" style={{ animationDelay: "100ms" }}>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Overall Score */}
                        <ScoreGauge score={analysis.overallScore} size={160} strokeWidth={12} label="Overall Score" />

                        {/* Category Scores */}
<div className="flex-1 w-full">

    <ScoreCards
        performance={analysis.categories.performance}
        seo={analysis.categories.seo}
        accessibility={analysis.categories.accessibility}
        bestPractices={analysis.categories.bestPractices}
    />

    <CoreWebVitals
        fcp={analysis.metrics.fcp}
        lcp={analysis.metrics.lcp}
        cls={analysis.metrics.cls}
        tbt={analysis.metrics.tbt}
        speedIndex={analysis.metrics.speedIndex}
    />


    </div>

</div>
</div>
</div>


                
               <AIRecommendations
    advice={analysis.aiAdvice}
/>

<h2 className="text-xl font-semibold mb-4">
🚀 Lighthouse Opportunities
</h2>

<div className="space-y-4">
  {analysis.opportunities.map((item) => (
    <div key={item.id} className="glass rounded-xl p-4">
      <h3 className="font-semibold">
        {item.title}
      </h3>

      <p className="text-sm text-muted-foreground">
        {item.description}
      </p>

      <span className="text-xs text-primary">
        {item.displayValue}
      </span>
    </div>
  ))}
</div>
<h2 className="text-xl font-semibold mt-8 mb-4">
🔍 Diagnostics
</h2>

<div className="space-y-4">
  {analysis.diagnostics.map((item) => (
    <div key={item.id} className="glass rounded-xl p-4">
      <h3 className="font-semibold">
        {item.title}
      </h3>

      <p className="text-sm text-muted-foreground">
        {item.description}
      </p>

      <span className="text-xs text-primary">
        {item.displayValue}
      </span>
    </div>
  ))}
</div>
                <TechnicalSEO
    activeTab={activeTab}
    onTabChange={setActiveTab}
/>

                {/* Tab Content */}
                <div key={activeTab}>
                    {activeTab === "overview" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <IssueSummary
    critical={criticalCount}
    warnings={warningCount}
    info={infoCount}
    
/>

                            {/* Links & Images */}
                            <div className="space-y-6">
                                <div className="bg-card border border-border rounded-2xl p-6">
                                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                        <Link2 size={20} className="text-primary" />
                                        Links Analysis
                                    </h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="glass rounded-xl p-4 text-center">
                                            <p className="text-2xl font-bold text-primary">{analysis.links.internal}</p>
                                            <p className="text-xs text-gray-500">Internal</p>
                                        </div>
                                        <div className="glass rounded-xl p-4 text-center">
                                            <p className="text-2xl font-bold text-secondary">{analysis.links.external}</p>
                                            <p className="text-xs text-gray-500">External</p>
                                        </div>
                                        <div className="glass rounded-xl p-4 text-center">
                                            <p className="text-2xl font-bold text-accent">{analysis.links.total}</p>
                                            <p className="text-xs text-gray-500">Total</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-card border border-border rounded-2xl p-6">
                                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                        <Image size={20} className="text-accent" />
                                        Images Audit
                                    </h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="glass rounded-xl p-4 text-center">
                                            <p className="text-2xl font-bold">{analysis.images.total}</p>
                                            <p className="text-xs text-gray-500">Total</p>
                                        </div>
                                        <div className="glass rounded-xl p-4 text-center">
                                            <p className="text-2xl font-bold text-success">{analysis.images.withAlt}</p>
                                            <p className="text-xs text-gray-500">With Alt</p>
                                        </div>
                                        <div className="glass rounded-xl p-4 text-center">
                                            <p className={`text-2xl font-bold ${analysis.images.missingAlt > 0 ? "text-danger" : "text-success"}`}>{analysis.images.missingAlt}</p>
                                            <p className="text-xs text-gray-500">Missing Alt</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Headings */}
                            <div className="bg-card border border-border rounded-2xl p-6">
                                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <Heading size={20} className="text-secondary" />
                                    Heading Structure
                                </h3>
                                <div className="space-y-2">
                                    {["h1", "h2", "h3", "h4", "h5", "h6"].map((tag) => {
                                        const count = analysis.headings[tag as keyof typeof analysis.headings] as number;
                                        const maxBar = Math.max(analysis.headings.h1, analysis.headings.h2, analysis.headings.h3, analysis.headings.h4, analysis.headings.h5, analysis.headings.h6, 1);
                                        return (
                                            <div key={tag} className="flex items-center gap-3">
                                                <span className="text-xs font-mono text-gray-400 w-6 uppercase">{tag}</span>
                                                <div className="flex-1 h-6 rounded-lg bg-white/5 overflow-hidden">
                                                    <div className="h-full rounded-lg gradient-bg transition-all" style={{ width: `${(count / maxBar) * 100}%`, minWidth: count > 0 ? "20px" : "0" }} />
                                                </div>
                                                <span className={`text-sm font-bold w-6 text-right ${tag === "h1" && count !== 1 ? "text-danger" : ""}`}>{count}</span>
                                            </div>
                                        );
                                    })}
                                    
                                </div>
                                {analysis.headings.h1Texts.length > 0 && (
                                    <div className="mt-4 p-3 rounded-xl bg-white/3 border border-white/5">
                                        <p className="text-xs text-gray-500 mb-1">H1 Text:</p>
                                        {analysis.headings.h1Texts.map((text, i) => (
                                            <p key={i} className="text-sm text-gray-300 truncate">
                                                {text}
                                            </p>
                                        ))}
                                    </div>
                                )}
                                
                            </div>

                            {/* Keywords */}
                            <div className="bg-card border border-border rounded-2xl p-6">
                                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                    <Type size={20} className="text-warning" />
                                    Top Keywords
                                </h3>
                                {analysis.keywords.length > 0 ? (
                                    <div className="space-y-2">
                                        {analysis.keywords.map((kw, i) => (
                                            <div key={kw.word} className="flex items-center gap-3">
                                                <span className="text-xs text-gray-500 w-4">{i + 1}</span>
                                                <span className="flex-1 text-sm font-medium">{kw.word}</span>
                                                <span className="text-xs text-gray-400">{kw.count}×</span>
                                                <div className="w-16 h-1.5 rounded-full bg-white/5 overflow-hidden">
                                                    <div className="h-full rounded-full bg-accent" style={{ width: `${Math.min(kw.density * 10, 100)}%` }} />
                                                </div>
                                                <span className="text-xs text-gray-500 w-12 text-right">{kw.density}%</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">No keyword data available.</p>
                                )}
                            </div>
                        </div>
                    )}


                    {activeTab === "meta" && (
    <MetaAnalysis
        metaData={analysis.metaData}
    />
)}

{activeTab === "content" && (
    <ContentAnalysis
        wordCount={analysis.wordCount}
        readingTime={analysis.readingTime}
        pageSize={analysis.pageSize}
        loadTime={analysis.loadTime}
        headings={analysis.headings}
        links={analysis.links}
        images={analysis.images}
    />
)}

                           
                    {activeTab === "issues" && (
                        <div>
                            {analysis.issues.length > 0 ? (
                                <>
                                    {/* Issue filters */}
                                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                                        <span className="text-sm text-muted-foreground">Filter:</span>
                                        <span className="severity-critical px-2.5 py-1 rounded-full text-xs font-semibold">{criticalCount} Critical</span>
                                        <span className="severity-warning px-2.5 py-1 rounded-full text-xs font-semibold">{warningCount} Warnings</span>
                                        <span className="severity-info px-2.5 py-1 rounded-full text-xs font-semibold">{infoCount} Info</span>
                                    </div>
                                    <div className="space-y-3">
                                        {analysis.issues.map((issue, i) => (
                                            <IssueCard key={i} issue={issue} />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="bg-card border border-border rounded-2xl p-12 text-center">
                                    <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                                        <AlertCircle size={32} className="text-success" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">No Issues Found!</h3>
                                    <p className="text-sm text-muted-foreground">Your website is following SEO best practices.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        
    );
}
