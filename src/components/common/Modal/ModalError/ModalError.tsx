import { Alert } from '@mui/material'

interface Props {
  errors: any
  message: any
}

export const ModalError = ({ errors, message }: Props) => {
  return (
    <>
      {message ? (
        <Alert severity="error" sx={{ my: 1 }} variant="outlined">
          {message}
        </Alert>
      ) : null}
    </>
  )
}
