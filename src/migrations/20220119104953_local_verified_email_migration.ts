import { Knex } from 'knex'
import logger from 'knex-tiny-logger'

export async function up(k: Knex): Promise<void> {
  const knex: Knex = logger(k)

  await knex.schema.createTable('local_verified_email', table => {
    table.uuid('userId').primary()
    // .references('local_user(_id)')
    // .onDelete('CASCADE')
    table.string('email').notNullable()
  })

  await k.schema.alterTable('local_verified_email', table => {
    table
      .foreign('userId')
      .references('_id')
      .inTable('local_user')
      .onDelete('CASCADE')
  })
}

export async function down(k: Knex): Promise<void> {
  const knex: Knex = logger(k)
  await knex.schema.dropTableIfExists('local_verified_email')
}
