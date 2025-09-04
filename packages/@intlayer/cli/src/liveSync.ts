import { IntlayerEventListener } from '@intlayer/api';
// @ts-ignore: @intlayer/backend is not built yet
import type { DictionaryAPI } from '@intlayer/backend';
import { buildDictionary } from '@intlayer/chokidar';
import type { IntlayerConfig } from '@intlayer/config';
import { getAppLogger, getConfiguration } from '@intlayer/config';
import packageJson from '@intlayer/config/package.json';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import { ChildProcess, spawn } from 'child_process';
import { createServer } from 'http';

type LiveSyncOptions = {
  process?: string;
};

const serverPort = 4000;
const serverURL = `http://localhost:${serverPort}`;

const writeDictionary = async (
  dictionary: DictionaryAPI,
  configuration: IntlayerConfig
) => {
  const appLogger = getAppLogger(configuration);
  appLogger(`Writing dictionary ${dictionary.key}`);
  await buildDictionary([dictionary], configuration);
};

export const liveSync = async (options?: LiveSyncOptions) => {
  const configuration = getConfiguration();
  const appLogger = getAppLogger(configuration);

  let childProcess: ChildProcess | null = null;
  let eventListener: IntlayerEventListener | null = null;
  let isHotReloadConnected = false;
  let connectionStatus = 'disconnected'; // 'connected', 'connecting', 'reconnecting', 'disconnected', 'error'

  // Start the parallel process if provided
  if (options?.process) {
    const [command, ...args] = options.process.split(' ');

    childProcess = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
    });

    childProcess.on('error', (error) => {
      appLogger(`Failed to start process '${options.process}':`, {
        level: 'error',
      });
    });

    childProcess.on('exit', (code) => {
      if (code !== 0) {
        appLogger(`Process "${options.process}" exited with code ${code}`);
      } else {
        appLogger(`Process "${options.process}" exited successfully`);
      }
    });
  }

  // Initialize the event listener for hot reload if configured
  if (
    configuration.editor.hotReload &&
    configuration.editor.clientId &&
    configuration.editor.clientSecret
  ) {
    eventListener = new IntlayerEventListener(configuration);
    connectionStatus = 'connecting';

    // Set up connection callbacks
    eventListener.onConnectionOpen = () => {
      connectionStatus = 'connected';
      isHotReloadConnected = true;
      appLogger('Live sync connection established');
    };

    eventListener.onConnectionError = (error) => {
      connectionStatus = 'error';
      isHotReloadConnected = false;
      const errorEvent = error as any;
      appLogger(
        `Live sync connection error: ${errorEvent.message ?? 'Unknown error'}`,
        {
          level: 'warn',
        }
      );

      // If this is a "terminated: other side closed" error, it's likely a server restart
      if (
        errorEvent.message?.includes('terminated') ||
        errorEvent.message?.includes('closed')
      ) {
        appLogger(
          'Server connection was terminated, automatic reconnection will be attempted...',
          {
            level: 'info',
          }
        );
        connectionStatus = 'reconnecting';
      }
    };

    // Set up dictionary change callbacks
    eventListener.onDictionaryAdded = (dictionary) =>
      writeDictionary(dictionary, configuration);
    eventListener.onDictionaryChange = (dictionary) =>
      writeDictionary(dictionary, configuration);
    eventListener.onDictionaryDeleted = (dictionary) =>
      writeDictionary(dictionary, configuration);

    try {
      await eventListener.initialize();
    } catch (error) {
      connectionStatus = 'error';
      isHotReloadConnected = false;
      appLogger('Failed to initialize IntlayerEventListener:', {
        level: 'error',
      });
      appLogger(
        `Error: ${error instanceof Error ? error.message : String(error)}`,
        {
          level: 'error',
        }
      );
    }
  } else {
    if (!configuration.editor.hotReload) {
      appLogger('Hot reload is disabled in configuration');
    } else if (
      !configuration.editor.clientId ||
      !configuration.editor.clientSecret
    ) {
      appLogger(
        'Missing client credentials for hot reload. Please configure clientId and clientSecret'
      );
    }
  }

  const server = createServer(async (req, res) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });
      res.end();
      return;
    }

    if (req.url?.startsWith('/dictionaries')) {
      res.writeHead(200, {
        'Content-Type': 'text/javascript; charset=utf-8',
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });
      const dictionaries = getDictionaries();

      res.end(`export default ${JSON.stringify(dictionaries)};`);
    } else {
      res.writeHead(404, {
        'Access-Control-Allow-Origin': '*',
      });
      res.end('Not found');
    }
  });

  const getLiveSyncParam = () => {
    if (!configuration.editor.hotReload) return '\x1b[31m✗ Disabled\x1b[0m';

    return '\x1b[32m✓ Enabled\x1b[0m';
  };
  server.listen(4000, () => {
    console.log(`
      \x1b[1;90mINTLAYER v${packageJson.version}\x1b[0m
  
      Live server running at:          \x1b[90m${serverURL}\x1b[0m
      - Backend URL:                   \x1b[90m${configuration.editor.backendURL ?? '-'}\x1b[0m
      - Live sync:                     ${getLiveSyncParam()}
      - Parallel process:              ${options?.process === '' ? '-' : `\x1b[90m${options?.process}\x1b[0m`}
      - Access key:                    ${configuration.editor.clientId ?? '-'}
      `);
  });

  // Cleanup function to terminate child process and event listener when the main process exits
  const cleanup = () => {
    // Clean up event listener
    if (eventListener) {
      appLogger('Closing SSE connection...');
      eventListener.cleanup();
    }

    // Clean up child process
    if (childProcess && !childProcess.killed) {
      appLogger('Terminating parallel process...');
      childProcess.kill('SIGTERM');

      // Force kill after 5 seconds if process doesn't terminate gracefully
      setTimeout(() => {
        if (childProcess && !childProcess.killed) {
          appLogger('Force killing parallel process...');
          childProcess.kill('SIGKILL');
        }
      }, 5000);
    }

    server.close(() => {
      appLogger('Live sync server stopped');
      process.exit(0);
    });
  };

  // Handle process termination signals
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', cleanup);
};
