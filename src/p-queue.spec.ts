import { range } from 'lodash'
import PQueue from 'p-queue'

describe('p-queue', () => {
  it('execute a max of certain promises at a time', async () => {
    const queue = new PQueue({ concurrency: 1 })
    const start = Date.now()
    let counter = 0
    const maxLoop = 10
    const delay = 20
    range(0, maxLoop).map(async () => {
      await queue.add(async () => {
        await new Promise((resolve) => setTimeout(resolve, delay))
        counter++
      })
    })
    await queue.onIdle()
    expect(counter).toStrictEqual(maxLoop)
    expect(Date.now() - start).toBeGreaterThan(maxLoop * delay)
  })
})
