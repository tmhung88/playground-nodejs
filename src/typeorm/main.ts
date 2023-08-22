import { Item, executeSqlFn } from './postgres-data-source'
import * as console from 'console'
import { orderBy } from 'lodash'

async function main(): Promise<void> {
  const results = await executeSqlFn(async (dataSource) => {
    const repo = dataSource.getRepository(Item)
    await repo.delete({})
    await repo.insert({
      id: 1,
      description: 'Hello',
    })
    await repo.insert({
      id: 2,
      description: 'World',
    })
    const items = await repo.find({})
    return orderBy(items, ['id'], ['asc'])
  })
  console.log(`results ${JSON.stringify(results)}`)
}

main().catch(console.error)
