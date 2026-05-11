import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  positive?: boolean;
  accent?: string;
  className?: string;
}

export default function StatCard({ title, value, icon: Icon, change, positive, accent = 'bg-primary/10 text-primary', className }: StatCardProps) {
  return (
    <div className={cn('stat-card', className)}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', accent)}>
          <Icon size={18} />
        </div>
        {change && (
          <span className={cn(
            'text-xs font-semibold px-2 py-0.5 rounded-full',
            positive ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30' : 'bg-red-50 text-red-600 dark:bg-red-900/30'
          )}>
            {positive ? '↑' : '↓'} {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-playfair font-bold text-foreground mb-0.5">{value}</p>
      <p className="text-xs text-muted-foreground font-medium">{title}</p>
    </div>
  );
}
