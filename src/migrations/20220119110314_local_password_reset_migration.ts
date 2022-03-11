import { Knex } from 'knex'
import logger from 'knex-tiny-logger'

export async function up(k: Knex): Promise<void> {
  const knex: Knex = logger(k)

  await knex.schema.createTable('local_password_reset', table => {
    table.uuid('userId').primary()
    // .references('local_user(_id)')
    // .onDelete('CASCADE')
    table.string('email').notNullable()
    table
      .string('passwordResetToken')
      .notNullable()
      .unique()
      .index('local_password_reset_token_index')
    table.bigint('passwordResetTokenExpiry').notNullable()
  })

  await k.schema.alterTable('local_password_reset', table => {
    table
      .foreign('userId')
      .references('_id')
      .inTable('local_user')
      .onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  knex = logger(knex)
  await knex.schema.dropTableIfExists('local_password_reset')
}
