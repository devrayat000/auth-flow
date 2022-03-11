import HttpError, { AuthError } from '$utils/error'
import { ErrorRequestHandler } from 'express'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err)

  if (err instanceof HttpError) {
    res.status(err.code).json(err.response)
  } else if (err instanceof Error) {
    res.status(500).json({ message: err.message })
  } else {
    res.status(500).send('Unhandled error')
  }
}

export default errorHandler
