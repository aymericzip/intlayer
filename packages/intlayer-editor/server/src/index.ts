import { existsSync, lstatSync } from 'node:fs';
import path, { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors, { type CorsOptions } from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import mime from 'mime';

const app: Express = express();

const PORT = 8000;

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDistPath = resolve(__dirname, '../../client/dist');

const corsOptions: CorsOptions = {
  origin: '*',
  credentials: true,
};

const startServer = async (app: Express) => {
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

  app.post('/api/action', (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    res.json({ message: 'Action performed', data });
  });

  app.use(express.static(clientDistPath));

  // For single-page applications, redirect all unmatched routes to index.html
  app.get(/(.*)/, (req, res) => {
    const requestedPath = path.join(clientDistPath, req.url); // Full path of the requested file

    if (existsSync(requestedPath) && lstatSync(requestedPath).isFile()) {
      // If the requested file exists, determine its MIME type and serve it
      const mimeType =
        mime.getType(requestedPath) || 'application/octet-stream';
      res.setHeader('Content-Type', mimeType);
      res.sendFile(requestedPath);
    } else {
      // Otherwise, serve the index.html for React Router fallback
      res.sendFile(resolve(clientDistPath, 'index.html'));
    }
  });

  app.listen(PORT, () => {
    console.log(`Intlayer editor running at http://localhost:${PORT}`);
  });
};

// Start it up!
startServer(app);
