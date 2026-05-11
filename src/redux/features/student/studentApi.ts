/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<any, Record<string, string | undefined>>({
      query: (params) => ({ url: "/students", params }),
      providesTags: ["Students"],
    }),
    getStudentById: builder.query<any, string>({
      query: (id) => `/students/${id}`,
      providesTags: ["Students"],
    }),
    admitStudent: builder.mutation<any, any>({
      query: (data) => ({ url: "/students/admit", method: "POST", body: data }),
      invalidatesTags: ["Students", "Dashboard"],
    }),
    updateStudent: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({ url: `/students/${id}`, method: "PATCH", body: data }),
      invalidatesTags: ["Students"],
    }),
    deleteStudent: builder.mutation<any, string>({
      query: (id) => ({ url: `/students/${id}`, method: "DELETE" }),
      invalidatesTags: ["Students", "Dashboard"],
    }),
    promoteStudents: builder.mutation<any, any>({
      query: (data) => ({ url: "/students/promote", method: "POST", body: data }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useGetStudentsQuery, useGetStudentByIdQuery,
  useAdmitStudentMutation, useUpdateStudentMutation,
  useDeleteStudentMutation, usePromoteStudentsMutation,
} = studentApi;
