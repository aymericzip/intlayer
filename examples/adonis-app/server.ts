import { Ignitor } from '@adonisjs/core';

/**
 * URL to the application root. AdonisJS needs it to resolve
 * paths to different directories.
 */
const appRoot = new URL('./', import.meta.url);

/**
 * The ignitor is the bootstrapper for the application. It
 * handles the application lifecycle and booting the
 * provider.
 */
new Ignitor(appRoot, {})
  .httpServer()
  .start()
  .catch((error) => {
    process.exitCode = 1;
    console.error(error);
  });
