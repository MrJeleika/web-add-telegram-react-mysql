import { Delete } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { useDeleteTeacherMutation } from 'redux/api/appAPI'
import { useAppSelector } from 'redux/app/hooks'
import { ITeacher } from 'types'

interface Props {
  teacher: ITeacher
}

export const Teacher = ({ teacher }: Props) => {
  const [deleteTeacher] = useDeleteTeacherMutation()
  const { isFetching } = useAppSelector((state) => state.app)
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ px: 1 }}>{teacher.name}</Typography>
      <IconButton
        onClick={() => deleteTeacher(teacher.id)}
        disabled={isFetching}
      >
        <Delete color="secondary" />
      </IconButton>
    </Box>
  )
}
