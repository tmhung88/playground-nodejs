import axios from 'axios'
import { serializeError } from 'serialize-error'

describe('serializeError', () => {
  it('serialize a simple error', () => {
    const error = serializeError(new Error('error message'))
    expect(error.message).toStrictEqual('error message')
    expect(error.name).toStrictEqual('Error')
    expect(error.stack).toContain('Error: error message')
  })

  it('serialize an axios network error', async () => {
    try {
      await axios.get('http://localhost:11111', { timeout: 50 })
    } catch (e) {
      const error = serializeError(e)
      expect(error).toEqual(
        expect.objectContaining({
          code: 'ECONNREFUSED',
          message: 'connect ECONNREFUSED 127.0.0.1:11111',
          name: 'Error',
          stack:
            'Error: connect ECONNREFUSED 127.0.0.1:11111\n    at Function.Object.<anonymous>.AxiosError.from (D:\\workspaces\\playground-nodejs\\node_modules\\axios\\lib\\core\\AxiosError.js:89:14)\n    at RedirectableRequest.handleRequestError (D:\\workspaces\\playground-nodejs\\node_modules\\axios\\lib\\adapters\\http.js:591:25)\n    at RedirectableRequest.emit (node:events:525:35)\n    at ClientRequest.eventHandlers.<computed> (D:\\workspaces\\playground-nodejs\\node_modules\\follow-redirects\\index.js:14:24)\n    at ClientRequest.emit (node:events:513:28)\n    at Socket.socketErrorListener (node:_http_client:494:9)\n    at Socket.emit (node:events:513:28)\n    at emitErrorNT (node:internal/streams/destroy:157:8)\n    at emitErrorCloseNT (node:internal/streams/destroy:122:3)\n    at processTicksAndRejections (node:internal/process/task_queues:83:21)',
          status: null,
        }),
      )
    }
  })
  it('serialize an axios timeout error', async () => {
    try {
      await axios.get('https://httpbin.org/post', { timeout: 10 })
    } catch (e) {
      const error = serializeError(e)
      expect(error).toEqual(
        expect.objectContaining({
          code: 'ECONNABORTED',
          message: 'timeout of 10ms exceeded',
          name: 'AxiosError',
          stack:
            'AxiosError: timeout of 10ms exceeded\n    at RedirectableRequest.handleRequestTimeout (D:\\workspaces\\playground-nodejs\\node_modules\\axios\\lib\\adapters\\http.js:628:16)\n    at RedirectableRequest.emit (node:events:513:28)\n    at Timeout.<anonymous> (D:\\workspaces\\playground-nodejs\\node_modules\\follow-redirects\\index.js:169:12)\n    at listOnTimeout (node:internal/timers:559:17)\n    at processTimers (node:internal/timers:502:7)',
          status: null,
        }),
      )
    }
  })
  it('serialize an axios http error', async () => {
    try {
      await axios.post(
        'https://advertising-api.amazon.com/reporting/reports',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    } catch (e) {
      const error = serializeError(e)
      expect(error).toEqual(
        expect.objectContaining({
          code: 'ERR_BAD_REQUEST',
          message: 'Request failed with status code 401',
          name: 'AxiosError',
          stack:
            'AxiosError: Request failed with status code 401\n    at settle (D:\\workspaces\\playground-nodejs\\node_modules\\axios\\lib\\core\\settle.js:19:12)\n    at IncomingMessage.handleStreamEnd (D:\\workspaces\\playground-nodejs\\node_modules\\axios\\lib\\adapters\\http.js:570:11)\n    at IncomingMessage.emit (node:events:525:35)\n    at endReadableNT (node:internal/streams/readable:1358:12)\n    at processTicksAndRejections (node:internal/process/task_queues:83:21)',
          status: 401,
        }),
      )
    }
  })
})
