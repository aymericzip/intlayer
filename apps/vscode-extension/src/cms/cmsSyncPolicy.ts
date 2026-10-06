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
