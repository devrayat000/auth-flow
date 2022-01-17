import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

// import indexRouter from "./routes/index";
// import usersRouter from "./routes/users";

const app = express()

const port = process.env.PORT ?? 3001

app.set('port', port)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('public'))

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

app.get('/', async (req, res) => {
  res.send('Working!')
})

async function listen() {
  app.listen(port, () => {
    console.log(`>_ http://localhost:${port}`)
  })
  return app
}

export { app, listen }
export default app

// export{}
