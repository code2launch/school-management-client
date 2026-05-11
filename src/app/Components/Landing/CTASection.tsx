import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';

export default function CTASection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-4xl mx-auto px-5 xl:px-0 text-center">
        <div className="bg-primary rounded-3xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 hero-grid-bg opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[oklch(0.70_0.15_76)]/10 blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[oklch(0.70_0.15_76)]/20 border border-[oklch(0.70_0.15_76)]/30 flex items-center justify-center mx-auto mb-6">
              <GraduationCap size={26} className="text-[oklch(0.70_0.15_76)]" />
            </div>
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-white mb-4 leading-tight">
              Ready to transform your
              <br />
              <span className="gradient-text-gold">school management?</span>
            </h2>
            <p className="text-white/65 text-lg mb-8 max-w-xl mx-auto">
              Join 500+ Bangladeshi schools already using EduCore. No setup fees, no contracts. Start free today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-[oklch(0.70_0.15_76)] text-[oklch(0.14_0.05_265)] hover:bg-[oklch(0.75_0.14_80)] transition-all shadow-lg shadow-[oklch(0.70_0.15_76)]/30 hover:-translate-y-0.5"
              >
                Start for free <ArrowRight size={15} />
              </Link>
              <a
                href="mailto:hello@educore.com.bd"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white border border-white/25 hover:bg-white/10 transition-all"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
