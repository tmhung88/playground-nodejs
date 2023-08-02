import dotenv from 'dotenv'

describe('dotenv', () => {
  it('should load a custom .env file', () => {
    dotenv.config({ path: './.env.example' })
    expect(process.env.HELLO_TARGET).toBe('world')
    expect(process.env.NUMBER_OF_HELLO).toBe('1')
  })
})
