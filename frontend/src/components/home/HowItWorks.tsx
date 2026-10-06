/* eslint-disable @typescript-eslint/no-explicit-any */
import { homeHowItWorksData } from "../../assets/assets";

export default function HowItWorks() {
    return (
        <section className="relative max-w-7xl mx-auto px-6 py-28 overflow-hidden">
            <div className="absolute inset-0 -z-10 overflow-hidden">

    <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-blue-500/10 blur-[140px]" />

    <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-500/10 blur-[140px]" />

</div>
            <div className="text-center mb-16 animate-slide-up">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    How It <span className="gradient-text">Works</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-8">RankFlow uses advanced browser automation and AI to simulate a real user experience and provide deep SEO insights.</p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-[120px] left-[14%] right-[14%] h-1 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 opacity-30"></div>

                {homeHowItWorksData.map((step: any, i: number) => (
                    <div key={step.num} className="relative z-10 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="bg-card border border-border rounded-2xl p-8 text-center h-full hover:bg-muted transition-all group/step">
                            <div className="text-6xl font-black text-blue-500/10 mb-6">{step.num}</div>
                            <div className="w-20 h-20 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mx-auto mb-8 group-hover:rotate-12 group-hover:scale-110 transition duration-500">{step.icon}</div>
                            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                        <p className="text-muted-foreground leading-7">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
