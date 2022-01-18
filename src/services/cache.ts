import Redis from 'ioredis'
import connectRedis from 'connect-redis'
import session from 'express-session'

export const cacheClient = new Redis({
  port: 6379,
  lazyConnect: true,
})

export const RedisStore = connectRedis(session)
