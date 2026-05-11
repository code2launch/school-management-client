'use client';

import { useState } from 'react';
import { useGetExamsQuery, useCreateExamMutation, usePublishExamMutation } from '@/redux/features/exam/examApi';
import { useGetCurrentYearQuery } from '@/redux/features/school/schoolApi';
import PageHeader from '@/app/Components/Dashboard/PageHeader';
import EmptyState from '@/app/Components/Dashboard/EmptyState';
import { BookOpen, Plus, Eye, CheckCircle, Loader2, X } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

const EXAM_TYPES = ['CLASS_TEST', 'MID_TERM', 'FINAL', 'OTHER'];
const TYPE_COLORS: Record<string, string> = {
  CLASS_TEST: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  MID_TERM: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  FINAL: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  OTHER: 'bg-gray-50 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400',
};

function CreateExamModal({ onClose, academicYearId }: { onClose: () => void; academicYearId: string }) {
  const [name, setName] = useState('');
  const [examType, setExamType] = useState('MID_TERM');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [saving, setSaving] = useState(false);
  const [createExam] = useCreateExamMutation();

  const handleSubmit = async () => {
    if (!name) { toast.error('Exam name is required.'); return; }
    setSaving(true);
    try {
      await createExam({ name, examType, academicYearId, startDate: startDate || undefined, endDate: endDate || undefined }).unwrap();
      toast.success('Exam created!');
      onClose();
    } catch { toast.error('Failed to create exam.'); } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-playfair font-bold text-lg text-foreground">Create Exam</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground"><X size={16} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Exam Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Mid-Term Examination 2024"
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/60" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Exam Type</label>
            <select value={examType} onChange={e => setExamType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring">
              {EXAM_TYPES.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Start Date</label>
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">End Date</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
        </div>
        <div className="flex gap-3 p-5 border-t border-border">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-accent transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
            {saving ? <><Loader2 size={14} className="animate-spin" />Creating...</> : 'Create Exam'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ExamsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const { data: yearData } = useGetCurrentYearQuery();
  const academicYearId = yearData?.data?.id ?? '';
  const { data, isLoading } = useGetExamsQuery({ academicYearId }, { skip: !academicYearId });
  const [publishExam] = usePublishExamMutation();
  const exams = data?.data ?? [];

  const handlePublish = async (id: string) => {
    try { await publishExam(id).unwrap(); toast.success('Exam published!'); }
    catch { toast.error('Failed to publish.'); }
  };

  return (
    <div>
      {showCreate && <CreateExamModal onClose={() => setShowCreate(false)} academicYearId={academicYearId} />}
      <PageHeader
        title="Exams & Results"
        subtitle={`${exams.length} exams this year`}
        action={
          <button onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:-translate-y-0.5">
            <Plus size={15} /> Create Exam
          </button>
        }
      />

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-36 bg-muted rounded-2xl animate-pulse" />)}
        </div>
      ) : exams.length === 0 ? (
        <EmptyState icon={BookOpen} title="No exams created" desc="Create your first exam to start entering marks." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam: any) => (
            <div key={exam.id} className="bg-card border border-border rounded-2xl p-5 card-hover shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${TYPE_COLORS[exam.examType] ?? TYPE_COLORS.OTHER}`}>
                  {exam.examType.replace('_', ' ')}
                </span>
                {exam.isPublished
                  ? <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold"><CheckCircle size={12} />Published</span>
                  : <span className="text-xs text-muted-foreground">Draft</span>}
              </div>
              <h3 className="font-playfair font-semibold text-foreground mb-1 leading-snug">{exam.name}</h3>
              {exam.startDate && (
                <p className="text-xs text-muted-foreground mb-3">
                  {formatDate(exam.startDate)}{exam.endDate ? ` – ${formatDate(exam.endDate)}` : ''}
                </p>
              )}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>{exam._count?.subjects ?? 0} subjects</span>
                <span>{exam._count?.results ?? 0} results entered</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                  <Eye size={13} /> View
                </button>
                {!exam.isPublished && (
                  <button onClick={() => handlePublish(exam.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle size={13} /> Publish
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
