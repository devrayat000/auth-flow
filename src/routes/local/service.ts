import AllRecipeUser from '$models/all_recipe_user'
import LocalUser, { ILocalUser } from '$models/local_user'
import { getConnection, getManager } from 'typeorm'

type Ox<T extends object, K extends keyof T> = Omit<T, K>
type CreateUserInput = Ox<
  ILocalUser,
  '_id' | 'createdAt' | 'updatedAt' | 'photoUrl' | 'fullName'
>

export async function createUser(input: CreateUserInput) {
  const { email, firstName, lastName, hash, salt, birthDate } = input

  const localUser = getConnection()
    .createQueryBuilder(LocalUser, 'local')
    .insert()
    .values({
      email,
      firstName,
      lastName,
      hash,
      salt,
      birthDate,
    })
    .returning(['_id'])

  const [rawUser] = await getConnection().manager.query(
    /*sql*/ `
      WITH "local" AS (
          ${localUser.getSql()}
      )
      INSERT INTO "all_recipe_user"(user_id) SELECT _id FROM "local" RETURNING *;
    `,
    Object.values(localUser.getParameters())
  )

  const user = new AllRecipeUser()
  user.userId = rawUser.user_id
  user.createdAt = rawUser.created_at
  user.recipe = rawUser.recipe

  return user
}
