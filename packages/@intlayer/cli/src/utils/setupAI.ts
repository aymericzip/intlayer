import type { AIConfig, AIOptions } from '@intlayer/ai';
import { ANSIColors, colorize, getAppLogger } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';
import { checkAIAccess } from './checkAccess';

export type AIClient = typeof import('@intlayer/ai');

type SetupAIResult = {
  aiClient?: AIClient;
  aiConfig?: AIConfig;
  isCustomAI: boolean;
  hasAIAccess: boolean;
};

// Disable warnings from the AI SDK
globalThis.AI_SDK_LOG_WARNINGS = false;

/**
 * Checks if the @intlayer/ai package is available and configured when an API key is provided.
 * If API key is present but package is missing, logs a warning.
 * Also checks if the user has access to AI (either via local key or CMS auth).
 */
export const setupAI = async (
  configuration: IntlayerConfig,
  aiOptions?: AIOptions
): Promise<SetupAIResult | undefined> => {
  const appLogger = getAppLogger(configuration);

  const hasAIAccess = await checkAIAccess(configuration, aiOptions);

  if (aiOptions?.apiKey) {
    try {
      // Dynamically import the AI package if an API key is provided
      const aiClient = await import('@intlayer/ai');

      const aiConfig = await aiClient.getAIConfig({
        userOptions: aiOptions,
        accessType: ['public'],
      });

      return {
        aiClient,
        aiConfig,
        isCustomAI: true,
        hasAIAccess,
      };
    } catch {
      appLogger(
        [
          colorize('Using your API key, you can install the', ANSIColors.GREY),
          colorize('@intlayer/ai', ANSIColors.GREY_LIGHT),
          colorize(
            'package to run the process locally, with no dependency on the Intlayer server',
            ANSIColors.GREY
          ),
        ],
        {
          level: 'warn',
        }
      );
    }
  }

  return {
    isCustomAI: false,
    hasAIAccess,
  };
};
