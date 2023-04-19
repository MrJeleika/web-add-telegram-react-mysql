import { useRef, useState } from 'react'
import { CalendarComponent } from '../Calendar/Calendar'
import s from './Navbar.module.scss'
import { CalendarSVG } from '../svg/CalendarSVG'
import { Box, IconButton, Skeleton, Typography } from '@mui/material'
import { useAppSelector } from 'redux/app/hooks'
import { daysOfWeek } from 'utils'
import { Link, useLocation } from 'react-router-dom'
import { ArrowBackIosNew, Menu } from '@mui/icons-material'
import { Burger } from './Burger/Burger'

export const Navbar = () => {
  const { date, isFetching, week } = useAppSelector((state) => state.app)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const navbarRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  return (
    <Box className={s.nav}>
      <Box className={s.nav__body} ref={navbarRef}>
        {location.pathname === '/' ? (
          <Box sx={{ width: '40px' }}></Box>
        ) : (
          <Link to="/">
            <IconButton>
              <ArrowBackIosNew color="primary" />
            </IconButton>
          </Link>
        )}
        <Box sx={{ display: 'flex' }} onClick={() => setIsOpen(!isOpen)}>
          <Box className={s.svg}>
            <CalendarSVG />
          </Box>
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer' }}
            color={'secondary'}
          >
            Вибрати день
          </Typography>
        </Box>
        <Burger />
      </Box>

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
          {daysOfWeek[date.getWeekDay() - 1]}, {week} тиждень
        </Typography>
      )}
      <CalendarComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navbarRef={navbarRef}
      />
    </Box>
  )
}
