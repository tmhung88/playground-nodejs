import { retry } from '@lifeomic/attempt'

describe('attempt', () => {
  describe(retry, () => {
    type TestError = Error & { retryable: boolean }

    function createTestService(opts: { retryable: boolean; maxErrors: number }) {
      let errorCount = 0
      return {
        throwError() {
          if (errorCount < opts.maxErrors) {
            errorCount++
            throw Object.assign(new Error('TestError'), { retryable: opts.retryable })
          }
          return errorCount
        },
      }
    }

    it('throw original errors which are not retryable', async () => {
      try {
        const testService = createTestService({ retryable: false, maxErrors: 2 })
        const result = await retry(
          async () => {
            testService.throwError()
          },
          {
            maxAttempts: 4,
            handleError(err, context) {
              if (err.retryable === false) {
                expect(context.attemptNum).toBe(0)
                context.abort()
              }
            },
          },
        )
        expect(result).not.toBe(2)
      } catch (error) {
        expect((error as TestError).retryable).toBe(false)
      }
    })

    it('retry for errors which are retryable', async () => {
      const testService = createTestService({ retryable: true, maxErrors: 2 })
      const result = await retry(
        async () => {
          return testService.throwError()
        },
        {
          maxAttempts: 4,
          handleError(err, context) {
            if (err.retryable === false) {
              context.abort()
            }
          },
        },
      )
      expect(result).toBe(2)
    })
  })
})
