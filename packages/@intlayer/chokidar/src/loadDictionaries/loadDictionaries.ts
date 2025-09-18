// @ts-ignore @intlayer/backend is not build yet
import {
  ANSIColors,
  colorize,
  ESMxCJSRequire,
  getAppLogger,
  getConfiguration,
  type IntlayerConfig,
} from '@intlayer/config';
import type { Dictionary } from '@intlayer/core';
import { relative } from 'node:path';
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
  let updated: DictionariesStatus[] = [...loadDictionariesStatus];

  for (const incoming of statuses) {
    const idx = updated.findIndex(
      (s) =>
        s.dictionaryKey === incoming.dictionaryKey && s.type === incoming.type
    );
    if (idx >= 0) {
      updated[idx] = incoming;
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

const printSummary = (configuration: IntlayerConfig = getConfiguration()) => {
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

  for (const key of keys) {
    const rec = byKey.get(key)!;
    const labels: string[] = [];

    if (rec.local) {
      const inner = colorize(
        `${iconFor(rec.local)} ${rec.local}`,
        colorFor(rec.local)
      );
      labels.push(
        `${ANSIColors.GREY}[` +
          colorize('local: ', ANSIColors.GREY) +
          inner +
          `${ANSIColors.GREY}]${ANSIColors.RESET}`
      );
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

    const paddedKey = key.padEnd(35, ' ');
    appLogger(` - ${paddedKey} ${labels.join(' ')}`);
  }
};

export const loadDictionaries = async (
  contentDeclarationsPaths: string[] | string,
  configuration: IntlayerConfig = getConfiguration(),
  projectRequire = ESMxCJSRequire
): Promise<{
  localDictionaries: Dictionary[];
  remoteDictionaries: Dictionary[];
}> => {
  const appLogger = getAppLogger(configuration);

  appLogger('Dictionaries:', { isVerbose: true });

  const files = Array.isArray(contentDeclarationsPaths)
    ? contentDeclarationsPaths
    : [contentDeclarationsPaths];

  const localDictionaries: Dictionary[] = await loadContentDeclarations(
    files,
    projectRequire,
    setLoadDictionariesStatus
  );

  const filteredLocalDictionaries = localDictionaries.filter((dict) => {
    const hasKey = Boolean(dict.key);
    const hasContent = Boolean(dict.content);

    if (!hasContent) {
      appLogger(
        [
          'Content declaration has no exported content',
          dict.filePath
            ? relative(configuration.content.baseDir, dict.filePath)
            : '',
        ],
        { level: 'error' }
      );
    } else if (!hasKey) {
      appLogger(['Content declaration has no key', dict.filePath], {
        level: 'error',
      });
    }

    return hasKey && hasContent;
  });

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

  let remoteDictionaries: Dictionary[] = [];
  if (hasRemoteDictionaries) {
    remoteDictionaries = await loadRemoteDictionaries(
      configuration,
      setLoadDictionariesStatus
    );
  }

  // Stop spinner and show final progress line(s)
  logger.finish();

  printSummary(configuration);

  return {
    localDictionaries: filteredLocalDictionaries,
    remoteDictionaries,
  };
};
