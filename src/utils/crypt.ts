import { compare, genSalt, hash } from 'bcryptjs'

const SALT_ROUND = 10

export async function hashPassword(payload: string) {
  const salt = await genSalt(SALT_ROUND)
  const hashed = await hash(payload, salt)

  return { salt, hash: hashed }
}

export async function verifyPassword(payload: string, hash: string) {
  return await compare(payload, hash)
}
