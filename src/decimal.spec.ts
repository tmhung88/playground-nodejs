import { Decimal } from 'decimal.js'
describe('decimal.js', () => {
  it('basic math operators', () => {
    expect(Decimal.add(0.2, 0.1).toNumber()).toEqual(0.3)
    expect(0.2 + 0.1).toEqual(0.30000000000000004)

    expect(Decimal.sub(0.3, 0.1).toNumber()).toEqual(0.2)
    expect(0.3 - 0.1).toEqual(0.19999999999999998)

    expect(Decimal.mul(0.2, 0.1).toNumber()).toEqual(0.02)
    expect(0.2 * 0.1).toEqual(0.020000000000000004)

    expect(Decimal.div(0.02, 0.1).toNumber()).toEqual(0.2)
    expect(0.02 / 0.1).toEqual(0.19999999999999998)
  })

  it('rounding', () => {
    expect(new Decimal(1.33333).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber()).toEqual(1.33)
  })
})
