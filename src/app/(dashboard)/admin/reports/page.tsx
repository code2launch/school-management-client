'use client';

import { useState } from 'react';
import { useGetAllClassesQuery, useGetSectionsByClassQuery, useGetCurrentYearQuery } from '@/redux/features/school/schoolApi';
import PageHeader from '@/app/Components/Dashboard/PageHeader';
import { BarChart3, Download, FileText, Users, Wallet, ClipboardCheck } from 'lucide-react';

const REPORTS = [
  { id: 'attendance', icon: ClipboardCheck, label: 'Monthly Attendance Report', desc: 'Student attendance summary by section and month', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  { id: 'fees', icon: Wallet, label: 'Fee Collection Report', desc: 'Payment summary with collected vs pending breakdown', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  { id: 'students', icon: Users, label: 'Student List by Class', desc: 'Full student roster with parent contacts', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  { id: 'results', icon: FileText, label: 'Result Sheet', desc: 'Class-wise exam results with grades and ranks', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
];

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState('attendance');
  const [classId, setClassId] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));
  const [year] = useState(String(new Date().getFullYear()));

  const { data: yearData } = useGetCurrentYearQuery();
  const academicYearId = yearData?.data?.id ?? '';
  const { data: classesData } = useGetAllClassesQuery();
  const classes = classesData?.data ?? [];
  const { data: sectionsData } = useGetSectionsByClassQuery(classId, { skip: !classId });
  const sections = sectionsData?.data ?? [];

  const buildReportUrl = () => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api/v1';
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';
    const params = new URLSearchParams({ academicYearId, ...(classId && { classId }), ...(sectionId && { sectionId }), ...(month && { month }), year });
    switch (activeReport) {
      case 'attendance': return `${base}/reports/attendance?${params}`;
      case 'fees': return `${base}/reports/fees?${params}`;
      case 'students': return `${base}/reports/students?${params}`;
      default: return '#';
    }
  };

  const active = REPORTS.find(r => r.id === activeReport)!;

  return (
    <div>
      <PageHeader title="Reports" subtitle="Generate and export school reports" />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Report selector */}
        <div className="lg:col-span-1 space-y-2">
          {REPORTS.map(r => (
            <button key={r.id} onClick={() => setActiveReport(r.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                activeReport === r.id
                  ? 'bg-primary/5 border-primary/30 shadow-sm'
                  : 'bg-card border-border hover:bg-accent'
              }`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${r.color}`}>
                <r.icon size={16} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{r.label}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Report config */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active.color}`}>
              <active.icon size={18} />
            </div>
            <div>
              <h3 className="font-playfair font-bold text-lg text-foreground">{active.label}</h3>
              <p className="text-sm text-muted-foreground">{active.desc}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Class</label>
                <select value={classId} onChange={e => { setClassId(e.target.value); setSectionId(''); }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring">
                  <option value="">All Classes</option>
                  {classes.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Section</label>
                <select value={sectionId} onChange={e => setSectionId(e.target.value)} disabled={!classId}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring disabled:opacity-50">
                  <option value="">All Sections</option>
                  {sections.map((s: any) => <option key={s.id} value={s.id}>Section {s.name}</option>)}
                </select>
              </div>
            </div>

            {(activeReport === 'attendance' || activeReport === 'fees') && (
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Month</label>
                  <select value={month} onChange={e => setMonth(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring">
                    {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
                      <option key={m} value={i+1}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Year</label>
                  <input value={year} readOnly className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted text-sm text-muted-foreground outline-none" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
            <a href={buildReportUrl()} target="_blank" rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:-translate-y-0.5">
              <BarChart3 size={15} /> Preview Report
            </a>
            <button className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-accent transition-colors">
              <Download size={15} /> Export as CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
