import { LessonNames } from 'components/LessonNames/LessonNames'
import { Lessons } from 'components/Lessons/Lessons'
import { Links } from 'components/Links/Links'
import { ScheduleLayout } from 'components/Schedule/ScheduleLayout'
import { Teachers } from 'components/Teachers/Teachers'
import { Route, Routes } from 'react-router-dom'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Lessons />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/lesson-names" element={<LessonNames />} />
      <Route path="/week-lessons" element={<ScheduleLayout type="week" />} />
      <Route path="/day-lessons" element={<ScheduleLayout type="day" />} />
      <Route path="/links" element={<Links />} />
    </Routes>
  )
}
