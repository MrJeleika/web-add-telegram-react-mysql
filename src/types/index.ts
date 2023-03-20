export interface ILesson {
  id: number
  day: number
  week: number
  lesson: string
  teacher: string
  type: string
  group: number
  time: string
  date: string | undefined
}

export interface IExcludedLesson {
  _id: string
  time: string
  lesson: string
  teacher: string
  group: number
  type: string
  date: string
  __v: number
}

export interface ISchedule {
  _id: string
  week: number
  day: number
  schedule: ILesson[]
  exceptions: IExcludedLesson[]
}

export interface IInitialState {
  lessons: ILesson[]
  isFetching: boolean
  weekSchedule: ISchedule[]
  daySchedule: ISchedule
  date: Date
  schedules: ISchedule[]
  week: number
}
