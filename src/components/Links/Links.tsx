import { useAppSelector } from 'redux/app/hooks'
import { Link } from './Link/Link'
import { Box, Typography } from '@mui/material'
import { AddLink } from './AddLink/AddLink'

export const Links = () => {
  const { links } = useAppSelector((state) => state.app)

  return (
    <Box>
      <Typography variant="h5" color={'secondary'} textAlign={'center'}>
        Додати посилання
      </Typography>
      <Box sx={{ width: '100%', mb: 2.5 }}>
        <AddLink />
      </Box>
      {links &&
        links.map((link, i) => (
          <Box key={i} mb={3}>
            <Link link={link} />
          </Box>
        ))}
    </Box>
  )
}
