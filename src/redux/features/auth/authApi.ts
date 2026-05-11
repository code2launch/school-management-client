/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, { phone: string; password: string }>({
      query: (data) => ({ url: "/auth/login", method: "POST", body: data }),
      invalidatesTags: ["Auth", "Dashboard"],
    }),
    getMe: builder.query<any, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),
    changePassword: builder.mutation<any, { currentPassword: string; newPassword: string }>({
      query: (data) => ({ url: "/auth/change-password", method: "PATCH", body: data }),
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery, useChangePasswordMutation } = authApi;
