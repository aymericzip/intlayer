import type { AIOptions, IntlayerAPIProxy } from '@intlayer/api';
import { getIntlayerAPIProxy } from '@intlayer/api';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { extractErrorMessage } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import { type CliSessionData, readCliSessionToken } from '../auth/sessionToken';
import { checkConfigConsistency } from './checkConfigConsistency';

export const getAuthenticatedAPI = async (
  configuration?: IntlayerConfig
): Promise<IntlayerAPIProxy> => {
  let sessionData: CliSessionData | null = null;

  // First use session data if it exists
  if (configuration) {
    sessionData = await readCliSessionToken(configuration);
  }

  return getIntlayerAPIProxy(undefined, configuration, sessionData?.token);
};

const checkProjectConfigConsistency = (
  project: { configuration?: any } | null | undefined,
  configuration: IntlayerConfig,
  appLogger: ReturnType<typeof getAppLogger>
): void => {
  if (!project?.configuration) return;

  try {
    let remoteConfigToCheck = project.configuration;

    if (
      remoteConfigToCheck.ai &&
      'apiKeyConfigured' in remoteConfigToCheck.ai
    ) {
      const { apiKeyConfigured, ...restAi } = remoteConfigToCheck.ai as any;
      remoteConfigToCheck = { ...remoteConfigToCheck, ai: restAi };
    }

    checkConfigConsistency(remoteConfigToCheck, configuration);
  } catch {
    appLogger(
      [
        'Remote configuration is not up to date. The project configuration does not match the local configuration.',
        'You can push the configuration by running',
        colorize('npx intlayer configuration push', ANSIColors.CYAN),
        colorize('(see doc:', ANSIColors.GREY_DARK),
        colorize('https://intlayer.org/doc/concept/cli/push', ANSIColors.GREY),
        colorize(')', ANSIColors.GREY_DARK),
        '.',
      ],
      { level: 'warn' }
    );
  }
};

export const checkCMSAuth = async (
  configuration: IntlayerConfig,
  shouldCheckConfigConsistency: boolean = true
): Promise<boolean> => {
  const appLogger = getAppLogger(configuration);

  // Try CLI session token first (short-lived 2h token stored in tempDir)
  const sessionData = await readCliSessionToken(configuration);
  if (sessionData) {
    const intlayerAPI = getIntlayerAPIProxy(
      undefined,
      configuration,
      sessionData.token
    );

    try {
      const result = await intlayerAPI.oAuth.getCliSessionMe();
      const project = result.data?.project;

      if (project && shouldCheckConfigConsistency) {
        checkProjectConfigConsistency(project, configuration, appLogger);
      }

      return true;
    } catch (error) {
      const message = extractErrorMessage(error);
      appLogger(message, { level: 'error' });
      return false;
    }
  }

  // Fall back to client_credentials (access key)
  const hasCMSAuth =
    configuration.editor.clientId && configuration.editor.clientSecret;
  if (!hasCMSAuth) {
    appLogger(
      [
        'CMS auth not provided. Run',
        colorize('npx intlayer login', ANSIColors.CYAN),
        'to authenticate, or set',
        colorize('INTLAYER_CLIENT_ID', ANSIColors.GREY_LIGHT),
        'and',
        colorize('INTLAYER_CLIENT_SECRET', ANSIColors.GREY_LIGHT),
        'in your .env file',
        colorize('(see doc:', ANSIColors.GREY_DARK),
        colorize('https://intlayer.org/doc/concept/cms', ANSIColors.GREY),
        colorize(')', ANSIColors.GREY_DARK),
        '.',
      ],
      { level: 'error' }
    );

    return false;
  }

  const intlayerAPI = getIntlayerAPIProxy(undefined, configuration);

  try {
    const result = await intlayerAPI.oAuth.getOAuth2AccessToken();

    const project = result.data?.project;

    if (!project) {
      appLogger('Project not found');
      return true;
    }

    if (shouldCheckConfigConsistency) {
      checkProjectConfigConsistency(project, configuration, appLogger);
    }
  } catch (error) {
    const message = extractErrorMessage(error);
    appLogger(message, { level: 'error' });
    return false;
  }

  return true;
};

export const checkAIAccess = async (
  configuration: IntlayerConfig,
  aiOptions?: AIOptions,
  shouldCheckConfigConsistency: boolean = true
): Promise<boolean> => {
  const appLogger = getAppLogger(configuration);

  const hasCMSAuth = Boolean(
    configuration.editor.clientId && configuration.editor.clientSecret
  );

  const sessionData = await readCliSessionToken(configuration);
  const hasSessionToken = Boolean(sessionData);
  const isOllama =
    configuration.ai?.provider === 'ollama' || aiOptions?.provider === 'ollama';
  const hasHisOwnAIAPIKey = Boolean(
    configuration.ai?.apiKey || aiOptions?.apiKey
  );

  if (hasHisOwnAIAPIKey || isOllama) {
    return true;
  }

  // User need to provide either his own AI API key or the CMS auth
  if (!hasCMSAuth && !hasSessionToken) {
    appLogger(
      [
        'AI options or API key not provided. Run',
        colorize('npx intlayer login', ANSIColors.CYAN),
        'to authenticate, or provide an API key',
        colorize('(see doc:', ANSIColors.GREY_DARK),
        colorize(
          'https://intlayer.org/doc/concept/configuration',
          ANSIColors.GREY
        ),
        colorize(')', ANSIColors.GREY_DARK),
        '.',
      ],
      { level: 'error' }
    );

    return false;
  }

  // If the user do not have his own AI API key, we need to check the CMS auth
  return await checkCMSAuth(configuration, shouldCheckConfigConsistency);
};
