'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/features/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { cn, getInitials } from '@/lib/utils';
import {
  LayoutDashboard, GraduationCap, Users, ClipboardCheck,
  Wallet, BookOpen, Bell, BarChart3, Settings, LogOut, ChevronLeft
} from 'lucide-react';
import { useState } from 'react';

const ADMIN_LINKS = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/students', icon: GraduationCap, label: 'Students' },
  { href: '/admin/teachers', icon: Users, label: 'Teachers' },
  { href: '/admin/attendance', icon: ClipboardCheck, label: 'Attendance' },
  { href: '/admin/fees', icon: Wallet, label: 'Fees' },
  { href: '/admin/exams', icon: BookOpen, label: 'Exams' },
  { href: '/admin/notices', icon: Bell, label: 'Notices' },
  { href: '/admin/reports', icon: BarChart3, label: 'Reports' },
];

const TEACHER_LINKS = [
  { href: '/teacher', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/teacher/attendance', icon: ClipboardCheck, label: 'Attendance' },
  { href: '/teacher/exams', icon: BookOpen, label: 'Exams & Marks' },
  { href: '/teacher/notices', icon: Bell, label: 'Notices' },
];

const STUDENT_LINKS = [
  { href: '/student', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/student/attendance', icon: ClipboardCheck, label: 'My Attendance' },
  { href: '/student/fees', icon: Wallet, label: 'Fee Status' },
  { href: '/student/results', icon: BookOpen, label: 'My Results' },
  { href: '/student/notices', icon: Bell, label: 'Notices' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const user = useAppSelector(s => s.auth.user);
  const [collapsed, setCollapsed] = useState(false);

  const links =
    user?.role === 'ADMIN' ? ADMIN_LINKS :
    user?.role === 'TEACHER' ? TEACHER_LINKS : STUDENT_LINKS;

  return (
    <aside className={cn(
      'hidden lg:flex flex-col h-screen sticky top-0 bg-sidebar border-r border-sidebar-border transition-all duration-300 overflow-hidden',
      collapsed ? 'w-16' : 'w-60'
    )}>
      {/* Logo */}
      <div className={cn('flex items-center h-16 px-4 border-b border-sidebar-border gap-3', collapsed && 'justify-center')}>
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary/20 border border-sidebar-primary/30 flex items-center justify-center flex-shrink-0">
          <GraduationCap size={16} className="text-sidebar-primary" />
        </div>
        {!collapsed && (
          <span className="font-playfair font-bold text-lg text-sidebar-foreground">
            Edu<span className="text-sidebar-primary">Core</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <ul className="space-y-0.5">
          {links.map(l => {
            const active = pathname === l.href || (l.href !== '/admin' && l.href !== '/teacher' && l.href !== '/student' && pathname.startsWith(l.href));
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  title={collapsed ? l.label : undefined}
                  className={cn(
                    'sidebar-link',
                    active && 'active',
                    collapsed && 'justify-center px-0'
                  )}
                >
                  <l.icon size={17} className="flex-shrink-0" />
                  {!collapsed && <span>{l.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn('sidebar-link w-full', collapsed && 'justify-center px-0')}
        >
          <ChevronLeft size={16} className={cn('flex-shrink-0 transition-transform', collapsed && 'rotate-180')} />
          {!collapsed && <span>Collapse</span>}
        </button>
        <button
          onClick={() => dispatch(logout())}
          className={cn('sidebar-link w-full text-red-400 hover:bg-red-500/10 hover:text-red-400', collapsed && 'justify-center px-0')}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
        {!collapsed && user && (
          <div className="flex items-center gap-2.5 px-2 py-2 mt-1 rounded-lg bg-sidebar-accent/50">
            <div className="w-7 h-7 rounded-full bg-sidebar-primary/20 text-sidebar-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
              {getInitials(user.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/50 capitalize">{user.role.toLowerCase()}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
