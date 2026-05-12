/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '@/app/Components/Dashboard/PageHeader';
import { useGetCurrentYearQuery } from '@/redux/features/school/schoolApi';
import { useGetPendingDuesQuery, useGetFeeCollectionReportQuery } from '@/redux/features/fees/feesApi';
import { PaymentModal } from '../../../Components/Dashboard/Fees/PaymentModal';
import { StudentPaymentsModal } from '../../../Components/Dashboard/Fees/StudentPaymentsModal';
import { FeesStats } from '../../../Components/Dashboard/Fees/FeesStats';
import { DuesTable } from '../../../Components/Dashboard/Fees/DuesTable';

export default function FeesPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [historyStudentId, setHistoryStudentId] = useState('');

  const { data: yearData } = useGetCurrentYearQuery();
  const academicYearId = yearData?.data?.id ?? '';

  const { data: duesData, isLoading: duesLoading } = useGetPendingDuesQuery(
    { academicYearId },
    { skip: !academicYearId }
  );

  const { data: reportData } = useGetFeeCollectionReportQuery(
    { academicYearId },
    { skip: !academicYearId }
  );

  const dues = duesData?.data ?? [];
  const report = reportData?.data;

  return (
    <div>
      {showModal && (
        <PaymentModal
          onClose={() => {
            setShowModal(false);
            setSelectedStudent(null);
          }}
          academicYearId={academicYearId}
          preselectedStudent={selectedStudent}
        />
      )}

      {historyStudentId && (
        <StudentPaymentsModal
          studentId={historyStudentId}
          academicYearId={academicYearId}
          onClose={() => setHistoryStudentId('')}
        />
      )}

      <PageHeader
        title="Fees Management"
        subtitle="Track student payments and dues"
        action={
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all"
          >
            <Plus size={15} />
            Record Payment
          </button>
        }
      />

      <FeesStats
        totalCollected={report?.totalCollected ?? 0}
        totalDue={report?.totalDue ?? 0}
        totalExpected={report?.totalExpected ?? 0}
      />

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="font-semibold">Students with Dues</h3>
            <p className="text-xs text-muted-foreground">{dues.length} students found</p>
          </div>
        </div>

        <DuesTable
          dues={dues}
          isLoading={duesLoading}
          onCollectClick={(student) => {
            setSelectedStudent(student);
            setShowModal(true);
          }}
          onHistoryClick={(studentId) => setHistoryStudentId(studentId)}
        />
      </div>
    </div>
  );
}