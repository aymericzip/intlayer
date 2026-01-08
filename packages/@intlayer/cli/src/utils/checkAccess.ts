import type { AIOptions } from '@intlayer/api';
import { getIntlayerAPIProxy } from '@intlayer/api';
import {
  ANSIColors,
  colorize,
  extractErrorMessage,
  getAppLogger,
} from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';
import { checkConfigConsistency } from './checkConfigConsistency';

export const checkCMSAuth = async (
  configuration: IntlayerConfig,
  shouldCheckConfigConsistency: boolean = true
): Promise<boolean> => {
  const appLogger = getAppLogger(configuration, {
    config: {
      prefix: '',
    },
  });

  const hasCMSAuth =
    configuration.editor.clientId && configuration.editor.clientSecret;
  if (!hasCMSAuth) {
    appLogger(
      [
        'CMS auth not provided. You can either retreive the CMS access key on',
        colorize('https://intlayer.org/dahboard', ANSIColors.GREY),
        colorize('(see doc:', ANSIColors.GREY_DARK),
        colorize('https://intlayer.org/doc/concept/cms', ANSIColors.GREY),
        colorize(')', ANSIColors.GREY_DARK),
        '.',
      ],
      {
        level: 'error',
      }
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

    if (project.configuration && shouldCheckConfigConsistency) {
      try {
        // Recursively check if project.configuration (subset) matches configuration (superset)
        checkConfigConsistency(project.configuration, configuration);
      } catch {
        appLogger(
          [
            'Remote configuration is not up to date. The project configuration does not match the local configuration.',
            'You can push the configuration by running',
            colorize('npx intlayer push', ANSIColors.CYAN),
            colorize('(see doc:', ANSIColors.GREY_DARK),
            colorize(
              'https://intlayer.org/doc/concept/cli/push',
              ANSIColors.GREY
            ),
            colorize(')', ANSIColors.GREY_DARK),
            '.',
          ],
          {
            level: 'warn',
          }
        );
      }
    }
  } catch (error) {
    const message = extractErrorMessage(error);

    appLogger(message, {
      level: 'error',
    });
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
  const isOllama =
    configuration.ai?.provider === 'ollama' || aiOptions?.provider === 'ollama';
  const hasHisOwnAIAPIKey = Boolean(
    configuration.ai?.apiKey || aiOptions?.apiKey
  );

  if (hasHisOwnAIAPIKey || isOllama) {
    return true;
  }

  // User need to provide either his own AI API key or the CMS auth
  if (!hasCMSAuth) {
    appLogger(
      [
        'AI options or API key not provided. You can either retreive the CMS access key on',
        colorize('https://intlayer.org/dahboard', ANSIColors.GREY),
        colorize('(see doc:', ANSIColors.GREY_DARK),
        colorize('https://intlayer.org/doc/concept/cms', ANSIColors.GREY),
        colorize(')', ANSIColors.GREY_DARK),
        '. Alternatively, you can add your own OpenAI API key in the settings',
        colorize('(see doc:', ANSIColors.GREY_DARK),
        colorize(
          'https://intlayer.org/doc/concept/configuration',
          ANSIColors.GREY
        ),
        colorize(')', ANSIColors.GREY_DARK),
        '.',
      ],
      {
        level: 'error',
      }
    );

    return false;
  }

  // If the user do not have his own AI API key, we need to check the CMS auth
  return await checkCMSAuth(configuration, shouldCheckConfigConsistency);
};
