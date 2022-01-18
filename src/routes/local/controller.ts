import type { RequestHandler } from 'express'
import { getConnection } from 'typeorm'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import AllRecipeUser from '$models/all_recipe_user'
import LocalUser from '$models/local_user'
import { registerValidator } from './validator'
import { MyResponse } from '$utils/response'

export const registerHandler: RequestHandler = async (req, res) => {
  const { email, firstName, lastName, password, birthDate } =
    await registerValidator.validate(req.body)

  const { hash, salt } = await LocalUser.hashPassword(password)

  const localUser = getConnection()
    .createQueryBuilder(LocalUser, 'local')
    .insert()
    .values({ email, firstName, lastName, hash, salt, birthDate })
    .returning(['_id'])

  const rawUser = await getConnection()
    .createQueryBuilder(AllRecipeUser, 'all_user')
    .insert()
    .values({ userId: `(${localUser.getQuery()})` })
    .returning('*')
    .execute()

  const user = AllRecipeUser.create(rawUser.generatedMaps[0])

  await new Promise<void>((res, rej) =>
    req.logIn(user, (err: any) => (!!err ? rej(err) : res()))
  )

  res.status(StatusCodes.CREATED).json(
    new MyResponse(ReasonPhrases.CREATED, 'Successfully created account.', {
      user,
    })
  )
}

export const loginController: RequestHandler = async (req, res) => {
  res
    .status(StatusCodes.OK)
    .json(new MyResponse(ReasonPhrases.OK, 'Successfully logged in!'))
}
