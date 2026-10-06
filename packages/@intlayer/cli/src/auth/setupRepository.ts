import { randomBytes } from 'node:crypto';
import http from 'node:http';
import { URL } from 'node:url';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, colorizePath, getAppLogger } from '@intlayer/config/logger';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import type { DetectedGitRepository } from '../utils/detectGitRepository';
import { openBrowser } from '../utils/openBrowser';

/** Page shown once the browser handed the result back to the CLI. */
const DONE_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Intlayer CLI</title>
    <style>
      body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: rgb(23, 23, 23); color: rgb(255, 245, 237); }
      p { color: rgb(160, 160, 160); font-size: 0.9rem; }
    </style>
  </head>
  <body>
    <div>
      <h1>Repository setup complete</h1>
      <p>You can now close this tab and return to your terminal.</p>
    </div>
    <script>window.close();</script>
  </body>
</html>`;

/**
 * Search params pre-filling the repository page with the local repository.
 * Empty when none was detected: the user then picks it in the browser.
 */
export const getRepositorySearchParams = (
  detectedRepository: DetectedGitRepository | null | undefined
): URLSearchParams => {
  const searchParams = new URLSearchParams();

  if (!detectedRepository) return searchParams;

  const { provider, owner, repository, branch, configFilePath, instanceUrl } =
    detectedRepository;

  searchParams.set('repositoryProvider', provider);
  searchParams.set('repositoryOwner', owner);
  searchParams.set('repositoryName', repository);
  if (branch) searchParams.set('repositoryBranch', branch);
  if (configFilePath) searchParams.set('repositoryConfigPath', configFilePath);
  if (instanceUrl) searchParams.set('repositoryInstanceUrl', instanceUrl);

  return searchParams;
};

type SetupRepositoryOptions = {
  cmsUrl?: string;
  configOptions?: GetConfigurationOptions;
  /** Local repository pre-filling the page */
  detectedRepository?: DetectedGitRepository | null;
};

/** Outcome of the browser step: `provider:owner/repository`, or skipped. */
export type SetupRepositoryResult = {
  linkedRepository: string | null;
};

/**
 * Opens the CMS repository page (`/auth/cli-repository`) and waits for it to
 * call back the local server once the repository and build settings are set.
 */
export const setupRepository = async (
  options: SetupRepositoryOptions = {}
): Promise<SetupRepositoryResult> => {
  const configuration = getConfiguration(options.configOptions);
  const logger = getAppLogger(configuration);
  const cmsUrl =
    options.cmsUrl ??
    configuration.editor.cmsURL ??
    process.env.INTLAYER_SITE_URL ??
    'http://localhost:3000';
  const state = randomBytes(16).toString('hex');

  return new Promise<SetupRepositoryResult>((resolve) => {
    const server = http.createServer((request, response) => {
      const url = new URL(request.url ?? '', `http://${request.headers.host}`);

      // A callback from another tab or process is ignored
      if (
        url.pathname !== '/callback' ||
        url.searchParams.get('state') !== state
      ) {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Not found');
        return;
      }

      const linkedRepository = url.searchParams.get('linkedRepository');

      logger(
        linkedRepository
          ? `Repository ${colorize(linkedRepository, ANSIColors.BLUE)} connected to the CMS project.`
          : 'Repository setup skipped.'
      );

      response.writeHead(200, {
        'Content-Type': 'text/html',
        Connection: 'close',
      });
      response.end(DONE_HTML, () => {
        // Keep-alive sockets would otherwise hold the server open
        server.close();
        server.closeAllConnections();
        resolve({ linkedRepository });
      });
    });

    server.listen(0, () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      const searchParams = getRepositorySearchParams(
        options.detectedRepository
      );
      searchParams.set('port', String(port));
      searchParams.set('state', state);

      const pageUrl = `${cmsUrl}/auth/cli-repository?${searchParams.toString()}`;

      logger(`If the browser does not open, visit: ${colorizePath(pageUrl)}`);

      openBrowser(pageUrl);
    });
  });
};
