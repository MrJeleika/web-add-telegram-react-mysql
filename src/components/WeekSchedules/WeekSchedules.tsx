import { useAppSelector } from 'redux/app/hooks'
import { AddWeekSchedule } from './AddWeekSchedule/AddWeekSchedule'
import { Box, Skeleton, Grid, Typography } from '@mui/material'
import { useSetFetchedData } from 'hooks/useSetFetchedData'
import { setSchedules } from 'redux/slice/appSlice'
import { useFetchSchedulesQuery } from 'redux/api/appAPI'
import { WeekSchedule } from './WeekSchedule/WeekSchedule'

interface Props {}

export const WeekSchedules = ({}: Props) => {
  const { isFetching, daySchedule } = useAppSelector((state) => state.app)

  console.log(daySchedule)

  const { data, isFetching: fetching } = useFetchSchedulesQuery()
  useSetFetchedData(data, setSchedules, fetching)

  return (
    <Box>
      <Typography
        color="primary"
        variant="h5"
        sx={{ py: 2, fontWeight: 'bold', textAlign: 'center' }}
      >
        Змінити постійний розклад
      </Typography>
      {!daySchedule._id ? (
        <AddWeekSchedule />
      ) : isFetching ? (
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
          <WeekSchedule schedule={daySchedule} />
        </Box>
      )}
    </Box>
  )
}
