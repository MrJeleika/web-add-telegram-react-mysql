export interface ICreateWeekLesson {
  lesson_name_id: string
  teacher_id: string
  group: number
  time: string
  type: string
  link_id?: string
  day: number
  week: number
}

export interface IUpdateWeekLesson {
  lesson_id: string
  lesson_name_id: string
  teacher_id: string
  group: number
  time: string
  type: string
  link_id?: string
}
