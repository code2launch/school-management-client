'use client';

import { AlertCircle, TrendingUp, Wallet } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface FeesStatsProps {
  totalCollected: number;
  totalDue: number;
  totalExpected: number;
}

export function FeesStats({ totalCollected, totalDue, totalExpected }: FeesStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp size={18} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Collected</p>
            <p className="text-2xl font-bold">{formatCurrency(totalCollected)}</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
            <AlertCircle size={18} className="text-red-500" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Pending Due</p>
            <p className="text-2xl font-bold text-red-500">{formatCurrency(totalDue)}</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Wallet size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Expected</p>
            <p className="text-2xl font-bold">{formatCurrency(totalExpected)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}