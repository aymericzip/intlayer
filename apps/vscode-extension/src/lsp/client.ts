import { basename, join } from 'node:path';
import {
  DICTIONARIES_NOT_BUILT_NOTIFICATION,
  type DictionariesNotBuiltParams,
} from '@intlayer/lsp/utils';
import type { ExtensionContext } from 'vscode';
import { type LocationLink, ProgressLocation, window, workspace } from 'vscode';
import {
  LanguageClient,
  type LanguageClientOptions,
  RevealOutputChannelOn,
  type ServerOptions,
  State,
  TransportKind,
} from 'vscode-languageclient/node';
import { buildProjectDictionaries } from '../commands/buildAllCommand';
import { LSP_DOCUMENT_SELECTOR } from '../documentSelector';
import {
  CONFIGURATION_GLOB,
  onDidChangeConfiguration,
  onDidChangeDictionaries,
  UNMERGED_DICTIONARIES_GLOB,
} from '../utils/cacheInvalidation';
import { getKeyOriginRange } from '../utils/getKeyOriginRange';
import { prefix } from '../utils/logFunctions';

let client: LanguageClient | undefined;

/** Inspector port of the LSP server in debug mode — keep in sync with `.vscode/launch.json`. */
const LSP_DEBUG_PORT = 6009;

/**
 * Projects already built in response to the server, so a burst of notifications
 * (or a project that genuinely declares no content) cannot loop the build.
 * Cleared when the configuration or the built dictionaries change: a later
 * production build that drops the dictionaries is then rebuilt again.
 */
const autoBuiltProjects = new Set<string>();

/**
 * Build the dictionaries of a project the server reported as unbuilt.
 *
 * Unmerged dictionaries are only written by a dev build, so a project last
 * built for production has none and the server cannot resolve any key. Running
 * the build here restores them; the resulting files trip the server's watcher,
 * which re-publishes diagnostics on its own.
 */
const buildUnbuiltProject = async ({
  baseDir,
}: DictionariesNotBuiltParams): Promise<void> => {
  if (autoBuiltProjects.has(baseDir)) {
    return;
  }

  autoBuiltProjects.add(baseDir);

  await window.withProgress(
    {
      location: ProgressLocation.Window,
      title: `${prefix}Building dictionaries in ${basename(baseDir)}...`,
    },
    async () => {
      await buildProjectDictionaries(baseDir, { silent: true });
    }
  );
};

/** True once the server process is up and answering requests. */
export const isLSPClientRunning = (): boolean =>
  client?.state === State.Running;

export const startLSPClient = (context: ExtensionContext): void => {
  const serverModule = context.asAbsolutePath(join('dist', 'lsp-server.js'));

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.stdio },
    // Used when the extension host runs under a debugger (F5): opens an
    // inspector so the "Attach to LSP Server" launch config can connect.
    debug: {
      module: serverModule,
      transport: TransportKind.stdio,
      options: { execArgv: ['--nolazy', `--inspect=${LSP_DEBUG_PORT}`] },
    },
  };

  // Named output channel — visible in VS Code's Output panel drop-down as
  // "Intlayer LSP". All connection.console.log() calls from the server process
  // arrive here. Open it with: View → Output → select "Intlayer LSP".
  const outputChannel = window.createOutputChannel('Intlayer LSP', {
    log: true,
  });

  // Any event on these makes the server drop its caches
  const serverFileWatchers = [
    workspace.createFileSystemWatcher(
      '**/*.content.{ts,tsx,js,jsx,json,jsonc,json5,yaml,yml,md,mdx}'
    ),
    // The server answers from the built dictionaries, so a rebuild
    // triggered outside the extension (CLI, dev server) must invalidate
    // its caches too — otherwise diagnostics stay stale.
    workspace.createFileSystemWatcher(UNMERGED_DICTIONARIES_GLOB),
    // Configuration and env changes move every path the server reads
    workspace.createFileSystemWatcher(CONFIGURATION_GLOB),
  ];

  context.subscriptions.push(
    ...serverFileWatchers,
    onDidChangeConfiguration(() => autoBuiltProjects.clear()),
    onDidChangeDictionaries(() => autoBuiltProjects.clear())
  );

  const clientOptions: LanguageClientOptions = {
    documentSelector: LSP_DOCUMENT_SELECTOR,
    synchronize: { fileEvents: serverFileWatchers },
    outputChannel,
    // Never auto-reveal — user opens it manually when needed.
    revealOutputChannelOn: RevealOutputChannelOn.Never,
    middleware: {
      // The server answers `onDefinition` with plain `Location`s, which carry
      // no origin range. Without one, VS Code derives the Ctrl+click underline
      // from the JS/TS word pattern, which splits on `-` — so a hyphenated key
      // like `chatbot-modal` shows up as two separate clickable tokens.
      // Convert the results to `LocationLink`s spanning the whole key.
      provideDefinition: async (document, position, token, next) => {
        const result = await next(document, position, token);
        if (!result) {
          return result;
        }

        const originSelectionRange = getKeyOriginRange(document, position);
        const locations = Array.isArray(result) ? result : [result];

        return locations.map<LocationLink>((location) =>
          'targetUri' in location
            ? // Already a LocationLink — just ensure it has an origin range.
              {
                ...location,
                originSelectionRange:
                  location.originSelectionRange ?? originSelectionRange,
              }
            : {
                targetUri: location.uri,
                targetRange: location.range,
                targetSelectionRange: location.range,
                originSelectionRange,
              }
        );
      },
    },
  };

  client = new LanguageClient(
    'intlayerLSP',
    'Intlayer Language Server',
    serverOptions,
    clientOptions
  );

  // Registered before `start()` so the handler is attached to the connection
  // as it opens — the server may report an unbuilt project on the very first
  // document it sees.
  context.subscriptions.push(
    client.onNotification(
      DICTIONARIES_NOT_BUILT_NOTIFICATION,
      buildUnbuiltProject
    )
  );

  client.start();
  context.subscriptions.push(client);
};
