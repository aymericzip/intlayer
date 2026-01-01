import { existsSync, lstatSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import fastifyCompress from '@fastify/compress';
import fastifyCookie from '@fastify/cookie';
import fastifyCors, { type FastifyCorsOptions } from '@fastify/cors';
import fastifyFormbody from '@fastify/formbody';
import fastifyHelmet from '@fastify/helmet';
import fastifyStatic from '@fastify/static';
import {
  ANSIColors,
  colorize,
  colorizePath,
  getConfiguration,
  getEnvFilePath,
} from '@intlayer/config';
import { configurationRouter } from '@routes/config.routes';
import { dictionaryRouter } from '@routes/dictionary.routes';
import { checkPortAvailability } from '@utils/checkPortAvailability';
import Fastify, { type FastifyInstance } from 'fastify';
import { intlayer } from 'fastify-intlayer';
import mime from 'mime';

const __dirname = dirname(fileURLToPath(import.meta.url));

const envFileOptions = {
  env: process.env.NODE_ENV,
  envFile: process.env.ENV_FILE,
};

// Load package.json
const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, '../../package.json'), 'utf8')
);

const app: FastifyInstance = Fastify({
  disableRequestLogging: true, // Optional: Keep logs clean like the original
});

// Load internationalization plugin
// Assuming fastify-intlayer is the Fastify equivalent of express-intlayer
app.register(intlayer);

const FALLBACK_PORT = 8000;
const config = getConfiguration(envFileOptions);
const port = config.editor.port ?? FALLBACK_PORT;

const clientDistPath = resolve(__dirname, '../../client/dist');

const corsOptions: FastifyCorsOptions = {
  origin: '*',
  credentials: true,
};

const startServer = async (app: FastifyInstance) => {
  const isPortAvailable = await checkPortAvailability(port);

  if (!isPortAvailable) {
    console.error(`\x1b[1;31mError: Port ${port} is already in use.\x1b[0m`);
    process.exit(255);
  }

  // Security Headers
  await app.register(fastifyHelmet, {
    contentSecurityPolicy: false,
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
    await app.listen({ port, host: '0.0.0.0' });

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
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// Start it up!
startServer(app);
