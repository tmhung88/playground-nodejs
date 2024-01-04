import { Issuer, generators } from 'openid-client'

describe('openid-client', () => {
  describe('authorization_code_flow', () => {
    const issuer = new Issuer({
      issuer: 'https://api.amazon.com',
      authorization_endpoint: 'https://www.amazon.com/ap/oa',
      token_endpoint: 'https://api.amazon.com/auth/o2/token',
    })
    const client = new issuer.Client({
      client_id: 'some_client_id',
      client_secret: 'some_client_secret',
      redirect_uris: ['https://hello.com/callback'],
      response_types: ['code'],
    })

    it('should generate an authorization url for server-side integration', () => {
      const state = 'some_state'
      const actualUrl = client.authorizationUrl({
        state,
        scope: 'advertising::campaign_management advertising::test:create_account',
      })
      expect(actualUrl).toBe(
        'https://www.amazon.com/ap/oa?client_id=some_client_id&scope=advertising%3A%3Acampaign_management%20advertising%3A%3Atest%3Acreate_account&response_type=code&redirect_uri=https%3A%2F%2Fhello.com%2Fcallback&state=some_state',
      )
    })

    it('should generate an authorization url for client-side integration PKCE', () => {
      jest.spyOn(generators, 'codeVerifier').mockReturnValue('some_verifier_code')
      jest.spyOn(generators, 'codeChallenge').mockReturnValue('some_challenge_code')
      const code_verifier = generators.codeVerifier()
      const code_challenge = generators.codeChallenge(code_verifier)
      const state = 'some_state'
      const actualUrl = client.authorizationUrl({
        code_challenge,
        state,
        scope: 'advertising::campaign_management advertising::test:create_account',
        code_challenge_method: 'S256',
      })
      expect(actualUrl).toBe(
        'https://www.amazon.com/ap/oa?client_id=some_client_id&scope=advertising%3A%3Acampaign_management%20advertising%3A%3Atest%3Acreate_account&response_type=code&redirect_uri=https%3A%2F%2Fhello.com%2Fcallback&code_challenge=some_challenge_code&state=some_state&code_challenge_method=S256',
      )
    })
  })
})
