import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import Pricing from "../components/home/Pricing";
import Footer from "../components/home/Footer";
import Stats from "../components/home/Stats";
import Testimonials from "../components/home/Testimonials";
import TrustedBy from "../components/home/TrustedBy";
import AIAssistant from "../components/home/AIAssistant";

export default function Home() {
    return (
        <div className="min-h-screen">

            <Hero />

            <TrustedBy />

            <Stats />

            <Features />

            <HowItWorks />

            <AIAssistant />

            <Testimonials />

            <Pricing />

            <Footer />

        </div>
    );
}