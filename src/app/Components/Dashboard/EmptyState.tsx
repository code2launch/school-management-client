import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  desc?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon: Icon, title, desc, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-4">
        <Icon size={22} className="text-muted-foreground" />
      </div>
      <p className="font-semibold text-foreground mb-1">{title}</p>
      {desc && <p className="text-sm text-muted-foreground max-w-xs">{desc}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
