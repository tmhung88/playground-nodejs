import { delay, min, orderBy, pick, sortBy } from 'lodash'

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

  describe('orderBy()', () => {
    it('should sort number by value', () => {
      const individuals = [
        {
          netWorth: 633,
          name: 'Marry',
        },
        {
          netWorth: 6111,
          name: 'Peter',
        },
        {
          netWorth: 69,
          name: 'Bob',
        },
      ]
      const sortedIndividuals = orderBy(individuals, ['netWorth'], ['desc'])
      expect(sortedIndividuals).toStrictEqual([
        {
          netWorth: 6111,
          name: 'Peter',
        },
        {
          netWorth: 633,
          name: 'Marry',
        },
        {
          netWorth: 69,
          name: 'Bob',
        },
      ])
    })

    const values = sortBy([1, 4, 3, 5, 7, 1, 2])

    expect(values).toStrictEqual([1, 1, 2, 3, 4, 5, 7])
  })

  describe('delay()', () => {
    it('should run command', async () => {
      const value = await delay(() => false, 1000)
      expect(value).toBe(false)
    })
  })
})
