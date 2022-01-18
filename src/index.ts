import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import connection from '$utils/connection'
import session from 'express-session'
import { cacheClient, RedisStore } from './services/cache'

const app = express()

const port = process.env.PORT ?? 3001

app.set('port', port)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET ?? 'super_cookie_secret'))
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? 'super_session_secret',
    store: new RedisStore({ client: cacheClient }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      signed: process.env.NODE_ENV === 'production',
    },
  })
)

app.use(express.static('public'))

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

app.get('/', async (req, res) => {
  res.send('Working!')
})

async function listen() {
  await Promise.all([connection(), cacheClient.connect()])

  await new Promise<void>(r => app.listen(port, r))

  console.log(`>_ http://localhost:${port}`)
  return app
}

export { app, listen }
export default app

// export{}
