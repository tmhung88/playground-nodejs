import { authenticator } from 'otplib'

describe('otplib', () => {
  describe('authenticator', () => {
    it('should generate OTP for Amazon.com', () => {
      // Get this secret from Amazon > Login & Security > Two-Step Verification > Add new App
      const secret = '66TW AAGT MCMO HANT VXHV ZR76 5OYM BHYC 37UZ HFE7 6GAT ATGC A3DQ'.replaceAll(' ', '')
      const token = authenticator.generate(secret)
      const isValid = authenticator.check(token, secret)
      console.log(`Token ${token} | isValid ${String(isValid)} | remainingTime ${authenticator.timeRemaining()} | timeUsed ${authenticator.timeUsed()}`)
      expect(isValid).toBe(true)
    })
  })
})
