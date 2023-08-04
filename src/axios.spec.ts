import axios from 'axios'

/**
 * Free apis for testing
 * https://apipheny.io/free-api/
 */
describe(axios, () => {
  describe('get', () => {
    it('include query params that are not null/undefined', async () => {
      const params = {
        name: 'world',
        postalCode: null,
        country: undefined
      }
      const response = await axios.get('https://api.agify.io/', { params })
      expect(response.request.path).toStrictEqual('/?name=world')
      expect(response.status).toStrictEqual(200)
    })
  })
})
