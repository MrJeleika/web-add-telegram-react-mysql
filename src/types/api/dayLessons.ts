export interface IFetchDaySchedule {
  date: string
}

export interface IUpdateDayLesson {
  lesson_id: string;
  lesson_name_id: string
  teacher_id: string
  group: number
  time: string
  type: string
  date: string
  link_id?: string
  week: number
  day: number
}

export interface IDeleteDayLesson {
  lesson_id: string
  date: string
}

export interface ICreateDayLesson {
  week: number
  day: number
  lesson_name_id: string
  teacher_id: string
  group: number
  time: string
  type: string
  date: string
  link_id?: string
}
