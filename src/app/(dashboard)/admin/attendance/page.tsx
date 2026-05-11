'use client';

import { useState } from 'react';
import { useGetAllClassesQuery, useGetCurrentYearQuery, useGetSectionsByClassQuery } from '@/redux/features/school/schoolApi';
import { useGetAttendanceByDateQuery, useMarkStudentAttendanceMutation } from '@/redux/features/attendance/attendanceApi';
import PageHeader from '@/app/Components/Dashboard/PageHeader';
import { ClipboardCheck, Save, Loader2 } from 'lucide-react';
import { getAttendanceColor } from '@/lib/utils';
import { toast } from 'sonner';

type AttStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'LEAVE';
const STATUSES: AttStatus[] = ['PRESENT', 'ABSENT', 'LATE', 'LEAVE'];

export default function AttendancePage() {
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [classId, setClassId] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [statusMap, setStatusMap] = useState<Record<string, AttStatus>>({});
  const [saving, setSaving] = useState(false);

  const { data: yearData } = useGetCurrentYearQuery();
  const academicYearId = yearData?.data?.id ?? '';
  const { data: classesData } = useGetAllClassesQuery();
  const classes = classesData?.data ?? [];
  const { data: sectionsData } = useGetSectionsByClassQuery(classId, { skip: !classId });
  const sections = sectionsData?.data ?? [];

  const { data: attData, isLoading: attLoading } = useGetAttendanceByDateQuery(
    { sectionId, date, academicYearId },
    { skip: !sectionId || !academicYearId }
  );
  const rows = attData?.data ?? [];

  const [markAttendance] = useMarkStudentAttendanceMutation();

  // Pre-fill statusMap when data loads
  const prefilled = rows.reduce((acc: Record<string, AttStatus>, r: any) => {
    if (r.attendance?.status) acc[r.student.id] = r.attendance.status;
    return acc;
  }, {});

  const getStatus = (studentId: string): AttStatus =>
    statusMap[studentId] ?? prefilled[studentId] ?? 'PRESENT';

  const setStatus = (studentId: string, status: AttStatus) =>
    setStatusMap(prev => ({ ...prev, [studentId]: status }));

  const markAll = (status: AttStatus) => {
    const next: Record<string, AttStatus> = {};
    rows.forEach((r: any) => { next[r.student.id] = status; });
    setStatusMap(next);
  };

  const handleSave = async () => {
    if (!sectionId || !academicYearId || rows.length === 0) return;
    setSaving(true);
    try {
      const records = rows.map((r: any) => ({
        studentId: r.student.id,
        status: getStatus(r.student.id),
      }));
      await markAttendance({ sectionId, academicYearId, date, records }).unwrap();
      toast.success(`Attendance saved for ${rows.length} students.`);
    } catch {
      toast.error('Failed to save attendance.');
    } finally { setSaving(false); }
  };

  const summary = rows.reduce((acc: Record<string, number>, r: any) => {
    const s = getStatus(r.student.id);
    acc[s] = (acc[s] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <PageHeader title="Attendance" subtitle="Mark daily student attendance" />

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input type="date" value={date} onChange={e => setDate(e.target.value)}
          max={today}
          className="px-3.5 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
        <select value={classId} onChange={e => { setClassId(e.target.value); setSectionId(''); setStatusMap({}); }}
          className="px-3.5 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-ring cursor-pointer">
          <option value="">Select Class</option>
          {classes.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select value={sectionId} onChange={e => { setSectionId(e.target.value); setStatusMap({}); }}
          disabled={!classId}
          className="px-3.5 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-ring cursor-pointer disabled:opacity-50">
          <option value="">Select Section</option>
          {sections.map((s: any) => <option key={s.id} value={s.id}>Section {s.name}</option>)}
        </select>
      </div>

      {sectionId && (
        <>
          {/* Summary + quick mark */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div className="flex gap-3">
              {STATUSES.map(s => (
                <div key={s} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${getAttendanceColor(s)}`}>
                  {s}: {summary[s] ?? 0}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <span className="text-xs text-muted-foreground self-center">Mark all:</span>
              {STATUSES.map(s => (
                <button key={s} onClick={() => markAll(s)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${getAttendanceColor(s)}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Attendance list */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm mb-5">
            {attLoading ? (
              <div className="p-6 space-y-3">
                {[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-muted rounded-xl animate-pulse" />)}
              </div>
            ) : rows.length === 0 ? (
              <div className="py-12 text-center">
                <ClipboardCheck size={32} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No students enrolled in this section.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full school-table">
                  <thead>
                    <tr>
                      <th className="text-left">#</th>
                      <th className="text-left">Student</th>
                      <th className="text-left">Student ID</th>
                      <th className="text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r: any, i: number) => {
                      const current = getStatus(r.student.id);
                      return (
                        <tr key={r.student.id}>
                          <td className="text-muted-foreground w-10">{r.rollNumber ?? i + 1}</td>
                          <td>
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {r.student.name?.[0]}
                              </div>
                              <span className="font-medium text-sm text-foreground">{r.student.name}</span>
                            </div>
                          </td>
                          <td><span className="badge-navy text-xs">{r.student.studentId}</span></td>
                          <td>
                            <div className="flex gap-1.5 flex-wrap">
                              {STATUSES.map(s => (
                                <button key={s} onClick={() => setStatus(r.student.id, s)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                                    current === s
                                      ? getAttendanceColor(s) + ' ring-2 ring-offset-1 ring-current'
                                      : 'bg-secondary text-muted-foreground hover:bg-accent'
                                  }`}>
                                  {s}
                                </button>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {rows.length > 0 && (
            <div className="flex justify-end">
              <button onClick={handleSave} disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-60 shadow-sm hover:-translate-y-0.5 disabled:translate-y-0">
                {saving ? <><Loader2 size={15} className="animate-spin" />Saving...</> : <><Save size={15} />Save Attendance</>}
              </button>
            </div>
          )}
        </>
      )}

      {!sectionId && (
        <div className="bg-card border border-dashed border-border rounded-2xl py-14 text-center">
          <ClipboardCheck size={36} className="text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold text-foreground mb-1">Select a class and section</p>
          <p className="text-sm text-muted-foreground">Choose from the dropdowns above to begin marking attendance.</p>
        </div>
      )}
    </div>
  );
}
