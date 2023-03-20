import { useEffect, useState } from 'react'
import './App.scss'
import { useTelegram } from './hooks/useTelegram'
import {
  useAddDayLessonMutation,
  useAddWeekLessonMutation,
  useChangeDayLessonMutation,
  useDeleteDayLessonMutation,
  useFetchLessonsQuery,
} from './redux/api/appAPI'
import { Navbar } from 'components/Navbar/Navbar'
import { Lessons } from 'components/Lessons/Lessons'
import { useAppSelector } from 'redux/app/hooks'
import { AddWeekSchedule } from 'components/WeekSchedules/AddWeekSchedule/AddWeekSchedule'
import { Box, Button } from '@mui/material'
import { WeekSchedules } from 'components/WeekSchedules/WeekSchedules'
import { ChangeDaySchedule } from 'components/ChangeDaySchedule/ChangeDaySchedule'
import { Link, Route, Routes } from 'react-router-dom'

function App() {
  const tg = useTelegram()
  useEffect(() => {
    tg.ready()
  }, [])

  const { data } = useFetchLessonsQuery(0)

  const onClose = () => {
    tg.close()
  }

  const { date } = useAppSelector((state) => state.app)

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Lessons />} />
        <Route
          path="/change"
          element={[<ChangeDaySchedule />, <WeekSchedules />]}
        />
      </Routes>
    </div>
  )
}

export default App
