import { Knex } from 'knex'
import logger from 'knex-tiny-logger'

export async function up(k: Knex): Promise<void> {
  const knex: Knex = logger(k)

  await knex.schema.createTable('email_verification', table => {
    table.uuid('_id').primary()
    // .references('local_user(_id)')
    // .onDelete('CASCADE')
    table.string('email').notNullable()
    table
      .string('verificationToken')
      .notNullable()
      .unique()
      .index('email_verification_token_index')
    table.bigint('verificationTokenExpiry').notNullable()
  })

  await k.schema.alterTable('email_verification', table => {
    table
      .foreign('_id')
      .references('_id')
      .inTable('local_user')
      .onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  knex = logger(knex)
  await knex.schema.dropTableIfExists('email_verification')
}
