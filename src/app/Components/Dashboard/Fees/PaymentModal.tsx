/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { CreditCard, Loader2, Search, X } from 'lucide-react';
import { toast } from 'sonner';
import { useGetStudentsQuery } from '@/redux/features/student/studentApi';
import { useGetStudentByIdQuery } from '@/redux/features/student/studentApi';
import { useGetFeeStructuresQuery } from '@/redux/features/fees/feesApi';
import { useRecordPaymentMutation } from '@/redux/features/fees/feesApi';
import { formatCurrency } from '@/lib/utils';
import ReceiptModal from './ReceiptModal';

type FeeType = 'ADMISSION' | 'MONTHLY_TUITION' | 'EXAM' | 'OTHER';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface PaymentModalProps {
  onClose: () => void;
  academicYearId: string;
  preselectedStudent?: any;
}

export function PaymentModal({ onClose, academicYearId, preselectedStudent }: PaymentModalProps) {
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState(preselectedStudent?.id ?? '');
  const [feeType, setFeeType] = useState<FeeType>('MONTHLY_TUITION');
  const [amount, setAmount] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [receiptNo, setReceiptNo] = useState('');

  const { data: studentsData } = useGetStudentsQuery(
    { searchTerm: studentSearch, limit: '8', academicYearId },
    { skip: !studentSearch }
  );

  const { data: studentData } = useGetStudentByIdQuery(selectedStudentId, {
    skip: !selectedStudentId,
  });

  const { data: structuresData } = useGetFeeStructuresQuery(
    { academicYearId },
    { skip: !academicYearId }
  );

  const selectedStudent = studentData?.data;
  const students = studentsData?.data ?? [];
  const structures = structuresData?.data ?? [];


  const [recordPayment] = useRecordPaymentMutation();

  const autoDue = (Number(amount) || 0) - (Number(paidAmount) || 0);

  const handleSubmit = async () => {
    if (!selectedStudentId) {
      toast.error('Select a student');
      return;
    }

    const amountNum = Number(amount);
    const paidAmountNum = Number(paidAmount);

    if (!amount || amountNum <= 0) {
      toast.error('Invalid amount');
      return;
    }

    if (paidAmountNum > amountNum) {
      toast.error('Paid amount cannot exceed total');
      return;
    }

    setSaving(true);

    try {
      const res = await recordPayment({
        studentId: selectedStudentId,
        academicYearId,
        feeType,
        amount: amountNum,
        paidAmount: paidAmountNum,
        month: feeType === 'MONTHLY_TUITION' ? Number(month) : undefined,
        year: feeType === 'MONTHLY_TUITION' ? new Date().getFullYear() : undefined,
        paymentMethod,
        paymentDate: new Date().toISOString(),
        note,
      }).unwrap();

      toast.success('Payment recorded successfully');
      setReceiptNo(res?.data?.receiptNumber);
      onClose();
    } catch (e: any) {
      toast.error(e?.data?.message ?? 'Failed to record payment');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {receiptNo && <ReceiptModal receiptNumber={receiptNo} onClose={() => setReceiptNo('')} />}

      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-card border h-[calc(80vh)] border-border rounded-2xl w-full max-w-lg shadow-2xl overflow-scroll">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div>
              <h3 className="font-bold text-lg text-foreground">Record Payment</h3>
              <p className="text-xs text-muted-foreground">Create new fee payment</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent">
              <X size={16} />
            </button>
          </div>

          <div className="p-5 space-y-4">
            {/* Student Selection */}
            <div>
              <label className="block text-xs font-semibold mb-1.5">Student</label>
              {selectedStudent ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20">
                  <div>
                    <p className="font-semibold text-sm">{selectedStudent.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedStudent.studentId}</p>
                  </div>
                  {!preselectedStudent && (
                    <button onClick={() => setSelectedStudentId('')}>
                      <X size={14} />
                    </button>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5">
                    <Search size={14} />
                    <input
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      placeholder="Search student..."
                      className="bg-transparent outline-none text-sm flex-1"
                    />
                  </div>
                  {students.length > 0 && studentSearch && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl overflow-hidden z-20 shadow-lg">
                      {students.map((student: any) => (
                        <button
                          key={student.id}
                          onClick={() => {
                            setSelectedStudentId(student.id);
                            setStudentSearch('');
                          }}
                          className="w-full text-left px-3 py-2.5 hover:bg-accent transition-colors"
                        >
                          <p className="text-sm font-medium">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{student.studentId}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Fee Type & Month */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Fee Type</label>
                <select
                  value={feeType}
                  onChange={(e) => {
                    setFeeType(e.target.value as FeeType);
                    const fee = structures.find((s: any) => s.feeType === e.target.value);
                    if (fee) {
                      setAmount(String(fee.amount));
                      setPaidAmount(String(fee.amount));
                    }
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm"
                >
                  <option value="MONTHLY_TUITION">Monthly Tuition</option>
                  <option value="ADMISSION">Admission</option>
                  <option value="EXAM">Exam</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              {feeType === 'MONTHLY_TUITION' && (
                <div>
                  <label className="block text-xs font-semibold mb-1.5">Month</label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm"
                  >
                    {MONTHS.map((m, i) => (
                      <option key={m} value={i + 1}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Amounts */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1.5">Total Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5">Paid Amount</label>
                <input
                  type="number"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm"
                />
              </div>
            </div>

            {/* Due Amount */}
            <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Due Amount</span>
                <span className="text-lg font-bold text-red-500">{formatCurrency(autoDue)}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-xs font-semibold mb-1.5">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm"
              >
                {['Cash', 'bKash', 'Nagad', 'Bank Transfer', 'Cheque'].map((method) => (
                  <option key={method}>{method}</option>
                ))}
              </select>
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-semibold mb-1.5">Note</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Optional note..."
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 p-5 border-t border-border">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CreditCard size={15} />
                  Record Payment
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}