import { useAppSelector } from 'redux/app/hooks'
import { Box, Button, IconButton, Skeleton, Typography } from '@mui/material'
import { daysOfWeek, formatDate, getDayLessons } from 'utils'
import { Lesson } from 'components/Lessons/Lesson/Lesson'
import { useState } from 'react'
import { AddDayLessonModal } from './AddDayLessonModal'
import { Delete, Edit } from '@mui/icons-material'
import { useDeleteDayLessonMutation } from 'redux/api/appAPI'
import { IExcludedLesson, ILesson } from 'types'
import { ChangeDayLessonModal } from './ChangeDayLessonModal'

export const ChangeDaySchedule = () => {
  const { daySchedule, date, isFetching } = useAppSelector((state) => state.app)

  // get lessons on this day with exceptions
  const dayLessons = getDayLessons(daySchedule, date)

  const [addLessonIsOpen, setAddLessonIsOpen] = useState<boolean>(false)
  const [changeLessonIsOpen, setChangeLessonIsOpen] = useState<boolean>(false)
  const [group, setGroup] = useState<number>(1)
  const [lesson, setLesson] = useState<any>({
    time: '08:00',
    type: 'Лекція',
  })

  const [deleteDayLesson, { error }] = useDeleteDayLessonMutation()

  const handleAddLesson = (group: number) => {
    setAddLessonIsOpen(true)
    setGroup(group)
  }
  const handleChangeLesson = (
    lesson: ILesson | IExcludedLesson,
    group: number
  ) => {
    setChangeLessonIsOpen(true)
    setGroup(group)
    setLesson(lesson)
  }
  const day = daysOfWeek[daySchedule.day - 1]
  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography
        color="primary"
        variant="h5"
        sx={{ py: 2, fontWeight: 'bold', textAlign: 'center' }}
      >
        Змінити розклад на 1 день
      </Typography>
      <Box sx={{ px: '10px' }}>
        {isFetching ? (
          <>
            <Skeleton width={'100%'} height={80} animation="wave" />
            <Skeleton width={'100%'} height={80} animation="wave" />
            <Skeleton width={'100%'} height={80} animation="wave" />
          </>
        ) : daySchedule._id ? (
          <>
            <Typography
              color={'secondary'}
              variant="h5"
              fontWeight={'bold'}
              sx={{ mb: 1 }}
            >
              Перша група
            </Typography>
            {dayLessons
              .filter((e) => e.group === 1)
              .sort((a, b) => (a.time > b.time ? 1 : -1))
              .map((lesson) => (
                <Box sx={{ mb: 3 }}>
                  <Lesson item={lesson} />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton
                      onClick={() => handleChangeLesson(lesson, 1)}
                      sx={{ alignSelf: 'right' }}
                    >
                      <Edit color="secondary" />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        deleteDayLesson({
                          _id: daySchedule._id,
                          date: formatDate(date),
                          lessonId: lesson._id,
                        })
                      }
                      sx={{ alignSelf: 'right' }}
                    >
                      <Delete color="secondary" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            <Button
              onClick={() => handleAddLesson(1)}
              variant="contained"
              sx={{ mb: 2 }}
            >
              Додати
            </Button>
            <Typography
              color={'secondary'}
              variant="h5"
              fontWeight={'bold'}
              sx={{ mb: 1 }}
            >
              Друга група
            </Typography>
            {dayLessons
              .filter((e) => e.group === 2)
              .sort((a, b) => (a.time > b.time ? 1 : -1))
              .map((lesson, i) => (
                <Box key={i} sx={{ mb: 3 }}>
                  <Lesson item={lesson} />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton sx={{ alignSelf: 'right' }}>
                      <Edit color="secondary" />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        deleteDayLesson({
                          _id: daySchedule._id,
                          date: formatDate(date),
                          lessonId: lesson._id,
                        })
                      }
                      sx={{ alignSelf: 'right' }}
                    >
                      <Delete color="secondary" />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            <Button
              onClick={() => handleAddLesson(2)}
              variant="contained"
              sx={{ mb: 2 }}
            >
              Додати
            </Button>
          </>
        ) : (
          <Typography color="primary" variant="h5">
            Спочатку додайте розклад на цей день
          </Typography>
        )}
        <AddDayLessonModal
          isOpen={addLessonIsOpen}
          setIsOpen={setAddLessonIsOpen}
          group={group}
          schedule={daySchedule}
          week={daySchedule.week}
          day={day}
        />
        <ChangeDayLessonModal
          isOpen={changeLessonIsOpen}
          setIsOpen={setChangeLessonIsOpen}
          group={group}
          schedule={daySchedule}
          week={daySchedule.week}
          day={day}
          lesson={lesson}
        />
      </Box>
    </Box>
  )
}
