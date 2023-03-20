import { ISchedule } from 'types'
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import { AddWeekLessonModal } from './AddWeekLessonModal'
import { ScheduleGroupItem } from './ScheduleGroupItem'
import { daysOfWeek } from 'utils'

interface Props {
  schedule: ISchedule
}

export const WeekSchedule = ({ schedule }: Props) => {
  const [isOpenAddLesson, setIsOpenAddLesson] = useState<boolean>(false)

  const [group, setGroup] = useState<number>(1)

  const handleOpenAddModal = (group: number) => {
    setIsOpenAddLesson(true)
    setGroup(group)
  }

  const day = daysOfWeek[schedule.day - 1]
  return (
    <>
      <AccordionSummary sx={{ cursor: 'default' }}>
        <Typography variant="h6" component="h6">
          {day}, {schedule.week} тиждень
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="h6">Група 1</Typography>
        <ScheduleGroupItem
          group={1}
          day={day}
          setGroup={setGroup}
          handleOpenAddModal={handleOpenAddModal}
          schedule={schedule}
        />
        <Divider variant="fullWidth" />
        <Typography variant="h6">Група 2</Typography>
        <ScheduleGroupItem
          group={2}
          day={day}
          setGroup={setGroup}
          handleOpenAddModal={handleOpenAddModal}
          schedule={schedule}
        />
      </AccordionDetails>
      <AddWeekLessonModal
        schedule={schedule}
        isOpen={isOpenAddLesson}
        setIsOpen={setIsOpenAddLesson}
        day={day}
        group={group}
        week={schedule.week}
      />
    </>
  )
}
