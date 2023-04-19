import { ILesson } from 'types'
import s from './Lesson.module.scss'
import { Box, Divider, Link, Typography } from '@mui/material'

interface Props {
  item: ILesson
}

export const Lesson = ({ item }: Props) => {
  const { time, lessonName, type, teacher, link } = item
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      <Typography sx={{ px: 1 }}>{time}</Typography>
      <Divider className={s.divider} orientation="vertical" flexItem />
      <Typography sx={{ px: 1 }}>{lessonName}</Typography>
      <Divider className={s.divider} orientation="vertical" flexItem />
      <Typography sx={{ px: 1 }}>{teacher}</Typography>
      <Divider className={s.divider} orientation="vertical" flexItem />
      <Typography sx={{ px: 1 }}>{type}</Typography>
      {link ? (
        <>
          <Divider className={s.divider} orientation="vertical" flexItem />
          <Link sx={{ px: 1 }} underline="none" href={link} target="_blank">
            Посилання
          </Link>
        </>
      ) : null}
    </Box>
  )
}
