import knexFun from 'knex'
// import logger from 'knex-tiny-logger'

import knexConfig from 'knexfile'

export const knex = knexFun<any, Record<string, any>[]>(knexConfig.development)
// export const knexWithLogger = logger(knex)
