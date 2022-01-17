import express from 'express'
import { Passport } from 'passport'
import initializeLocal from './local'

const passportApp = express()
const passport = new Passport()

passportApp.use(passport.initialize())
passportApp.use(passport.session())

initializeLocal(passport)

export default passportApp
