import {
  IAddDayLesson,
  IChangeWeekLesson,
  IDeleteWeekLesson,
} from './../../types/api'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  IAddWeekLesson,
  IChangeDayLesson,
  IDeleteDayLesson,
  IFetchDaySchedule,
} from 'types/api'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://cryptic-journey-62797.herokuapp.com/' || 'http://localhost:3001',
  }),
  tagTypes: ['Schedule', 'DaySchedule'],
  endpoints: (builder) => ({
    fetchLessons: builder.query<any, any>({
      query: () => {
        return `/lessons`
      },
      providesTags: ['Schedule'],
    }),
    fetchSchedules: builder.query<any, void | undefined>({
      query: () => {
        return '/schedules'
      },
      providesTags: ['Schedule'],
    }),
    createDaySchedule: builder.mutation<any, IFetchDaySchedule>({
      query: (body: IFetchDaySchedule) => ({
        url: '/schedule',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Schedule'],
    }),
    fetchDaySchedule: builder.query<any, IFetchDaySchedule>({
      query: ({ week, day }: IFetchDaySchedule) => {
        return `/schedule?day=${day}&week=${week}`
      },
      providesTags: ['Schedule'],
    }),
    addWeekLesson: builder.mutation<any, IAddWeekLesson>({
      query: (body: IAddWeekLesson) => ({
        url: '/weekLesson',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Schedule'],
    }),
    changeWeekLesson: builder.mutation<any, IChangeWeekLesson>({
      query: (body: IChangeWeekLesson) => ({
        url: '/weekLesson',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Schedule'],
    }),

    deleteWeekLesson: builder.mutation<any, IDeleteWeekLesson>({
      query: (body: IDeleteWeekLesson) => ({
        url: '/weekLesson',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Schedule'],
    }),
    deleteDayLesson: builder.mutation<any, IDeleteDayLesson>({
      query: (body: IDeleteDayLesson) => ({
        url: '/dayLesson',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Schedule'],
    }),
    changeDayLesson: builder.mutation<any, IChangeDayLesson>({
      query: (body: IChangeDayLesson) => ({
        url: '/dayLesson',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Schedule'],
    }),

    addDayLesson: builder.mutation<any, IAddDayLesson>({
      query: (body: IAddDayLesson) => ({
        url: '/dayLesson',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Schedule'],
    }),
  }),
})

export const {
  useFetchLessonsQuery,
  useFetchSchedulesQuery,
  useFetchDayScheduleQuery,
  useAddWeekLessonMutation,
  useDeleteDayLessonMutation,
  useChangeDayLessonMutation,
  useAddDayLessonMutation,
  useCreateDayScheduleMutation,
  useDeleteWeekLessonMutation,
  useChangeWeekLessonMutation,
} = apiSlice
