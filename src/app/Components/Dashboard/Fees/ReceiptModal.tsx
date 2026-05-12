'use client';

import { Printer, X } from 'lucide-react';
import { useGetReceiptQuery } from '@/redux/features/fees/feesApi';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function ReceiptModal({
  receiptNumber,
  onClose,
}: {
  receiptNumber: string;
  onClose: () => void;
}) {
  const { data, isLoading } = useGetReceiptQuery(receiptNumber);

  const receipt = data?.data;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border print:hidden">
          <h3 className="font-bold text-lg">Payment Receipt</h3>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold inline-flex items-center gap-2"
            >
              <Printer size={14} /> Print
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-accent"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-10 text-center">Loading...</div>
        ) : (
          <div className="p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold">
                {receipt?.school?.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                Payment Receipt
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Receipt No</p>
                <p className="font-semibold">
                  {receipt?.payment?.receiptNumber}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Payment Date</p>
                <p className="font-semibold">
                  {formatDate(receipt?.payment?.paymentDate)}
                </p>
              </div>
            </div>

            <div className="border rounded-xl p-4">
              <h4 className="font-semibold mb-3">Student Information</h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Name</span>
                  <span>{receipt?.payment?.student?.name}</span>
                </div>

                <div className="flex justify-between">
                  <span>Student ID</span>
                  <span>{receipt?.payment?.student?.studentId}</span>
                </div>
              </div>
            </div>

            <div className="border rounded-xl p-4">
              <h4 className="font-semibold mb-3">Payment Information</h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Fee Type</span>
                  <span>{receipt?.payment?.feeType}</span>
                </div>

                <div className="flex justify-between">
                  <span>Total Amount</span>
                  <span>{formatCurrency(receipt?.payment?.amount)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Paid Amount</span>
                  <span>{formatCurrency(receipt?.payment?.paidAmount)}</span>
                </div>

                <div className="flex justify-between font-bold text-red-500">
                  <span>Due Amount</span>
                  <span>{formatCurrency(receipt?.payment?.dueAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}