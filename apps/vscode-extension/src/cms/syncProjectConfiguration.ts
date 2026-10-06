import type {
  EnvironmentAPI,
  IntlayerAPIProxy,
  ProjectAPI,
} from '@intlayer/api';
import { checkConfigConsistency } from '@intlayer/cli';
import type { IntlayerConfig } from '@intlayer/types/config';

/** Id of the virtual production environment the API injects (not stored). */
const VIRTUAL_PRODUCTION_ENVIRONMENT_ID = 'production';

type RemoteConfiguration = NonNullable<ProjectAPI['configuration']>;

/**
 * Remote configuration without its AI key fields: the API masks the key and
 * adds `apiKeyConfigured`, so neither can match the local configuration.
 */
const omitRemoteAIKey = (
  remoteConfiguration: RemoteConfiguration
): RemoteConfiguration => {
  if (!remoteConfiguration.ai) return remoteConfiguration;

  const { apiKey, apiKeyConfigured, ...ai } = remoteConfiguration.ai;

  return { ...remoteConfiguration, ai };
};

/**
 * Whether every value of the remote configuration matches the local one.
 * The local configuration is compared in its JSON form, as it was pushed.
 */
export const isRemoteConfigurationUpToDate = (
  remoteConfiguration: RemoteConfiguration | undefined,
  localConfiguration: IntlayerConfig
): boolean => {
  if (!remoteConfiguration) return false;

  try {
    checkConfigConsistency(
      omitRemoteAIKey(remoteConfiguration),
      JSON.parse(JSON.stringify(localConfiguration))
    );

    return true;
  } catch {
    return false;
  }
};

/** Whether the environment stores its own configuration override. */
const hasOwnConfiguration = (
  environment: EnvironmentAPI | undefined
): environment is EnvironmentAPI & { configuration: RemoteConfiguration } =>
  Boolean(
    environment?.configuration &&
      environment.id !== VIRTUAL_PRODUCTION_ENVIRONMENT_ID
  );

/**
 * Pulls the remote configuration of the target environment (its override,
 * else the project one) and pushes the local configuration when they differ.
 *
 * @returns Whether the configuration was pushed.
 */
export const syncProjectConfiguration = async ({
  intlayerAPI,
  project,
  environment,
  configuration,
}: {
  intlayerAPI: IntlayerAPIProxy;
  project: ProjectAPI;
  environment: EnvironmentAPI | undefined;
  configuration: IntlayerConfig;
}): Promise<boolean> => {
  const environmentWithOwnConfiguration = hasOwnConfiguration(environment)
    ? environment
    : undefined;
  const remoteConfiguration =
    environmentWithOwnConfiguration?.configuration ?? project.configuration;

  if (isRemoteConfigurationUpToDate(remoteConfiguration, configuration)) {
    return false;
  }

  if (environmentWithOwnConfiguration) {
    await intlayerAPI.environment.updateEnvironment(
      environmentWithOwnConfiguration.id,
      { configuration }
    );
  } else {
    await intlayerAPI.project.pushProjectConfiguration(configuration);
  }

  return true;
};
