import { Delete } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { useDeleteTeacherMutation } from 'redux/api/appAPI'
import { ITeacher } from 'types'

interface Props {
  teacher: ITeacher
}

export const Teacher = ({ teacher }: Props) => {
  const [deleteTeacher] = useDeleteTeacherMutation()

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ px: 1 }}>{teacher.name}</Typography>
      <IconButton onClick={() => deleteTeacher(teacher.id)}>
        <Delete color="secondary" />
      </IconButton>
    </Box>
  )
}
