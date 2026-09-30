import { configurationFilesCandidates } from '@intlayer/config/node';
import {
  type Disposable,
  EventEmitter,
  type ExtensionContext,
  type Uri,
  workspace,
} from 'vscode';
import { clearBuiltConfigCache } from '../config-built';
import { clearProjectRootCache } from './findProjectRoot';
import { clearUsageCache } from './findUsages';
import { clearEnvironmentVariablesCache } from './getConfiguration';
import { clearIntlayerConfigCache } from './intlayerCache';

/** Groups bursts of file events (branch switch, full rebuild) into one. */
const EVENT_DEBOUNCE_DELAY = 200;

/** Configuration files, `.env` files, and package.json (project roots). */
export const CONFIGURATION_GLOB = `**/{${[
  ...configurationFilesCandidates,
  '.env',
  '.env.*',
  'package.json',
].join(',')}}`;

/** Built unmerged dictionaries — what previews and lookups read. */
export const UNMERGED_DICTIONARIES_GLOB =
  '**/.intlayer/unmerged_dictionary/*.json';

/** Built configuration, read by the `@intlayer/config/built` shim. */
const BUILT_CONFIGURATION_GLOB = '**/.intlayer/config/*';

const configurationChangeEmitter = new EventEmitter<void>();
const dictionariesChangeEmitter = new EventEmitter<void>();

/**
 * Fired after the configuration caches were cleared: the configuration, an
 * env file, or the set of projects changed.
 */
export const onDidChangeConfiguration = configurationChangeEmitter.event;

/** Fired when built unmerged dictionaries are written or removed. */
export const onDidChangeDictionaries = dictionariesChangeEmitter.event;

/**
 * Clear every cache derived from the project configuration, then notify the
 * views (tree, decorations) so they re-read it.
 */
export const invalidateConfigurationCaches = (): void => {
  clearProjectRootCache();
  clearEnvironmentVariablesCache();
  clearIntlayerConfigCache();
  clearBuiltConfigCache();
  // Scanned file patterns come from the configuration
  clearUsageCache();
  configurationChangeEmitter.fire();
};

const isInNodeModules = (uri: Uri): boolean =>
  /[\\/]node_modules[\\/]/.test(uri.fsPath);

/** Debounced `callback`, ignoring events from node_modules. */
const debounceFileEvent = (
  callback: () => void
): { handle: (uri: Uri) => void; dispose: () => void } => {
  let timeout: NodeJS.Timeout | undefined;

  return {
    handle: (uri) => {
      if (isInNodeModules(uri)) return;

      clearTimeout(timeout);
      timeout = setTimeout(callback, EVENT_DEBOUNCE_DELAY);
    },
    dispose: () => clearTimeout(timeout),
  };
};

/** Run `onChange` on every create / change / delete matching `glob`. */
const watchGlob = (glob: string, onChange: () => void): Disposable[] => {
  const watcher = workspace.createFileSystemWatcher(glob);
  const debounced = debounceFileEvent(onChange);

  return [
    watcher,
    debounced,
    watcher.onDidCreate(debounced.handle),
    watcher.onDidChange(debounced.handle),
    watcher.onDidDelete(debounced.handle),
  ];
};

/**
 * Keep every cache in sync with the workspace, so configuration, env and
 * dictionary changes apply without restarting the extension:
 *
 * - configuration / env / package.json → every configuration cache
 * - built configuration → the `@intlayer/config/built` shim
 * - built dictionaries → views (the dictionary JSON cache self-validates)
 * - source files saved, created, deleted or renamed → dictionary usage scans
 */
export const watchCacheInvalidation = (context: ExtensionContext): void => {
  context.subscriptions.push(
    configurationChangeEmitter,
    dictionariesChangeEmitter,
    ...watchGlob(CONFIGURATION_GLOB, invalidateConfigurationCaches),
    ...watchGlob(BUILT_CONFIGURATION_GLOB, clearBuiltConfigCache),
    ...watchGlob(UNMERGED_DICTIONARIES_GLOB, () =>
      dictionariesChangeEmitter.fire()
    ),
    workspace.onDidChangeWorkspaceFolders(invalidateConfigurationCaches),
    workspace.onDidSaveTextDocument(clearUsageCache),
    workspace.onDidCreateFiles(clearUsageCache),
    workspace.onDidDeleteFiles(clearUsageCache),
    workspace.onDidRenameFiles(clearUsageCache)
  );
};
