import { existsSync, lstatSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
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
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors, { type CorsOptions } from 'cors';
import express, { type Express } from 'express';
import { intlayer } from 'express-intlayer';
import helmet from 'helmet';
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

const app: Express = express();

// Load internationalization request handler
app.use(intlayer());

const FALLBACK_PORT = 8000;
const config = getConfiguration(envFileOptions);
const port = config.editor.port ?? FALLBACK_PORT;

const clientDistPath = resolve(__dirname, '../../client/dist');

const corsOptions: CorsOptions = {
  origin: '*',
  credentials: true,
};

const startServer = async (app: Express) => {
  const isPortAvailable = await checkPortAvailability(port);

  if (!isPortAvailable) {
    console.error(`\x1b[1;31mError: Port ${port} is already in use.\x1b[0m`);
    process.exit(255);
  }

  app.disable('x-powered-by'); // Disabled to prevent attackers from knowing that the app is running Express
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  app.use(cors(corsOptions));

  // Compress all HTTP responses
  app.use(compression());

  app.use(express.json());

  app.use(cookieParser());

  // Parse incoming requests with urlencoded payloads
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/dictionary', dictionaryRouter);
  app.use('/api/config', configurationRouter);

  app.use(express.static(clientDistPath));

  // For single-page applications, redirect all unmatched routes to index.html
  app.get(/(.*)/, (req, res) => {
    const requestedPath = join(clientDistPath, req.url); // Full path of the requested file

    if (existsSync(requestedPath) && lstatSync(requestedPath).isFile()) {
      // If the requested file exists, determine its MIME type and serve it
      const mimeType =
        mime.getType(requestedPath) ?? 'application/octet-stream';
      res.setHeader('Content-Type', mimeType);
      res.sendFile(requestedPath);
    } else {
      // Otherwise, serve the index.html for React Router fallback
      res.sendFile(resolve(clientDistPath, 'index.html'));
    }
  });

  app.listen(port, () => {
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
  });
};

// Start it up!
startServer(app);
