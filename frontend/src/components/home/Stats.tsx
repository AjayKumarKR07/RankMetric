import { useEffect, useState } from "react";
import {
    Globe,
    Search,
    Brain,
    ShieldCheck,
} from "lucide-react";

export default function Stats() {
    const [counts, setCounts] = useState({
        websites: 0,
        issues: 0,
        accuracy: 0,
        uptime: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setCounts((prev) => ({
                websites: prev.websites < 50 ? prev.websites + 1 : 50,
                issues: prev.issues < 1000 ? prev.issues + 20 : 1000,
                accuracy: prev.accuracy < 98 ? prev.accuracy + 2 : 98,
                uptime: prev.uptime < 24 ? prev.uptime + 1 : 24,
            }));
        }, 25);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full max-w-7xl mx-auto px-6 py-28">
            <div className="absolute inset-0 -z-10 overflow-hidden">

    <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-blue-500/10 blur-[120px]" />

    <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-purple-500/10 blur-[140px]" />

</div>

            <h2 className="text-center text-4xl font-bold mb-16">
                Powering the Future of SEO
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mt-4 mb-16">
    Trusted by thousands of developers and businesses to improve SEO,
    monitor website health, and boost search rankings with AI.
</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">

    {/* Websites */}

 <div className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center hover:-translate-y-3 hover:scale-105 transition duration-500">

        <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
            <Globe size={30} className="text-blue-500" />
        </div>

        <h3 className="text-5xl font-bold text-blue-500">
            {counts.websites}K+
        </h3>

        <p className="mt-3 text-muted-foreground">
            Websites Analyzed
        </p>

    </div>

    {/* SEO Issues */}

    <div className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center hover:-translate-y-3 hover:scale-105 transition duration-500">

        <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/20 flex items-center justify-center mb-6">
            <Search size={30} className="text-green-500" />
        </div>

        <h3 className="text-5xl font-bold text-green-500">
            {counts.issues}K+
        </h3>

        <p className="mt-3 text-muted-foreground">
            SEO Issues Fixed
        </p>

    </div>

    {/* AI Accuracy */}

    <div className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center hover:-translate-y-3 hover:scale-105 transition duration-500">

        <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
            <Brain size={30} className="text-purple-500" />
        </div>

        <h3 className="text-5xl font-bold text-purple-500">
            {counts.accuracy}%
        </h3>

        <p className="mt-3 text-muted-foreground">
            AI Accuracy
        </p>

    </div>

    {/* Availability */}

    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center hover:-translate-y-3 hover:scale-105 transition duration-500">

        <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6">
            <ShieldCheck size={30} className="text-orange-500" />
        </div>

        <h3 className="text-5xl font-bold text-orange-500">
            {counts.uptime}/7
        </h3>

        <p className="mt-3 text-muted-foreground">
            AI Availability
        </p>

    </div>

</div>
            

        </section>
    );
}