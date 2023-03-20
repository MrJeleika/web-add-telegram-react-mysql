import { formatDate } from './../../utils/index'
import { ISchedule } from './../../types/index'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IInitialState, ILesson } from 'types'

const initialState: IInitialState = {
  lessons: [],
  isFetching: false,
  weekSchedule: [],
  daySchedule: {
    _id: '',
    day: 0,
    week: 0,
    schedule: [],
    exceptions: [],
  },
  schedules: [],
  date: new Date(new Date().setHours(0, 0, 0, 0)),
  week: 1,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLessons: (state, action: PayloadAction<ILesson[]>) => {
      state.lessons = action.payload
    },
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload
    },
    setWeekSchedule: (state, action: PayloadAction<ISchedule[]>) => {
      state.weekSchedule = action.payload
    },
    setDaySchedule: (state, action: PayloadAction<ISchedule>) => {
      state.daySchedule = action.payload
    },
    setDate: (state, action: PayloadAction<Date>) => {
      state.date = action.payload
    },
    setWeek: (state, action: PayloadAction<number>) => {
      state.week = action.payload
    },
    setSchedules: (state, action: PayloadAction<ISchedule[]>) => {
      state.schedules = action.payload
    },
  },
})

export const {
  setLessons,
  setFetching,
  setWeekSchedule,
  setDaySchedule,
  setSchedules,
  setDate,
  setWeek,
} = appSlice.actions
export default appSlice.reducer
