/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export const teacherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query<any, Record<string, string | undefined>>({
      query: (params) => ({ url: "/teachers", params }),
      providesTags: ["Teachers"],
    }),
    getTeacherById: builder.query<any, string>({
      query: (id) => `/teachers/${id}`,
      providesTags: ["Teachers"],
    }),
    createTeacher: builder.mutation<any, any>({
      query: (data) => ({ url: "/teachers", method: "POST", body: data }),
      invalidatesTags: ["Teachers", "Dashboard"],
    }),
    updateTeacher: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({ url: `/teachers/${id}`, method: "PATCH", body: data }),
      invalidatesTags: ["Teachers"],
    }),
    deleteTeacher: builder.mutation<any, string>({
      query: (id) => ({ url: `/teachers/${id}`, method: "DELETE" }),
      invalidatesTags: ["Teachers", "Dashboard"],
    }),
    assignSubjects: builder.mutation<any, { id: string; subjectIds: string[] }>({
      query: ({ id, ...data }) => ({ url: `/teachers/${id}/assign-subjects`, method: "POST", body: data }),
      invalidatesTags: ["Teachers"],
    }),
  }),
});

export const {
  useGetTeachersQuery, useGetTeacherByIdQuery,
  useCreateTeacherMutation, useUpdateTeacherMutation,
  useDeleteTeacherMutation, useAssignSubjectsMutation,
} = teacherApi;
