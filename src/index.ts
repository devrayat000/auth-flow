import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import session from 'express-session'

import connection from '$utils/connection'
import { cacheClient, cacheStore } from '$services/cache'
import passportApp from './passport'
import authRouter from '$routes/auth'
import errorHandler from './middlewares/error'

const app = express()

const port = process.env.PORT ?? 3001

app.set('port', port)

app.use(errorHandler)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET ?? 'super_cookie_secret'))
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? 'super_session_secret',
    store: cacheStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      signed: process.env.NODE_ENV === 'production',
    },
  })
)

app.use(express.static('public'))

// Passport app
app.use(passportApp)

app.get('/', async (req, res) => {
  res.send('Working!')
})

app.use('/auth', authRouter)

async function listen() {
  await Promise.all([connection(), cacheClient.connect()])

  await new Promise<void>(r => app.listen(port, r))

  console.log(`>_ http://localhost:${port}`)
  return app
}

export { app, listen }
export default app

// export{}
