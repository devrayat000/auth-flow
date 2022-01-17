const { snakeCase } = require('lodash')
const { Table, DefaultNamingStrategy } = require('typeorm')

class MyNaming extends DefaultNamingStrategy {
  name = 'MyNaming'
  tableName(targetName, userSpecifiedName) {
    return snakeCase(targetName)
  }
  columnName(propertyName, customName, embeddedPrefixes) {
    if (propertyName === '_id' || propertyName === 'id') {
      return '_id'
    }
    return snakeCase(propertyName)
  }
  relationName(propertyName) {
    return snakeCase(propertyName)
  }
  primaryKeyName(tableOrName, columnNames) {
    const name = tableOrName instanceof Table ? tableOrName.name : tableOrName
    const colNames = columnNames.map(snakeCase).join('_')
    return `${name}_${colNames}_pk`
  }
  uniqueConstraintName(tableOrName, columnNames) {
    const name = tableOrName instanceof Table ? tableOrName.name : tableOrName
    const colNames = columnNames.map(snakeCase).join('_')
    return `${name}_${colNames}_unique`
  }
  relationConstraintName(tableOrName, columnNames, where) {
    const name = tableOrName instanceof Table ? tableOrName.name : tableOrName
    const colNames = columnNames.map(snakeCase).join('_')
    return `${name}_${colNames}_rel`
  }
  defaultConstraintName(tableOrName, columnName) {
    const name = tableOrName instanceof Table ? tableOrName.name : tableOrName
    return `${name}_${columnName}_constraint`
  }
  foreignKeyName(
    tableOrName,
    columnNames,
    referencedTablePath,
    referencedColumnNames
  ) {
    const name = tableOrName instanceof Table ? tableOrName.name : tableOrName
    const colNames = columnNames.map(snakeCase).join('_')
    return `${name}_${colNames}_foreign`
  }
  indexName(tableOrName, columns, where) {
    const name = tableOrName instanceof Table ? tableOrName.name : tableOrName
    const colNames = columns.map(snakeCase).join('_')
    return `${name}_${colNames}_index`
  }
}

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
  namingStrategy: new MyNaming(),
  entities: ['./src/models/**/*.ts'],
  migrations: ['./src/migrations/*.ts'],
  logging: ['error', 'query', 'migration'],
  cli: {
    entitiesDir: './src/models',
    migrationsDir: './src/migrations',
  },
}

module.exports = config
