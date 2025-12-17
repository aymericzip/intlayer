import http from 'node:http';
import { URL } from 'node:url';
import type { GetConfigurationOptions } from '@intlayer/config';
import {
  ANSIColors,
  colorize,
  colorizePath,
  getAppLogger,
  getConfiguration,
} from '@intlayer/config';
import { openBrowser } from '../utils/openBrowser';

type LoginOptions = {
  cmsUrl?: string;
  configOptions?: GetConfigurationOptions;
};

export const login = async (options: LoginOptions) => {
  const configuration = getConfiguration(options.configOptions);
  const logger = getAppLogger(configuration);

  const cmsUrl = options.cmsUrl ?? configuration.editor.cmsURL;

  return new Promise<void>((resolve) => {
    const server = http.createServer((req, res) => {
      const url = new URL(req.url ?? '', `http://${req.headers.host}`);

      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      if (url.pathname === '/callback') {
        const clientId = url.searchParams.get('clientId');
        const clientSecret = url.searchParams.get('clientSecret');

        if (clientId && clientSecret) {
          logger('');
          logger('Log in successful. Client ID and Client Secret received.');

          logger('');
          logger([
            '1. Insert the Client ID and Client Secret in your',
            colorizePath('.env'),
            'file:',
          ]);
          logger(
            colorize('--------------------------------', ANSIColors.GREY_DARK)
          );
          logger(
            [
              colorize('INTLAYER_CLIENT_ID=', ANSIColors.GREY_LIGHT),
              colorize(clientId, ANSIColors.BLUE),
            ].join('')
          );
          logger(
            [
              colorize('INTLAYER_CLIENT_SECRET=', ANSIColors.GREY_LIGHT),
              colorize(clientSecret, ANSIColors.BLUE),
            ].join('')
          );
          logger(
            colorize('--------------------------------', ANSIColors.GREY_DARK)
          );
          logger('');
          logger('2. Insert in your Intlayer configuration file:');
          logger(
            colorize('--------------------------------', ANSIColors.GREY_DARK)
          );
          [
            `${ANSIColors.GREY_LIGHT}{`,
            `  editor: {`,
            `     cmsURL: '${colorizePath(cmsUrl, undefined, ANSIColors.GREY_LIGHT)}',`,
            `     clientId: '${colorize('process.env.INTLAYER_CLIENT_ID', ANSIColors.BLUE, ANSIColors.GREY_LIGHT)}',`,
            `     clientSecret: '${colorize('process.env.INTLAYER_CLIENT_SECRET', ANSIColors.BLUE, ANSIColors.GREY_LIGHT)}',`,
            `  },`,
            `}`,
          ].forEach((line) => {
            logger(line);
          });
          logger(
            colorize('--------------------------------', ANSIColors.GREY_DARK)
          );

          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <!DOCTYPE html>
            <html lang="en" data-theme="dark">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Intlayer CLI Login</title>
                <style>
                  :root {
                    --color-background: rgba(23, 23, 23);
                    --color-card: rgba(39, 39, 39);
                    --color-text: rgba(255, 245, 237);
                    --color-neutral: rgba(93, 93, 93);
                    --font-sans: "Inter", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                  }
                  
                  * {
                    box-sizing: border-box;
                  }
                  
                  body {
                    font-family: var(--font-sans);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    padding: 1rem;
                    background-color: var(--color-background);
                    color: var(--color-text);
                  }
                  
                  .container {
                    text-align: center;
                    padding: 2rem;
                    border-radius: 1rem;
                    background-color: var(--color-card);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    max-width: 400px;
                    width: 100%;
                  }
                  
                  h1 {
                    margin: 0 0 1rem 0;
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--color-text);
                  }
                  
                  p {
                    color: var(--color-neutral);
                    margin: 0 0 1.5rem 0;
                    line-height: 1.5;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1>Login Successful</h1>
                  <p>You have successfully logged in to Intlayer CLI. You can now close this tab and return to your terminal.</p>
                </div>
                <script>
                  // Attempt to close the window
                  window.close();
                  
                  // Fallback: if window.close() doesn't work, show a message
                  setTimeout(() => {
                    window.close();
                  }, 1000);
                </script>
              </body>
            </html>
          `);

          server.close(() => {
            resolve();
            process.exit(0);
          });
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Missing parameters');
        }
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
      }
    });

    server.listen(0, () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      const state = Math.random().toString(36).substring(7);

      const websiteUrl =
        cmsUrl ?? process.env.INTLAYER_SITE_URL ?? 'http://localhost:3000';
      const loginUrl = `${websiteUrl}/en/auth/cli-login?port=${port}&state=${state}`;

      logger('Opening browser for login...');
      logger(`If browser does not open, visit: ${colorizePath(loginUrl)}`);

      openBrowser(loginUrl);
    });
  });
};
