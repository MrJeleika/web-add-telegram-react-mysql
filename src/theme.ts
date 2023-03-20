import { createTheme } from '@mui/material'

const root = window.document.documentElement
const link = root.style.getPropertyValue('--tg-theme-link-color') || '#ba55ec'
const text = root.style.getPropertyValue('--tg-theme-text-color') || '#000'
const bg =
  root.style.getPropertyValue('--tg-theme-secondary-bg-color') || '#fff'
const hint = root.style.getPropertyValue('--tg-theme-hint-color') || '#ccc'
const buttonText =
  root.style.getPropertyValue('--tg-theme-button-text-color') || '#fff'

export const theme = createTheme({
  palette: {
    primary: { main: link },
    secondary: { main: text },

    text: {
      primary: text,
      secondary: text,
    },

    background: { default: link, paper: bg },
  },
})
