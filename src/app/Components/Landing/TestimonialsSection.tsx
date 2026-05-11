const TESTIMONIALS = [
  {
    quote: "আমাদের স্কুলের ফি সংগ্রহ এবং হাজিরা ব্যবস্থাপনা এখন অনেক সহজ। এই সিস্টেম ব্যবহার করে আমরা প্রতি মাসে অনেক সময় বাঁচাচ্ছি।",
    quoteEn: "Fee collection and attendance management at our school is now much easier. We save hours every month using this system.",
    name: "Md. Abul Hossain",
    role: "Principal",
    school: "Dhanmondi Government School, Dhaka",
    initials: "AH",
  },
  {
    quote: "পরীক্ষার ফলাফল প্রকাশ এবং রিপোর্ট কার্ড তৈরি করা এখন মাত্র কয়েক মিনিটের কাজ। অভিভাবকরাও খুশি।",
    quoteEn: "Publishing exam results and generating report cards now takes just minutes. Parents are happy too.",
    name: "Nasrin Sultana",
    role: "Head Teacher",
    school: "Tejgaon Girls' High School, Dhaka",
    initials: "NS",
  },
  {
    quote: "সবচেয়ে ভালো লাগছে যে এই সিস্টেম মোবাইলে ভালো কাজ করে। শিক্ষকরা সহজেই ফোন থেকে হাজিরা নিতে পারেন।",
    quoteEn: "What I love most is that this system works well on mobile. Teachers can easily take attendance from their phones.",
    name: "Rafiqul Islam",
    role: "Academic Director",
    school: "Chittagong Model School",
    initials: "RI",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-5 xl:px-0">
        <div className="text-center mb-14">
          <span className="badge-gold mb-4 inline-block">Testimonials</span>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Trusted by school leaders <span className="gradient-text">across Bangladesh</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className={`bg-card border border-border rounded-2xl p-6 card-hover animate-fade-up delay-${i * 200 + 100}`}
            >
              {/* Quote mark */}
              <div className="font-playfair text-5xl text-[oklch(0.70_0.15_76)]/30 leading-none mb-3">"</div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-2 italic">
                "{t.quote}"
              </p>
              <p className="text-foreground/60 text-xs leading-relaxed mb-5">
                {t.quoteEn}
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role} · {t.school}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
