import { useAppSelector } from 'redux/app/hooks'

import { Box, Skeleton, Typography } from '@mui/material'
import { getDayLessons } from 'utils'
import { Lesson } from './Lesson/Lesson'

export const Lessons = () => {
  const { daySchedule, date, isFetching } = useAppSelector((state) => state.app)
  const dayLessons = getDayLessons(daySchedule, date)

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ px: '10px' }}>
        {isFetching ? (
          <>
            <Skeleton width={'100%'} height={80} animation="wave" />
            <Skeleton width={'100%'} height={80} animation="wave" />
            <Skeleton width={'100%'} height={80} animation="wave" />
          </>
        ) : dayLessons.length > 0 ? (
          <>
            <Typography color={'secondary'} variant="h5" fontWeight={'bold'}>
              Перша група
            </Typography>
            {dayLessons
              .filter((e) => e.group === 1)
              .sort((a, b) => (a.time > b.time ? 1 : -1))
              .map((lesson) => (
                <Box sx={{ mb: 3 }}>
                  <Lesson item={lesson} />
                </Box>
              ))}
            <Typography color={'secondary'} variant="h5" fontWeight={'bold'}>
              Друга група
            </Typography>
            {dayLessons
              .filter((e) => e.group === 2)
              .sort((a, b) => (a.time > b.time ? 1 : -1))
              .map((lesson) => (
                <Box sx={{ mb: 3 }}>
                  <Lesson item={lesson} />
                </Box>
              ))}
          </>
        ) : (
          <Typography color={'secondary'} variant="h5" fontWeight={'bold'}>
            Пар немає
          </Typography>
        )}
      </Box>
    </Box>
  )
}
