export interface ILesson {
  id: string
  day: number
  week: number
  lessonName: string
  teacher: string
  type: string
  link: string
  group: number
  time: string
  date?: string
  ref?: string
}

export interface ILink{
  id: string
  name: string
  link: string
}

export interface ITeacher{
  id: string
  name: string
}
export interface ILessonName{
  id: string
  name: string
}

export interface IFetchedSchedule{
  lessons: ILesson[]
  dayLessons: ILesson[]
}

export interface IInitialState {
  isFetching: boolean
  daySchedule: ILesson[]
  date: Date
  week: number
  teachers: ITeacher[]
  lessonNames: ILessonName[]
  weekSchedule: ILesson[]
  links: ILink[]
}
