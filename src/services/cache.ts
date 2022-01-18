import Redis from 'ioredis'
import connectRedis from 'connect-redis'
import session, { MemoryStore } from 'express-session'

export const cacheClient = new Redis({
  port: 6379,
  lazyConnect: true,
})

export const RedisStore = connectRedis(session)

export const cacheStore = (() => {
  if (process.env.NODE_ENV !== 'production') {
    return new MemoryStore()
  } else {
    return new RedisStore({ client: cacheClient })
  }
})()
