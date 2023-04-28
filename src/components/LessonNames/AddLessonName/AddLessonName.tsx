import { Alert, Box, Button, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useAddLessonNameMutation } from 'redux/api/appAPI'
import { useAppSelector } from 'redux/app/hooks'

interface SubmitData {
  name: string
}

export const AddLessonName = () => {
  const [addLessonName] = useAddLessonNameMutation()
  const { isFetching } = useAppSelector((state) => state.app)
  const onSubmit = (data: SubmitData) => {
    addLessonName(data)
    reset()
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...register('name', { required: 'Введіть назву уроку' })}
              label="Урок"
              variant="standard"
              {...field}
              sx={{
                my: 1,
              }}
            />
          )}
        />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="contained" type="submit" disabled={isFetching}>
            Додати
          </Button>
        </Box>
      </Box>
      {errors.name && <Alert severity="error">{errors.name?.message}</Alert>}
    </form>
  )
}
