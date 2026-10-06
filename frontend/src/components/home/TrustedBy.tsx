import {
    Cloud,
    Cpu,
    Boxes,
    Globe,
    Building2,
    Code2,
} from "lucide-react";

const companies = [
    {
       
    name: "GitHub",
    icon: <Code2 size={34} />,
},
    
    {
        name: "Microsoft",
        icon: <Building2 size={34} />,
    },
    {
        name: "OpenAI",
        icon: <Cpu size={34} />,
    },
    {
        name: "Google",
        icon: <Globe size={34} />,
    },
    {
        name: "AWS",
        icon: <Cloud size={34} />,
    },
    {
        name: "Vercel",
        icon: <Boxes size={34} />,
    },
];

export default function TrustedBy() {
    return (
        <section className="py-20 overflow-hidden">

            <div className="text-center mb-12">

                <p className="text-sm uppercase tracking-[0.3em] text-blue-500">
                    Trusted by
                </p>

                <h2 className="text-4xl font-bold mt-4">
                    Trusted by 50,000+ Developers
                </h2>

            </div>

            <div className="relative overflow-hidden">

                <div className="flex gap-8 animate-marquee">

                    {[...companies, ...companies].map((item, index) => (

                        <div
                            key={index}
                            className="glass min-w-[180px] rounded-2xl p-8 flex flex-col items-center hover:scale-110 transition duration-300"
                        >

                            <div className="text-blue-500 mb-4">
                                {item.icon}
                            </div>

                            <p className="font-semibold">
                                {item.name}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}