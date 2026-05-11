
export default function CTASection() {
  return (
    <section className="mx-auto px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-green-700 to-[#06184f] p-6 sm:p-8 md:p-10 lg:p-14 text-white">

          {/* Left Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">

            {/* Text */}
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-2 sm:mb-3">
                Ready to Join Greenfield Family?
              </h2>
              <p className="text-sm sm:text-base text-slate-200 max-w-md">
                Give your child the best education and a bright future.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button className="rounded-xl bg-yellow-400 px-6 py-3 text-sm sm:text-base font-bold text-slate-900 transition hover:bg-yellow-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-green-700">
              Online Admission
            </button>
            <button className="rounded-xl border border-white/30 px-6 py-3 text-sm sm:text-base font-semibold transition hover:bg-white/10 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}