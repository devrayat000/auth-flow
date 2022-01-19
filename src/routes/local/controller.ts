import { randomBytes } from 'crypto'
import type { RequestHandler } from 'express'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import LocalUser from '$models/local_user'
import { registerValidator } from './validator'
import { MyResponse } from '$utils/response'
import { createUser, createVerificationToken } from './service'
import { sendVerificationEmail } from '$utils/nodemailer'

export const registerHandler: RequestHandler = async (req, res) => {
  const { email, firstName, lastName, password, birthDate } =
    await registerValidator.validate(req.body)

  const { hash, salt } = await LocalUser.hashPassword(password)

  const user = await createUser({
    email,
    firstName,
    lastName,
    hash,
    salt,
    birthDate,
  })

  await new Promise<void>((res, rej) =>
    req.logIn(user, (err: any) => (!!err ? rej(err) : res()))
  )

  const token = randomBytes(12).toString('hex')
  const expiry = Date.now() + 15 * 60 * 1000

  await Promise.all([
    createVerificationToken({
      email,
      token,
      expiration: expiry,
      id: user.userId,
    }),
    sendVerificationEmail({
      token,
      to: email,
      name: `${firstName} ${lastName}`,
      expiration: expiry,
    }),
  ])

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
