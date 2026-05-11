import Link from 'next/link';
import { ArrowRight, CheckCircle2, Users, BookOpen, Award } from 'lucide-react';

const BADGES = ['✓ No setup fees', '✓ Works on Android', '✓ Bangladesh curriculum'];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Grid background */}
      <div className="absolute inset-0 hero-grid-bg opacity-30" />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[oklch(0.70_0.15_76)]/10 blur-[120px] pointer-events-none" />

      {/* Gold accent line top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[oklch(0.70_0.15_76)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 xl:px-0 py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest mb-7 animate-fade-up">
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.70_0.15_76)] animate-pulse" />
              Bangladesh-First School Software
            </div>

            <h1 className="font-playfair font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-6 animate-fade-up delay-100">
              Modern School
              <br />
              <span className="gradient-text-gold">Management</span>
              <br />
              Made Simple
            </h1>

            <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-md animate-fade-up delay-200">
              Complete administration for Bangladeshi schools — attendance, fees, exams, and parent communication in one affordable platform.
            </p>

            <div className="flex flex-wrap gap-2 mb-9 animate-fade-up delay-300">
              {BADGES.map(b => (
                <span key={b} className="text-xs text-white/70 font-medium px-3 py-1 rounded-full bg-white/8 border border-white/15">
                  {b}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 animate-fade-up delay-400">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[oklch(0.70_0.15_76)] text-[oklch(0.14_0.05_265)] hover:bg-[oklch(0.75_0.14_80)] transition-all shadow-lg shadow-[oklch(0.70_0.15_76)]/30 hover:-translate-y-0.5"
              >
                Get Started Free <ArrowRight size={15} />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white border border-white/25 hover:bg-white/10 transition-all"
              >
                Explore Features
              </a>
            </div>
          </div>

          {/* Right — Dashboard preview card */}
          <div className="hidden lg:block animate-fade-up delay-300">
            <div className="relative">
              {/* Floating stat cards */}
              <div className="absolute -top-8 -left-8 animate-float">
                <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-border">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Users size={18} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Total Students</p>
                    <p className="font-playfair font-bold text-xl text-foreground">1,248</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-4 animate-float delay-300">
                <div className="bg-white dark:bg-card rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-border">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Award size={18} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Fee Collected</p>
                    <p className="font-playfair font-bold text-xl text-foreground">৳4.2L</p>
                  </div>
                </div>
              </div>

              {/* Main card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-6 shadow-2xl">
                {/* Mini nav */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  </div>
                  <span className="text-white/60 text-xs font-medium">Admin Dashboard</span>
                  <div className="w-20 h-2 rounded-full bg-white/10" />
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Students', val: '1,248', color: 'bg-blue-400/20 text-blue-200' },
                    { label: 'Teachers', val: '64', color: 'bg-emerald-400/20 text-emerald-200' },
                    { label: 'Attendance', val: '94%', color: 'bg-amber-400/20 text-amber-200' },
                  ].map(s => (
                    <div key={s.label} className={`rounded-xl p-3 ${s.color}`}>
                      <p className="text-xs opacity-70 mb-1">{s.label}</p>
                      <p className="font-playfair font-bold text-lg">{s.val}</p>
                    </div>
                  ))}
                </div>

                {/* Bar chart mock */}
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-white/50 text-xs mb-3">Monthly Fee Collection</p>
                  <div className="flex items-end gap-2 h-20">
                    {[55, 78, 62, 88, 70, 92, 80].map((h, i) => (
                      <div key={i} className="flex-1 rounded-t-sm bg-[oklch(0.70_0.15_76)]/60 transition-all"
                        style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {['Jan','Feb','Mar','Apr','May','Jun','Jul'].map(m => (
                      <span key={m} className="text-white/30 text-xs">{m}</span>
                    ))}
                  </div>
                </div>

                {/* Recent list */}
                <div className="mt-4 space-y-2">
                  {[
                    { name: 'Rahim Uddin', cls: 'Class 9A', status: 'Present', color: 'bg-emerald-400/20 text-emerald-300' },
                    { name: 'Fatema Khatun', cls: 'Class 7B', status: 'Fee Due', color: 'bg-red-400/20 text-red-300' },
                    { name: 'Karim Ahmed', cls: 'Class 10A', status: 'Present', color: 'bg-emerald-400/20 text-emerald-300' },
                  ].map(s => (
                    <div key={s.name} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
                          {s.name[0]}
                        </div>
                        <div>
                          <p className="text-white/90 text-xs font-medium">{s.name}</p>
                          <p className="text-white/40 text-xs">{s.cls}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.color}`}>{s.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z"
            className="fill-background" />
        </svg>
      </div>
    </section>
  );
}
