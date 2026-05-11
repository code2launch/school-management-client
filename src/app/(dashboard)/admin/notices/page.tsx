'use client';

import { useState } from 'react';
import { useGetNoticesQuery, useCreateNoticeMutation, useDeleteNoticeMutation } from '@/redux/features/notice/noticeApi';
import PageHeader from '@/app/Components/Dashboard/PageHeader';
import EmptyState from '@/app/Components/Dashboard/EmptyState';
import { Bell, Plus, Trash2, X, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

const AUDIENCES = ['ALL', 'STUDENTS', 'PARENTS', 'TEACHERS', 'STAFF'];
const AUD_COLORS: Record<string, string> = {
  ALL: 'bg-primary/10 text-primary',
  STUDENTS: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  PARENTS: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  TEACHERS: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  STAFF: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
};

function CreateNoticeModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState('ALL');
  const [saving, setSaving] = useState(false);
  const [createNotice] = useCreateNoticeMutation();

  const handleSubmit = async () => {
    if (!title || !content) { toast.error('Title and content are required.'); return; }
    setSaving(true);
    try {
      await createNotice({ title, content, audience, isPublished: true }).unwrap();
      toast.success('Notice posted!');
      onClose();
    } catch { toast.error('Failed to post notice.'); } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-playfair font-bold text-lg text-foreground">Post Notice</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground"><X size={16} /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Notice title..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/60" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Audience</label>
            <div className="flex flex-wrap gap-2">
              {AUDIENCES.map(a => (
                <button key={a} onClick={() => setAudience(a)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border ${
                    audience === a ? AUD_COLORS[a] + ' border-current' : 'border-border text-muted-foreground hover:bg-accent'
                  }`}>{a}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Content</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={5}
              placeholder="Write the notice content here..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring resize-none placeholder:text-muted-foreground/60" />
          </div>
        </div>
        <div className="flex gap-3 p-5 border-t border-border">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-accent transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
            {saving ? <><Loader2 size={14} className="animate-spin" />Posting...</> : 'Post Notice'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NoticesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [audience, setAudience] = useState('');
  const { data, isLoading } = useGetNoticesQuery({ ...(audience && { audience }) });
  const [deleteNotice] = useDeleteNoticeMutation();
  const notices = data?.data ?? [];

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this notice?')) return;
    try { await deleteNotice(id).unwrap(); toast.success('Notice deleted.'); }
    catch { toast.error('Failed to delete.'); }
  };

  return (
    <div>
      {showCreate && <CreateNoticeModal onClose={() => setShowCreate(false)} />}
      <PageHeader
        title="Notices"
        subtitle={`${data?.meta?.total ?? 0} notices posted`}
        action={
          <button onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:-translate-y-0.5">
            <Plus size={15} /> Post Notice
          </button>
        }
      />

      {/* Audience filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['', ...AUDIENCES].map(a => (
          <button key={a} onClick={() => setAudience(a)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
              audience === a ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:bg-accent'
            }`}>{a || 'All'}</button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-24 bg-muted rounded-2xl animate-pulse" />)}
        </div>
      ) : notices.length === 0 ? (
        <EmptyState icon={Bell} title="No notices yet" desc="Post a notice to inform students, parents, or teachers." />
      ) : (
        <div className="space-y-3">
          {notices.map((n: any) => (
            <div key={n.id} className="bg-card border border-border rounded-2xl p-5 card-hover shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{n.title}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${AUD_COLORS[n.audience] ?? AUD_COLORS.ALL}`}>
                      {n.audience}
                    </span>
                    {!n.isPublished && <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-secondary">Draft</span>}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{n.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">{formatDate(n.createdAt)}</p>
                </div>
                <button onClick={() => handleDelete(n.id)}
                  className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-muted-foreground hover:text-red-600 flex-shrink-0">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
