export interface IFetchDaySchedule {
  week: number
  day: number
}

export interface IAddWeekLesson {
  _id: string // id of schedule
  time: string
  lesson: string
  teacher: string
  group: number
  type: string
}

export interface IDeleteWeekLesson {
  _id: string // id of lesson
}
export interface IChangeWeekLesson {
  _id: string // id of lesson
  time: string
  lesson: string
  teacher: string
  type: string
}

export interface IDeleteDayLesson {
  _id: string
  lessonId: string
  date: string
}

export interface IChangeDayLesson {
  _id: string // id of schedule
  lessonId: string
  date: string
  group: number
  type: string
  time: string
  lesson: string
  teacher: string
}

export interface IAddDayLesson {
  _id: string
  time: string
  lesson: string
  type: string
  group: number
  teacher: string
  date: string
}
