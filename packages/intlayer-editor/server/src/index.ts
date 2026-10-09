import { existsSync, lstatSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
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
import {
  EDITOR_SERVER_PORT_ENV_VAR,
  getConfiguration,
  getEditorURLForPort,
} from '@intlayer/config/node';
import {
  type BuiltEditorOverride,
  overrideBuiltEditorConfiguration,
  watchBuiltEditorConfiguration,
} from '@intlayer/engine/build';
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

  // Served by `/api/config`: the client calls the editor at its actual URL
  process.env[EDITOR_SERVER_PORT_ENV_VAR] = String(port);

  // Adapted in the built configuration only: the application must load the
  // editor client, and accept messages from the URL the editor is served at
  const editorOverride: BuiltEditorOverride = {
    enabled: true,
    editorURL: getEditorURLForPort(config.editor.editorURL, port),
  };
  const overriddenKeys = await overrideBuiltEditorConfiguration(
    config,
    editorOverride
  );

  if (overriddenKeys.length > 0) {
    const overriddenSettings = overriddenKeys.map((key) =>
      colorize(`editor.${key}`, ANSIColors.BLUE)
    );

    appLogger(
      `${overriddenSettings.join(' and ')} temporarily adapted in ${colorizePath(relative(config.system.baseDir, config.system.configDir))}. Set it in ${colorizePath('intlayer.config.ts')} to keep it after the next build.`,
      {
        level: 'warn',
      }
    );

    // An application (re)started aside rebuilds the configuration without them
    watchBuiltEditorConfiguration(config.system.configDir, {
      loadConfiguration: () =>
        getConfiguration({ ...envFileOptions, cache: false }),
      editorOverride,
      onRestore: () =>
        appLogger(
          `${overriddenSettings.join(' and ')} adapted again in ${colorizePath(relative(config.system.baseDir, config.system.configDir))} after the application rebuilt it.`
        ),
      onError: (error) =>
        appLogger(
          `Failed to keep the editor settings in the built configuration: ${(error as Error).message}`,
          { level: 'warn' }
        ),
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
        frameAncestors: [
          "'self'",
          'vscode-webview:',
          'vscode-file:',
          'https://*.vscode-cdn.net',
          'https://*.vscode-webview.net',
          'localhost:*',
          'http://localhost:*',
          'http://127.0.0.1:*',
        ],
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
