import { Box, Grid, Skeleton, Typography } from '@mui/material'
import { DaySchedule } from 'components/DaySchedule/DaySchedule'
import { WeekSchedule } from 'components/WeekSchedule/WeekSchedule'
import { ReactNode } from 'react'
import { useAppSelector } from 'redux/app/hooks'

type ScheduleType = 'day' | 'week'

interface Props {
  type: ScheduleType
}

export const ScheduleLayout = ({ type }: Props) => {
  const { isFetching } = useAppSelector((state) => state.app)

  return (
    <Box>
      <Typography
        color="primary"
        variant="h5"
        sx={{ py: 2, fontWeight: 'bold', textAlign: 'center' }}
      >
        {type === 'day'
          ? 'Змінити розклад на 1 день'
          : 'Змінити постійний розклад'}
      </Typography>
      {isFetching ? (
        <Grid container spacing={1}>
          <Grid
            sm={12}
            px={1}
            pb={3}
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              width={'95vw'}
              height={50}
            />
          </Grid>
          <Grid
            sm={12}
            px={1}
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              width={'95vw'}
              height={50}
            />
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ flexGrow: 1, pt: 3 }}>
          {type === 'day' ? <DaySchedule /> : <WeekSchedule />}
        </Box>
      )}
    </Box>
  )
}
