
import { formatDate } from './../../utils/index'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFetchedSchedule, IInitialState, ILessonName, ILink, ITeacher } from 'types'

const initialState: IInitialState = {
  isFetching: false,
  teachers: [],
  links:[],
  lessonNames: [],
  daySchedule: [],
  weekSchedule: [],
  date: new Date(new Date().setHours(0, 0, 0, 0)),
  week: 1,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload
    },
    setDaySchedule: (state, action: PayloadAction<IFetchedSchedule>) => {
      const {lessons = [], dayLessons = []} = action.payload
   
      
      state.daySchedule = dayLessons
      state.weekSchedule = lessons
    },
    setDate: (state, action: PayloadAction<Date>) => {
      state.date = action.payload
    },
    setWeek: (state, action: PayloadAction<number>) => {
      state.week = action.payload
    },
    setTeachers: (state, action: PayloadAction<ITeacher[]>) => {
      state.teachers = action.payload
    },
    setLessonNames: (state, action: PayloadAction<ILessonName[]>) => {
      state.lessonNames = action.payload
    },
    setLinks: (state, action: PayloadAction<ILink[]>) => {
      state.links = action.payload
    },
  },
})

export const {
  setFetching,
  setDaySchedule,
  setDate,
  setWeek,
  setTeachers,
  setLessonNames,
  setLinks,
} = appSlice.actions
export default appSlice.reducer
