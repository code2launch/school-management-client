/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

export const schoolApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSchoolProfile:    builder.query<any, void>({ query: () => "/school/profile", providesTags: ["School"] }),
    upsertSchoolProfile: builder.mutation<any, any>({ query: (data) => ({ url: "/school/profile", method: "PUT", body: data }), invalidatesTags: ["School"] }),
    getAcademicYears:    builder.query<any, void>({ query: () => "/school/academic-years", providesTags: ["AcademicYear"] }),
    getCurrentYear:      builder.query<any, void>({ query: () => "/school/academic-years/current", providesTags: ["AcademicYear"] }),
    createAcademicYear:  builder.mutation<any, any>({ query: (data) => ({ url: "/school/academic-years", method: "POST", body: data }), invalidatesTags: ["AcademicYear"] }),
    getDashboard:        builder.query<any, void>({ query: () => "/dashboard", providesTags: ["Dashboard"] }),
    getAllClasses:        builder.query<any, void>({ query: () => "/classes", providesTags: ["Classes"] }),
    createClass:         builder.mutation<any, any>({ query: (data) => ({ url: "/classes", method: "POST", body: data }), invalidatesTags: ["Classes"] }),
    getSectionsByClass:  builder.query<any, string>({ query: (classId) => `/classes/${classId}/sections`, providesTags: ["Sections"] }),
    createSection:       builder.mutation<any, any>({ query: (data) => ({ url: "/classes/sections", method: "POST", body: data }), invalidatesTags: ["Sections", "Classes"] }),
    getSubjectsByClass:  builder.query<any, string>({ query: (classId) => `/subjects/by-class/${classId}`, providesTags: ["Subjects"] }),
    createSubject:       builder.mutation<any, any>({ query: (data) => ({ url: "/subjects", method: "POST", body: data }), invalidatesTags: ["Subjects"] }),
    assignTeacher:       builder.mutation<any, any>({ query: (data) => ({ url: "/subjects/assign-teacher", method: "POST", body: data }), invalidatesTags: ["Subjects", "Teachers"] }),
    getRoutineBySection: builder.query<any, string>({ query: (sectionId) => `/subjects/routine/section/${sectionId}`, providesTags: ["Subjects"] }),
    createRoutineSlot:   builder.mutation<any, any>({ query: (data) => ({ url: "/subjects/routine", method: "POST", body: data }), invalidatesTags: ["Subjects"] }),
  }),
});

export const {
  useGetSchoolProfileQuery, useUpsertSchoolProfileMutation,
  useGetAcademicYearsQuery, useGetCurrentYearQuery, useCreateAcademicYearMutation,
  useGetDashboardQuery,
  useGetAllClassesQuery, useCreateClassMutation,
  useGetSectionsByClassQuery, useCreateSectionMutation,
  useGetSubjectsByClassQuery, useCreateSubjectMutation,
  useAssignTeacherMutation,
  useGetRoutineBySectionQuery, useCreateRoutineSlotMutation,
} = schoolApi;
