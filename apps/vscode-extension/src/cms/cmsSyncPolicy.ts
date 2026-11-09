import type {
  Dictionary,
  DictionaryLocation,
} from '@intlayer/types/dictionary';

/** Name of the CMS environment the extension syncs with first. */
const PRODUCTION_ENVIRONMENT_NAME = 'production';

/** Fields of a CMS environment needed to pick one. */
type EnvironmentReference = {
  id: string;
  name: string;
  isDefault: boolean;
};

/**
 * CMS environment the extension syncs with: the one named `production`, else
 * the project default.
 */
export const resolveTargetEnvironment = <
  Environment extends EnvironmentReference,
>(
  environments: Environment[] = []
): Environment | undefined =>
  environments.find(
    ({ name }) => name.toLowerCase() === PRODUCTION_ENVIRONMENT_NAME
  ) ?? environments.find(({ isDefault }) => isDefault);

/**
 * Location of a dictionary: its local declaration's, else the remote one's,
 * else the configured default (`remote` when unset, as `intlayer pull` does).
 */
export const resolveDictionaryLocation = (
  localDictionaries: Dictionary[] | undefined,
  remoteLocation: DictionaryLocation | undefined,
  defaultLocation: DictionaryLocation | undefined
): DictionaryLocation =>
  localDictionaries?.[0]?.location ??
  remoteLocation ??
  defaultLocation ??
  'remote';

/**
 * Whether a remote dictionary is written to the local content files.
 *
 * @param isCommittedToRepository - The CMS commits `hybrid` dictionary edits
 * to the connected repository: they reach the workspace through git, so
 * pulling them would race that commit.
 */
export const shouldPullDictionary = (
  location: DictionaryLocation,
  isCommittedToRepository: boolean
): boolean =>
  location === 'remote' || (location === 'hybrid' && !isCommittedToRepository);

/** Subject of the commit adding the synced dictionaries. */
export const SYNC_COMMIT_SUBJECT =
  'chore(intlayer): sync dictionaries from the CMS [skip ci]';

/**
 * Whether a `hybrid` dictionary is pulled into its content file: only when
 * the CMS edited it after the file's last commit. Older CMS content would
 * revert local commits not pushed to the CMS yet.
 *
 * @param remoteUpdatedAt - Last CMS update (ms), `undefined` when not on the CMS.
 * @param lastCommitTime - Last commit of the file (ms), `undefined` when never
 * committed.
 */
export const shouldPullHybridDictionary = (
  remoteUpdatedAt: number | undefined,
  lastCommitTime: number | undefined
): boolean =>
  remoteUpdatedAt !== undefined &&
  (lastCommitTime === undefined || remoteUpdatedAt > lastCommitTime);

/** Commit message listing the synced dictionary keys in its body. */
export const getSyncCommitMessage = (dictionaryKeys: string[]): string =>
  [
    SYNC_COMMIT_SUBJECT,
    '',
    ...[...dictionaryKeys].sort().map((dictionaryKey) => `- ${dictionaryKey}`),
  ].join('\n');
