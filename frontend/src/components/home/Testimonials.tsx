import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "SEO Specialist",
    company: "TechNova",
    review:
      "RankFlow helped us improve our SEO score by 35% in just two weeks. The AI recommendations were incredibly accurate.",
    rating: 5,
  },
  {
    name: "David Lee",
    role: "Founder",
    company: "StartupHub",
    review:
      "The best SEO analyzer I've used. Beautiful reports and very easy to understand.",
    rating: 5,
  },
  {
    name: "Emily Brown",
    role: "Marketing Manager",
    company: "GrowthLabs",
    review:
      "We use RankFlow every week to audit client websites. It's become an essential part of our workflow.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">

    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[140px]" />

    <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[140px]" />

</div>
      <div className="text-center mb-14">
        <h2 className="text-5xl font-bold mb-4">
          Loved by Professionals
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Thousands of developers and marketers trust RankFlow.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:-translate-y-3 hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.25)] transition duration-500"
          >
            <div className="flex gap-1 mb-5">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-yellow-400 text-yellow-400 group-hover:scale-125 transition duration-300"
                />
              ))}
            </div>

            <p className="leading-8 text-muted-foreground italic">
              "{item.review}"
            </p>

            <div className="mt-8 flex items-center gap-4">

    <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">

        {item.name.charAt(0)}

    </div>

    <div>

        <h4 className="font-semibold">
            {item.name}
        </h4>

        <p className="text-sm text-muted-foreground">
            {item.role}
        </p>

        <span className="inline-block mt-1 text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-500">

            {item.company}

        </span>

    </div>

</div>
          </div>
        ))}
      </div>
    </section>
  );
}