import axios, { InternalAxiosRequestConfig } from 'axios'
import { AxiosResponse } from 'axios/index'
import { hrtime } from 'process'

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
        country: undefined,
      }
      const response = await axios.get('https://api.agify.io/', { params })
      expect(response.request.path).toStrictEqual('/?name=world')
      expect(response.status).toStrictEqual(200)
    })
  })

  describe('trackResponseTime', () => {
    type CustomConfig = InternalAxiosRequestConfig & {
      startTime: bigint
    }
    type CustomResponse = AxiosResponse & {
      stats: { responseTime: number; host: string; path: string; responseStatus: number }
    }

    function trackResponseTime(response: AxiosResponse | undefined) {
      const startTime = (response?.config as CustomConfig).startTime
      const request = response?.request
      if (startTime == null || response == null || request == null) {
        return
      }
      const responseTime = Number((hrtime.bigint() - startTime) / BigInt(1_000_000))
      ;(response as CustomResponse).stats = {
        responseTime,
        path: `${request.method} ${request.path.split('?')[0]}`,
        host: request.host,
        responseStatus: response.status,
      }
      return response
    }

    const axiosInstance = axios.create()
    axiosInstance.interceptors.request.use(async (config) => {
      ;(config as CustomConfig).startTime = hrtime.bigint()
      return config
    })

    axiosInstance.interceptors.response.use(
      function (response) {
        trackResponseTime(response)
        return response
      },
      function (error) {
        trackResponseTime(error.response)
        return Promise.reject(error)
      },
    )

    it('track a successful response', async () => {
      const params = {
        name: 'world',
        postalCode: null,
        country: undefined,
      }
      const response = await axiosInstance.get('https://api.agify.io/', { params })
      const stats = (response as CustomResponse).stats
      expect(stats.path).toStrictEqual('GET /')
      expect(stats.host).toStrictEqual('api.agify.io')
      expect(stats.responseStatus).toStrictEqual(200)
      expect(stats.responseTime).toBeGreaterThan(500)
    })

    it('track a error response', async () => {
      try {
        const response = await axiosInstance.post('https://api.agify.io')
        expect(response).toBeUndefined()
      } catch (e) {
        const error = e as { response: AxiosResponse }
        const stats = (error.response as CustomResponse).stats
        expect(stats.path).toStrictEqual('POST /')
        expect(stats.host).toStrictEqual('api.agify.io')
        expect(stats.responseStatus).toStrictEqual(404)
        expect(stats.responseTime).toBeGreaterThan(500)
      }
    })
  })
})
