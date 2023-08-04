import PQueue from 'p-queue'

async function main(): Promise<void> {
  const queue = new PQueue({ concurrency: 2 })
  const queuePromise = []
  const start = Date.now()
  for (let i = 0; i < 100; i++) {
    const result = queue.add(async () => {
      console.log(`start ${i} - ${Math.round((Date.now() - start) / 1000)}`)
      let waitTime = 0
      if (i === 0) {
        waitTime = 10000
      } else if (i === 2) {
        waitTime = 8000
      } else if (i === 5 || i === 6) {
        waitTime = 5000
      } else {
        waitTime = 4000 * (i % 3)
      }
      await new Promise((resolve) => setTimeout(resolve, waitTime))
      console.log(`complete ${i} - ${Math.round((Date.now() - start) / 1000)}`)
    })

    queuePromise.push(result)
  }
  await Promise.all(queuePromise)
}

main().catch(console.error)
