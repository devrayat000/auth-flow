import { randomBytes } from 'crypto'
import handler from 'express-async-handler'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { registerValidator, verifyQueryParam } from './validator'
import { MyResponse } from '$utils/response'
import {
  createUser,
  createVerificationToken,
  createVerifiedUser,
  getVerificationToken,
} from './service'
import { sendVerificationEmail } from '$utils/nodemailer'
import { passport } from '$passport/index'
import { hashPassword } from '$utils/crypt'

export const registerHandler = handler(async (req, res) => {
  const { email, firstName, lastName, password, birthDate } =
    await registerValidator.validate(req.body)

  const { hash, salt } = await hashPassword(password)

  const user = await createUser({
    email,
    firstName,
    lastName,
    hash,
    salt,
    birthDate,
  })

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

  res
    .status(StatusCodes.CREATED)
    .json(
      new MyResponse(
        ReasonPhrases.CREATED,
        'Successfully created account. Please verify your e-mail address with the link provided.'
      )
    )
})

export const loginController = handler(async (req, res, next) => {
  const serverError = (msg: string) =>
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(new MyResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, msg))

  passport.authenticate(
    'local',
    {
      session: true,
    },
    (err, user, info) => {
      if (err) return serverError(err.message)
      if (info?.message) return serverError(info.message)
      if (!user) return serverError('Invalid User')

      req.logIn(user, err => {
        if (err) return serverError(err.message)

        res
          .status(StatusCodes.OK)
          .json(new MyResponse(ReasonPhrases.OK, 'Successfully logged in!'))
      })
    }
  )(req, res, next)
})

export const verifyController = handler(async (req, res) => {
  const { token, exp } = await verifyQueryParam.validate(req.query)
  const { _id, email } = await getVerificationToken(token, exp)
  const user = await createVerifiedUser(_id, email)

  await new Promise<void>((res, rej) =>
    req.logIn(user, (err: any) => (!!err ? rej(err) : res()))
  )

  res
    .status(StatusCodes.OK)
    .json(new MyResponse(ReasonPhrases.OK, 'Successfully verified email!'))
})
