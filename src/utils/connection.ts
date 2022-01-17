import { createConnection, getConnectionOptions } from 'typeorm'

export default async function connection() {
  const opts = await getConnectionOptions()
  const options = Object.assign(opts, {
    entities: [],
    migrations: [],
  })

  return await createConnection(options)
}
