import { Item, executeSqlFn } from './postgres-data-source'
import { orderBy } from 'lodash'

describe('Repository', () => {
  it('CRUD entity', async () => {
    const itemsToInsert = [
      { id: 1, description: 'Hello' },
      { id: 2, description: 'World' },
    ]
    const actualResult = await executeSqlFn(async (dataSource) => {
      const repo = dataSource.getRepository(Item)
      await repo.delete({})
      await repo.save(itemsToInsert)
      const foundItems = await repo.find({})
      return orderBy(foundItems, ['id'], ['asc'])
    })

    expect(actualResult).toStrictEqual(expect.objectContaining(itemsToInsert))
  })
})
