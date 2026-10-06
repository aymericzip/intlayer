import { existsSync, lstatSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fastifyCompress from '@fastify/compress';
import fastifyCookie from '@fastify/cookie';
import fastifyCors, { type FastifyCorsOptions } from '@fastify/cors';
import fastifyFormbody from '@fastify/formbody';
import fastifyHelmet from '@fastify/helmet';
import fastifyStatic from '@fastify/static';
import * as ANSIColors from '@intlayer/config/colors';
import { getEnvFilePath } from '@intlayer/config/env';
import { colorize, colorizePath, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import { authRouter } from '@routes/auth.routes';
import { configurationRouter } from '@routes/config.routes';
import { dictionaryRouter } from '@routes/dictionary.routes';
import { findAvailablePort } from '@utils/checkPortAvailability';
import Fastify, { type FastifyInstance, LogController } from 'fastify';
import { intlayer } from 'fastify-intlayer';
import mime from 'mime';

const __dirname = dirname(fileURLToPath(import.meta.url));

const envFileOptions = {
  env: process.env.NODE_ENV,
  envFile: process.env.ENV_FILE,
};

const FALLBACK_PORT = 8000;
const config = getConfiguration(envFileOptions);

const appLogger = getAppLogger(config);
/** Port tried first; the next free one is used when it is taken. */
const preferredPort = config.editor.port ?? FALLBACK_PORT;
const HOST = '0.0.0.0';

if (!config.editor.enabled) {
  appLogger(
    `Editor is not enabled. Add ${colorize('editor.enabled', ANSIColors.BLUE)} to ${colorizePath('intlayer.config.ts')} file to enable it.`,
    {
      level: 'error',
    }
  );
  process.exit(0);
}

// Load package.json
const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, '../../package.json'), 'utf8')
);

const app: FastifyInstance = Fastify({
  logController: new LogController({
    disableRequestLogging: true, // Keep logs clean like the original
  }),
});

// Load internationalization plugin
// Assuming fastify-intlayer is the Fastify equivalent of express-intlayer
app.register(intlayer);

const clientDistPath = resolve(__dirname, '../../client/dist');

const corsOptions: FastifyCorsOptions = {
  origin: '*',
  credentials: true,
};

const startServer = async (app: FastifyInstance) => {
  const port = await findAvailablePort(preferredPort, HOST);

  if (port === undefined) {
    appLogger(`Error: Port ${preferredPort} and the next ones are in use.`, {
      level: 'error',
    });
    process.exit(255);
  }

  if (port !== preferredPort) {
    appLogger(`Port ${preferredPort} is in use, using port ${port} instead.`, {
      level: 'warn',
    });
  }

  // Security Headers
  await app.register(fastifyHelmet, {
    // Only restrict who may frame the editor: itself and IDE webviews (the
    // VS Code extension panel). `X-Frame-Options` cannot list a scheme.
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        // Helmet requires a `default-src`; the editor sets no other policy
        defaultSrc:
          fastifyHelmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
        frameAncestors: ["'self'", 'vscode-webview:'],
      },
    },
    frameguard: false,
    global: true,
  });

  // CORS
  await app.register(fastifyCors, corsOptions);

  // Compression
  await app.register(fastifyCompress);

  // Cookie Parser
  await app.register(fastifyCookie);

  // Parse application/x-www-form-urlencoded
  await app.register(fastifyFormbody);

  // Register Routes
  await app.register(dictionaryRouter, { prefix: '/api/dictionary' });
  await app.register(configurationRouter, { prefix: '/api/config' });
  await app.register(authRouter, { prefix: '/api/auth' });

  // Serve Static Files
  await app.register(fastifyStatic, {
    root: clientDistPath,
    wildcard: false, // We handle the fallback manually to match SPA logic
  });

  // For single-page applications, redirect all unmatched routes to index.html
  app.setNotFoundHandler((req, reply) => {
    const requestedPath = join(clientDistPath, req.raw.url || '/');

    if (existsSync(requestedPath) && lstatSync(requestedPath).isFile()) {
      const mimeType =
        mime.getType(requestedPath) ?? 'application/octet-stream';
      reply.header('Content-Type', mimeType);
      return reply.sendFile(req.raw.url?.split('/').pop() || 'index.html');
    } else {
      return reply.sendFile('index.html');
    }
  });

  try {
    await app.listen({ port, host: HOST });

    const dotEnvFilePath = getEnvFilePath(
      envFileOptions.env,
      envFileOptions.envFile
    );

    console.log(`
    ${colorize(colorize('INTLAYER', ANSIColors.BOLD), ANSIColors.GREY_DARK)} ${colorize(`v${packageJson.version}`, ANSIColors.GREY_DARK)}

    Editor running at:           ${colorizePath(`http://localhost:${port}`)}
    ${colorize('➜', ANSIColors.GREY_DARK)}  Watching application at:  ${config.editor.applicationURL === '' ? '-' : colorizePath(config.editor.applicationURL)}
    ${colorize('➜', ANSIColors.GREY_DARK)}  Access key:               ${config.editor.clientId ?? '-'}
    ${colorize('➜', ANSIColors.GREY_DARK)}  Environment:              ${dotEnvFilePath ?? '-'}
    `);
  } catch (error) {
    // The Fastify logger is disabled, so `app.log` would swallow this
    appLogger(`Failed to start the editor: ${(error as Error).message}`, {
      level: 'error',
    });
    process.exit(
      (error as NodeJS.ErrnoException).code === 'EADDRINUSE' ? 255 : 1
    );
  }
};

// Start it up!
startServer(app);
