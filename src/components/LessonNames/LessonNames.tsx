import { useAppSelector } from 'redux/app/hooks'
import { Box, Typography } from '@mui/material'
import { LessonName } from './LessonName/LessonName'
import { AddLessonName } from './AddLessonName/AddLessonName'

export const LessonNames = () => {
  const { lessonNames } = useAppSelector((state) => state.app)

  return (
    <Box>
      <Typography variant="h5" color={'secondary'} textAlign={'center'}>
        Додати урок
      </Typography>
      <Box sx={{ width: '100%', mb: 2.5 }}>
        <AddLessonName />
      </Box>
      {lessonNames &&
        lessonNames.map((lessonName, i) => (
          <Box key={i} mb={3}>
            <LessonName lessonName={lessonName} />
          </Box>
        ))}
    </Box>
  )
}
