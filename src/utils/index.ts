import { useMemo } from 'react'
import { useAppSelector } from './../redux/app/hooks'
import {ILesson } from './../types/index'
import { IFetchDaySchedule } from 'types/api/dayLessons'
// import { useAppSelector } from '../redux/app/hooks'
// import { useDispatch, useSelector } from 'react-redux'
// import schedule from '../misc/schedule.json'

// export const getSchedule = (date: Date) => {
//   const { weekNum } = useAppSelector((state) => state.app)
//   const day = date.getDay() === 0 ? 6 : date.getDay() - 1 // As week in JS starts on Sunday, we have to manually set it to
//   console.log(day)
//   if (day === 5 || day === 6) return { undefined, undefined }
//   const group1 = schedule[0][weekNum][day].map(
//     ({ time, lesson, lessonType, teacher }) => ({
//       time,
//       lesson: lessons[lesson][0],
//       lessonType: lessonTypes[lessonType][0],
//       teacher: teachers[teacher][0],
//     })
//   )
//   const group2 = schedule[1][weekNum][day].map(
//     ({ time, lesson, lessonType, teacher }) => ({
//       time,
//       lesson: lessons[lesson][0],
//       lessonType: lessonTypes[lessonType][0],
//       teacher: teachers[teacher][0],
//     })
//   )
//   return { group1, group2 }
// }

declare global {
  interface Date {
    getWeek(): number
    getWeekDay(): number
  }
}

Date.prototype.getWeekDay = function () {
  return (this.getDay() === 0 ? 6 : this.getDay() - 1) + 1
}

Date.prototype.getWeek = function (): number {
  const onejan: any = new Date(this.getFullYear(), 0, 1)
  const today: any = new Date(
    this.getFullYear(),
    this.getMonth(),
    this.getDate()
  )
  const dayOfYear = (today - onejan + 86400000) / 86400000
  // Week from start of the year
  const lessonsStartWeek = 5
  if ((Math.ceil(dayOfYear / 7) - lessonsStartWeek) % 2 === 0) {
    return 1
  }
  return 2
}

export const daysOfWeek = [
  'Понеділок',
  'Вівторок',
  'Середа',
  'Четвер',
  'П`ятниця',
  'Субота',
  'Неділя',
]

// Have to format date on comparison due different languages on device
export const formatDate = (date: Date | string): string => {
  let index = String(date).indexOf(' (')
  if (String(date).includes(' (')) return String(date).substring(0, index)
  return String(date)
}


// export const getDayLessons = (daySchedule: ILesson[], date: Date) => {
  
  
  
//   // List of day lessons including exceptions
//   const scheduleLessons = lessons.map((lesson) => {
//     let exception = exceptions.find(
//       (ex) => ex.time === lesson.time && ex.day === lesson.day && ex.week === lesson.week
//     )
//     return exception ? exception : lesson
//   })
//   exceptions.forEach(ex => console.log(ex)
//   )
//   console.log(formatDate(date));
  
//   return [

//   ]
// }

// const teachers = {
//   GolDO: ['Гололобов Д.О.', 'Gololobov D.O.'],
//   GryOM: ['Гришко О.М.', 'Gryshko O.M.'],
//   MorOV: ['Мороз О.В.', 'Moroz O.V.'],
//   BelYA: ['Бєлозьорова Я.А.', 'Belozorova Y.A.'],
//   KorSP: ['Корнієнко С.П.', 'Kornienko S.P.'],
//   BorLO: ['Борковська Л.О.', 'Borkovska L.O.'],
//   ZybSV: ['Зибін С.В.', 'Zybin S.V.'],
//   TreMP: ['Трембовецький М.П.', 'Trembovetskyi M.P.'],
//   PryOY: ['Приходько О.Ю.', 'Prykhodko O.Y.'],
//   LytSV: ['Литвинська С.В.', 'Lytvynska S.V.'],
//   VasMD: ['Васильєва М.Д.', 'Vasylieva M.D.'],
//   TerLG: ['Теремінко Л.Г.', 'Tereminko L.G.'],
//   PosLP: ['Поставна Л.П.', 'Postavna L.P.'],
//   AndTV: ['Андреєва Т.В.', 'Andreeva T.V.'],
//   SmoUB: ['Смольніков Ю.Б.', 'Smolnikov Y.B.'],
//   BilNP: ['Білоус Н.П.', 'Bilous N.P.'],
//   OleTA: ['Олешко Т.А.', 'Oleshko T.A.'],
//   GriOO: ['Гріненко О.О.', 'Grinenko O.O.'],
//   TroVM: ['Трофимчук В.М.', 'Trofimchuk V.M.'],
//   SorTS: ['Сорокопуд Т.С.', 'Sorokopud T.S.'],
//   CheSI: ['Черіпко С.І.', 'Cheripko S.I.'],
//   LukIV: ['Лукашова І.В.', 'Lukashova I.V.'],
//   DyaTM: ['Дячук Т.М.', 'Dyachuk T.M.'],
//   StuMD: ['Стукач М.Д.', 'Stukach M.D.'],
//   SibAV: ['Сібрук А.В.', 'Sibruk A.V.'],
// }

// const lessonTypes = {
//   LC: ['Лекція', 'Lecture'],
//   PC: ['Практична', 'Practice'],
//   LB: ['Лабораторна', 'Laboratory'],
//   None: ['', ''],
// }

// const lessons = {
//   MatAn: ['Математичний аналіз', 'Mathematical Analysis'],
//   KDM: ["Комп'ютерна дискретна математика", 'Computer Discret Mathematics'],
//   KH: ['Кураторський час', 'Curator Hour'],
//   OIPZ: [
//     'Основи інженерії програмного забезпечення',
//     'Software Engineering Foundations',
//   ],
//   FIM: ['Фахова іноземна мова', 'Professional foreign language'],
//   OP: ['Основи програмування', 'Basics of programming'],
//   IYDtK: [
//     'Історія української державності та культури',
//     'History of Ukrainian statehood and culture',
//   ],
//   OOP: ["Об'єктно-орієнтоване програмування", 'Object-oriented programming'],
//   DS: ['Дискретні структури', 'Discrete structures'],
//   LAtAG: [
//     'Лінійна алгебра та аналітична геометрія',
//     'Linear algebra and analytic geometry',
//   ],
//   DUM: ['Ділова українська мова', 'Business Ukrainian language'],
//   FVtS: [
//     'Фізичне виховання та самовдосконалення',
//     'Physical education and self-improvement',
//   ],
// }
