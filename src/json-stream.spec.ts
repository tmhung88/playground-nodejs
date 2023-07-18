import * as streamChain from 'stream-chain'
import fs from 'fs'
import zlib from 'zlib'
import stream from 'stream'
import { parser } from 'stream-json'
import { streamArray } from 'stream-json/streamers/StreamArray'
import Batch from 'stream-json/utils/Batch'

describe('json-stream', () => {
  it('should batch items', async () => {
    const pipeline = streamChain.chain([
      fs.createReadStream('./data/users.json.gz'),
      zlib.createGunzip(),
      parser(),
      streamArray(),
      new Batch({ batchSize: 40 })
    ])

    let actualRowCount = 0
    for await (const dataBatch of pipeline) {
      actualRowCount = actualRowCount + Number.parseInt(dataBatch.length)
    }
    expect(actualRowCount).toStrictEqual(500)
  })

  it('should work with Unit8Array as input', async () => {
    const input = new Uint8Array(fs.readFileSync('./data/users.json.gz'))
    const pipeline = streamChain.chain([
      stream.Readable.from(Buffer.from(input.buffer)),
      zlib.createGunzip(),
      parser(),
      streamArray()
    ])

    let rowCount = 0
    pipeline.on('data', () => rowCount++)
    pipeline.on('end', () => { expect(rowCount).toStrictEqual(500) })
  })
})
