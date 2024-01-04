import dayjs from './dayjs'

describe('dayjs', () => {
  it('timezone conversion', () => {
    const date = dayjs.tz('Apr 21, 2023', 'MMM D, YYYY', 'America/Los_Angeles')
    const utcDate = date.utc()
    expect({ date: date.format(), utcDate: utcDate.format() }).toEqual({
      date: '2023-04-21T00:00:00-07:00',
      utcDate: '2023-04-21T07:00:00Z',
    })
  })
  it('unix time', () => {
    expect(dayjs().utc().startOf('hour').toISOString()).toStrictEqual(dayjs.utc().startOf('hour').toISOString())
    expect(dayjs('2023-05-26T08:30:46Z').utc().startOf('day').toISOString()).toEqual('2023-05-26T00:00:00.000Z')
    expect(dayjs('2023-05-26').utc(true).toISOString()).toEqual('2023-05-26T00:00:00.000Z')
    expect(dayjs('2023-05-26T08:30:46Z').utc().toISOString()).toEqual('2023-05-26T08:30:46.000Z')

    expect(dayjs('May 26, 2023', 'MMM D, YYYY').utc(true).toISOString()).toEqual('2023-05-26T00:00:00.000Z')
    // expect(dayjs('May 2, 2023', 'MMM D, YYYY').toISOString()).toEqual('2023-05-26T08:30:46.000Z')
  })

  it('get day, month, year values', () => {
    const date = dayjs('2022-12-04')
    expect({
      day: date.date(),
      month: date.month(),
      year: date.year(),
    }).toEqual({
      day: 4,
      month: 11,
      year: 2022,
    })
  })

  it('construct', () => {
    expect(dayjs.utc('9/1/2023', 'M/D/YYYY').toISOString()).toBe('2023-09-01T00:00:00.000Z')
    expect(dayjs.utc('12/15/2023', 'M/D/YYYY').toISOString()).toBe('2023-12-15T00:00:00.000Z')
  })

  it('compare dates', () => {
    expect(dayjs('30-12-2023').isValid()).toBe(false)
  })

  it('validation', () => {
    expect(dayjs(undefined, 'YYYY-MM-DD', true).utc().isValid()).toBe(true)
  })

  it('subtract', () => {
    expect(dayjs('2023-12-22').subtract(95, 'day').format()).toStrictEqual('2023-09-18T00:00:00+07:00')
  })
})
