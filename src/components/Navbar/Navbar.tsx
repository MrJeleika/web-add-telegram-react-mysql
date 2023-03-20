import { useRef, useState } from 'react'
import { CalendarComponent } from '../Calendar/Calendar'
import s from './Navbar.module.scss'
import { CalendarSVG } from '../svg/CalendarSVG'
import { Box, IconButton, Skeleton, Typography } from '@mui/material'
import { useAppSelector } from 'redux/app/hooks'
import { daysOfWeek } from 'utils'
import { Link } from 'react-router-dom'
import { ArrowBackIosNew, Edit } from '@mui/icons-material'

export const Navbar = () => {
  const { date, isFetching, daySchedule } = useAppSelector((state) => state.app)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const navbarRef = useRef<HTMLDivElement>(null)

  return (
    <div className={s.nav}>
      <div className={s.nav__body} ref={navbarRef}>
        <Link to="/">
          <IconButton>
            <ArrowBackIosNew color="primary" />
          </IconButton>
        </Link>
        <Box sx={{ display: 'flex' }} onClick={() => setIsOpen(!isOpen)}>
          <div className={s.svg}>
            <CalendarSVG />
          </div>
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer' }}
            color={'secondary'}
          >
            Вибрати день
          </Typography>
        </Box>
        <Link to="/change">
          <IconButton>
            <Edit color="primary" />
          </IconButton>
        </Link>
      </div>

      <Typography
        onClick={() => setIsOpen(true)}
        variant="h3"
        color={'secondary'}
        textAlign={'center'}
        sx={{ cursor: 'pointer' }}
      >
        {date.toLocaleString('en-GB', {
          month: '2-digit',
          day: '2-digit',
        })}
      </Typography>
      {isFetching ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Skeleton width={'60%'} height={40} animation={'wave'} />
        </Box>
      ) : (
        <Typography
          textAlign={'center'}
          variant="h5"
          color={'secondary'}
          sx={{ mb: 2 }}
        >
          {daysOfWeek[date.getWeekDay() - 1]}, {daySchedule.week} тиждень
        </Typography>
      )}
      <CalendarComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navbarRef={navbarRef}
      />
    </div>
  )
}
