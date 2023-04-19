import { Alert, AlertColor } from '@mui/material'

interface Props {
  severity: AlertColor
  message: string
}

export const StyledAlert = ({ severity, message }: Props) => {
  return (
    <Alert variant="filled" severity={severity}>
      {message}
    </Alert>
  )
}
