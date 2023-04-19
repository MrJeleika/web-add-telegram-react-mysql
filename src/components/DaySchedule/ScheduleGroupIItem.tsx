import { Delete, Edit } from '@mui/icons-material'
import { Box, Button, IconButton } from '@mui/material'
import {
  useAddDayLessonMutation,
  useDeleteDayLessonMutation,
  useDeleteExceptionMutation,
  useDeleteWeekLessonMutation,
} from 'redux/api/appAPI'
import { ILesson } from 'types'
import { useState } from 'react'
import { Lesson } from 'components/Lessons/Lesson/Lesson'
import { useAppSelector } from 'redux/app/hooks'
import { ChangeDayLessonModal } from './ChangeDayLessonModal'
import { formatDate } from 'utils'

interface Props {
  group: number
  day: string
  schedule: ILesson[]
  handleOpenAddModal: (number: number) => void
  setGroup: (number: number) => void
}

export const ScheduleGroupItem = ({
  schedule,
  day,
  group,
  setGroup,
  handleOpenAddModal,
}: Props) => {
  const [isOpenChangeLesson, setIsOpenChangeLesson] = useState<boolean>(false)
  const [deleteDayLesson] = useDeleteDayLessonMutation()
  const [deleteException] = useDeleteExceptionMutation()

  // Default values to avoid errors
  const [lesson, setLesson] = useState<any>({
    time: '08:00',
    type: 'Лекція',
  })

  const handleOpenChangeModal = (lesson: ILesson) => {
    setGroup(lesson.group)
    setLesson(lesson)
    setIsOpenChangeLesson(true)
  }
  const { week, date } = useAppSelector((state) => state.app)

  return (
    <>
      {schedule &&
        schedule
          .filter((e) => e.group === group && e.time)
          .sort((a, b) => (a.time > b.time ? 1 : -1))
          .map((lesson, i) => (
            <Box key={i} sx={{ mb: 1.5 }}>
              <Lesson item={lesson} />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton
                  onClick={() => handleOpenChangeModal(lesson)}
                  sx={{ alignSelf: 'right' }}
                >
                  <Edit color="secondary" />
                </IconButton>

                <IconButton
                  // check if lesson is exception
                  onClick={() =>
                    lesson.date
                      ? deleteException(lesson.id)
                      : deleteDayLesson({
                          lesson_id: lesson.id,
                          date: formatDate(date),
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
        onClick={() => handleOpenAddModal(group)}
        variant="contained"
        sx={{ mb: 2 }}
      >
        Додати
      </Button>
      <ChangeDayLessonModal
        group={group}
        isOpen={isOpenChangeLesson}
        setIsOpen={setIsOpenChangeLesson}
        day={day}
        schedule={schedule}
        lesson={lesson}
        week={week}
      />
    </>
  )
}
