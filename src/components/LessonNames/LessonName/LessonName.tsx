import { Delete } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { useDeleteLessonNameMutation } from 'redux/api/appAPI'
import { useAppSelector } from 'redux/app/hooks'
import { ILessonName } from 'types'

interface Props {
  lessonName: ILessonName
}

export const LessonName = ({ lessonName }: Props) => {
  const [deleteLessonName] = useDeleteLessonNameMutation()
  const { isFetching } = useAppSelector((state) => state.app)
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ px: 1 }}>{lessonName.name}</Typography>
      <IconButton
        onClick={() => deleteLessonName(lessonName.id)}
        disabled={isFetching}
      >
        <Delete color="secondary" />
      </IconButton>
    </Box>
  )
}
