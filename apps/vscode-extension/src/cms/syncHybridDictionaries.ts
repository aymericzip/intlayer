import { resolve } from 'node:path';
import type { IntlayerAPIProxy } from '@intlayer/api';
import { pull } from '@intlayer/cli';
import type { GetConfigurationOptions } from '@intlayer/config/node';
import { getUnmergedDictionaries } from '@intlayer/dictionaries-entry/unmerged';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import {
  getSyncCommitMessage,
  shouldPullHybridDictionary,
} from './cmsSyncPolicy';
import {
  commitFiles,
  getLastCommitTime,
  getRepositoryReadiness,
  getRepositoryRoot,
  hasUncommittedChanges,
} from './gitSync';

type SyncHybridDictionariesOptions = {
  projectDir: string;
  /** `hybrid` dictionaries the CMS does not commit to the repository itself */
  dictionaryKeys: string[];
  configuration: IntlayerConfig;
  configurationOptions: GetConfigurationOptions;
  intlayerAPI: IntlayerAPIProxy;
};

export type HybridSyncResult =
  /** No git repository: pulled without committing */
  | { status: 'pulled-without-git' }
  /** The branch cannot receive a commit: nothing pulled */
  | { status: 'not-ready'; reason: string }
  | {
      status: 'synced';
      committedDictionaryKeys: string[];
      /** Skipped: their content file has uncommitted changes */
      modifiedDictionaryKeys: string[];
    };

/** Content file of the local declaration of a dictionary, if any. */
const getLocalFilePath = (
  localDictionaries: Dictionary[] | undefined
): string | undefined =>
  (
    localDictionaries?.find(({ location }) => location === 'hybrid') ??
    localDictionaries?.[0]
  )?.filePath;

/**
 * Pulls the `hybrid` dictionaries the CMS edited since their file's last
 * commit, then commits the rewritten files as the Intlayer bot (not pushed).
 *
 * Runs only on a branch that is up to date with its upstream, and leaves out
 * the files the developer is editing.
 */
export const syncHybridDictionaries = async ({
  projectDir,
  dictionaryKeys,
  configuration,
  configurationOptions,
  intlayerAPI,
}: SyncHybridDictionariesOptions): Promise<HybridSyncResult> => {
  const repositoryRoot = await getRepositoryRoot(projectDir);

  if (!repositoryRoot) {
    await pull({
      configOptions: configurationOptions,
      dictionaries: dictionaryKeys,
    });

    return { status: 'pulled-without-git' };
  }

  const readiness = await getRepositoryReadiness(repositoryRoot);

  if (readiness.status === 'not-ready') return readiness;

  const { data: remoteUpdateTimestamps } =
    await intlayerAPI.dictionary.getDictionariesUpdateTimestamp();
  const unmergedDictionaries: Record<string, Dictionary[] | undefined> =
    getUnmergedDictionaries(configuration);

  const dictionaryKeysToPull: string[] = [];
  const modifiedDictionaryKeys: string[] = [];

  for (const dictionaryKey of dictionaryKeys) {
    const remoteUpdatedAt = remoteUpdateTimestamps?.[dictionaryKey]?.updatedAt;
    const localFilePath = getLocalFilePath(unmergedDictionaries[dictionaryKey]);

    if (!localFilePath) {
      if (remoteUpdatedAt !== undefined) {
        dictionaryKeysToPull.push(dictionaryKey);
      }
      continue;
    }

    const absoluteFilePath = resolve(
      configuration.system.baseDir,
      localFilePath
    );

    if (await hasUncommittedChanges(repositoryRoot, absoluteFilePath)) {
      modifiedDictionaryKeys.push(dictionaryKey);
      continue;
    }

    const lastCommitTime = await getLastCommitTime(
      repositoryRoot,
      absoluteFilePath
    );

    if (shouldPullHybridDictionary(remoteUpdatedAt, lastCommitTime)) {
      dictionaryKeysToPull.push(dictionaryKey);
    }
  }

  if (!dictionaryKeysToPull.length) {
    return {
      status: 'synced',
      committedDictionaryKeys: [],
      modifiedDictionaryKeys,
    };
  }

  const pulledDictionaries = await pull({
    configOptions: configurationOptions,
    dictionaries: dictionaryKeysToPull,
  });

  const writtenFiles = new Map<string, string>();

  for (const { dictionaryKey, status, filePath } of pulledDictionaries) {
    if (
      filePath &&
      status !== 'error' &&
      dictionaryKeysToPull.includes(dictionaryKey)
    ) {
      writtenFiles.set(filePath, dictionaryKey);
    }
  }

  const getDictionaryKeys = (filePaths: string[]): string[] => [
    ...new Set(
      filePaths.flatMap((filePath) => writtenFiles.get(filePath) ?? [])
    ),
  ];

  const changedFilePaths = await commitFiles(
    repositoryRoot,
    [...writtenFiles.keys()],
    (filePaths) => getSyncCommitMessage(getDictionaryKeys(filePaths))
  );

  return {
    status: 'synced',
    committedDictionaryKeys: getDictionaryKeys(changedFilePaths),
    modifiedDictionaryKeys,
  };
};
