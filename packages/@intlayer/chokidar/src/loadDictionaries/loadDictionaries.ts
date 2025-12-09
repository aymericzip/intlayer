import {
  ANSIColors,
  colon,
  colorize,
  colorizeKey,
  getAppLogger,
} from '@intlayer/config/client';
import type { Dictionary, IntlayerConfig } from '@intlayer/types';
import { filterInvalidDictionaries } from '../filterInvalidDictionaries';
import { loadContentDeclarations } from './loadContentDeclaration';
import { loadRemoteDictionaries } from './loadRemoteDictionaries';
import { DictionariesLogger } from './log';

export type DictionariesStatus = {
  dictionaryKey: string;
  type: 'local' | 'remote';
  status:
    | 'pending' // Key found but not fetched yet
    | 'fetching' // If dictionary fetch is in progress
    | 'fetched' // If dictionary fetch succeeded
    | 'error' // If dictionary fetch failed
    | 'imported' // If dictionary already fetched and still up to date
    | 'found' // If dictionary key is found but promise is not resolved yet (ex: fetching distant content)
    | 'building' // If dictionary is being built
    | 'built'; // If dictionary is built;
  error?: string;
};

let loadDictionariesStatus: DictionariesStatus[] = [];
const logger = new DictionariesLogger();

const setLoadDictionariesStatus = (statuses: DictionariesStatus[]) => {
  const updated: DictionariesStatus[] = [...loadDictionariesStatus];

  for (const incoming of statuses) {
    const index = updated.findIndex(
      (s) =>
        s.dictionaryKey === incoming.dictionaryKey && s.type === incoming.type
    );
    if (index >= 0) {
      updated[index] = incoming;
    } else {
      updated.push(incoming);
    }
  }

  loadDictionariesStatus = updated;
  logger.update(statuses);

  return updated;
};

type StatusRecord = {
  local?: DictionariesStatus['status'];
  remote?: DictionariesStatus['status'];
};

const iconFor = (status: DictionariesStatus['status']) => {
  switch (status) {
    case 'built':
    case 'imported':
    case 'fetched':
      return '✔';
    case 'error':
      return '✖';
    default:
      return '⏲';
  }
};

const colorFor = (status: DictionariesStatus['status']) => {
  switch (status) {
    case 'built':
    case 'imported':
    case 'fetched':
      return ANSIColors.GREEN;
    case 'error':
      return ANSIColors.RED;
    default:
      return ANSIColors.BLUE;
  }
};

const printSummary = (configuration: IntlayerConfig) => {
  if (configuration.log.mode !== 'verbose') return;

  const appLogger = getAppLogger(configuration);

  // Aggregate by dictionary key
  const byKey = new Map<string, StatusRecord>();
  for (const s of loadDictionariesStatus) {
    const rec = byKey.get(s.dictionaryKey) ?? {};
    if (s.type === 'local') rec.local = s.status;
    if (s.type === 'remote') rec.remote = s.status;
    byKey.set(s.dictionaryKey, rec);
  }

  const keys = Array.from(byKey.keys()).sort((a, b) => a.localeCompare(b));

  // Compute the max visible length of the local label to align distant labels
  let maxLocalLabelLen = 0;
  for (const key of keys) {
    const rec = byKey.get(key)!;
    if (rec.local) {
      const visibleLocal = `[local: ${iconFor(rec.local)} ${rec.local}]`;
      if (visibleLocal.length > maxLocalLabelLen) {
        maxLocalLabelLen = visibleLocal.length;
      }
    }
  }

  for (const key of keys) {
    const rec = byKey.get(key)!;
    const labels: string[] = [];

    if (rec.local) {
      const inner = colorize(
        `${iconFor(rec.local)} ${rec.local}`,
        colorFor(rec.local)
      );
      const coloredLocal =
        `${ANSIColors.GREY}[` +
        colorize('local: ', ANSIColors.GREY) +
        inner +
        `${ANSIColors.GREY}]${ANSIColors.RESET}`;

      // Pad to align distant label across rows
      const visibleLocal = `[local: ${iconFor(rec.local)} ${rec.local}]`;
      const pad = Math.max(0, maxLocalLabelLen - visibleLocal.length);
      labels.push(coloredLocal + ' '.repeat(pad));
    } else {
      // If no local label, insert spaces to keep distant aligned
      labels.push(' '.repeat(maxLocalLabelLen));
    }

    if (rec.remote) {
      const inner = colorize(
        `${iconFor(rec.remote)} ${rec.remote}`,
        colorFor(rec.remote)
      );
      labels.push(
        `${ANSIColors.GREY}[` +
          colorize('distant: ', ANSIColors.GREY) +
          inner +
          `${ANSIColors.GREY}]${ANSIColors.RESET}`
      );
    }

    appLogger(
      ` - ${colon(colorizeKey(key), { colSize: keys })} ${labels.join(' ')}`
    );
  }
};

