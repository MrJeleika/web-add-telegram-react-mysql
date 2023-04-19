import Calendar from 'react-calendar'
import { useEffect, useRef, useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import './Calendar.scss'
import { motion } from 'framer-motion'
import { setDate, setWeek } from '../../redux/slice/appSlice'
import { formatDate } from 'utils'
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

  const calendarRef = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()

  const variants = {
    open: { opacity: 1, display: 'block' },
    closed: { opacity: 0, transitionEnd: { display: 'none' } },
  }

  // // Set default values if no lessons on this day
  // useEffect(() => {
  //   if (!data) {
  //     dispatch(
  //       setDaySchedule({
  //         _id: '',
  //         day: date.getWeekDay(),
  //         week,
  //         schedule: [],
  //         exceptions: [],
  //       })
  //     )
  //   }
  // }, [data])

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
    setIsOpen(false)
    dispatch(setDate(new Date(formatDate(date))))
    dispatch(setWeek(date.getWeek()))
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
