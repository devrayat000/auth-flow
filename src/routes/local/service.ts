import { knex } from '$services/knex'
import { AuthError } from '$utils/error'
import { IAllRecipeUser, ILocalUserInsert } from 'knex/types/tables'

export async function createUser(input: ILocalUserInsert) {
  const { email, firstName, lastName, hash, salt, birthDate } = input

  const [user]: IAllRecipeUser[] = await knex
    .with('local', qb => {
      return qb
        .table('local_user')
        .insert({
          email,
          firstName,
          lastName,
          hash,
          salt,
          birthDate,
        })
        .returning(['_id'])
    })
    .from(knex.raw('?? (??)', ['all_recipe_user', 'userId']))
    .insert(knex('local').select(['_id AS userId']))
    .returning(['userId'])

  return user
}

export async function createVerificationToken({
  id,
  email,
  token,
  expiration,
}: CreateVerificationToken) {
  await knex('email_verification')
    .insert({
      _id: id,
      email,
      verificationToken: token,
      verificationTokenExpiry: expiration,
    })
    .onConflict(['verificationToken'])
    .merge(['verificationToken', 'verificationTokenExpiry'] as any)
}

export async function getVerificationToken(token: string, exp: number) {
  const [emailVerification] = await knex('email_verification')
    .select('_id', 'email', 'verificationTokenExpiry')
    .where({ verificationToken: token })
    .limit(1)

  if (!emailVerification) {
    throw new AuthError.TokenError()
  }

  if (Date.now() >= emailVerification.verificationTokenExpiry) {
    throw new AuthError.TokenExpired()
  }

  return emailVerification
}

export async function createVerifiedUser(userId: string, email: string) {
  const insertVerified = knex('local_verified_email').insert({ userId, email })
  const getUser = knex('all_recipe_user').where({ userId }).limit(1)

  const [[verifiedUser]] = await Promise.all([getUser, insertVerified])

  return verifiedUser
}

export interface CreateVerificationToken {
  id: string
  email: string
  token: string
  expiration: number
}
