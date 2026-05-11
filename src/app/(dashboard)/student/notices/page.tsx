'use client';
import { Bell, ClipboardCheck, Wallet, BookOpen } from 'lucide-react';
import EmptyState from '@/app/Components/Dashboard/EmptyState';
import PageHeader from '@/app/Components/Dashboard/PageHeader';

export default function StudentNoticesPage() {
  const icons: Record<string, any> = { attendance: ClipboardCheck, fees: Wallet, results: BookOpen, notices: Bell };
  const Icon = icons['notices'];
  return (
    <div>
      <PageHeader title="Notices" subtitle="Your personal Notices overview" />
      <div className="bg-card border border-border rounded-2xl">
        <EmptyState icon={Icon} title="Coming Soon" desc="This view will show your Notices data. Connect your backend to load live data." />
      </div>
    </div>
  );
}
