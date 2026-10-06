/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChartNoAxesColumnIcon } from "lucide-react";
import { homefooterLinks } from "../../assets/assets";
import { SiX, SiInstagram, SiFacebook, SiTwitch } from "@icons-pack/react-simple-icons";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-border bg-gradient-to-b from-background to-card py-20 text-foreground">
            <div className="absolute inset-0 -z-10 overflow-hidden">

    <div className="absolute top-0 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[140px]" />

    <div className="absolute bottom-0 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[160px]" />

</div>
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 mb-5">
                            <ChartNoAxesColumnIcon className="text-primary" />
                            <span className="text-2xl font-bold gradient-text">RankFlow</span>
                        </div>
                        <p className="text-muted-foreground leading-7 max-w-xs mb-8">Optimize your website for search engines with AI-powered insights and real-time tracking.</p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110">
                                <SiX size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110">
                                <SiInstagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110">
                                <SiFacebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110">
                                <SiTwitch size={20} />
                            </a>
                        </div>
                    </div>

                    {homefooterLinks.map((section: any) => (
                        <div key={section.title}>
                            <h3 className="mb-5 font-semibold text-lg">{section.title}</h3>
                            <ul className="space-y-1">
                                {section.links.map((link: any) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors duration-300">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-10 mt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} RankFlow. All rights reserved.</p>
                     <div className="flex items-center gap-6">

    <span className="text-xs text-green-500 font-medium">
        ● All Systems Operational
    </span>

    <button
        onClick={() =>
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
        className="w-10 h-10 rounded-full bg-blue-600 text-white hover:scale-110 transition-all duration-300"
    >
        ↑
    </button>

</div>
                </div>
            </div>
        </footer>
    );
}
