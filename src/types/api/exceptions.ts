export interface IDeleteException{
  lesson_id: string;
}

export interface IChangeException{
  lesson_id: string;
  lesson_name_id: string
  teacher_id: string
  group: number
  time: string
  type: string
  date: string
  link_id?: string
}