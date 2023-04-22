import { Delete, Edit } from '@mui/icons-material'
import { Box, Button, IconButton } from '@mui/material'
import { useDeleteWeekLessonMutation } from 'redux/api/appAPI'
import { ILesson } from 'types'
import { useState } from 'react'
import { ChangeWeekLessonModal } from './ChangeWeekLessonModal'
import { Lesson } from 'components/Lessons/Lesson/Lesson'
import { useAppSelector } from 'redux/app/hooks'

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
  const [deleteWeekLesson] = useDeleteWeekLessonMutation()

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
  const { week } = useAppSelector((state) => state.app)
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
                  disabled={isFetching}
                  onClick={() => handleOpenChangeModal(lesson)}
                  sx={{ alignSelf: 'right' }}
                >
                  <Edit color="secondary" />
                </IconButton>
                <IconButton
                  disabled={isFetching}
                  onClick={() => deleteWeekLesson(lesson.id)}
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
      <ChangeWeekLessonModal
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
