import { useAppSelector } from 'redux/app/hooks'

import { Box, Skeleton, Typography } from '@mui/material'
import { Lesson } from './Lesson/Lesson'

export const Lessons = () => {
  const { daySchedule, isFetching, week, date } = useAppSelector(
    (state) => state.app
  )

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ px: '10px' }}>
        {isFetching ? (
          <>
            <Skeleton width={'100%'} height={80} animation="wave" />
            <Skeleton width={'100%'} height={80} animation="wave" />
            <Skeleton width={'100%'} height={80} animation="wave" />
          </>
        ) : daySchedule.length > 0 ? (
          <>
            <Typography color={'secondary'} variant="h5" fontWeight={'bold'}>
              Перша група
            </Typography>
            {daySchedule
              .filter((e) => e.group === 1 && e.time)
              .sort((a, b) => (a.time > b.time ? 1 : -1))
              .map((lesson, i) => (
                <Box key={i} sx={{ mb: 3 }}>
                  <Lesson item={lesson} />
                </Box>
              ))}
            <Typography color={'secondary'} variant="h5" fontWeight={'bold'}>
              Друга група
            </Typography>
            {daySchedule
              .filter((e) => e.group === 2 && e.time)
              .sort((a, b) => (a.time > b.time ? 1 : -1))
              .map((lesson, i) => (
                <Box key={i} sx={{ mb: 3 }}>
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
