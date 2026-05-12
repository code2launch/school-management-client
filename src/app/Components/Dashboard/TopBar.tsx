'use client';

import { usePathname } from 'next/navigation';
import { Bell, Search, Menu } from 'lucide-react';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import { useAppSelector } from '@/redux/hooks';
import { getInitials } from '@/lib/utils';
import { useState } from 'react';
import Link from 'next/link';

const PAGE_TITLES: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/students': 'Students',
  '/admin/teachers': 'Teachers',
  '/admin/attendance': 'Attendance',
  '/admin/fees': 'Fees',
  '/admin/exams': 'Exams',
  '/admin/notices': 'Notices',
  '/admin/reports': 'Reports',
  '/teacher': 'Dashboard',
  '/teacher/attendance': 'Attendance',
  '/teacher/exams': 'Exams & Marks',
  '/teacher/notices': 'Notices',
  '/student': 'Dashboard',
  '/student/attendance': 'My Attendance',
  '/student/fees': 'Fee Status',
  '/student/results': 'My Results',
  '/student/notices': 'Notices',
};

export default function TopBar() {
  const pathname = usePathname();
  const user = useAppSelector(s => s.auth.user);
  const title = PAGE_TITLES[pathname] ?? 'Dashboard';
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-30 flex items-center px-5 gap-4">
      <div className="ms-10 lg:ms-0 flex-1">
        <h1 className="font-playfair font-bold text-lg text-foreground">{title}</h1>
        <p className="text-xs text-muted-foreground hidden sm:block">
          {new Date().toLocaleDateString('en-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className={`hidden sm:flex items-center gap-2 bg-secondary border border-border rounded-xl px-3 py-2 transition-all ${searchOpen ? 'w-64' : 'w-40'}`}>
        <Search size={14} className="text-muted-foreground flex-shrink-0" />
        <input
          onFocus={() => setSearchOpen(true)}
          onBlur={() => setSearchOpen(false)}
          placeholder="Search..."
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 outline-none w-full"
        />
      </div>

      <Link href={`${user?.role === 'STUDENT' ? '/student' : user?.role === 'TEACHER' ? '/teacher' : '/admin'}/notices`} className="relative p-2 rounded-xl hover:bg-accent transition-colors">
        <Bell size={18} className="text-muted-foreground" />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[oklch(0.70_0.15_76)]" />
      </Link>

      <ThemeToggleButton />

      {user && (
        <div className="flex items-center gap-2.5 pl-2 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
            {getInitials(user.name)}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role.toLowerCase()}</p>
          </div>
        </div>
      )}
    </header>
  );
}
