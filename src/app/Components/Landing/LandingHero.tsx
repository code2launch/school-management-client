
import { Check } from "lucide-react";
import Image from "next/image";

export default function LandingHero() {

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background Blurs */}
      <div className="absolute right-0 top-0 h-75 w-75 sm:h-100 sm:w-100 rounded-full bg-green-100 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-62.5 w-62.5 rounded-full bg-blue-100 blur-3xl opacity-50" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-24 lg:mt-16">
        {/* Hero Content */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">

          {/* LEFT COLUMN */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-green-700">
              <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-600" />
              Designed for Schools in Bangladesh
            </div>

            {/* Heading */}
            <h1 className="mb-4 text-5xl font-black leading-[1.15] sm:leading-[1.1] text-slate-900">
              Modern School{" "}
              <span className="text-green-600">Management</span> Made Simple
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-500 max-w-lg">
              Complete school management software to automate administration, simplify workflows, and improve communication — all in one platform.
            </p>

            {/* Features */}
            <div className="my-6 flex flex-wrap gap-4 sm:gap-6 md:gap-8">
              {["Easy to Use", "Secure & Reliable", "24/7 Support"].map((item) => (
                <div key={item} className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-5 w-5 sm:h-6 sm:w-6 flex-0 items-center justify-center rounded-full bg-green-100">
                    <Check size={12} className="text-green-700" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-5">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 rounded-full border-2 sm:border-4 border-white bg-linear-to-br from-slate-300 to-slate-400"
                  />
                ))}
              </div>
              <div>
                <div className="mb-1 flex items-center gap-1.5 sm:gap-2">
                  <div className="flex text-yellow-400 text-sm sm:text-base">
                    {"★".repeat(5)}
                  </div>
                  <span className="text-sm sm:text-base font-bold">4.9/5</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500">
                  Trusted by 500+ schools across Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Mockup Image */}
          <div className="order-1 lg:order-2 relative group">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-green-100 blur-2xl opacity-60 transition-all duration-500 group-hover:scale-110" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-100 blur-2xl opacity-60 transition-all duration-500 group-hover:scale-110" />


            <div className="relative overflow-hidden rounded-md">
              <Image
                src="/assets/landing-banner.png"
                alt="EduCore Dashboard Mockup"
                width={800}
                height={600}
                className="h-auto w-full object-cover transition-transform duration-700"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-green-600/10 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="hidden lg:block absolute -top-10 -right-4 sm:-right-16 px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 ">
              <p className="text-white font-bold text-xs sm:text-6xl">✨</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}