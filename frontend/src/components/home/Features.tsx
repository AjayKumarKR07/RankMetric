/* eslint-disable @typescript-eslint/no-explicit-any */
import { homeFeaturesData } from "../../assets/assets";

export default function Features() {
    return (
        <section className="relative py-28 overflow-hidden">
            <div className="absolute inset-0 -z-10 overflow-hidden">

    <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[150px]" />

    <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[150px]" />

</div>
            <div className="bg-dot-pattern absolute inset-0 -z-1 opacity-10"></div>
            <div className="max-w-6xl mx-auto flex flex-col items-center justify-center px-4 ">
                <div className="text-center mb-14">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Everything You Need to <span className="gradient-text">Rank Higher</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Comprehensive SEO analysis powered by real browser rendering and artificial intelligence.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
                    {homeFeaturesData.map((f: any) => (
                        <div key={f.title} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition duration-500 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)]">
                            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6 group-hover:rotate-6 group-hover:scale-110 transition duration-500">{f.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                            <p className="text-muted-foreground leading-7">{f.desc}</p>
                            <div className="mt-6 flex items-center text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition duration-300">

    Learn More

    <span className="ml-2">→</span>

</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
