/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { X } from 'lucide-react';
import { useGetStudentPaymentsQuery } from '@/redux/features/fees/feesApi';
import { formatCurrency, formatDate, getPaymentStatusColor } from '@/lib/utils';

interface Props {
  studentId: string;
  academicYearId: string;
  onClose: () => void;
}

export default function PaymentHistoryModal({
  studentId,
  academicYearId,
  onClose,
}: Props) {
  const { data, isLoading } = useGetStudentPaymentsQuery({
    studentId,
    academicYearId,
  });

  const payments = data?.data?.payments ?? [];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div>
            <h3 className="font-bold text-lg">Payment History</h3>
            <p className="text-sm text-muted-foreground">
              {data?.data?.student?.name}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : payments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No payment history found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full school-table">
                <thead>
                  <tr>
                    <th>Receipt</th>
                    <th>Fee Type</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Due</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((p: any) => (
                    <tr key={p.id}>
                      <td>{p.receiptNumber}</td>
                      <td>{p.feeType.replaceAll('_', ' ')}</td>
                      <td>{formatDate(p.paymentDate)}</td>
                      <td>{formatCurrency(p.amount)}</td>
                      <td>{formatCurrency(p.paidAmount)}</td>
                      <td>{formatCurrency(p.dueAmount)}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                            p.paymentStatus
                          )}`}
                        >
                          {p.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}