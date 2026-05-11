/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export const examApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExams: builder.query<any, { academicYearId: string; classId?: string }>({
      query: (params) => ({ url: "/exams", params }),
      providesTags: ["Exams"],
    }),
    getExamById: builder.query<any, string>({
      query: (id) => `/exams/${id}`,
      providesTags: ["Exams"],
    }),
    createExam: builder.mutation<any, any>({
      query: (data) => ({ url: "/exams", method: "POST", body: data }),
      invalidatesTags: ["Exams"],
    }),
    addExamSubject: builder.mutation<any, any>({
      query: (data) => ({ url: "/exams/subjects", method: "POST", body: data }),
      invalidatesTags: ["Exams"],
    }),
    enterMarks: builder.mutation<any, any>({
      query: (data) => ({ url: "/exams/marks", method: "POST", body: data }),
      invalidatesTags: ["ExamResults"],
    }),
    getResultSheet: builder.query<any, { examId: string; sectionId: string }>({
      query: ({ examId, sectionId }) => ({ url: `/exams/${examId}/result-sheet`, params: { sectionId } }),
      providesTags: ["ExamResults"],
    }),
    getReportCard: builder.query<any, { examId: string; studentId: string }>({
      query: ({ examId, studentId }) => `/exams/${examId}/report-card/${studentId}`,
      providesTags: ["ExamResults"],
    }),
    publishExam: builder.mutation<any, string>({
      query: (id) => ({ url: `/exams/${id}/publish`, method: "PATCH" }),
      invalidatesTags: ["Exams"],
    }),
  }),
});

export const {
  useGetExamsQuery, useGetExamByIdQuery, useCreateExamMutation,
  useAddExamSubjectMutation, useEnterMarksMutation,
  useGetResultSheetQuery, useGetReportCardQuery, usePublishExamMutation,
} = examApi;
