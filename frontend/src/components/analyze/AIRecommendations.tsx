import { Brain, Sparkles } from "lucide-react";

interface AIRecommendationsProps {
    advice: string;
}

export default function AIRecommendations({
    advice,
}: AIRecommendationsProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">

            <div className="flex items-center gap-4 mb-6">

                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Brain
                        className="text-primary"
                        size={28}
                    />
                </div>

                <div>

                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">
                            AI SEO Advisor
                        </h2>

                        <Sparkles
                            size={18}
                            className="text-yellow-500"
                        />
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Powered by Groq AI
                    </p>

                </div>

            </div>

            <div className="rounded-xl bg-muted/40 border border-border p-5">

                <pre className="whitespace-pre-wrap leading-7 text-sm text-foreground font-sans">
                    {advice || "No AI recommendations available."}
                </pre>

            </div>

        </div>
    );
}