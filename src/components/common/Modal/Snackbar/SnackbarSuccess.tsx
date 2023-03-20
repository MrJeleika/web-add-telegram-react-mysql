import { Close } from '@mui/icons-material'
import { IconButton, Snackbar, SnackbarProps } from '@mui/material'

interface Props {
  setIsOpen: (boolean: boolean) => void
  message: string
  props?: SnackbarProps
  isOpen: boolean
}

export const SnackbarSuccess = ({
  setIsOpen,
  message,
  props,
  isOpen,
}: Props) => {
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setIsOpen(false)}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  )
  return (
    <Snackbar
      {...props}
      open={isOpen}
      autoHideDuration={5000}
      onClose={() => setIsOpen(false)}
      message={message}
      action={action}
    />
  )
}
