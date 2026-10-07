import type {
  DictionaryAPI,
  EnvironmentAPI,
  IntlayerAPIProxy,
  ProjectAPI,
} from '@intlayer/api';
import {
  getAuthenticatedAPI,
  IntlayerEventListener,
  pull,
  readCliSessionToken,
} from '@intlayer/cli';
import {
  type GetConfigurationOptions,
  getConfiguration,
} from '@intlayer/config/node';
import { extractErrorMessage } from '@intlayer/config/utils';
import { getUnmergedDictionaries } from '@intlayer/dictionaries-entry/unmerged';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { type ExtensionContext, window } from 'vscode';
import { onDidChangeConfiguration } from '../utils/cacheInvalidation';
import { findAllProjectRoots } from '../utils/findProjectRoot';
import { getConfigurationOptions } from '../utils/getConfiguration';
import { prefix } from '../utils/logFunctions';
import {
  resolveDictionaryLocation,
  resolveTargetEnvironment,
  shouldPullDictionary,
} from './cmsSyncPolicy';
import { syncProjectConfiguration } from './syncProjectConfiguration';

/** Groups configuration change bursts (env + config file saved together). */
const RESTART_DEBOUNCE_DELAY = 1000;

/** Stops the CMS sync of a project. */
type StopProjectSync = () => void;

/**
 * The project of the credentials in use: the CLI session's project when
 * `intlayer login` stored one, else the access key's.
 */
const fetchProject = async (
  intlayerAPI: IntlayerAPIProxy,
  hasCliSession: boolean
): Promise<ProjectAPI | undefined> => {
  const result = hasCliSession
    ? await intlayerAPI.oAuth.getCliSessionMe()
    : await intlayerAPI.oAuth.getOAuth2AccessToken();

  return result.data?.project ?? undefined;
};

/**
 * Points the CLI session at the target environment. Access key tokens carry
 * no session environment: the API serves them the default one.
 */
const selectSessionEnvironment = async (
  intlayerAPI: IntlayerAPIProxy,
  environment: EnvironmentAPI
): Promise<void> => {
  if (environment.isDefault) {
    await intlayerAPI.environment.resetToProductionEnvironment();
    return;
  }

  await intlayerAPI.environment.selectEnvironment(environment.id);
};

/**
 * Keys of the remote dictionaries to write locally. `remoteLocations` holds
 * the location the remote copy declares, when known.
 */
const filterPulledDictionaryKeys = (
  remoteLocations: Map<string, DictionaryAPI['location']>,
  configuration: IntlayerConfig,
  isCommittedToRepository: boolean
): string[] => {
  const unmergedDictionaries: Record<string, Dictionary[] | undefined> =
    getUnmergedDictionaries(configuration);

  return [...remoteLocations]
    .filter(([key, remoteLocation]) =>
      shouldPullDictionary(
        resolveDictionaryLocation(
          unmergedDictionaries[key],
          remoteLocation,
          configuration.dictionary?.location
        ),
        isCommittedToRepository
      )
    )
    .map(([key]) => key);
};

/** Configuration of the SSE listener: console logs only, no notifications. */
const getListenerConfiguration = (
  configuration: IntlayerConfig
): Pick<IntlayerConfig, 'log' | 'editor'> => ({
  editor: configuration.editor,
  log: {
    ...configuration.log,
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  },
});

/**
 * Syncs one project with the CMS: pulls and pushes the configuration of the
 * production environment (else the default one), pulls the remote
 * dictionaries, then keeps listening to CMS dictionary changes.
 *
 * Runs only when the project sets access key credentials. `hybrid`
 * dictionaries are left to git when the CMS commits them to the repository.
 *
 * @returns Stops the sync, or `undefined` when the CMS is not set up.
 */
