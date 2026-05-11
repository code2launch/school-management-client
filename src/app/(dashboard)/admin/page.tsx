'use client';

import { useGetDashboardQuery } from '@/redux/features/school/schoolApi';
import StatCard from '@/app/Components/Dashboard/StatCard';
import { Users, GraduationCap, Wallet, ClipboardCheck, TrendingUp, AlertCircle, BookOpen, Bell } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data, isLoading } = useGetDashboardQuery();
  const stats = data?.data?.stats;
  const currentYear = data?.data?.currentYear;
  const recentAdmissions = data?.data?.recentAdmissions ?? [];
  const recentNotices = data?.data?.recentNotices ?? [];
  const breakdown = data?.data?.enrollmentBreakdown ?? [];

  if (isLoading) return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="stat-card animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-muted mb-4" />
            <div className="h-7 bg-muted rounded mb-2 w-24" />
            <div className="h-3 bg-muted rounded w-20" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-7">
      {/* Year banner */}
      {currentYear && (
        <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold text-foreground">Academic Year {currentYear.year}</span>
            <span className="text-xs text-muted-foreground">({formatDate(currentYear.startDate)} – {formatDate(currentYear.endDate)})</span>
          </div>
          <span className="badge-gold">Current Year</span>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={stats?.totalStudents ?? '—'} icon={GraduationCap}
          accent="bg-blue-500/10 text-blue-600 dark:text-blue-400" />
        <StatCard title="Total Teachers" value={stats?.totalTeachers ?? '—'} icon={Users}
          accent="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" />
        <StatCard title="Today Present" value={stats?.todayAttendance?.present ?? '—'} icon={ClipboardCheck}
          change={stats?.todayAttendance?.total ? `${Math.round(((stats.todayAttendance.present ?? 0) / stats.todayAttendance.total) * 100)}%` : undefined}
          positive accent="bg-amber-500/10 text-amber-600 dark:text-amber-400" />
        <StatCard title="Collected This Month" value={stats?.feeCollectedThisMonth ? formatCurrency(stats.feeCollectedThisMonth) : '৳ 0'}
          icon={Wallet} accent="bg-purple-500/10 text-purple-600 dark:text-purple-400" />
      </div>

      {/* Attendance breakdown + Dues alert */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Today attendance detail */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground text-sm">Today's Attendance</h3>
            <Link href="/admin/attendance" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          {stats?.todayAttendance ? (
            <div className="space-y-3">
              {[
                { label: 'Present', val: stats.todayAttendance.present ?? 0, color: 'bg-emerald-500' },
                { label: 'Absent', val: stats.todayAttendance.absent ?? 0, color: 'bg-red-500' },
                { label: 'Late', val: stats.todayAttendance.late ?? 0, color: 'bg-amber-500' },
                { label: 'Leave', val: stats.todayAttendance.leave ?? 0, color: 'bg-blue-500' },
              ].map(s => {
                const total = stats.todayAttendance.total || 1;
                const pct = Math.round((s.val / total) * 100);
                return (
                  <div key={s.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{s.label}</span>
                      <span className="font-semibold text-foreground">{s.val}</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s.color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No attendance marked today</p>
          )}
        </div>

        {/* Pending dues */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground text-sm">Fee Overview</h3>
            <Link href="/admin/fees" className="text-xs text-primary hover:underline">Manage</Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2">
                <TrendingUp size={15} className="text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">Collected</span>
              </div>
              <span className="font-playfair font-bold text-sm text-emerald-700 dark:text-emerald-300">
                {stats?.feeCollectedThisMonth ? formatCurrency(stats.feeCollectedThisMonth) : '৳ 0'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2">
                <AlertCircle size={15} className="text-red-600" />
                <span className="text-xs font-medium text-red-700 dark:text-red-300">Total Due</span>
              </div>
              <span className="font-playfair font-bold text-sm text-red-700 dark:text-red-300">
                {stats?.totalPendingDue ? formatCurrency(stats.totalPendingDue) : '৳ 0'}
              </span>
            </div>
            {stats?.studentsWithDues > 0 && (
              <p className="text-xs text-muted-foreground text-center">
                {stats.studentsWithDues} students with outstanding dues
              </p>
            )}
          </div>
        </div>

        {/* Class enrollment breakdown */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground text-sm">Enrollment by Class</h3>
            <Link href="/admin/students" className="text-xs text-primary hover:underline">All students</Link>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {breakdown.length > 0 ? breakdown.slice(0, 8).map((b: any) => (
              <div key={b.class?.id} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{b.class?.name}</span>
                <span className="font-semibold text-foreground bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {b.count}
                </span>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground text-center py-4">No enrollment data</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recent admissions */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
              <GraduationCap size={15} className="text-primary" /> Recent Admissions
            </h3>
            <Link href="/admin/students" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-2">
            {recentAdmissions.length > 0 ? recentAdmissions.map((s: any) => (
              <div key={s.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    {s.name?.[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.studentId}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{formatDate(s.createdAt)}</span>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground text-center py-4">No recent admissions</p>
            )}
          </div>
        </div>

        {/* Recent notices */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
              <Bell size={15} className="text-primary" /> Recent Notices
            </h3>
            <Link href="/admin/notices" className="text-xs text-primary hover:underline">All notices</Link>
          </div>
          <div className="space-y-2">
            {recentNotices.length > 0 ? recentNotices.map((n: any) => (
              <div key={n.id} className="py-2 border-b border-border last:border-0">
                <p className="text-xs font-semibold text-foreground mb-0.5">{n.title}</p>
                <div className="flex items-center gap-2">
                  <span className="badge-navy">{n.audience}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(n.createdAt)}</span>
                </div>
              </div>
            )) : (
              <p className="text-sm text-muted-foreground text-center py-4">No notices posted</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="font-semibold text-foreground text-sm mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { href: '/admin/students', icon: GraduationCap, label: 'Admit Student', color: 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800 dark:text-blue-400' },
            { href: '/admin/attendance', icon: ClipboardCheck, label: 'Mark Attendance', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800 dark:text-emerald-400' },
            { href: '/admin/fees', icon: Wallet, label: 'Record Payment', color: 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800 dark:text-amber-400' },
            { href: '/admin/notices', icon: Bell, label: 'Post Notice', color: 'bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-800 dark:text-rose-400' },
          ].map(a => (
            <Link key={a.href} href={a.href}
              className={`flex items-center gap-2.5 p-4 rounded-xl border card-hover ${a.color} transition-all`}>
              <a.icon size={16} />
              <span className="text-xs font-semibold">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
