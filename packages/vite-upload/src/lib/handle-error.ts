import { toast } from 'sonner'
import { z } from 'zod/v4'

export function getErrorMessage(error: unknown) {
  const unknownError = 'Something went wrong, please try again later.'

  if (error instanceof z.ZodError) {
    const errors = error.issues.map(({ message }) => message)
    return errors.join('\n')
  } else if (error instanceof Error) {
    return error.message
  } else {
    return unknownError
  }
}

export function showErrorToast(error: unknown) {
  const errorMessage = getErrorMessage(error)
  return toast.error(errorMessage)
}
