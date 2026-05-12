/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Eye, Loader2, TrendingUp } from 'lucide-react';
import { formatCurrency, getPaymentStatusColor } from '@/lib/utils';

interface DuesTableProps {
  dues: any[];
  isLoading: boolean;
  onCollectClick: (student: any) => void;
  onHistoryClick: (studentId: string) => void;
}

export function DuesTable({ dues, isLoading, onCollectClick, onHistoryClick }: DuesTableProps) {
  if (isLoading) {
    return (
      <div className="p-10 flex justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }


  if (dues.length === 0) {
    return (
      <div className="py-14 text-center">
        <TrendingUp size={35} className="mx-auto mb-3 text-emerald-500" />
        <p className="font-semibold">No Pending Dues</p>
        <p className="text-sm text-muted-foreground">All fees are cleared.</p>
      </div>
    );
  }

  return (
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
        {/* <tbody>
          {dues.map((due: any) => (
            <tr key={due.student.id}>
              <td>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {due.student.name?.[0] || '?'}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{due.student.name || 'N/A'}</p>
                    <p className="text-xs text-muted-foreground">{due.student.studentId || 'N/A'}</p>
                  </div>
                </div>
              </td>
              <td>
                <div className="text-sm">
                  {due.section?.class?.name || due.class?.class || 'N/A'} —{' '}
                  {due.section?.name || due.section || 'N/A'}
                </div>
              </td>
              <td>
                <div className="flex flex-wrap gap-1">
                  {due.dues?.slice(0, 3).map((item: any) => (
                    <span
                      key={item.id}
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                        item.paymentStatus
                      )}`}
                    >
                      {item.feeType?.replace(/_/g, ' ') || 'N/A'}
                    </span>
                  ))}
                </div>
              </td>
              <td>
                <span className="font-bold text-red-500">{formatCurrency(due.totalDue)}</span>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onCollectClick(due.student)}
                    className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20"
                  >
                    Collect
                  </button>
                  <button
                    onClick={() => onHistoryClick(due.student.id)}
                    className="p-2 rounded-lg hover:bg-accent"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody> */}

        <tbody>
          {dues.map((due: any) => {
            const feePayments = due.student?.feePayments || [];

            const totalDue = feePayments.reduce(
              (sum: number, item: any) => sum + Number(item.dueAmount || 0),
              0
            );

            return (
              <tr key={due.student.id}>
                {/* Student */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {due.student.name?.[0] || '?'}
                    </div>

                    <div>
                      <p className="font-semibold text-sm">
                        {due.student.name || 'N/A'}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {due.student.studentId || 'N/A'}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Class */}
                <td>
                  <div className="text-sm">
                    {due.section?.class?.name || 'N/A'} —{' '}
                    {due.section?.name || 'N/A'}
                  </div>
                </td>

                {/* Dues */}
                <td>
                  <div className="flex flex-wrap gap-1">
                    {feePayments.slice(0, 3).map((item: any) => (
                      <span
                        key={item.id}
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(
                          item.paymentStatus
                        )}`}
                      >
                        {item.feeType?.replace(/_/g, ' ')} (
                        {item.month}/{item.year})
                      </span>
                    ))}
                  </div>
                </td>

                {/* Total Due */}
                <td>
                  <span className="font-bold text-red-500">
                    {formatCurrency(totalDue)}
                  </span>
                </td>

                {/* Actions */}
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onCollectClick(due.student)}
                      className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20"
                    >
                      Collect
                    </button>

                    <button
                      onClick={() => onHistoryClick(due.student.id)}
                      className="p-2 rounded-lg hover:bg-accent"
                    >
                      <Eye size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}