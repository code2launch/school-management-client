'use client';

import { useState } from 'react';
import { useGetStudentsQuery, useDeleteStudentMutation } from '@/redux/features/student/studentApi';
import { useGetAllClassesQuery, useGetCurrentYearQuery } from '@/redux/features/school/schoolApi';
import PageHeader from '@/app/Components/Dashboard/PageHeader';
import EmptyState from '@/app/Components/Dashboard/EmptyState';
import { GraduationCap, Search, Plus, Trash2, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

export default function StudentsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('');

  const { data: yearData } = useGetCurrentYearQuery();
  const academicYearId = yearData?.data?.id;
  const { data: classesData } = useGetAllClassesQuery();
  const classes = classesData?.data ?? [];

  const { data, isLoading } = useGetStudentsQuery({
    page: String(page), limit: '15',
    ...(search && { searchTerm: search }),
    ...(classFilter && { classId: classFilter }),
    ...(academicYearId && { academicYearId }),
  });

  const [deleteStudent] = useDeleteStudentMutation();
  const students = data?.data ?? [];
  const meta = data?.meta;

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove ${name} from the system?`)) return;
    try {
      await deleteStudent(id).unwrap();
      toast.success('Student removed.');
    } catch {
      toast.error('Failed to remove student.');
    }
  };

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle={`${meta?.total ?? 0} students enrolled`}
        action={
          <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:-translate-y-0.5">
            <Plus size={15} /> Admit Student
          </button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3.5 py-2.5 flex-1 min-w-52">
          <Search size={14} className="text-muted-foreground flex-shrink-0" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name or student ID..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none flex-1"
          />
        </div>
        <select
          value={classFilter}
          onChange={e => { setClassFilter(e.target.value); setPage(1); }}
          className="px-3.5 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground outline-none focus:ring-2 focus:ring-ring cursor-pointer"
        >
          <option value="">All Classes</option>
          {classes.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-14 bg-muted rounded-xl animate-pulse" />
            ))}
          </div>
        ) : students.length === 0 ? (
          <EmptyState icon={GraduationCap} title="No students found"
            desc={search ? 'Try a different search term.' : 'Admit the first student to get started.'} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full school-table">
              <thead>
                <tr>
                  <th className="text-left">Student</th>
                  <th className="text-left">Student ID</th>
                  <th className="text-left">Class</th>
                  <th className="text-left">Parent</th>
                  <th className="text-left">Admitted</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s: any) => {
                  const enrollment = s.enrollments?.[0];
                  const parent = s.parents?.[0]?.parent;
                  return (
                    <tr key={s.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {s.name?.[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-sm">{s.name}</p>
                            <p className="text-xs text-muted-foreground">{s.gender ?? '—'}</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="badge-navy">{s.studentId}</span></td>
                      <td className="text-sm text-foreground">
                        {enrollment
                          ? `${enrollment.section?.class?.name} — ${enrollment.section?.name}`
                          : <span className="text-muted-foreground">—</span>}
                      </td>
                      <td>
                        {parent ? (
                          <div>
                            <p className="text-sm font-medium text-foreground">{parent.name}</p>
                            <p className="text-xs text-muted-foreground">{parent.phone}</p>
                          </div>
                        ) : <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="text-sm text-muted-foreground">{formatDate(s.createdAt)}</td>
                      <td>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          s.isActive
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                        }`}>{s.isActive ? 'Active' : 'Inactive'}</span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(s.id, s.name)}
                            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-muted-foreground hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {meta && meta.total > 15 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Showing {(page - 1) * 15 + 1}–{Math.min(page * 15, meta.total)} of {meta.total} students
            </p>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="p-1.5 rounded-lg hover:bg-accent disabled:opacity-40 transition-colors">
                <ChevronLeft size={15} />
              </button>
              <button onClick={() => setPage(p => p + 1)} disabled={page * 15 >= meta.total}
                className="p-1.5 rounded-lg hover:bg-accent disabled:opacity-40 transition-colors">
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
