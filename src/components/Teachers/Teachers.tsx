import { useAppSelector } from 'redux/app/hooks'
import { Teacher } from './Teacher/Teacher'
import { Box, Typography } from '@mui/material'
import { AddTeacher } from './AddTeacher/AddTeacher'

export const Teachers = () => {
  const { teachers } = useAppSelector((state) => state.app)

  return (
    <Box>
      <Typography variant="h5" color={'secondary'} textAlign={'center'}>
        Додати вчителя
      </Typography>
      <Box sx={{ width: '100%', mb: 2.5 }}>
        <AddTeacher />
      </Box>
      {teachers &&
        teachers.map((teacher, i) => (
          <Box key={i} mb={3}>
            <Teacher teacher={teacher} />
          </Box>
        ))}
    </Box>
  )
}