export const loadDictionaries = async (
  contentDeclarationsPaths: string[] | string,
  configuration: IntlayerConfig
): Promise<{
  localDictionaries: Dictionary[];
  remoteDictionaries: Dictionary[];
  pluginDictionaries: Dictionary[];
  time: {
    localDictionaries: number;
    remoteDictionaries: number;
    pluginDictionaries: number;
  };
}> => {
  const { plugins } = configuration;
  const loadDictionariesStartTime = Date.now();
  const appLogger = getAppLogger(configuration);

  appLogger('Dictionaries:', { isVerbose: true });

  // Load additional dictionaries via plugins (e.g., ICU JSON ingestion)
  const pluginsWithLoadDictionaries = (plugins ?? []).filter(
    (plugin) => plugin.loadDictionaries
  );

  logger.setPluginTotal(pluginsWithLoadDictionaries.length);

  const completedPluginIndices = new Set<number>();
  const updatePluginProgress = () => {
    logger.setPluginDone(completedPluginIndices.size);
  };

  const loadPluginDictionariesPromise = pluginsWithLoadDictionaries.map(
    async (plugin, index) => {
      try {
        const res = await plugin.loadDictionaries?.({
          configuration,
        });
        completedPluginIndices.add(index);
        updatePluginProgress();
        return (res as Dictionary[] | undefined) ?? [];
      } catch (error) {
        logger.setPluginError(error as Error);
        completedPluginIndices.add(index);
        updatePluginProgress();
        return [];
      }
    }
  );

  const pluginDictionaries: Dictionary[] = (
    await Promise.all(loadPluginDictionariesPromise)
  ).flat();

  const files = Array.isArray(contentDeclarationsPaths)
    ? contentDeclarationsPaths
    : [contentDeclarationsPaths];

  const localDictionaries: Dictionary[] = await loadContentDeclarations(
    files,
    configuration,
    setLoadDictionariesStatus
  );

  const localDictionariesTime = Date.now();

  const filteredLocalDictionaries = filterInvalidDictionaries(
    localDictionaries,
    configuration
  );

  const localDictionariesStatus = filteredLocalDictionaries.map(
    (dict) =>
      ({
        dictionaryKey: dict.key,
        type: 'local',
        status: 'built',
      }) as const
  );

  setLoadDictionariesStatus(localDictionariesStatus);

  const hasRemoteDictionaries = Boolean(
    configuration.editor.clientId && configuration.editor.clientSecret
  );

  if (hasRemoteDictionaries) {
    // We expect to fetch remote dictionaries soon; suppress a transient local-only render
    logger.setExpectRemote(true);
  }

  let remoteDictionaries: Dictionary[] = [];
  if (hasRemoteDictionaries) {
    remoteDictionaries = await loadRemoteDictionaries(
      configuration,
      setLoadDictionariesStatus,
      {
        onStartRemoteCheck: () => logger.startRemoteCheck(),
        onStopRemoteCheck: () => logger.stopRemoteCheck(),
        onError: (e) => logger.setRemoteError(e),
      }
    );
  }

  const remoteDictionariesTime = Date.now();

  const pluginDictionariesTime = Date.now();

  // Stop spinner and show final progress line(s)
  logger.finish();

  printSummary(configuration);

  return {
    localDictionaries: filteredLocalDictionaries,
    remoteDictionaries,
    pluginDictionaries,
    time: {
      localDictionaries: localDictionariesTime - loadDictionariesStartTime,
      remoteDictionaries: remoteDictionariesTime - localDictionariesTime,
      pluginDictionaries: pluginDictionariesTime - remoteDictionariesTime,
    },
  };
};
