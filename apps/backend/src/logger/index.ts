import { transports, createLogger, format } from 'winston';

export const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.Console({ format: format.simple() }),
  ],
});

if (process.env.NODE_ENV === 'production') {
  logger.add(
    new transports.File({ filename: 'logs/error.log', level: 'error' })
  );
  logger.add(new transports.File({ filename: 'logs/info.log', level: 'info' }));
  logger.add(new transports.File({ filename: 'logs/combined.log' }));
}
