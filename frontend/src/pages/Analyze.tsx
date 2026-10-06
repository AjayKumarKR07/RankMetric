/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearchIcon, GlobeIcon, FileSearchIcon, BrainIcon, CheckCircleIcon, AlertCircle, Loader2, ArrowRightIcon } from "lucide-react";
import UrlInput from "../components/analyze/UrlInput";
import ScanProgress from "../components/analyze/ScanProgress";
const STEPS = [
    { icon: <GlobeIcon size={22} />, label: "Connecting to browser", desc: "Creating cloud browser session..." },
    { icon: <FileSearchIcon size={22} />, label: "Scanning website", desc: "Extracting meta tags, links, images..." },
    { icon: <BrainIcon size={22} />, label: "AI Analysis", desc: "OpenAI is analyzing your SEO data..." },
    { icon: <CheckCircleIcon size={22} />, label: "Report Ready", desc: "Your SEO report is complete!" },
];

export default function Analyze() {
    const [url, setUrl] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();
    const [elapsedTime, setElapsedTime] = useState(0);
    const pollRef = useRef<any>(null);
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const [analysisComplete, setAnalysisComplete] = useState(false);

useEffect(() => {
    if (!analyzing) return;

    setCurrentStep(0);
    setProgress(0);
    setElapsedTime(0);

    const timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
    }, 1000);

    const timers = [
        setTimeout(() => {
            setCurrentStep(1);
            setProgress(25);
        }, 3000),

        setTimeout(() => {
            setCurrentStep(2);
            setProgress(60);
        }, 7000),

        setTimeout(() => {
            setCurrentStep(3);
            setProgress(100);
        }, 11000),
    ];

    return () => {
        timers.forEach(clearTimeout);
        clearInterval(timer);
    };
}, [analyzing]);

const handleAnalyze = async (submitUrl?: string) => {
    const targetUrl = submitUrl || url;
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
        alert("Please login first.");
        return;
    }

    const user = JSON.parse(storedUser);

    if (!targetUrl.trim()) return;

    try {
        setError("");
        setAnalyzing(true);
setLoading(true);
setAnalysisComplete(false);

       const token = localStorage.getItem("token");

const response = await fetch(
  "http://localhost:5000/api/analyze",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      url: targetUrl,
    }),
  }
);

        const data = await response.json();
        console.log("API Response:", data);

        if (!data.success) {
            throw new Error(data.message);
        }

        localStorage.setItem(
    "analysisResult",
    JSON.stringify(data)
);

setAnalysisComplete(true);
console.log("Analysis Complete");

       
    } catch (error: any) {
        setError(error.message || "Analysis failed");
    }finally {
    // Nothing here

}
}


    useEffect(() => {
        const prefillUrl = searchParams.get("url");
        if (prefillUrl) {
            (() => setUrl(prefillUrl))();
            // Auto-start if URL is provided
            setTimeout(() => handleAnalyze(prefillUrl), 500);
        }

        return () => {
            if (pollRef.current) clearInterval(pollRef.current);
        };
    }, []);

    useEffect(() => {
    console.log({
        progress,
        analyzing,
        analysisComplete,
    });

    if (
        analyzing &&
        progress === 100 &&
        analysisComplete
    ) {
        const timer = setTimeout(() => {
            setAnalyzing(false);
            setLoading(false);
            navigate("/report/current");
        }, 1000);

        return () => clearTimeout(timer);
    }
}, [progress, analyzing, analysisComplete, navigate]);
  return (
    <div className="min-h-screen pt-16 md:pt-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 py-12">

            {!analyzing ? (

                <div>

                    <UrlInput
                        url={url}
                        loading={loading}
                        onChange={setUrl}
                        onAnalyze={handleAnalyze}
                    />

                    {error && (
                        <div className="mb-6 px-4 py-3 rounded-xl severity-critical text-sm flex items-center gap-2 max-w-xl mx-auto">
                            <AlertCircle size={18} className="shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Examples:{" "}
                        {["github.com", "stripe.com", "vercel.com"].map((ex, i) => (
                            <span key={ex}>
                                <button
                                    onClick={() => setUrl(ex)}
                                    className="text-primary hover:underline"
                                >
                                    {ex}
                                </button>
                                {i < 2 ? ", " : ""}
                            </span>
                        ))}
                    </div>

                </div>

            ) : (

                <ScanProgress
                    currentStep={currentStep}
                    progress={progress}
                    elapsedTime={elapsedTime}
                    url={url}
                />

            )}

        </div>
    </div>
  );
}
