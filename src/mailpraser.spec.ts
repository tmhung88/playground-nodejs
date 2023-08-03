import { simpleParser } from 'mailparser'
import fs from 'fs'

describe('mailparser', () => {
  describe('simpleParser', () => {
    it('should parse a downloaded Gmail email', async () => {
      const emailContent = fs.readFileSync('./data/gmail_email.eml').toString()
      const email = await simpleParser(emailContent)
      expect(email.text).toStrictEqual('Hello email content!\n')
      expect(email.subject).toStrictEqual('Hello Subject')
      expect(email.from?.value[0]).toStrictEqual({
        address: 'hung.tran@aaa.com',
        name: 'Hung Tran'
      })
      const recipient = (email.to as { value: unknown[] }).value[0]
      expect(recipient).toStrictEqual({
        address: 'someone@bbbb.com',
        name: ''
      })
    })
  })
})
