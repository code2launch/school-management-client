/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export const noticeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query<any, Record<string, string | undefined>>({
      query: (params) => ({ url: "/notices", params }),
      providesTags: ["Notices"],
    }),
    getNoticeFeed: builder.query<any, void>({
      query: () => "/notices/feed",
      providesTags: ["Notices"],
    }),
    createNotice: builder.mutation<any, any>({
      query: (data) => ({ url: "/notices", method: "POST", body: data }),
      invalidatesTags: ["Notices"],
    }),
    updateNotice: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({ url: `/notices/${id}`, method: "PATCH", body: data }),
      invalidatesTags: ["Notices"],
    }),
    deleteNotice: builder.mutation<any, string>({
      query: (id) => ({ url: `/notices/${id}`, method: "DELETE" }),
      invalidatesTags: ["Notices"],
    }),
  }),
});

export const {
  useGetNoticesQuery, useGetNoticeFeedQuery,
  useCreateNoticeMutation, useUpdateNoticeMutation, useDeleteNoticeMutation,
} = noticeApi;
