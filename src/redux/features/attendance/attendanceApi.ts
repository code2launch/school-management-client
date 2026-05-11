/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAttendanceByDate: builder.query<any, { sectionId: string; date: string; academicYearId: string }>({
      query: (params) => ({ url: "/attendance/students/by-date", params }),
      providesTags: ["Attendance"],
    }),
    getMonthlyAttendance: builder.query<any, { sectionId: string; academicYearId: string; month: string; year: string }>({
      query: (params) => ({ url: "/attendance/students/monthly", params }),
      providesTags: ["Attendance"],
    }),
    getStudentAttendanceSummary: builder.query<any, { studentId: string; academicYearId: string; month?: string; year?: string }>({
      query: ({ studentId, ...params }) => ({ url: `/attendance/students/${studentId}/summary`, params }),
      providesTags: ["Attendance"],
    }),
    getTodaySummary: builder.query<any, { sectionId: string; academicYearId: string }>({
      query: (params) => ({ url: "/attendance/students/today-summary", params }),
      providesTags: ["Attendance"],
    }),
    markStudentAttendance: builder.mutation<any, any>({
      query: (data) => ({ url: "/attendance/students", method: "POST", body: data }),
      invalidatesTags: ["Attendance", "Dashboard"],
    }),
  }),
});

export const {
  useGetAttendanceByDateQuery, useGetMonthlyAttendanceQuery,
  useGetStudentAttendanceSummaryQuery, useGetTodaySummaryQuery,
  useMarkStudentAttendanceMutation,
} = attendanceApi;
