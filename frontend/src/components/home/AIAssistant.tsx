import { useState } from "react";
import { Bot, Send } from "lucide-react";

export default function AIAssistant() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const askAI = async () => {
        if (!question.trim()) return;

        try {
            setLoading(true);
            setAnswer("");

            const response = await fetch(
                "http://localhost:5000/api/ai/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        question,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setAnswer(data.answer);
            } else {
                setAnswer(data.message);
            }
        } catch (err) {
            console.error(err);
            setAnswer("❌ Failed to connect to AI.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-5xl mx-auto px-6 py-24">

            <div className="glass rounded-3xl p-10 shadow-[0_0_60px_rgba(59,130,246,0.15)]">

                <div className="flex items-center gap-3 mb-6">
                    <Bot size={40} className="text-blue-500" />

                    <div>
                        <h2 className="text-3xl font-bold">
                            Ask RankFlow AI
                        </h2>

                        <p className="text-muted-foreground">
                            Get instant SEO guidance from AI.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">

                    <input
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask anything about SEO..."
                        className="flex-1 rounded-2xl border border-border bg-card px-6 py-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                    />

                    <button
                        onClick={askAI}
                        className="rounded-2xl bg-blue-600 px-8 py-4 text-white flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                    >
                        <Send size={18} />
                        Ask AI
                    </button>

                </div>

                {loading && (
                    <div className="mt-6 flex items-center gap-3 text-blue-500">

    <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>

    RankFlow AI is thinking...

</div>
                )}

                {answer && (

<div className="mt-8 space-y-5">

    {/* User Message */}

    <div className="flex justify-end">

        <div className="max-w-[80%] rounded-2xl bg-blue-600 text-white px-5 py-4 shadow-lg">

            <p className="text-xs font-semibold mb-2 opacity-80">
                👤 You
            </p>

            {question}

        </div>

    </div>

    {/* AI Message */}

    <div className="flex justify-start">

        <div className="max-w-[85%] rounded-2xl border border-border bg-card p-5 shadow-lg">

            <p className="text-blue-500 font-semibold mb-3">
                🤖 RankFlow AI
            </p>

            <div className="whitespace-pre-wrap leading-7">
                {answer}
            </div>

        </div>

    </div>

</div>

)}

            </div>

        </section>
    );
}