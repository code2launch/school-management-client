import { baseApi } from "../../api/baseApi";

export interface AttendanceRecordPayload {
  studentId: string;
  status: "PRESENT" | "ABSENT" | "LATE" | "LEAVE";
  note?: string;
}

export interface MarkAttendancePayload {
  sectionId: string;
  academicYearId: string;
  date: string;
  records: AttendanceRecordPayload[];
}

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAttendanceByDate: builder.query({
      query: (params: {
        sectionId: string;
        date: string;
        academicYearId: string;
      }) => ({
        url: "/attendance/students/by-date",
        params,
      }),

      providesTags: ["Attendance"],

      keepUnusedDataFor: 60,
    }),

    getMonthlyAttendance: builder.query({
      query: (params: {
        sectionId: string;
        academicYearId: string;
        month: string;
        year: string;
      }) => ({
        url: "/attendance/students/monthly",
        params,
      }),

      providesTags: ["Attendance"],
    }),

    getStudentAttendanceSummary: builder.query({
      query: ({
        studentId,
        ...params
      }: {
        studentId: string;
        academicYearId: string;
        month?: string;
        year?: string;
      }) => ({
        url: `/attendance/students/${studentId}/summary`,
        params,
      }),

      providesTags: ["Attendance"],
    }),

    getTodaySummary: builder.query({
      query: (params: { sectionId: string; academicYearId: string }) => ({
        url: "/attendance/students/today-summary",
        params,
      }),

      providesTags: ["Attendance"],
    }),

    markStudentAttendance: builder.mutation({
      query: (data: MarkAttendancePayload) => ({
        url: "/attendance/students",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Attendance", "Dashboard"],
    }),
  }),
});

export const {
  useGetAttendanceByDateQuery,
  useGetMonthlyAttendanceQuery,
  useGetStudentAttendanceSummaryQuery,
  useGetTodaySummaryQuery,
  useMarkStudentAttendanceMutation,
} = attendanceApi;
