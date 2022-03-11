import { Knex } from 'knex'
import logger from 'knex-tiny-logger'

export async function up(k: Knex): Promise<void> {
  const knex: Knex = logger(k)
  await knex.schema.createTable('all_recipe_user', table => {
    table.uuid('userId').primary()
    //   .references('local_user(_id)')
    //   .onDelete('CASCADE')
    table
      .enum('recipe', ['local', 'google', 'facebook', 'twitter'])
      .defaultTo('local')
      .notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now())
  })

  await k.schema.alterTable('all_recipe_user', table => {
    table
      .foreign('userId')
      .references('_id')
      .inTable('local_user')
      .onDelete('CASCADE')
  })
}

export async function down(knex: Knex): Promise<void> {
  knex = logger(knex)
  await knex.schema.dropTableIfExists('all_recipe_user')
}
