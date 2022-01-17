const { snakeCase } = require('lodash')
/**
 * @type {import('typeorm').ConnectionOptions}
 */
const config = {
  type: 'postgres',
  username: 'postgres',
  password: 'ppooii12',
  host: 'localhost',
  port: 5432,
  database: 'basic-auth',
  namingStrategy: {
    columnName: propName => snakeCase(propName),
  },
  entities: ['./src/models/**/*.ts'],
  migrations: ['./src/migrations/*.ts'],
  logging: ['error', 'query', 'migration'],
  cli: {
    entitiesDir: './src/models',
    migrationsDir: './src/migrations',
  },
}

module.exports = config
