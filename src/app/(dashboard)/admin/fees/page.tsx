'use client';

import { useState } from 'react';
import { useGetPendingDuesQuery, useGetFeeCollectionReportQuery, useRecordPaymentMutation } from '@/redux/features/fees/feesApi';
import { useGetStudentsQuery, useGetStudentByIdQuery } from '@/redux/features/student/studentApi';
import { useGetCurrentYearQuery } from '@/redux/features/school/schoolApi';
import PageHeader from '@/app/Components/Dashboard/PageHeader';
import { Wallet, AlertCircle, TrendingUp, Search, Plus, Loader2, X } from 'lucide-react';
import { formatCurrency, formatDate, getPaymentStatusColor } from '@/lib/utils';
import { toast } from 'sonner';

type FeeType = 'ADMISSION' | 'MONTHLY_TUITION' | 'EXAM' | 'OTHER';

function PaymentModal({ onClose, academicYearId }: { onClose: () => void; academicYearId: string }) {
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [feeType, setFeeType] = useState<FeeType>('MONTHLY_TUITION');
  const [amount, setAmount] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [saving, setSaving] = useState(false);

  const { data: studentsData } = useGetStudentsQuery({ searchTerm: studentSearch, limit: '8', academicYearId }, { skip: !studentSearch });
  const { data: studentData } = useGetStudentByIdQuery(selectedStudentId, { skip: !selectedStudentId });
  const students = studentsData?.data ?? [];
  const selectedStudent = studentData?.data;

  const [recordPayment] = useRecordPaymentMutation();

  const handleSubmit = async () => {
    if (!selectedStudentId || !amount || !paidAmount) { toast.error('Please fill all required fields.'); return; }
    setSaving(true);
    try {
      await recordPayment({
        studentId: selectedStudentId,
        academicYearId,
        feeType,
        amount: Number(amount),
        paidAmount: Number(paidAmount),
        month: feeType === 'MONTHLY_TUITION' ? Number(month) : undefined,
        year: feeType === 'MONTHLY_TUITION' ? new Date().getFullYear() : undefined,
        paymentMethod,
        paymentDate: new Date().toISOString(),
      }).unwrap();
      toast.success('Payment recorded! Receipt generated.');
      onClose();
    } catch (e: any) {
      toast.error(e?.data?.message ?? 'Failed to record payment.');
    } finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-playfair font-bold text-lg text-foreground">Record Payment</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground"><X size={16} /></button>
        </div>
        <div className="p-5 space-y-4">
          {/* Student search */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Student</label>
            {selectedStudent ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20">
                <div>
                  <p className="text-sm font-semibold text-foreground">{selectedStudent.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedStudent.studentId}</p>
                </div>
                <button onClick={() => setSelectedStudentId('')} className="text-muted-foreground hover:text-destructive transition-colors"><X size={14} /></button>
              </div>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-3 py-2.5">
                  <Search size={13} className="text-muted-foreground" />
                  <input value={studentSearch} onChange={e => setStudentSearch(e.target.value)}
                    placeholder="Search student..." className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-muted-foreground/60" />
                </div>
                {students.length > 0 && studentSearch && (
                  <div className="absolute top-full mt-1 left-0 right-0 bg-card border border-border rounded-xl shadow-lg z-10 overflow-hidden">
                    {students.map((s: any) => (
                      <button key={s.id} onClick={() => { setSelectedStudentId(s.id); setStudentSearch(''); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-accent text-left transition-colors">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{s.name[0]}</div>
                        <div><p className="text-sm font-medium text-foreground">{s.name}</p><p className="text-xs text-muted-foreground">{s.studentId}</p></div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Fee Type</label>
              <select value={feeType} onChange={e => setFeeType(e.target.value as FeeType)}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring">
                <option value="MONTHLY_TUITION">Monthly Tuition</option>
                <option value="ADMISSION">Admission</option>
                <option value="EXAM">Exam</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            {feeType === 'MONTHLY_TUITION' && (
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Month</label>
                <select value={month} onChange={e => setMonth(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring">
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
                    <option key={m} value={i+1}>{m}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Total Amount (৳)</label>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                placeholder="1200"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/60" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Paid Amount (৳)</label>
              <input type="number" value={paidAmount} onChange={e => setPaidAmount(e.target.value)}
                placeholder="1200"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground/60" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Payment Method</label>
            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground outline-none focus:ring-2 focus:ring-ring">
              {['Cash', 'bKash', 'Nagad', 'Bank Transfer', 'Cheque'].map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-3 p-5 border-t border-border">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-accent transition-colors">Cancel</button>
          <button onClick={handleSubmit} disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
            {saving ? <><Loader2 size={14} className="animate-spin" />Saving...</> : 'Record Payment'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeesPage() {
  const [showModal, setShowModal] = useState(false);
  const { data: yearData } = useGetCurrentYearQuery();
  const academicYearId = yearData?.data?.id ?? '';

  const { data: duesData, isLoading: duesLoading } = useGetPendingDuesQuery(
    { academicYearId }, { skip: !academicYearId }
  );
  const { data: reportData } = useGetFeeCollectionReportQuery(
    { academicYearId }, { skip: !academicYearId }
  );

  const dues = duesData?.data ?? [];
  const report = reportData?.data;

  return (
    <div>
      {showModal && <PaymentModal onClose={() => setShowModal(false)} academicYearId={academicYearId} />}
      <PageHeader
        title="Fees Management"
        subtitle="Track payments and pending dues"
        action={
          <button onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:-translate-y-0.5">
            <Plus size={15} /> Record Payment
          </button>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <TrendingUp size={16} className="text-emerald-600" />
            </div>
            <span className="text-sm font-semibold text-muted-foreground">Total Collected</span>
          </div>
          <p className="font-playfair font-bold text-2xl text-foreground">
            {report ? formatCurrency(report.totalCollected) : '—'}
          </p>
          {report && <p className="text-xs text-muted-foreground mt-1">{report.collectionRate}% collection rate</p>}
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center">
              <AlertCircle size={16} className="text-red-500" />
            </div>
            <span className="text-sm font-semibold text-muted-foreground">Total Pending</span>
          </div>
          <p className="font-playfair font-bold text-2xl text-foreground">
            {report ? formatCurrency(report.totalDue) : '—'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{dues.length} students with dues</p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wallet size={16} className="text-primary" />
            </div>
            <span className="text-sm font-semibold text-muted-foreground">Expected</span>
          </div>
          <p className="font-playfair font-bold text-2xl text-foreground">
            {report ? formatCurrency(report.totalExpected) : '—'}
          </p>
        </div>
      </div>

      {/* Pending dues table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
            <AlertCircle size={15} className="text-red-500" />
            Students with Pending Dues
          </h3>
          <span className="badge-navy">{dues.length} students</span>
        </div>
        {duesLoading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-muted rounded-xl animate-pulse" />)}
          </div>
        ) : dues.length === 0 ? (
          <div className="py-12 text-center">
            <TrendingUp size={32} className="text-emerald-500 mx-auto mb-3" />
            <p className="font-semibold text-foreground">All fees are cleared!</p>
            <p className="text-sm text-muted-foreground">No pending dues found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full school-table">
              <thead>
                <tr>
                  <th className="text-left">Student</th>
                  <th className="text-left">Class</th>
                  <th className="text-left">Dues</th>
                  <th className="text-left">Total Due</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dues.map((d: any) => (
                  <tr key={d.student?.id}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {d.student?.name?.[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{d.student?.name}</p>
                          <p className="text-xs text-muted-foreground">{d.student?.studentId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-foreground">{d.class} — {d.section}</td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {d.dues?.slice(0, 2).map((due: any, i: number) => (
                          <span key={i} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getPaymentStatusColor(due.paymentStatus)}`}>
                            {due.feeType.replace('_', ' ')}{due.month ? ` (${['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][due.month]})` : ''}
                          </span>
                        ))}
                        {d.dues?.length > 2 && <span className="text-xs text-muted-foreground">+{d.dues.length - 2}</span>}
                      </div>
                    </td>
                    <td>
                      <span className="font-playfair font-bold text-red-600 dark:text-red-400">
                        {formatCurrency(d.totalDue)}
                      </span>
                    </td>
                    <td>
                      <button onClick={() => setShowModal(true)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                        Collect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
