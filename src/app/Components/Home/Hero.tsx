"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";
import { GraduationCap, Users, ShieldCheck, Trophy } from "lucide-react";
import HeroVideoDialog from "../../../components/ui/hero-video-dialog";

const features = [
  {
    title: "Quality Education",
    icon: GraduationCap,
  },
  {
    title: "Holistic Development",
    icon: Users,
  },
  {
    title: "Safe Environment",
    icon: ShieldCheck,
  },
  {
    title: "Excellence",
    icon: Trophy,
  },
];

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);


  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            <Image
              fill
              priority
              src="/assets/school_hero.png"
              alt="Greenfield High School Campus"
              className="object-cover"
              sizes="90vw"
              quality={90}
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-[#06184f] via-[#06184fd9] to-transparent" />

        <div className="relative mx-auto grid min-h-[600px] max-w-7xl items-center gap-12 px-6 lg:px-0 lg:grid-cols-2">
          <div className="max-w-2xl py-24 text-white">
            <p className="mb-4 text-lg font-semibold text-yellow-400">
              Nurturing Minds, Building Futures
            </p>

            <h1 className="mb-6 text-6xl font-black leading-tight">
              Shaping Tomorrow&apos;s Leaders Today
            </h1>

            <p className="mb-5 text-xl leading-9 text-slate-200">
              Greenfield High School is committed to providing quality
              education, character building, and holistic development for every
              student.
            </p>

            <div className="flex flex-wrap gap-5">
              <button
                className="rounded-xl bg-yellow-400 px-8 py-3 font-bold text-slate-900 transition-all hover:bg-yellow-500 hover:scale-105 active:scale-95"
              >
                Explore Our School
              </button>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="flex items-center gap-3 rounded-xl border border-white/30 px-8 py-3 font-semibold transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
              >
                <Play size={18} />
                Watch Video
              </button>
            </div>
          </div>

          <div />
        </div>

      </section>
      <div className="relative z-10 mx-auto -mt-12 grid max-w-7xl gap-6 rounded-3xl bg-white p-5 pb-2 shadow-2xl grid-cols-2 md:grid-cols-4 ">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="group flex flex-col items-center gap-2 transition-all"
            >
              <div className="rounded-2xl">
                <Icon size={30} className="text-blue-600" />
              </div>

              <div>
                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Dialog */}
      <HeroVideoDialog
        className="hidden"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/-USKUNpg9_A?si=llcFehM5dJwj-bqt"
        thumbnailSrc=""
        thumbnailAlt="Video Thumbnail"
        open={isVideoOpen}
        onOpenChange={setIsVideoOpen}
      />
    </>
  );
}