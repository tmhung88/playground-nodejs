import * as crypto from 'crypto'
import { range } from 'lodash'
describe('crypto', () => {
  describe('md5', () => {
    it('should provide the same hash string', () => {
      const hash = crypto.createHash('md5').update('hello world').digest('hex')
      expect(hash).toStrictEqual('5eb63bbbe01eeed093cb22bb8f5acdc3')
      console.log(range(0, 10).map((i) => i))
    })
  })
})
