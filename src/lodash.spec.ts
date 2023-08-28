import { min, pick } from 'lodash'

describe('lodash', () => {
  describe('minBy()', () => {
    it('should work with date', () => {
      const result = min([new Date('2021-01-16'), new Date('2021-01-15'), new Date('2021-01-20')])
      expect(result).toEqual(new Date('2021-01-15'))
    })
  })

  describe('pick()', () => {
    it('should return an empty object when the given prop is not found', () => {
      expect(pick({ age: 5 }, ['name'])).toStrictEqual({})
      expect(pick({ name: undefined }, ['name'])).toStrictEqual({ name: undefined })
    })
  })
})
