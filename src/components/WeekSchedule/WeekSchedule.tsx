import {
  Typography,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material'
import { useState } from 'react'
import { AddWeekLessonModal } from './AddWeekLessonModal'
import { ScheduleGroupItem } from './ScheduleGroupItem'
import { daysOfWeek } from 'utils'
import { useAppSelector } from 'redux/app/hooks'

export const WeekSchedule = () => {
  const [isOpenAddLesson, setIsOpenAddLesson] = useState<boolean>(false)

  const { week, weekSchedule, date } = useAppSelector((state) => state.app)

  const [group, setGroup] = useState<number>(1)

  const handleOpenAddModal = (group: number) => {
    setIsOpenAddLesson(true)
    setGroup(group)
  }

  const day = daysOfWeek[date.getWeekDay() - 1]
  return (
    <>
      <AccordionDetails>
        <Typography variant="h6">Група 1</Typography>
        <ScheduleGroupItem
          group={1}
          day={day}
          setGroup={setGroup}
          handleOpenAddModal={handleOpenAddModal}
          schedule={weekSchedule}
        />
        <Divider variant="fullWidth" />
        <Typography variant="h6">Група 2</Typography>
        <ScheduleGroupItem
          group={2}
          day={day}
          setGroup={setGroup}
          handleOpenAddModal={handleOpenAddModal}
          schedule={weekSchedule}
        />
      </AccordionDetails>

      <AddWeekLessonModal
        schedule={weekSchedule}
        isOpen={isOpenAddLesson}
        setIsOpen={setIsOpenAddLesson}
        day={day}
        group={group}
        week={week}
      />
    </>
  )
}
