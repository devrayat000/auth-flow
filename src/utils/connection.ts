import { createConnection, getConnectionOptions } from 'typeorm'

import LocalUser from '$models/local_user'
import AllRecipeUser from '$models/all_recipe_user'
import EmailVerification from '$models/email_verification'
import LocalVerifiedEmail from '$models/local_verified_emails'
import LocalPasswordReset from '$models/local_password_reset'

export default async function connection() {
  const opts = await getConnectionOptions()
  const options = Object.assign(opts, {
    entities: [
      LocalUser,
      AllRecipeUser,
      EmailVerification,
      LocalVerifiedEmail,
      LocalPasswordReset,
    ],
    migrations: [],
  })

  return await createConnection(options)
}
