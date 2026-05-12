'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { X } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
  student: any;
}

export default function StudentDetailsModal({
  open,
  onClose,
  student,
}: Props) {
  if (!open || !student) return null;

  const enrollment = student.enrollments?.[0];
  const parent = student.parents?.[0]?.parent;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-card border border-border shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Student Details
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Detailed student information
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl hover:bg-accent flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
              {student.name?.[0]}
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground">
                {student.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {student.studentId}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Gender
              </p>
              <p className="text-sm font-medium text-foreground">
                {student.gender || '—'}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Date of Birth
              </p>
              <p className="text-sm font-medium text-foreground">
                {student.dob ? formatDate(student.dob) : '—'}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Class
              </p>
              <p className="text-sm font-medium text-foreground">
                {enrollment?.section?.class?.name || '—'}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Section
              </p>
              <p className="text-sm font-medium text-foreground">
                {enrollment?.section?.name || '—'}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Parent Name
              </p>
              <p className="text-sm font-medium text-foreground">
                {parent?.name || '—'}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Parent Phone
              </p>
              <p className="text-sm font-medium text-foreground">
                {parent?.phone || '—'}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              Address
            </p>

            <div className="rounded-2xl border border-border bg-muted/30 p-4 text-sm text-foreground min-h-20">
              {student.address || 'No address provided'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}