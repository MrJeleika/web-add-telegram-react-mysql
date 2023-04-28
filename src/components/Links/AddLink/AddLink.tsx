import { Alert, Box, Button, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useAddLinkMutation } from 'redux/api/appAPI'
import { useAppSelector } from 'redux/app/hooks'

interface SubmitData {
  name: string
  link: string
}

export const AddLink = () => {
  const [addLink] = useAddLinkMutation()
  const { isFetching } = useAppSelector((state) => state.app)

  const onSubmit = (data: SubmitData) => {
    addLink(data)
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
      link: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: ['column', 'row'],
          justifyContent: 'space-around',
          p: ['0 20px', '0'],
        }}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...register('name', { required: "Введіть ім'я" })}
              label="Ім'я (Алгебра лекції)"
              variant="standard"
              {...field}
              sx={{
                my: 1,
              }}
            />
          )}
        />
        {errors.name && <Alert severity="error">{errors.name?.message}</Alert>}
        <Controller
          name="link"
          control={control}
          render={({ field }) => (
            <TextField
              {...register('link', { required: 'Введіть посилання' })}
              label="Посилання"
              variant="standard"
              {...field}
              sx={{
                my: 1,
              }}
            />
          )}
        />
        {errors.link && <Alert severity="error">{errors.link?.message}</Alert>}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button variant="contained" type="submit" disabled={isFetching}>
            Додати
          </Button>
        </Box>
      </Box>
    </form>
  )
}
