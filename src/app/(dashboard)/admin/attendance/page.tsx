/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ClipboardCheck,
  Loader2,
  Save,
  Search,
} from 'lucide-react';

import { toast } from 'sonner';

import PageHeader from '@/app/Components/Dashboard/PageHeader';

import {
  useGetAllClassesQuery,
  useGetCurrentYearQuery,
  useGetSectionsByClassQuery,
} from '@/redux/features/school/schoolApi';

import {
  useGetAttendanceByDateQuery,
  useMarkStudentAttendanceMutation,
} from '@/redux/features/attendance/attendanceApi';

import { getAttendanceColor } from '@/lib/utils';


type AttStatus =
  | 'PRESENT'
  | 'ABSENT'
  | 'LATE'
  | 'LEAVE';

const STATUSES: AttStatus[] = [
  'PRESENT',
  'ABSENT',
  'LATE',
  'LEAVE',
];

export default function AttendancePage() {
  const today =
    new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(today);

  const [classId, setClassId] = useState('');

  const [sectionId, setSectionId] =
    useState('');

  const [search, setSearch] = useState('');

  const [statusMap, setStatusMap] =
    useState<Record<string, AttStatus>>({});

  const [saving, setSaving] = useState(false);

  const {
    data: yearData,
  } = useGetCurrentYearQuery();

  const academicYearId =
    yearData?.data?.id ?? '';

  const {
    data: classesData,
  } = useGetAllClassesQuery();

  const classes = classesData?.data ?? [];

  const {
    data: sectionsData,
  } = useGetSectionsByClassQuery(classId, {
    skip: !classId,
  });

  const sections =
    sectionsData?.data ?? [];

  const {
    data: attData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetAttendanceByDateQuery(
    {
      sectionId,
      date,
      academicYearId,
    },
    {
      skip:
        !sectionId || !academicYearId,
    }
  );

  const rows = useMemo(() => {
    return attData?.data || [];
  }, [attData]);

  const [markAttendance] =
    useMarkStudentAttendanceMutation();

  // =========================================
  // PREFILLED DATA
  // =========================================

  useEffect(() => {
    if (!rows.length) return;

    const map: Record<string, AttStatus> = {};

    rows.forEach((r: any) => {
      map[r.student.id] =
        r.attendance?.status || 'PRESENT';
    });

    setStatusMap(map);
  }, [rows]);

  // =========================================
  // FILTERED ROWS
  // =========================================

  const filteredRows = useMemo(() => {
    return rows.filter((r: any) => {
      const keyword =
        search.toLowerCase();

      return (
        r.student.name
          ?.toLowerCase()
          .includes(keyword) ||
        r.student.studentId
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [rows, search]);

  // =========================================
  // HELPERS
  // =========================================

  const getStatus = (
    studentId: string
  ): AttStatus =>
    statusMap[studentId] ?? 'PRESENT';

  const setStatus = (
    studentId: string,
    status: AttStatus
  ) => {
    setStatusMap((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // =========================================
  // DIRTY CHECK
  // =========================================

  const hasChanges = useMemo(() => {
    return rows.some((r: any) => {
      const original =
        r.attendance?.status ??
        'PRESENT';

      return (
        statusMap[r.student.id] !==
        original
      );
    });
  }, [rows, statusMap]);

  // =========================================
  // BULK MARK
  // =========================================

  const markAll = (status: AttStatus) => {
    const next = { ...statusMap };

    filteredRows.forEach((r: any) => {
      next[r.student.id] = status;
    });

    setStatusMap(next);
  };

  // =========================================
  // SAVE
  // =========================================

  const handleSave = async () => {
    if (!sectionId) return;

    const changedRecords = rows
      .filter((r: any) => {
        const original =
          r.attendance?.status ??
          'PRESENT';

        return (
          statusMap[r.student.id] !==
          original
        );
      })
      .map((r: any) => ({
        studentId: r.student.id,
        status: getStatus(r.student.id),
      }));

    if (changedRecords.length === 0) {
      toast.info(
        'No attendance changes detected.'
      );
      return;
    }

    setSaving(true);

    try {
      await markAttendance({
        sectionId,
        academicYearId,
        date,
        records: changedRecords,
      }).unwrap();

      toast.success(
        `Attendance updated for ${changedRecords.length} students`
      );

      refetch();
    } catch (err: any) {
      toast.error(
        err?.data?.message ??
        'Failed to save attendance'
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================
  // SUMMARY
  // =========================================

  const summary = useMemo(() => {
    const result: Record<string, number> =
      {};

    filteredRows.forEach((r: any) => {
      const s = getStatus(r.student.id);

      result[s] =
        (result[s] ?? 0) + 1;
    });

    return result;
  }, [filteredRows, statusMap]);

  return (
    <div>
      <PageHeader
        title="Attendance"
        subtitle="Manage daily attendance"
      />

      {/* Controls */}

      <div className="flex flex-col md:flex-row gap-3 mb-6 items-start md:items-center">
        {/* Date Input */}
        <div className="w-full md:w-auto md:min-w-[150px]">
          <input
            type="date"
            value={date}
            max={today}
            onChange={(e) => setDate(e.target.value)}
            className="input-field w-full"
          />
        </div>

        {/* Class Select */}
        <div className="w-full md:w-auto md:min-w-[150px]">
          <select
            value={classId}
            onChange={(e) => {
              setClassId(e.target.value);
              setSectionId('');
            }}
            className="input-field w-full"
          >
            <option value="">Select Class</option>
            {classes.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Section Select */}
        <div className="w-full md:w-auto md:min-w-[150px]">
          <select
            value={sectionId}
            disabled={!classId}
            onChange={(e) => setSectionId(e.target.value)}
            className={`input-field w-full ${!classId ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <option value="">Select Section</option>
            {sections.map((s: any) => (
              <option key={s.id} value={s.id}>
                Section {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search Box - Takes remaining space */}
        <div className="w-full md:flex-1">
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3.5 py-2.5 w-full transition-all duration-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
            <Search size={14} className="text-muted-foreground flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none flex-1 min-w-0"
            />
          </div>
        </div>
      </div>

      {/* Summary */}

      {sectionId && (
        <>
          <div className="flex flex-wrap justify-between gap-4 mb-5">

            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <div
                  key={s}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${getAttendanceColor(
                    s
                  )}`}
                >
                  {s}: {summary[s] ?? 0}
                </div>
              ))}
            </div>

            <div className="flex gap-2 flex-wrap">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() =>
                    markAll(s)
                  }
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${getAttendanceColor(
                    s
                  )}`}
                >
                  Mark All {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}

          <div className="bg-card border border-border rounded-2xl overflow-hidden">

            {isLoading || isFetching ? (
              <div className="p-8 flex justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : error ? (
              <div className="p-10 text-center">
                Failed to load attendance
              </div>
            ) : filteredRows.length === 0 ? (
              <div className="p-10 text-center">
                No students found
              </div>
            ) : (
              <div className="overflow-x-auto">

                <table className="w-full school-table">
                  <thead>
                    <tr>
                      <th className='text-left'>#</th>
                      <th className='text-left'>Student</th>
                      <th className='text-left'>ID</th>
                      <th className='text-left'>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredRows.map(
                      (
                        r: any,
                        i: number
                      ) => {
                        const current =
                          getStatus(
                            r.student.id
                          );

                        return (
                          <tr
                            key={
                              r.student.id
                            }
                          >
                            <td>
                              {r.rollNumber ??
                                i + 1}
                            </td>

                            <td>
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
                                  {
                                    r.student
                                      .name?.[0]
                                  }
                                </div>

                                <span className="font-medium">
                                  {
                                    r.student
                                      .name
                                  }
                                </span>
                              </div>
                            </td>

                            <td>
                              {
                                r.student
                                  .studentId
                              }
                            </td>

                            <td>
                              <div className="flex flex-wrap gap-2">
                                {STATUSES.map(
                                  (s) => (
                                    <button
                                      key={s}
                                      onClick={() =>
                                        setStatus(
                                          r
                                            .student
                                            .id,
                                          s
                                        )
                                      }
                                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${current ===
                                        s
                                        ? getAttendanceColor(
                                          s
                                        )
                                        : 'bg-secondary'
                                        }`}
                                    >
                                      {s}
                                    </button>
                                  )
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer */}

          <div className="mt-5 flex justify-between items-center">

            <div className="text-sm text-muted-foreground">
              {filteredRows.length} students
            </div>

            <button
              disabled={
                saving || !hasChanges
              }
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Attendance
                </>
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}