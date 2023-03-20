import { IExcludedLesson, ILesson } from 'types'
import s from './Lesson.module.scss'
import { Box, Divider, Typography } from '@mui/material'

interface Props {
  item: ILesson | IExcludedLesson
}

export const Lesson = ({ item }: Props) => {
  const { time, lesson, type, teacher } = item
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <Typography sx={{ px: 1 }}>{time}</Typography>
      <Divider className={s.divider} orientation="vertical" flexItem />
      <Typography sx={{ px: 1 }}>{lesson}</Typography>
      <Divider className={s.divider} orientation="vertical" flexItem />
      <Typography sx={{ px: 1 }}>{teacher}</Typography>
      <Divider className={s.divider} orientation="vertical" flexItem />
      <Typography sx={{ px: 1 }}>{type}</Typography>
    </Box>
  )
}
