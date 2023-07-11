import axios from 'axios'
import { serializeError } from 'serialize-error'

describe('serializeError', () => {
  it('serialize a simple error', () => {
    const error = serializeError(new Error('error message'))
    expect(error).toEqual({
      message: 'error message',
      name: 'Error',
      stack: 'Error: error message\n    at Object.<anonymous> (D:\\workspaces\\playground-nodejs\\src\\serialize-error.spec.ts:6:34)\n    at Promise.then.completed (D:\\workspaces\\playground-nodejs\\node_modules\\jest-circus\\build\\utils.js:293:28)\n    at new Promise (<anonymous>)\n    at callAsyncCircusFn (D:\\workspaces\\playground-nodejs\\node_modules\\jest-circus\\build\\utils.js:226:10)\n    at _callCircusTest (D:\\workspaces\\playground-nodejs\\node_modules\\jest-circus\\build\\run.js:297:40)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)\n    at _runTest (D:\\workspaces\\playground-nodejs\\node_modules\\jest-circus\\build\\run.js:233:3)\n    at _runTestsForDescribeBlock (D:\\workspaces\\playground-nodejs\\node_modules\\jest-circus\\build\\run.js:135:9)\n    at _runTestsForDescribeBlock (D:\\workspaces\\playground-nodejs\\node_modules\\jest-circus\\build\\run.js:130:9)\n    at run (D:\\workspaces\\playground-nodejs\\node_modules\\jest-circus\\build\\run.js:68:3)\n    at runAndTransformResultsToJestFormat (D:\\workspaces\\playground-nodejs\\node_modules\\jest-circus\\build\\legacy-code-todo-rewrite\\jestAdapterInit.js:122:21)\n    at jestAdapter (D:\\workspaces\\playground-nodejs\\node_modules\\jest-circus\\build\\legacy-code-todo-rewrite\\jestAdapter.js:79:19)\n    at runTestInternal (D:\\workspaces\\playground-nodejs\\node_modules\\jest-runner\\build\\runTest.js:367:16)\n    at runTest (D:\\workspaces\\playground-nodejs\\node_modules\\jest-runner\\build\\runTest.js:444:34)'
    })
  })

  it('serialize an axios network error', async () => {
    try {
      await axios.get('http://localhost:11111', { timeout: 50 })
    } catch (e) {
      const error = serializeError(e)
      expect(error).toEqual(expect.objectContaining({
        code: 'ECONNREFUSED',
        message: 'connect ECONNREFUSED 127.0.0.1:11111',
        name: 'Error',
        stack: 'Error: connect ECONNREFUSED 127.0.0.1:11111\n    at Function.Object.<anonymous>.AxiosError.from (D:\\workspaces\\playground-nodejs\\node_modules\\axios\\lib\\core\\AxiosError.js:89:14)\n    at RedirectableRequest.handleRequestError (D:\\workspaces\\playground-nodejs\\node_modules\\axios\\lib\\adapters\\http.js:591:25)\n    at RedirectableRequest.emit (node:events:525:35)\n    at ClientRequest.eventHandlers.<computed> (D:\\workspaces\\playground-nodejs\\node_modules\\follow-redirects\\index.js:14:24)\n    at ClientRequest.emit (node:events:513:28)\n    at Socket.socketErrorListener (node:_http_client:494:9)\n    at Socket.emit (node:events:513:28)\n    at emitErrorNT (node:internal/streams/destroy:157:8)\n    at emitErrorCloseNT (node:internal/streams/destroy:122:3)\n    at processTicksAndRejections (node:internal/process/task_queues:83:21)',
        status: null
      }))
    }
  })
  it('serialize an axios timeout error', async () => {
    try {
      await axios.get('https://httpbin.org/post', { timeout: 10 })
    } catch (e) {
      const error = serializeError(e)
      expect(error).toEqual(expect.objectContaining({
        code: 'ECONNABORTED',
        message: 'timeout of 10ms exceeded',
        name: 'AxiosError',
        stack: 'AxiosError: timeout of 10ms exceeded\n    at RedirectableRequest.handleRequestTimeout (D:\\workspaces\\playground-nodejs\\node_modules\\axios\\lib\\adapters\\http.js:628:16)\n    at RedirectableRequest.emit (node:events:513:28)\n    at Timeout.<anonymous> (D:\\workspaces\\playground-nodejs\\node_modules\\follow-redirects\\index.js:169:12)\n    at listOnTimeout (node:internal/timers:559:17)\n    at processTimers (node:internal/timers:502:7)',
        status: null
      }))
    }
  })
  it('serialize an axios http error', async () => {
    try {
      await axios.post('https://advertising-api.amazon.com/reporting/reports', {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (e) {
      const error = serializeError(e)
      expect(error).toEqual(expect.objectContaining({
        code: 'ERR_BAD_REQUEST',
        message: 'Request failed with status code 401',
        name: 'AxiosError',
        stack: 'AxiosError: Request failed with status code 401\n    at settle (D:\\workspaces\\playground-nodejs\\node_modules\\axios\\lib\\core\\settle.js:19:12)\n    at IncomingMessage.handleStreamEnd (D:\\workspaces\\playground-nodejs\\node_modules\\axios\\lib\\adapters\\http.js:570:11)\n    at IncomingMessage.emit (node:events:525:35)\n    at endReadableNT (node:internal/streams/readable:1358:12)\n    at processTicksAndRejections (node:internal/process/task_queues:83:21)',
        status: 401
      }))
    }
  })
})
