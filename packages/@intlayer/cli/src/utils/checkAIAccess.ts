import type { AIOptions } from '@intlayer/api';
import { getAppLogger, type IntlayerConfig } from '@intlayer/config';

export const checkAIAccess = (
  configuration: IntlayerConfig,
  aiOptions?: AIOptions
) => {
  const appLogger = getAppLogger(configuration);

  if (
    !configuration.editor.clientId &&
    !configuration.editor.clientSecret &&
    !configuration.ai?.apiKey &&
    !aiOptions?.apiKey
  ) {
    appLogger('AI options or API key not provided. Skipping AI translation.', {
      level: 'error',
    });
    // Potentially handle this case differently, e.g., by using a different translation method or stopping.

    throw new Error(
      'AI options or API key not provided. Skipping AI translation.'
    );
  }
};
