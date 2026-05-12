"use client";

import { Award } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  const features = [
    "Experienced & Caring Faculty",
    "Modern Classrooms & Labs",
    "Focus on Values & Discipline",
  ];

  return (
    <section className="mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl grid gap-8 md:gap-10 md:grid-cols-2">
        {/* Content Column */}
        <div className="order-2 lg:order-1">
          <p className="mb-2 sm:mb-3 text-sm sm:text-base font-semibold uppercase tracking-[3px] text-yellow-500">
            About Us
          </p>

          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            We Provide the Best Environment for{" "}
            <span className="text-green-700">Education</span>
          </h2>

          <p className="mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed sm:leading-8 text-slate-500">
            We believe every child is unique and has the potential to achieve
            greatness through innovation and discipline.
          </p>

          <div className="space-y-3 sm:space-y-4">
            {features.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-green-600 flex-shrink-0" />
                <span className="text-sm sm:text-base font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-8 sm:mt-10 rounded-xl bg-green-700 px-5 sm:px-7 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white transition-all hover:bg-green-800 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
            Learn More About Us
          </button>
        </div>

        {/* Image Column */}
        <div className="order-1 lg:order-2 relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-auto lg:min-h-[500px] rounded-2xl overflow-hidden">
          <Image
            fill
            priority
            src="/assets/students.jpg"
            alt="Greenfield High School Campus"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={90}
          />

          {/* Award Badge */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 rounded-2xl bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-5 shadow-xl">
            <div className="flex items-center gap-3 sm:gap-4">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-green-700 flex-shrink-0" />

              <div>
                <h3 className="text-2xl sm:text-3xl font-black">20+</h3>
                <p className="text-xs sm:text-sm text-slate-500 whitespace-nowrap">
                  Years of Excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}