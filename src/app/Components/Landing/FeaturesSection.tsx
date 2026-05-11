import {
  Users, BookOpen, ClipboardCheck, Wallet,
  BarChart3, Bell, Shield, Smartphone
} from 'lucide-react';

const FEATURES = [
  {
    icon: Users,
    title: 'Student & Teacher Management',
    desc: 'Complete profiles, admission workflows, ID generation, and role-based access for every stakeholder.',
    accent: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  {
    icon: ClipboardCheck,
    title: 'Daily Attendance Tracking',
    desc: 'Bulk class-wise entry with one click. Monthly reports, trends, and parent notifications built in.',
    accent: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: Wallet,
    title: 'Fee Management',
    desc: 'Flexible fee structures, payment recording, due tracking, and printable receipts — all in Bengali context.',
    accent: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  {
    icon: BookOpen,
    title: 'Exam & Results',
    desc: 'Create exams, enter marks, auto-grade with BD GPA scale, and generate polished report cards.',
    accent: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  },
  {
    icon: BarChart3,
    title: 'Role-Based Dashboards',
    desc: 'Admin, teacher, student, and parent views — each seeing exactly what they need, nothing more.',
    accent: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  },
  {
    icon: Bell,
    title: 'Notice Board',
    desc: 'Post exam schedules, holidays, and circulars. Students and parents see targeted announcements.',
    accent: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    desc: 'Optimised for low-end Android devices with minimal data usage — works well on 2G/3G.',
    accent: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    desc: 'JWT-based auth, role-based access control, encrypted passwords, and data validation throughout.',
    accent: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-5 xl:px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge-navy mb-4 inline-block">Core Features</span>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
            Everything your school needs,
            <br />
            <span className="gradient-text">nothing it doesn't.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Purpose-built for Bangladeshi schools — covering the full academic cycle at a fraction of the cost.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map((feat, i) => (
            <div
              key={feat.title}
              className={`group card-hover rounded-2xl p-6 bg-card border border-border animate-fade-up delay-${Math.min(i * 100, 700)}`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${feat.accent} transition-transform group-hover:scale-110`}>
                <feat.icon size={20} />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-2 leading-snug">{feat.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
