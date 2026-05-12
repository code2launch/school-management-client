/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useGetTeachersQuery, useDeleteTeacherMutation } from '@/redux/features/teacher/teacherApi';
import PageHeader from '@/app/Components/Dashboard/PageHeader';
import EmptyState from '@/app/Components/Dashboard/EmptyState';
import { Users, Search, Plus, Trash2, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';
import CreateTeacherModal from '../../../Components/Dashboard/Teacher/CreateTeacherModal';
import TeacherDetailsModal from '../../../Components/Dashboard/Teacher/TeacherDetailsModal';

export default function TeachersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [detailsId, setDetailsId] = useState<string | null>(null);

  const { data, isLoading } = useGetTeachersQuery({
    page: String(page), limit: '15',
    ...(search && { searchTerm: search }),
  });

  const [deleteTeacher] = useDeleteTeacherMutation();
  const teachers = data?.data ?? [];
  const meta = data?.meta;

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Remove ${name}?`)) return;
    try {
      await deleteTeacher(id).unwrap();
      toast.success('Teacher removed.');
    } catch { toast.error('Failed to remove.'); }
  };

  return (
    <div>
      <PageHeader
        title="Teachers"
        subtitle={`${meta?.total ?? 0} teaching staff`}
        action={
          <button onClick={() => setCreateOpen(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:-translate-y-0.5">
            <Plus size={15} /> Add Teacher
          </button>
        }
      />

      <div className="flex gap-3 mb-5">
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3.5 py-2.5 flex-1">
          <Search size={14} className="text-muted-foreground flex-shrink-0" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search by name, phone..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none flex-1" />
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(6)].map((_, i) => <div key={i} className="h-14 bg-muted rounded-xl animate-pulse" />)}
          </div>
        ) : teachers.length === 0 ? (
          <EmptyState icon={Users} title="No teachers found" desc="Add your first teacher to get started." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full school-table">
              <thead>
                <tr>
                  <th className="text-left">Teacher</th>
                  <th className="text-left">Employee ID</th>
                  <th className="text-left">Phone</th>
                  <th className="text-left">Subjects</th>
                  <th className="text-left">Joined</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((t: any) => (
                  <tr key={t.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {t.name?.[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.email ?? t.gender ?? '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge-navy">{t.employeeId}</span></td>
                    <td className="text-sm text-foreground">{t.phone}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {t.subjectAssignments?.slice(0, 2).map((sa: any) => (
                          <span key={sa.id} className="badge-gold text-xs">{sa.subject?.name}</span>
                        ))}
                        {t.subjectAssignments?.length > 2 && (
                          <span className="text-xs text-muted-foreground">+{t.subjectAssignments.length - 2}</span>
                        )}
                        {!t.subjectAssignments?.length && <span className="text-muted-foreground text-sm">—</span>}
                      </div>
                    </td>
                    <td className="text-sm text-muted-foreground">{t.joinDate ? formatDate(t.joinDate) : '—'}</td>
                    <td>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${t.isActive
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                        }`}>{t.isActive ? 'Active' : 'Inactive'}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setDetailsId(t.id)} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
                          <Eye size={14} />
                        </button>
                        <button onClick={() => handleDelete(t.id, t.name)}
                          className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-muted-foreground hover:text-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {meta && meta.total > 15 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-border">
            <p className="text-xs text-muted-foreground">Showing {(page - 1) * 15 + 1}–{Math.min(page * 15, meta.total)} of {meta.total}</p>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg hover:bg-accent disabled:opacity-40 transition-colors"><ChevronLeft size={15} /></button>
              <button onClick={() => setPage(p => p + 1)} disabled={page * 15 >= meta.total} className="p-1.5 rounded-lg hover:bg-accent disabled:opacity-40 transition-colors"><ChevronRight size={15} /></button>
            </div>
          </div>
        )}
      </div>
      <CreateTeacherModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />

      <TeacherDetailsModal
        teacherId={detailsId}
        onClose={() => setDetailsId(null)}
      />
    </div>
  );
}
