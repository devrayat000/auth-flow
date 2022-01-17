import LocalUser from '$models/local_user'
import _passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { getConnection } from 'typeorm'

export default async function initializeLocal(
  passport: _passport.Authenticator
) {
  passport.use(
    new LocalStrategy(
      {
        passwordField: 'hash',
        usernameField: 'email',
        session: true,
      },
      async (email, password, done) => {
        try {
          const user = await getConnection()
            .createQueryBuilder(LocalUser, 'user')
            .where('user.email = :email', { email })
            .limit(1)
            .getOne()

          if (!user) {
            done(null, false, { message: 'User not found!' })
          } else if (!(await user.verifyPassword(password))) {
            done(null, false, { message: 'Password incorrect!' })
          } else done(null, user)
        } catch (error) {
          done(error)
        }
      }
    )
  )
}
