import { MESSAGE } from 'triple-beam'
import winston, { Logger } from 'winston'
import { ConsoleTransportInstance } from 'winston/lib/winston/transports'

describe('winston', () => {
  describe('awsLogger', () => {
    function createAwsLogger(): { logger: Logger; transport: ConsoleTransportInstance } {
      const transport = new winston.transports.Console({
        format: winston.format.json(),
      })
      jest.spyOn(transport, 'log').mockImplementation((logEntry) => {
        return JSON.parse(logEntry[MESSAGE])
      })
      const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(winston.format.splat(), winston.format.timestamp({ format: () => 'NOW' })),
        transports: transport,
      })
      return {
        logger,
        transport,
      }
    }

    it('should serialize a log entry into json', () => {
      const { logger, transport } = createAwsLogger()
      logger.info('hello', { name: 'world' }, { age: 5 })
      expect(transport.log).toReturnWith({
        name: 'world',
        level: 'info',
        age: 5,
        message: 'hello',
        timestamp: 'NOW',
      })
    })
  })
})
