import { Delete } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { useDeleteLessonNameMutation } from 'redux/api/appAPI'
import { ILessonName } from 'types'

interface Props {
  lessonName: ILessonName
}

export const LessonName = ({ lessonName }: Props) => {
  const [deleteLessonName] = useDeleteLessonNameMutation()

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ px: 1 }}>{lessonName.name}</Typography>
      <IconButton onClick={() => deleteLessonName(lessonName.id)}>
        <Delete color="secondary" />
      </IconButton>
    </Box>
  )
}
