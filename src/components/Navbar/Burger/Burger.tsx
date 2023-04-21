import { Menu } from '@mui/icons-material'
import {
  Box,
  IconButton,
  List,
  Link as MuiLink,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface IList {
  text: string
  link: string
}

export const Burger = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setIsOpen(open)
    }

  const list: IList[] = [
    { text: 'Змінити постійний розклад', link: '/week-lessons' },
    { text: 'Змінити розклад на день', link: '/day-lessons' },
    { text: 'Уроки', link: '/lesson-names' },
    { text: 'Вчителі', link: '/teachers' },
    { text: 'Посилання', link: '/links' },
  ]

  return (
    <>
      <IconButton onClick={toggleDrawer(true)}>
        <Menu color="primary" />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        onClick={toggleDrawer(false)}
      >
        <Box sx={{ width: 'auto' }}>
          <List>
            {list.map((listItem, i) => (
              <ListItem key={i}>
                <Link to={`${listItem.link}`}>
                  <ListItemButton>
                    <MuiLink underline="none">
                      <Typography variant="h6">{listItem.text}</Typography>
                    </MuiLink>
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  )
}
