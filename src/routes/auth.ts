import { Router } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { MyResponse } from '$utils/response'
import localRouter from './local'

const authRouter = Router()

authRouter.post('/logout', async (req, res) => {
  req.logOut()
  res
    .status(StatusCodes.OK)
    .json(new MyResponse(ReasonPhrases.OK, 'Successfully logged out!'))
})

authRouter.use('/local', localRouter)

export default authRouter
