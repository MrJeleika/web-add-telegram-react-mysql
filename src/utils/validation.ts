import { useAppSelector } from 'redux/app/hooks'
import * as yup from 'yup'

export const changeLessonSchema = yup
  .object({
    time: yup.string().required(),
    lesson: yup.string().required(),
    teacher: yup.string().required(),
    type: yup.string().required(),
  })
  .required()


const {daySchedule} = useAppSelector(state => state.app)

