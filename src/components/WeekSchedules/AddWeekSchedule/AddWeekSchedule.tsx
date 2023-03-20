import { Button, Skeleton, Box } from '@mui/material'
import { useAppSelector } from 'redux/app/hooks'
import { useCreateDayScheduleMutation } from 'redux/api/appAPI'
import { getWeekNum } from 'utils'

export const AddWeekSchedule = () => {
  const { isFetching, date } = useAppSelector((state) => state.app)

  const [createDaySchedule] = useCreateDayScheduleMutation()

  const onSubmit = () => {
    createDaySchedule({
      week: getWeekNum(date),
      day: date.getWeekDay(),
    })
  }

  return (
    <>
      {isFetching ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <Skeleton
            variant="rectangular"
            animation="pulse"
            width={'80%'}
            height={80}
          />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={onSubmit}
            variant="contained"
            sx={{ px: 1, py: 1.5 }}
          >
            Додати розклад на цей день
          </Button>
        </Box>
      )}
    </>
  )
}
