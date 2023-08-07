import { URL } from 'url'

describe(URL, () => {
  it('build a OAuth consent url', () => {
    const url = new URL('https://eu.account.amazon.com/ap/oa')

    url.searchParams.append('client_id', 'amzn1.application-oa2-client.111111111111111111111111111111111')
    url.searchParams.append('redirect_uri', 'http://localhost:0000/callback')
    url.searchParams.append('response_type', 'code')
    url.searchParams.append('state', 'UK-VENDOR')
    url.searchParams.append('scope', 'advertising::campaign_management advertising::test:create_account')

    expect(url.href).toStrictEqual('https://eu.account.amazon.com/ap/oa?client_id=amzn1.application-oa2-client.111111111111111111111111111111111&redirect_uri=http%3A%2F%2Flocalhost%3A0000%2Fcallback&response_type=code&state=UK-VENDOR&scope=advertising%3A%3Acampaign_management+advertising%3A%3Atest%3Acreate_account')
  })
})
