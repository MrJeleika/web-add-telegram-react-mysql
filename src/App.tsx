import { useEffect } from 'react'
import './App.scss'
import { useTelegram } from './hooks/useTelegram'
import { Navbar } from 'components/Navbar/Navbar'
import { AppRoutes } from './routes/AppRoutes'
import {
  useLazyFetchDayLessonsQuery,
  useFetchLessonNamesQuery,
  useFetchTeachersQuery,
  useFetchLinksQuery,
} from 'redux/api/appAPI'
import { useSetFetchedData } from 'hooks/useSetFetchedData'
import {
  setDaySchedule,
  setLessonNames,
  setLinks,
  setTeachers,
} from 'redux/slice/appSlice'
import { useAppSelector } from 'redux/app/hooks'
import { formatDate } from 'utils'

function App() {
  const tg = useTelegram()
  useEffect(() => {
    tg.ready()
  }, [])

  const onClose = () => {
    tg.close()
  }

  const { date } = useAppSelector((state) => state.app)

  const [getLessons, { data: dayLessons, isFetching: lessonsIsFetching }] =
    useLazyFetchDayLessonsQuery()
  useSetFetchedData(dayLessons, setDaySchedule, lessonsIsFetching)

  useEffect(() => {
    getLessons({
      date: formatDate(date),
    })
  }, [date])

  const { data: teachers, isFetching: teachersIsFetching } =
    useFetchTeachersQuery()
  useSetFetchedData(teachers, setTeachers, teachersIsFetching)

  const { data: lessonNames, isFetching: lessonNamesIsFetching } =
    useFetchLessonNamesQuery()
  useSetFetchedData(lessonNames, setLessonNames, lessonNamesIsFetching)

  const { data: links, isFetching: linksIsFetching } = useFetchLinksQuery()
  useSetFetchedData(links, setLinks, linksIsFetching)

  return (
    <div className="App">
      <Navbar />
      <AppRoutes />
    </div>
  )
}

export default App
