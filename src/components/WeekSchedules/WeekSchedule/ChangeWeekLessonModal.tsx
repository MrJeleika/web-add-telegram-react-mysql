import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { Close } from '@mui/icons-material'
import { useState } from 'react'
import { Box } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import { changeLessonSchema } from 'utils/validation'
import { ModalError } from 'components/common/Modal/ModalError/ModalError'
import { ILesson, ISchedule } from 'types'
import { useChangeWeekLessonMutation } from 'redux/api/appAPI'
import { SnackbarError } from 'components/common/Modal/Snackbar/SnackbarError'

interface IProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  day: string
  week: number
  schedule: ISchedule
  group: number
  lesson: ILesson
}

export const ChangeWeekLessonModal = ({
  isOpen,
  setIsOpen,
  day,
  week,
  group,
  lesson,
  schedule,
}: IProps) => {
  const handleClose = () => {
    reset()
    setIsOpen(false)
  }
  const [changeWeekLesson] = useChangeWeekLessonMutation()
  const [error, setError] = useState<boolean>(false)

  const onSubmit = (val: any) => {
    // Check if lesson on this time already exists
    if (
      schedule.schedule.find(
        (e) =>
          e.time === val.time && lesson.time !== val.time && e.group === group
      )
    ) {
      setError(true)
    } else {
      setError(false)
      changeWeekLesson({
        _id: lesson._id,
        time: val.time,
        teacher: val.teacher,
        lesson: val.lesson,
        type: val.type,
      })
      reset()
    }
  }
  const {
    control,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm({
    defaultValues: {
      time: '08:00',
      teacher: lesson.teacher,
      lesson: lesson.lesson,
      type: 'Лекція',
    },
    values: {
      time: lesson.time,
      teacher: lesson.teacher,
      lesson: lesson.lesson,
      type: lesson.type,
    },
    resolver: yupResolver(changeLessonSchema),
  })

  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: 'var(--tg-theme-secondary-bg-color)',
        },
      }}
      fullScreen
      open={isOpen}
      onClose={handleClose}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
        }}
      >
        <DialogTitle variant="body1" sx={{ fontWeight: 'bold' }}>
          Змінити урок {week}тиж., {day}
        </DialogTitle>
        <Box>
          <IconButton onClick={() => setIsOpen(false)}>
            <Close color="secondary" />
          </IconButton>
        </Box>
      </Box>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="time"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="standard"
                sx={{ minWidth: 120, my: 1 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Time
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  {...field}
                  label="Time"
                  color="primary"
                >
                  <MenuItem color="secondary" value={'08:00'}>
                    08:00
                  </MenuItem>
                  <MenuItem color="secondary" value={'09:50'}>
                    09:50
                  </MenuItem>
                  <MenuItem color="secondary" value={'11:40'}>
                    11:40
                  </MenuItem>
                  <MenuItem color="secondary" value={'13:30'}>
                    13:30
                  </MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="lesson"
            control={control}
            render={({ field }) => (
              <TextField
                label="Урок"
                variant="standard"
                fullWidth
                {...field}
                color="primary"
                sx={{
                  my: 1,
                }}
              />
            )}
          />
          <ModalError errors={errors} message={errors.lesson?.message} />
          <Controller
            name="teacher"
            control={control}
            render={({ field }) => (
              <TextField
                label="Учитель"
                variant="standard"
                fullWidth
                {...field}
                sx={{
                  my: 1,
                }}
              />
            )}
          />
          <ModalError errors={errors} message={errors.teacher?.message} />
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="standard"
                sx={{ minWidth: 120, my: 1 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Тип уроку
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  {...field}
                  label="Тип уроку"
                >
                  <MenuItem value={'Лекція'}>Лекція</MenuItem>
                  <MenuItem value={'Практика'}>Практика</MenuItem>
                  <MenuItem value={'Лабораторна'}>Лабораторна</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Button variant="contained" type="submit" sx={{ mt: 1 }}>
            Змінити
          </Button>
        </form>
      </DialogContent>
      <SnackbarError
        isOpen={error}
        setIsOpen={setError}
        message="Урок на цей час вже існує"
      />
    </Dialog>
  )
}