const startProjectSync = async (
  projectDir: string
): Promise<StopProjectSync | undefined> => {
  const configurationOptions: GetConfigurationOptions =
    await getConfigurationOptions(projectDir, { isBackground: true });
  const configuration = getConfiguration(configurationOptions);
  const { clientId, clientSecret } = configuration.editor;

  if (!clientId || !clientSecret) return undefined;

  const intlayerAPI = await getAuthenticatedAPI(configuration);
  const hasCliSession = Boolean(await readCliSessionToken(configuration));
  const project = await fetchProject(intlayerAPI, hasCliSession);

  if (!project) return undefined;

  const environment = resolveTargetEnvironment(project.environments);

  if (hasCliSession && environment) {
    await selectSessionEnvironment(intlayerAPI, environment);
  }

  await syncProjectConfiguration({
    intlayerAPI,
    project,
    environment,
    configuration,
  });

  const isCommittedToRepository = Boolean(
    project.repository && project.webhooks?.autoCommitDictionaries
  );

  // Pulls run one at a time: they write the same content files
  let pullQueue: Promise<void> = Promise.resolve();

  const enqueuePull = (
    remoteLocations: Map<string, DictionaryAPI['location']>
  ): Promise<void> => {
    pullQueue = pullQueue.then(async () => {
      const dictionaryKeys = filterPulledDictionaryKeys(
        remoteLocations,
        configuration,
        isCommittedToRepository
      );

      if (!dictionaryKeys.length) return;

      await pull({
        configOptions: configurationOptions,
        dictionaries: dictionaryKeys,
      });
    });

    return pullQueue;
  };

  const eventListener = new IntlayerEventListener(
    getListenerConfiguration(configuration)
  );

  const onRemoteDictionaryChange = ({ key, location }: DictionaryAPI) =>
    enqueuePull(new Map([[key, location]]));

  eventListener.onDictionaryAdded = onRemoteDictionaryChange;
  eventListener.onDictionaryChange = onRemoteDictionaryChange;

  // Before the initial pull, so no change made in between is missed
  await eventListener.initialize();

  try {
    const { data: remoteDictionaryKeys } =
      await intlayerAPI.dictionary.getDictionariesKeys();

    await enqueuePull(
      new Map((remoteDictionaryKeys ?? []).map((key) => [key, undefined]))
    );
  } catch (error) {
    eventListener.cleanup();
    throw error;
  }

  return () => eventListener.cleanup();
};

/**
 * Connects every Intlayer project of the workspace that sets CMS credentials
 * once the extension loads, and reconnects them when the configuration or
 * an env file changes.
 */
export const startCmsSync = (context: ExtensionContext): void => {
  let stopProjectSyncs: StopProjectSync[] = [];
  let restartTimeout: NodeJS.Timeout | undefined;
  // Discards the result of a start overtaken by a restart
  let generation = 0;

  const stopAll = (): void => {
    for (const stopProjectSync of stopProjectSyncs) {
      stopProjectSync();
    }

    stopProjectSyncs = [];
  };

  const startAll = async (): Promise<void> => {
    const currentGeneration = ++generation;
    const projectDirs = await findAllProjectRoots();

    await Promise.all(
      projectDirs.map(async (projectDir) => {
        try {
          const stopProjectSync = await startProjectSync(projectDir);

          if (!stopProjectSync) return;

          if (currentGeneration === generation) {
            stopProjectSyncs.push(stopProjectSync);
          } else {
            stopProjectSync();
          }
        } catch (error) {
          window.showWarningMessage(
            `${prefix}CMS sync failed: ${extractErrorMessage(error)}`
          );
        }
      })
    );
  };

  const restart = (): void => {
    clearTimeout(restartTimeout);

    restartTimeout = setTimeout(() => {
      stopAll();
      void startAll();
    }, RESTART_DEBOUNCE_DELAY);
  };

  context.subscriptions.push(onDidChangeConfiguration(restart), {
    dispose: () => {
      clearTimeout(restartTimeout);
      generation++;
      stopAll();
    },
  });

  void startAll();
};
