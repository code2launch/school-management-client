import { CalendarDays } from "lucide-react";
import SectionTitle from "../Shared/SectionTitle";
import Image from "next/image";

const news = [
  {
    title: "Greenfield Students Excel in National Science Olympiad",
    date: "16 MAY, 2025",
    img: "/assets/news (4).jpg",
    excerpt: "Our students brought home 15 medals including 5 golds in the National Science Olympiad 2024.",
  },
  {
    title: "Annual Sports Week Concludes Successfully",
    date: "10 MAY, 2026",
    img: "/assets/news (3).jpg",
    excerpt: "Week-long sports competition saw record participation from students across all grades.",
  },
  {
    title: "New Digital Classroom Initiative Launched",
    date: "05 MAY, 2026",
    img: "/assets/news (2).jpg",
    excerpt: "Smart boards and modern learning tools introduced in all classrooms.",
  },
  {
    title: "Students Visit to National Museum",
    date: "28 APR, 2026",
    img: "/assets/news (1).jpg",
    excerpt: "Educational trip organized for history and cultural exploration.",
  },
];

export default function NewsSection() {
  return (
    <section className="mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 md:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
          <SectionTitle mini="News & Updates" title="Latest News" />
          <button className="self-start sm:self-auto font-semibold text-green-700 transition-all hover:text-green-800 hover:translate-x-1">
            View All News →
          </button>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7 lg:gap-6">
          {news.map((item, index) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all shadow-lg"
            >
              {/* Image Container with different variants */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-gradient-to-br from-green-100 to-blue-100">
                <Image
                  fill
                  src={item.img}
                  alt={item.title}
                  className="object-cover transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Overlay gradient for better text readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6">
                <div className="mb-3 flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                  <CalendarDays size={14} className="text-green-600" />
                  <span>{item.date}</span>
                </div>

                <h3 className="mb-3 text-lg sm:text-xl font-bold leading-7 sm:leading-8 line-clamp-2">
                  {item.title}
                </h3>

                <p className="mb-4 text-sm text-slate-500 line-clamp-2">
                  {item.excerpt}
                </p>

                <button className="font-semibold text-green-700 transition-all hover:text-green-800 inline-flex items-center gap-1 text-sm sm:text-base group/btn">
                  Read More
                  <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}