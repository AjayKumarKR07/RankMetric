import {
    Globe,
    SearchCheck,
    Brain,
    CheckCircle,
    Loader2,
} from "lucide-react";

const STEPS = [
    {
        icon: <Globe size={22} />,
        title: "Connecting",
        description: "Creating cloud browser session...",
    },
    {
        icon: <SearchCheck size={22} />,
        title: "Scanning Website",
        description: "Collecting SEO information...",
    },
    {
        icon: <Brain size={22} />,
        title: "AI Analysis",
        description: "Generating AI recommendations...",
    },
    {
        icon: <CheckCircle size={22} />,
        title: "Report Ready",
        description: "Preparing your report...",
    },
];

interface Props {
    currentStep: number;
    progress: number;
    elapsedTime: number;
    url: string;
}

export default function ScanProgress({
    currentStep,
    progress,
    elapsedTime,
    url,
}: Props) {
    return (
        <div>

            <div className="text-center mb-10">

                <h2 className="text-3xl font-semibold">
                    Analyzing Website
                </h2>

                <p className="text-muted-foreground mt-2">
                    {url}
                </p>

                <div className="flex justify-center items-center gap-2 mt-4 text-sm">
                    <Loader2 className="animate-spin" size={16} />
                    <span>Elapsed Time: {elapsedTime}s</span>
                </div>

            </div>

            <div className="max-w-lg mx-auto">

                <div className="h-3 rounded-full bg-muted overflow-hidden">

                    <div
                        className="h-full bg-primary transition-all duration-700"
                        style={{ width: `${progress}%` }}
                    />

                </div>

                <p className="text-center mt-3">
                    {progress}% Completed
                </p>

            </div>

            <div className="max-w-lg mx-auto mt-10 space-y-4">

                {STEPS.map((step, index) => {

                    const active = index === currentStep;
                    const completed = index < currentStep;

                    return (
                        <div
                            key={step.title}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                                active
                                    ? "glass-strong border-primary/30"
                                    : completed
                                    ? "glass opacity-70"
                                    : "glass opacity-30"
                            }`}
                        >

                            <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                    completed
                                        ? "bg-green-500/20 text-green-500"
                                        : active
                                        ? "bg-primary text-background"
                                        : "bg-muted"
                                }`}
                            >
                                {completed ? (
                                    <CheckCircle size={20} />
                                ) : (
                                    step.icon
                                )}
                            </div>

                            <div className="flex-1">
                                <h4 className="font-medium">
                                    {step.title}
                                </h4>

                                <p className="text-sm text-muted-foreground">
                                    {step.description}
                                </p>
                            </div>

                            {active && (
                                <Loader2
                                    className="animate-spin"
                                    size={18}
                                />
                            )}

                        </div>
                    );
                })}

            </div>

        </div>
    );
}