'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Users, GraduationCap, ClipboardCheck, Wallet, BookOpen, Bell } from 'lucide-react';

const MODULES = [
  {
    id: 'students',
    icon: GraduationCap,
    label: 'Students',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200 dark:border-blue-800',
    title: 'Complete Student Lifecycle',
    desc: 'From admission to year-end promotion — manage every student with structured profiles, parent linkage, class assignments, and automatic ID generation.',
    highlights: [
      'Online admission with parent info linking',
      'Auto-generated Student IDs (STD-2024-0001)',
      'Year-end bulk promotion with one action',
      'Section transfer and academic history tracking',
    ],
    preview: (
      <div className="space-y-2">
        {[
          { name: 'Rahim Uddin', id: 'STD-2024-0042', cls: 'Class 8 - A', status: 'Active' },
          { name: 'Fatema Begum', id: 'STD-2024-0043', cls: 'Class 8 - A', status: 'Active' },
          { name: 'Karim Hossain', id: 'STD-2024-0044', cls: 'Class 8 - B', status: 'Active' },
        ].map(s => (
          <div key={s.id} className="flex items-center justify-between  rounded-lg px-3 py-2 border border-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-100  text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold">{s.name[0]}</div>
              <div>
                <p className="text-xs font-semibold ">{s.name}</p>
                <p className="text-xs ">{s.id}</p>
              </div>
            </div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50  px-2 py-0.5 rounded-full">{s.status}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'attendance',
    icon: ClipboardCheck,
    label: 'Attendance',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200 dark:border-emerald-800',
    title: 'Fast, Accurate Daily Attendance',
    desc: 'Mark attendance for an entire class in seconds. Monthly summaries and individual reports give admin and parents the data they need.',
    highlights: [
      'Bulk class-wise entry (one page for all students)',
      'Present / Absent / Late / Leave statuses',
      'Monthly summary with attendance percentage',
      'Teacher attendance tracking included',
    ],
    preview: (
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold ">Today — Class 9A</span>
          <span className="text-xs ">Wed, 18 Apr</span>
        </div>
        <div className="space-y-2">
          {[
            { name: 'Rahim Uddin', status: 'PRESENT' },
            { name: 'Fatema Begum', status: 'ABSENT' },
            { name: 'Karim Hossain', status: 'LATE' },
            { name: 'Nasrin Akter', status: 'PRESENT' },
          ].map(s => (
            <div key={s.name} className="flex items-center justify-between  rounded-lg px-3 py-2 border border-gray-300">
              <span className="text-xs font-medium ">{s.name}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.status === 'PRESENT' ? 'bg-emerald-50 text-emerald-600 ' :
                s.status === 'ABSENT' ? 'bg-red-50 text-red-600 ' :
                  'bg-amber-50 text-amber-600'
                }`}>{s.status}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2 text-center">
          {[['24', 'Present'], ['3', 'Absent'], ['1', 'Late'], ['94%', 'Rate']].map(([v, l]) => (
            <div key={l} className=" rounded-lg py-2 border border-gray-300">
              <p className="font-playfair font-bold text-sm ">{v}</p>
              <p className="text-xs ">{l}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'fees',
    icon: Wallet,
    label: 'Fees',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200 dark:border-amber-800',
    title: 'Flexible Fee Management',
    desc: 'Define fee structures per class, record payments, track dues, and generate printable receipts — all calibrated for the Bangladeshi school model.',
    highlights: [
      'Admission, tuition & exam fee types',
      'Paid / Unpaid / Partial payment tracking',
      'Auto-generated receipt numbers (RCP-2024-00001)',
      'Monthly and annual collection reports',
    ],
    preview: (
      <div className="space-y-3">
        <div className=" rounded-xl p-3 border border-gray-300">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold ">Receipt #RCP-2024-00042</span>
            <span className="text-xs text-emerald-600 font-semibold bg-emerald-50  px-2 py-0.5 rounded-full">PAID</span>
          </div>
          <p className="text-xs  mb-1">Rahim Uddin — Class 9A</p>
          <div className="flex justify-between">
            <span className="text-xs ">Monthly Tuition · April</span>
            <span className="font-playfair font-bold text-sm ">৳ 1,200</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[['৳ 48,500', 'Collected'], ['৳ 12,200', 'Pending'], ['82%', 'Rate']].map(([v, l]) => (
            <div key={l} className=" rounded-lg p-2 border border-gray-300 text-center">
              <p className="font-playfair font-bold text-xs ">{v}</p>
              <p className="text-xs ">{l}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'exams',
    icon: BookOpen,
    label: 'Exams',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200 dark:border-purple-800',
    title: 'Exam & Result Management',
    desc: 'Create mid-terms, finals, and class tests. Enter marks per subject, auto-calculate grades using the Bangladesh GPA system, and publish report cards.',
    highlights: [
      'Mid-term, Final & Class Test types',
      'Bangladesh 5-point GPA scale (A+ to F)',
      'Class-wise result sheet with rankings',
      'Individual printable report cards',
    ],
    preview: (
      <div className="space-y-2">
        <div className=" rounded-lg p-3 border border-gray-300 mb-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold ">Final Exam 2024 · Class 9</span>
            <span className="badge-navy text-xs">Published</span>
          </div>
        </div>
        {[
          { subject: 'Mathematics', marks: '78/100', grade: 'A', gpa: '4.0' },
          { subject: 'English', marks: '85/100', grade: 'A+', gpa: '5.0' },
          { subject: 'Science', marks: '62/100', grade: 'A-', gpa: '3.5' },
        ].map(r => (
          <div key={r.subject} className="flex items-center justify-between  rounded-lg px-3 py-2 border border-gray-300">
            <span className="text-xs font-medium ">{r.subject}</span>
            <div className="flex items-center gap-3">
              <span className="text-xs ">{r.marks}</span>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">{r.grade}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'teachers',
    icon: Users,
    label: 'Teachers',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200 dark:border-cyan-800',
    title: 'Teacher Profiles & Assignments',
    desc: 'Maintain teacher profiles with subject assignments, class routines, and attendance. Give each teacher their own role-scoped dashboard.',
    highlights: [
      'Auto-generated Employee IDs (TCH-2024-001)',
      'Subject & class assignment management',
      'Weekly routine (timetable) builder',
      'Teacher attendance with monthly summary',
    ],
    preview: (
      <div className="space-y-2">
        {[
          { name: 'Mr. Alam', id: 'TCH-2024-001', subject: 'Mathematics', cls: '9A, 10A' },
          { name: 'Ms. Parvin', id: 'TCH-2024-002', subject: 'English', cls: '8A, 8B' },
          { name: 'Mr. Hasan', id: 'TCH-2024-003', subject: 'Science', cls: '9B, 10B' },
        ].map(t => (
          <div key={t.id} className="flex items-center gap-3  rounded-lg px-3 py-2 border border-gray-300">
            <div className="w-8 h-8 rounded-full bg-cyan-100  text-cyan-700 dark:text-cyan-300 flex items-center justify-center text-xs font-bold flex-shrink-0">{t.name.split(' ')[1][0]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold ">{t.name}</p>
              <p className="text-xs  truncate">{t.subject} · {t.cls}</p>
            </div>
            <span className="text-xs ">{t.id}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'notices',
    icon: Bell,
    label: 'Notices',
    color: 'text-rose-600',
    bg: 'bg-rose-50 ',
    border: 'border-rose-200 dark:border-rose-800',
    title: 'Notice Board & Communication',
    desc: 'Post exam schedules, holiday announcements, and circulars. Role-filtered feeds ensure the right message reaches the right audience.',
    highlights: [
      'Target: All, Students, Parents, or Teachers',
      'Instant publish or draft-first workflow',
      'Role-filtered news feed per user',
      'Admin and teacher posting privileges',
    ],
    preview: (
      <div className="space-y-2">
        {[
          { title: 'Final Exam Schedule 2024', audience: 'ALL', time: '2h ago', urgent: true },
          { title: 'Eid-ul-Adha Holiday Notice', audience: 'ALL', time: '1d ago', urgent: false },
          { title: 'Parent-Teacher Meeting', audience: 'PARENTS', time: '2d ago', urgent: false },
        ].map(n => (
          <div key={n.title} className=" rounded-lg px-3 py-2.5 border border-gray-300">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-semibold  leading-snug">{n.title}</p>
              {n.urgent && <span className="text-xs text-rose-600 bg-rose-50  px-1.5 py-0.5 rounded-full flex-shrink-0">Urgent</span>}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs ">{n.audience}</span>
              <span className="/40">·</span>
              <span className="text-xs ">{n.time}</span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export default function ModulesSection() {
  const [active, setActive] = useState('students');
  const mod = MODULES.find(m => m.id === active)!;

  return (
    <section id="modules" className="py-24 text-black">
      <div className="max-w-7xl mx-auto px-5 xl:px-0">
        <div className="text-center mb-14">
          <span className="badge-gold mb-4 inline-block">All Modules</span>
          <h2 className="font-playfair font-bold text-3xl sm:text-4xl  mb-4">
            One platform, <span className="gradient-text">every workflow</span>
          </h2>
          <p className=" max-w-lg mx-auto text-muted-foreground">
            Six deeply integrated modules that cover the complete school management cycle.
          </p>
        </div>

        {/* Tab row */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {MODULES.map(m => (
            <button
              key={m.id}
              onClick={() => setActive(m.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all',
                active === m.id
                  ? `${m.bg} ${m.color} border ${m.border} shadow-sm`
                  : ' hover: hover:bg-gray-200 border border-transparent'
              )}
            >
              <m.icon size={15} />
              {m.label}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="grid lg:grid-cols-2 items-center gap-8  border border-gray-300 rounded-3xl p-8 shadow-sm">
          <div className="animate-fade-in">

            <h3 className="font-playfair font-bold text-2xl  mb-3">{mod.title}</h3>
            <p className=" leading-relaxed mb-6">{mod.desc}</p>
            <ul className="space-y-2.5">
              {mod.highlights.map(h => (
                <li key={h} className="flex items-start gap-2.5 text-sm ">
                  <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${mod.bg}`}>
                    <svg className={`w-2.5 h-2.5 ${mod.color}`} fill="none" viewBox="0 0 12 12">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className={`rounded-2xl p-5 border ${mod.border} ${mod.bg} animate-fade-in`}>
            {mod.preview}
          </div>
        </div>
      </div>
    </section>
  );
}
