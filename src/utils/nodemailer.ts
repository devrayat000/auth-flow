import { createTransport } from 'nodemailer'

const transport = createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'rayathos05@gmail.com',
    pass: 'Ppooii1234!',
  },
  logger: process.env.NODE_ENV !== 'production',
})

export async function sendVerificationEmail({
  token,
  expiration,
  to,
  name,
}: MailArgs) {
  const url = `http://localhost:3001/auth/local/verify?token=${token}&exp=${expiration}`

  await transport.sendMail({
    from: '"Auth-flow Email Verification" <rayathos05@gmail.com>',
    replyTo: 'rayathos05@gmail.com',
    to: `"${name}" <${to}>`,
    subject: 'Test email',
    text: `
        You have requested to create an account on Auth-Flow.

        Before you can use your account you must verify your email ${to}.
        Please click the link below to confirm your request:
        ${url}
      `,
    html: `
        <h2>You have requested to create an account on Auth-Flow.</h2>

        <p>Before you can use your account you must verify your email.
        Please click the link below to confirm your request:</p>
        <a href="${url}" re="noopener nonce" target="_blank">Verify Email</a>
      `,
  })
}

transport.on('error', err => {
  console.log(err.message)
  process.exit(1)
})

export interface MailArgs {
  name: string
  to: string
  token: string
  expiration: number
}
