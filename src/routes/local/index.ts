import { Router } from 'express'

import {
  loginController,
  registerHandler,
  verifyController,
} from './controller'

const localRouter = Router()

localRouter.post('/register', registerHandler)

localRouter.post('/login', loginController)

localRouter.get('/verify', verifyController)

if (process.env.NODE_ENV !== 'production') {
  localRouter.get('/user', async (req, res) => {
    res.json({ user: req.user })
  })
}

export default localRouter
