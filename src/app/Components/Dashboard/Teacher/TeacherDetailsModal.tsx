/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { X } from 'lucide-react';
import { useGetTeacherByIdQuery } from '@/redux/features/teacher/teacherApi';
import { formatDate } from '@/lib/utils';

interface Props {
  teacherId: string | null;
  onClose: () => void;
}

export default function TeacherDetailsModal({
  teacherId,
  onClose,
}: Props) {
  const { data, isLoading } =
    useGetTeacherByIdQuery(
      teacherId!,
      {
        skip: !teacherId,
      }
    );

  if (!teacherId) return null;

  const teacher = data?.data;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-3xl shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold">
            Teacher Details
          </h2>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent"
          >
            <X size={18} />
          </button>
        </div>

        {isLoading ? (
          <div className="p-6">
            Loading...
          </div>
        ) : (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
                {teacher?.name?.[0]}
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  {teacher?.name}
                </h3>

                <p className="text-muted-foreground">
                  {teacher?.employeeId}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 text-sm">
              <Info label="Phone" value={teacher?.phone} />
              <Info label="Email" value={teacher?.email} />
              <Info label="Gender" value={teacher?.gender} />
              <Info
                label="Join Date"
                value={
                  teacher?.joinDate
                    ? formatDate(teacher.joinDate)
                    : '—'
                }
              />
            </div>

            <div>
              <h4 className="font-semibold mb-3">
                Subjects
              </h4>

              <div className="flex flex-wrap gap-2">
                {teacher?.subjectAssignments?.map((s: any) => (
                  <span
                    key={s.id}
                    className="badge-gold"
                  >
                    {s.subject?.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-muted-foreground text-xs mb-1">
        {label}
      </p>

      <p className="font-medium">
        {value || '—'}
      </p>
    </div>
  );
}