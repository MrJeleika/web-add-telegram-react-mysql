import Calendar from 'react-calendar'
import { useEffect, useRef, useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import './Calendar.scss'
import { motion } from 'framer-motion'
import { setDate, setDaySchedule } from '../../redux/slice/appSlice'
import { formatDate, getWeekNum } from 'utils'
import { useFetchDayScheduleQuery } from 'redux/api/appAPI'
import { useSetFetchedData } from 'hooks/useSetFetchedData'
import { useAppDispatch } from 'redux/app/hooks'

interface IProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  navbarRef: any
}

export const CalendarComponent = ({ isOpen, setIsOpen, navbarRef }: IProps) => {
  const [date, setData] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0))
  )
  const [week, setWeek] = useState<number>(1)

  const calendarRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()

  const variants = {
    open: { opacity: 1, display: 'block' },
    closed: { opacity: 0, transitionEnd: { display: 'none' } },
  }

  const { data, isFetching } = useFetchDayScheduleQuery({
    week,
    day: date.getWeekDay(),
  })

  useSetFetchedData(data, setDaySchedule, isFetching)

  // Set default values if no lessons on this day
  useEffect(() => {
    if (!data) {
      dispatch(
        setDaySchedule({
          _id: '',
          day: date.getWeekDay(),
          week,
          schedule: [],
          exceptions: [],
        })
      )
    }
  }, [data])

  // close calendar on outside click
  useEffect(() => {
    const handler = (e: any) => {
      if (
        !calendarRef.current!.contains(e.target) &&
        !navbarRef.current.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])

  useEffect(() => {
    dispatch(setDate(new Date(formatDate(date))))
    setIsOpen(false)
    setWeek(getWeekNum(date))
  }, [date])

  return (
    <motion.div
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
      transition={{ duration: 0.2 }}
      ref={calendarRef}
      initial={{
        opacity: 0,
        display: 'none',
        position: 'fixed',
        top: '50px',
        zIndex: '999',
      }}
    >
      <Calendar value={date} onChange={setData} minDetail="year" locale="uk" />
    </motion.div>
  )
}
