'use client';

import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/app/Components/Dashboard/Sidebar';
import TopBar from '@/app/Components/Dashboard/TopBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, accessToken } = useAppSelector(s => s.auth);
  const router = useRouter();

  useEffect(() => {
    if (!user || !accessToken) router.push('/login');
  }, [user, accessToken, router]);

  if (!user) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-5 py-7">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
