
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICreateDayLesson, IDeleteDayLesson, IFetchDaySchedule, IUpdateDayLesson } from 'types/api/dayLessons'
import { IChangeException } from 'types/api/exceptions'
import { IAddLessonName } from 'types/api/lessonNames'
import { ICreateLink } from 'types/api/links'
import { IAddTeacher } from 'types/api/teachers'
import { ICreateWeekLesson, IUpdateWeekLesson } from 'types/api/weekLessons'


export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl:
    'http://localhost:3000/'
    // 'https://telegram-web-app-postgre.herokuapp.com/'
      // 'https://web-app-nest-mysql-production.up.railway.app/' ||/* https://telegram-web-app-postgre.herokuapp.com/ */
  }),
  tagTypes: ['Schedule', 'DaySchedule', 'Teachers', 'LessonNames', 'Links'],
  endpoints: (builder) => ({
    fetchDayLessons: builder.query<any, IFetchDaySchedule>({
      query: ({date}: IFetchDaySchedule) => `/day-lessons/${date}`,
      providesTags: ['Schedule'],
    }),
    fetchLinks: builder.query<any, void>({
      query: () => `/links`,
      providesTags: ['Links'],
    }),
    fetchTeachers: builder.query<any, void>({
      query: () => `/teachers`,
      providesTags: ['Teachers'],
    }),
    fetchLessonNames: builder.query<any, void>({
      query: () => `/lesson-names`,
      providesTags: ['LessonNames'],
    }),
    deleteTeacher: builder.mutation<any, string>({
      query: (id:string) => ({
        url: `/teachers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Teachers']
    }),
    addTeacher: builder.mutation<any, IAddTeacher>({
      query: (body:IAddTeacher) => ({
        url: `/teachers`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['Teachers']
    }),
    deleteLessonName: builder.mutation<any, string>({
      query: (id:string) => ({
        url: `/lesson-names/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['LessonNames']
    }),
    addLessonName: builder.mutation<any, IAddLessonName>({
      query: (body:IAddLessonName) => ({
        url: `/lesson-names`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['LessonNames']
    }),
    deleteWeekLesson: builder.mutation<any, string>({
      query: (id:string) => ({
        url: `/week-lessons/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Schedule']
    }),
    addWeekLesson: builder.mutation<any, ICreateWeekLesson>({
      query: ({day, week, ...body}:ICreateWeekLesson) => ({
        url: `/week-lessons/${week}/${day}`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['Schedule']
    }),
    updateWeekLesson: builder.mutation<any, IUpdateWeekLesson>({
      query: (body:IUpdateWeekLesson) => ({
        url: `/week-lessons`,
        body,
        method: 'PATCH',
      }),
      invalidatesTags: ['Schedule']
    }),
    addDayLesson: builder.mutation<any, ICreateDayLesson>({
      query: ({week, day, ...body}:ICreateDayLesson) => ({
        url: `/day-lessons/${week}/${day}`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['Schedule']
    }),
    deleteDayLesson: builder.mutation<any, IDeleteDayLesson>({
      query: (body:IDeleteDayLesson) => ({
        url: `/day-lessons`,
        body,
        method: 'DELETE',
      }),
      invalidatesTags: ['Schedule']
    }),
    updateDayLesson: builder.mutation<any, IUpdateDayLesson>({
      query: ({week, day, ...body}:IUpdateDayLesson) => ({
        url: `/day-lessons/${week}/${day}`,
        body,
        method: 'PATCH',
      }),
      invalidatesTags: ['Schedule']
    }),
    deleteException: builder.mutation<any, string>({
      query: (id:string) => ({
        url: `/exceptions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Schedule']
    }),
    updateException: builder.mutation<any, IChangeException>({
      query: ({lesson_id, ...body}:IChangeException) => ({
        url: `/exceptions/${lesson_id}`,
        body,
        method: 'PATCH',
      }),
      invalidatesTags: ['Schedule']
    }),
    deleteLink: builder.mutation<any, string>({
      query: (id:string) => ({
        url: `/links/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Links']
    }),
    addLink: builder.mutation<any, ICreateLink>({
      query: (body:ICreateLink) => ({
        url: `/links`,
        body,
        method: 'POST',
      }),
      invalidatesTags: ['Links']
    }),
  }),
})

export const {
  useLazyFetchDayLessonsQuery,
  useFetchTeachersQuery,
  useFetchLessonNamesQuery,
  useDeleteTeacherMutation,
  useAddTeacherMutation,
  useAddLessonNameMutation,
  useDeleteLessonNameMutation,
  useDeleteWeekLessonMutation,
  useAddWeekLessonMutation,
  useUpdateWeekLessonMutation,
  useAddDayLessonMutation,
  useDeleteDayLessonMutation,
  useDeleteExceptionMutation,
  useUpdateDayLessonMutation,
  useUpdateExceptionMutation,
  useAddLinkMutation,
  useDeleteLinkMutation,
  useFetchLinksQuery,
} = apiSlice
