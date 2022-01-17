import type { Passport, PassportStatic } from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

export default async function initializeLocal(passport: PassportStatic) {
  passport.use(
    new LocalStrategy(
      {
        passwordField: 'hash',
        usernameField: 'email',
        session: true,
      },
      async (email, password, done) => {}
    )
  )
}
