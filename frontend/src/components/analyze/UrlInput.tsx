import { Search, ArrowRight } from "lucide-react";

interface UrlInputProps {
    url: string;
    loading: boolean;
    onChange: (value: string) => void;
    onAnalyze: () => void;
}

export default function UrlInput({
    url,
    loading,
    onChange,
    onAnalyze,
}: UrlInputProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">

            <h2 className="text-xl font-semibold mb-4">
                Website Analysis
            </h2>

            <div className="flex flex-col md:flex-row gap-4">

                <div className="relative flex-1">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <input
                        type="text"
                        value={url}
                        placeholder="https://example.com"
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />

                </div>

                <button
    onClick={() => onAnalyze()}
    disabled={loading}
    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-medium transition disabled:opacity-60"
>
    {loading ? (
        <>Scanning...</>
    ) : (
        <>
            Analyze
            <ArrowRight size={18} />
        </>
    )}
</button>

            </div>

            <p className="text-sm text-muted-foreground mt-3">
                Enter any website URL to generate a complete AI-powered SEO report.
            </p>

        </div>
    );
}