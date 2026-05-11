"use client";

import Image from "next/image";
import { BookOpen, Users, Music, Cpu } from "lucide-react";
import SectionTitle from "../Shared/SectionTitle";

const programs = [
  {
    title: "General Education",
    desc: "Building strong foundation for future success with Bangla, English, Mathematics, and General Science following the National Curriculum.",
    icon: BookOpen,
    stream: "Class 1-8",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Higher Secondary",
    desc: "Specialized education in Science, Commerce & Humanities streams preparing students for HSC and university admission tests.",
    icon: Users,
    stream: "Class 9-12",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Co-Curricular Activities",
    desc: "Debate competitions, cultural programs, annual sports, scout groups, and various clubs to develop leadership skills.",
    icon: Music,
    stream: "All Classes",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "ICT & Robotics",
    desc: "Modern computer labs, programming education, robotics club, and digital literacy programs for the future workforce.",
    icon: Cpu,
    stream: "Class 3-12",
    color: "from-green-500 to-emerald-500",
  },
];

export default function ProgramsSection() {
  return (
    <section className="mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className=" flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
          <SectionTitle mini="Our Programs" title="Programs We Offer" />
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-7 lg:gap-6">
          {programs.map((program) => {
            const IconComponent = program.icon;
            return (
              <div
                key={program.title}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:shadow-xl hover:-translate-y-1"
              >
                {/* Icon Container with Gradient */}
                <div className={`relative h-40 sm:h-44 md:h-48 overflow-hidden bg-gradient-to-br ${program.color}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <IconComponent className="h-20 w-20 text-white/20 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

                  {/* Stream Badge */}
                  <div className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1">
                    <p className="text-xs font-semibold text-green-800">
                      {program.stream}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="mb-2 sm:mb-3 text-lg sm:text-xl font-bold text-slate-800">
                    {program.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed sm:leading-6 text-slate-500 line-clamp-3">
                    {program.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}