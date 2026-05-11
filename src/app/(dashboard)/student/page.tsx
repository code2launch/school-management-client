'use client';

import { useGetDashboardQuery } from '@/redux/features/school/schoolApi';
import { useAppSelector } from '@/redux/hooks';
import { ClipboardCheck, Wallet, BookOpen, Bell, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export default function StudentDashboard() {
  const { data, isLoading } = useGetDashboardQuery();
  const user = useAppSelector(s => s.auth.user);
  const d = data?.data;
  const att = d?.attendanceSummary;
  const fee = d?.feeStatus;

  return (
    <div className="space-y-7">
      {/* Welcome */}
      <div className="bg-primary rounded-2xl p-6 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-bg opacity-20" />
        <div className="relative z-10">
          <p className="text-primary-foreground/70 text-sm">Welcome back,</p>
          <h2 className="font-playfair font-bold text-2xl mt-0.5">{d?.student?.name ?? user?.name}</h2>
          <div className="flex flex-wrap gap-4 mt-3">
            {d?.student?.class && <span className="text-xs text-primary-foreground/70">{d.student.class} — Section {d.student.section}</span>}
            {d?.student?.academicYear && <span className="text-xs text-primary-foreground/70">Year: {d.student.academicYear}</span>}
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <ClipboardCheck size={16} className="text-emerald-600" />
            <span className="text-xs font-semibold text-muted-foreground">This Month's Attendance</span>
          </div>
          <p className="font-playfair font-bold text-3xl text-foreground">{att?.percentage ?? 0}%</p>
          <p className="text-xs text-muted-foreground mt-1">{att?.present ?? 0} present / {att?.total ?? 0} days</p>
          <div className="mt-3 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${att?.percentage ?? 0}%` }} />
          </div>
        </div>

        <div className={`border rounded-2xl p-5 ${fee?.hasDues ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800' : 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'}`}>
          <div className="flex items-center gap-2 mb-3">
            {fee?.hasDues
              ? <AlertCircle size={16} className="text-red-600" />
              : <Wallet size={16} className="text-emerald-600" />}
            <span className="text-xs font-semibold text-muted-foreground">Fee Status</span>
          </div>
          {fee?.hasDues ? (
            <>
              <p className="font-playfair font-bold text-2xl text-red-600 dark:text-red-400">{formatCurrency(fee.totalDue)}</p>
              <p className="text-xs text-red-600 dark:text-red-400 mt-1">Amount due — please pay promptly</p>
              <Link href="/student/fees" className="mt-3 block text-xs font-semibold text-red-600 hover:underline">View details →</Link>
            </>
          ) : (
            <>
              <p className="font-playfair font-bold text-2xl text-emerald-600">All Clear!</p>
              <p className="text-xs text-emerald-600 mt-1">No pending fees</p>
            </>
          )}
        </div>
      </div>

      {/* Today's timetable */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-semibold text-sm text-foreground mb-4">Today's Classes</h3>
        {d?.todayRoutine?.length > 0 ? (
          <div className="space-y-2">
            {d.todayRoutine.map((slot: any) => (
              <div key={slot.id} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">P{slot.periodNumber}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{slot.subject?.name}</p>
                  <p className="text-xs text-muted-foreground">{slot.teacher?.name ?? 'TBA'} · {slot.startTime}–{slot.endTime}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No classes scheduled today.</p>
        )}
      </div>

      {/* Recent results */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm text-foreground flex items-center gap-2"><BookOpen size={14} className="text-primary" />Recent Results</h3>
          <Link href="/student/results" className="text-xs text-primary hover:underline">View all</Link>
        </div>
        {d?.recentResults?.length > 0 ? (
          <div className="space-y-2">
            {d.recentResults.slice(0, 5).map((r: any) => (
              <div key={r.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.subject?.name ?? r.subjectId}</p>
                  <p className="text-xs text-muted-foreground">{r.exam?.name}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${
                    r.grade === 'A+' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30' :
                    r.grade === 'F' ? 'bg-red-50 text-red-700 dark:bg-red-900/30' :
                    'bg-blue-50 text-blue-700 dark:bg-blue-900/30'
                  }`}>{r.grade ?? '—'}</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.marksObtained}/{r.totalMarks}</p>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-sm text-muted-foreground text-center py-4">No results available yet.</p>}
      </div>

      {/* Notices */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm text-foreground flex items-center gap-2"><Bell size={14} className="text-primary" />Recent Notices</h3>
          <Link href="/student/notices" className="text-xs text-primary hover:underline">View all</Link>
        </div>
        {d?.notices?.length > 0 ? (
          <div className="space-y-2">
            {d.notices.map((n: any) => (
              <div key={n.id} className="flex items-start gap-2.5 py-2 border-b border-border last:border-0">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleDateString('en-BD')}</p>
                </div>
              </div>
            ))}
          </div>
        ) : <p className="text-sm text-muted-foreground text-center py-4">No recent notices.</p>}
      </div>
    </div>
  );
}
