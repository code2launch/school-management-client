/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export const feesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeeStructures: builder.query<any, { academicYearId: string; classId?: string }>({
      query: (params) => ({ url: "/fees/structures", params }),
      providesTags: ["FeeStructures"],
    }),
    createFeeStructure: builder.mutation<any, any>({
      query: (data) => ({ url: "/fees/structures", method: "POST", body: data }),
      invalidatesTags: ["FeeStructures"],
    }),
    recordPayment: builder.mutation<any, any>({
      query: (data) => ({ url: "/fees/payments", method: "POST", body: data }),
      invalidatesTags: ["Fees", "Dashboard"],
    }),
    getStudentPayments: builder.query<any, { studentId: string; academicYearId: string }>({
      query: ({ studentId, academicYearId }) => ({ url: `/fees/payments/student/${studentId}`, params: { academicYearId } }),
      providesTags: ["Fees"],
    }),
    getPendingDues: builder.query<any, { academicYearId: string; classId?: string }>({
      query: (params) => ({ url: "/fees/payments/dues", params }),
      providesTags: ["Fees"],
    }),
    getReceipt: builder.query<any, string>({
      query: (receiptNumber) => `/fees/payments/receipt/${receiptNumber}`,
      providesTags: ["Fees"],
    }),
    getFeeCollectionReport: builder.query<any, { academicYearId: string; month?: string; year?: string }>({
      query: (params) => ({ url: "/fees/payments/report", params }),
      providesTags: ["Fees"],
    }),
  }),
});

export const {
  useGetFeeStructuresQuery, useCreateFeeStructureMutation,
  useRecordPaymentMutation, useGetStudentPaymentsQuery,
  useGetPendingDuesQuery, useGetReceiptQuery, useGetFeeCollectionReportQuery,
} = feesApi;
