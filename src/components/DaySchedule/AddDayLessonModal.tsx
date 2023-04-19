import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { Box } from '@mui/system'
import { Controller, useForm } from 'react-hook-form'
import { useAddDayLessonMutation } from 'redux/api/appAPI'
import { ILesson } from 'types'
import { useAppSelector } from 'redux/app/hooks'
import { StyledAlert } from 'components/common/Alert/StyledAlert'
import { formatDate } from 'utils'

interface IProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  day: string
  week: number
  schedule: ILesson[]
  group: number
}

interface SubmitData {
  time: string
  teacher: string
  lessonName: string
  type: string
  link: string
}

export const AddDayLessonModal = ({
  isOpen,
  setIsOpen,
  day,
  week,
  group,
  schedule,
}: IProps) => {
  const { lessonNames, teachers, date, links } = useAppSelector(
    (state) => state.app
  )

  const handleClose = () => {
    reset()
    setIsOpen(false)
  }
  const [addDayLesson] = useAddDayLessonMutation()

  const onSubmit = (data: SubmitData) => {
    // Check if lesson on this time already exists
    addDayLesson({
      week,
      day: date.getWeekDay(),
      group,
      time: data.time,
      type: data.type,
      lesson_name_id: data.lessonName,
      teacher_id: data.teacher,
      date: formatDate(date),
      // Undefined if no link provided
      link_id: data.link ? data.link : undefined,
    })
    reset()
  }

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      time: '08:00',
      teacher: '',
      lessonName: '',
      type: 'Лекція',
      link: '',
    },
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
          Додати урок {week}тиж., {day}
        </DialogTitle>
        <Box>
          <IconButton onClick={handleClose}>
            <Close color="secondary" />
          </IconButton>
        </Box>
      </Box>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="time"
            control={control}
            rules={{
              validate: {
                required: (value: string) => {
                  if (
                    schedule.find(
                      (lesson) =>
                        lesson.time === value && lesson.group === group
                    )
                  )
                    return 'Урок на цей час вже існує'
                  return true
                },
              },
            }}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="standard"
                sx={{ minWidth: 120, my: 1 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Час
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  {...field}
                  label="Час"
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
          {errors.time && (
            <StyledAlert severity="error" message={errors.time.message!} />
          )}
          <Controller
            name="lessonName"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="standard"
                sx={{ minWidth: 120, my: 1 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Урок
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  {...field}
                  label="Урок"
                  color="primary"
                  {...register('lessonName', { required: 'Виберіть урок' })}
                >
                  {lessonNames &&
                    lessonNames.map((lessonName, i) => (
                      <MenuItem color="secondary" value={lessonName.id} key={i}>
                        {lessonName.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          />
          {errors.lessonName && (
            <StyledAlert
              severity="error"
              message={errors.lessonName.message!}
            />
          )}
          <Controller
            name="teacher"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="standard"
                sx={{ minWidth: 120, my: 1 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Учитель
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  {...field}
                  label="Учитель"
                  color="primary"
                  {...register('teacher', { required: 'Виберіть вчителя' })}
                >
                  {teachers &&
                    teachers.map((teacher, i) => (
                      <MenuItem color="secondary" value={teacher.id} key={i}>
                        {teacher.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          />
          {errors.teacher && (
            <StyledAlert severity="error" message={errors.teacher.message!} />
          )}

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
          <Controller
            name="link"
            control={control}
            render={({ field }) => (
              <FormControl
                fullWidth
                variant="standard"
                sx={{ minWidth: 120, my: 1 }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Посилання
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  {...field}
                  label="Посилання"
                  color="primary"
                >
                  <MenuItem color="secondary" value={''}>
                    Немає
                  </MenuItem>
                  {links &&
                    links.map((link, i) => (
                      <MenuItem color="secondary" value={link.id} key={i}>
                        {link.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          />
          <Button variant="contained" type="submit" sx={{ mt: 1 }}>
            Додати
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
