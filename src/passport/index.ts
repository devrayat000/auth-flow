import AllRecipeUser from 'src/modelsx/all_recipe_user'
import express from 'express'
import { Passport } from 'passport'
import { getConnection } from 'typeorm'
import initializeLocal from './local'

const passportApp = express()
const passport = new Passport()

passportApp.use(passport.initialize())
passportApp.use(passport.session())

passport.serializeUser<string>((user, done) => {
  try {
    console.log(user)

    done(null, user.userId)
  } catch (error) {
    done(error)
  }
})

passport.deserializeUser<string>(async (userId, done) => {
  try {
    const user = await getConnection()
      .createQueryBuilder(AllRecipeUser, 'user')
      .where('user.user_id = :userId', { userId })
      .limit(1)
      .getOne()

    if (!user) {
      throw new Error('User not found!')
    }
    done(null, user)
  } catch (error) {
    done(error)
  }
})

initializeLocal(passport)

export { passport }
export default passportApp
