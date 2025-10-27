import { createServer } from 'node:http';
// @ts-ignore: @intlayer/backend is not built yet
import type { DictionaryAPI } from '@intlayer/backend';
import {
  buildDictionary,
  type ParallelHandle,
  runParallel,
} from '@intlayer/chokidar';
import type { GetConfigurationOptions } from '@intlayer/config';
import { getAppLogger, getConfiguration } from '@intlayer/config';
import packageJson from '@intlayer/config/package.json';
import { getLocalizedContent } from '@intlayer/core';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { IntlayerConfig } from '@intlayer/types';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';
import { IntlayerEventListener } from './IntlayerEventListener';

type LiveSyncOptions = {
  with?: string | string[];
  configOptions?: GetConfigurationOptions;
};

const writeDictionary = async (
  dictionary: DictionaryAPI,
  configuration: IntlayerConfig
) => {
  const appLogger = getAppLogger(configuration);
  appLogger(`Writing dictionary ${dictionary.key}`);
  await buildDictionary([dictionary], configuration);
};

export const liveSync = async (options?: LiveSyncOptions) => {
  const configuration = getConfiguration(options?.configOptions);
  const appLogger = getAppLogger(configuration);

  const { liveSyncPort, liveSyncURL } = configuration.editor;

  let parallelProcess: ParallelHandle | null = null;
  let eventListener: IntlayerEventListener | null = null;
  let _isHotReloadConnected = false;
  let _connectionStatus = 'disconnected'; // 'connected', 'connecting', 'reconnecting', 'disconnected', 'error'

  // Start the parallel process if provided
  if (options?.with) {
    parallelProcess = runParallel(options.with);
  }

  // Initialize the event listener for hot reload if configured
  if (
    configuration.editor.liveSync &&
    configuration.editor.backendURL &&
    configuration.editor.clientId &&
    configuration.editor.clientSecret
  ) {
    eventListener = new IntlayerEventListener(configuration);
    _connectionStatus = 'connecting';

    // Set up connection callbacks
    eventListener.onConnectionOpen = () => {
      _connectionStatus = 'connected';
      _isHotReloadConnected = true;
      appLogger('Live sync connection established');
    };

    eventListener.onConnectionError = (error) => {
      _connectionStatus = 'error';
      _isHotReloadConnected = false;
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
        _connectionStatus = 'reconnecting';
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
      _connectionStatus = 'error';
      _isHotReloadConnected = false;
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
  } else if (!configuration.editor.liveSync) {
    appLogger(
      'Hot reload is disabled. Please enable it in the configuration (editor.liveSync).'
    );
  } else if (
    !configuration.editor.clientId ||
    !configuration.editor.clientSecret
  ) {
    appLogger(
      'Missing client credentials for hot reload. Please configure clientId and clientSecret'
    );
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
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });
      const dictionaries = getDictionaries(configuration);

      const prefix = '/dictionaries/';
      if (req.url.startsWith(prefix)) {
        const [key, locale] = decodeURIComponent(req.url)
          .slice(prefix.length)
          .split('/');

        const dictionary = dictionaries[key] ?? null;

        if (locale) {
          // @ts-ignore Type instantiation is excessively deep and possibly infinite
          const sourceLocaleContent = getLocalizedContent(
            dictionary.content,
            locale,
            {
              dictionaryKey: key,
              keyPath: [],
            }
          );

          res.end(JSON.stringify(sourceLocaleContent));
          return;
        }

        res.end(JSON.stringify(dictionary));
        return;
      }

      res.end(JSON.stringify(dictionaries));
      return;
    }

    if (req.url?.startsWith('/unmerged_dictionaries')) {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });
      const unmergedDictionaries = getUnmergedDictionaries(configuration);

      const prefix = '/unmerged_dictionaries/';
      if (req.url.startsWith(prefix)) {
        const key = decodeURIComponent(req.url.slice(prefix.length));
        const one = unmergedDictionaries[key] ?? null;

        res.end(JSON.stringify(one));
        return;
      }

      res.end(JSON.stringify(unmergedDictionaries));
      return;
    }

    if (req.url === '/configuration') {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      });
      res.end(JSON.stringify(configuration));
      return;
    }

    if (req.url === '/health') {
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
      });
      res.end(JSON.stringify({ status: 'ok' }));
      return;
    }

    res.end('Not found');
    return;
  });

  const getLiveSyncParam = () => {
    if (!configuration.editor.liveSync) return '\x1b[31m✗ Disabled\x1b[0m';

    return '\x1b[32m✓ Enabled\x1b[0m';
  };
  server.listen(liveSyncPort, () => {
    console.log(`
      \x1b[1;90mINTLAYER v${packageJson.version}\x1b[0m
  
      Live server running at:          \x1b[90m${liveSyncURL}\x1b[0m
      - Backend URL:                   \x1b[90m${configuration.editor.backendURL ?? '-'}\x1b[0m
      - Live sync:                     ${getLiveSyncParam()}
      - Parallel process:              ${options?.with ? `\x1b[90m${Array.isArray(options.with) ? options.with.join(' ') : options.with}\x1b[0m` : '-'}
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

    if (parallelProcess) {
      parallelProcess.kill();
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
