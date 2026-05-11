import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token =
        state.auth?.accessToken ||
        (typeof window !== "undefined" ? localStorage.getItem("accessToken") : null);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "Auth", "School", "AcademicYear",
    "Classes", "Sections", "Subjects",
    "Teachers", "Students",
    "Attendance", "Fees", "FeeStructures",
    "Exams", "ExamResults", "Notices",
    "Dashboard", "Reports",
  ],
  endpoints: () => ({}),
});
