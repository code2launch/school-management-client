'use client';

import { useGetDashboardQuery } from '@/redux/features/school/schoolApi';
import { useAppSelector } from '@/redux/hooks';
import StatCard from '@/app/Components/Dashboard/StatCard';
import { ClipboardCheck, BookOpen, Bell, Users } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

export default function TeacherDashboard() {
  const { data, isLoading } = useGetDashboardQuery();
  const user = useAppSelector(s => s.auth.user);
  const d = data?.data;

  const dayName = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()];

  return (
    <div className="space-y-7">
      <div className="bg-primary/5 border border-primary/20 rounded-xl px-5 py-4">
        <p className="text-sm text-muted-foreground">Good morning,</p>
        <h2 className="font-playfair font-bold text-xl text-foreground">{d?.teacher?.name ?? user?.name} 👋</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Today is {dayName}, {formatDate(new Date())}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Classes" value={d?.todaysClasses?.length ?? 0} icon={BookOpen}
          accent="bg-blue-500/10 text-blue-600 dark:text-blue-400" />
        <StatCard title="Sections" value={d?.sectionAttendanceSummary?.length ?? 0} icon={Users}
          accent="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" />
        <StatCard title="Subjects" value={d?.subjectAssignments?.length ?? 0} icon={BookOpen}
          accent="bg-amber-500/10 text-amber-600 dark:text-amber-400" />
        <StatCard title="Attendance Status" value={d?.attendanceStatus?.status ?? 'Not Marked'} icon={ClipboardCheck}
          accent="bg-purple-500/10 text-purple-600 dark:text-purple-400" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Today's classes */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-foreground">Today's Timetable</h3>
            <Link href="/teacher/attendance" className="text-xs text-primary hover:underline">Mark attendance</Link>
          </div>
          {d?.todaysClasses?.length > 0 ? (
            <div className="space-y-2">
              {d.todaysClasses.map((c: any) => (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                    P{c.periodNumber}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{c.subject?.name}</p>
                    <p className="text-xs text-muted-foreground">{c.section?.class?.name} — {c.section?.name} · {c.startTime}–{c.endTime}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-6">No classes scheduled today.</p>
          )}
        </div>

        {/* Attendance status for sections */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm text-foreground">Section Attendance Today</h3>
          </div>
          {d?.sectionAttendanceSummary?.length > 0 ? (
            <div className="space-y-3">
              {d.sectionAttendanceSummary.map((sec: any) => {
                const pct = sec.totalStudents > 0 ? Math.round((sec.markedToday / sec.totalStudents) * 100) : 0;
                return (
                  <div key={sec.sectionId}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-foreground">{sec.className} — {sec.sectionName}</span>
                      <span className={sec.isComplete ? 'text-emerald-600 font-semibold' : 'text-muted-foreground'}>
                        {sec.markedToday}/{sec.totalStudents}
                      </span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${sec.isComplete ? 'bg-emerald-500' : 'bg-primary'}`}
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-6">No sections assigned.</p>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { href: '/teacher/attendance', icon: ClipboardCheck, label: 'Mark Attendance', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800 dark:text-emerald-400' },
          { href: '/teacher/exams', icon: BookOpen, label: 'Enter Marks', color: 'bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-800 dark:text-purple-400' },
          { href: '/teacher/notices', icon: Bell, label: 'View Notices', color: 'bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-800 dark:text-rose-400' },
        ].map(a => (
          <Link key={a.href} href={a.href}
            className={`flex items-center gap-2.5 p-4 rounded-xl border card-hover ${a.color} transition-all`}>
            <a.icon size={16} />
            <span className="text-xs font-semibold">{a.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
