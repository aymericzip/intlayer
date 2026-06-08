import { defineConfig, targets } from '@adonisjs/core/logger';

const loggerConfig = defineConfig({
  default: 'app',
  loggers: {
    app: {
      enabled: true,
      level: 'info',
    },
  },
});

export default loggerConfig;
