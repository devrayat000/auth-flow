import { Knex } from 'knex'

const config: Record<'production' | 'development', Knex.Config> = {
  development: {
    client: 'pg',
    version: '13',
    connection: {
      user: 'postgres',
      password: 'ppooii12',
      host: 'localhost',
      port: 5432,
      database: 'basic-auth',
    },
    //   log:

    migrations: {
      tableName: 'auth-migrations',
      directory: ['./src/migrations'],
      extension: 'ts',
    },
  },
  production: {},
}

export default config
