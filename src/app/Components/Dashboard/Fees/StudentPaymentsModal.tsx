/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Eye, Loader2, Receipt, X } from 'lucide-react';
import { useGetStudentPaymentsQuery } from '@/redux/features/fees/feesApi';
import { formatCurrency, formatDate, getPaymentStatusColor } from '@/lib/utils';
import ReceiptModal from './ReceiptModal';

interface StudentPaymentsModalProps {
  studentId: string;
  academicYearId: string;
  onClose: () => void;
}

export function StudentPaymentsModal({
  studentId,
  academicYearId,
  onClose
}: StudentPaymentsModalProps) {
  const { data, isLoading } = useGetStudentPaymentsQuery({
    studentId,
    academicYearId,
  });

  const payments = data?.data?.payments ?? [];
  const student = data?.data?.student;
  // const [receiptNo, setReceiptNo] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedReceiptNo, setSelectedReceiptNo] = useState('');

  const handleViewReceipt = (receiptNumber: string) => {
    setSelectedReceiptNo(receiptNumber);
    setShowReceipt(true);
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setSelectedReceiptNo('');
  };

  // If showing receipt, only render receipt modal
  if (showReceipt && selectedReceiptNo) {
    return (
      <ReceiptModal
        receiptNumber={selectedReceiptNo}
        onClose={handleCloseReceipt}
      />
    );
  }

  return (
    <>
      {/* {receiptNo && (
        <ReceiptModal receiptNumber={receiptNo} onClose={() => setReceiptNo('')} />
      )} */}

      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-card border border-border rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div>
              <h3 className="text-lg font-bold text-foreground">Payment History</h3>
              <p className="text-sm text-muted-foreground">
                {student?.name || 'Student'} ({student?.studentId || 'N/A'})
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent">
              <X size={15} />
            </button>
          </div>

          {isLoading ? (
            <div className="p-10 flex justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : payments.length === 0 ? (
            <div className="p-10 text-center">
              <Receipt size={30} className="mx-auto mb-3 text-muted-foreground" />
              <p>No payment history found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full school-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Fee Type</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Due</th>
                    <th>Status</th>
                    <th>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment: any) => (
                    <tr key={payment.id}>
                      <td>{formatDate(payment.paymentDate)}</td>
                      <td>{payment.feeType?.replace(/_/g, ' ') || 'N/A'}</td>
                      <td>{formatCurrency(payment.amount)}</td>
                      <td className="text-emerald-600 font-semibold">
                        {formatCurrency(payment.paidAmount)}
                      </td>
                      <td className="text-red-500 font-semibold">
                        {formatCurrency(payment.dueAmount)}
                      </td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                            payment.paymentStatus
                          )}`}
                        >
                          {payment.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <button
                          // onClick={() => setReceiptNo(payment.receiptNumber)}
                          onClick={() => {
                            if (payment?.receiptNumber) {
                              handleViewReceipt(payment.receiptNumber);
                            }
                          }}
                          className="p-2 rounded-lg hover:bg-accent"
                        >
                          <Eye size={14} />
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
    </>
  );
}