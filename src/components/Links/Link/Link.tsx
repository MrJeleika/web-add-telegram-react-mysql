import { Delete } from '@mui/icons-material'
import { Box, IconButton, Typography, Link as LinkMui } from '@mui/material'
import { useDeleteLinkMutation } from 'redux/api/appAPI'
import { useAppSelector } from 'redux/app/hooks'
import { ILink } from 'types'

interface Props {
  link: ILink
}

export const Link = ({ link }: Props) => {
  const [deleteLink] = useDeleteLinkMutation()
  const { isFetching } = useAppSelector((state) => state.app)

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ px: 1 }}>{link.name}</Typography>
        <LinkMui href={link.link} underline="none" target="_blank">
          Посилання
        </LinkMui>
      </Box>
      <IconButton onClick={() => deleteLink(link.id)} disabled={isFetching}>
        <Delete color="secondary" />
      </IconButton>
    </Box>
  )
}
