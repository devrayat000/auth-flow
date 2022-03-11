import { Knex } from 'knex'
import logger from 'knex-tiny-logger'

export async function up(k: Knex): Promise<void> {
  const knex: Knex = logger(k)

  await knex.schema.createTable('local_user', table => {
    table.uuid('_id').defaultTo(knex.raw('gen_random_uuid()')).primary()
    table.string('email').unique().index('local_user_email_index').notNullable()
    table.string('firstName').notNullable()
    table.string('lastName').notNullable()
    // table.string('fullName').notNullable()
    table.string('photoUrl').notNullable().defaultTo('default.png')
    table.date('birthDate').notNullable()
    table.string('hash').notNullable()
    table.string('salt').notNullable()
    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })

  await knex.schema.raw(/*sql*/ `
          ALTER TABLE IF EXISTS "local_user"
              ADD COLUMN IF NOT EXISTS "fullName" VARCHAR NOT NULL
                  GENERATED ALWAYS AS ("firstName" || ' ' || "lastName") STORED;
      `)
}

export async function down(k: Knex): Promise<void> {
  const knex: Knex = logger(k)
  await knex.schema.dropTableIfExists('local_user')
}
