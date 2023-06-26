import { min } from 'lodash'

describe('lodash', () => {
  describe('minBy()', () => {
    it('should work with date', () => {
      const result = min([new Date('2021-01-16'), new Date('2021-01-15'), new Date('2021-01-20')])
      expect(result).toEqual(new Date('2021-01-15'))
    })
  })
})
