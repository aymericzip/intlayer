import type { AIConfig, AIOptions } from '@intlayer/ai';
import {
  ANSIColors,
  colorize,
  getAppLogger,
  type logger,
} from '@intlayer/config';
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

const logAIConfig = (aiOptions: AIOptions, appLogger: typeof logger) => {
  appLogger([
    colorize('Provider:', ANSIColors.GREY_DARK),
    colorize(aiOptions?.provider ?? '(default)', ANSIColors.BLUE),
    colorize('- Model:', ANSIColors.GREY_DARK),
    colorize(aiOptions?.model ?? '(default)', ANSIColors.BLUE),
    colorize('- API Key:', ANSIColors.GREY_DARK),
    colorize(aiOptions?.apiKey ? '✓' : '(not set)', ANSIColors.BLUE),
  ]);
};

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

      appLogger([
        colorize('@intlayer/ai', ANSIColors.GREY_LIGHT),
        colorize('found - Run process locally', ANSIColors.GREY_DARK),
      ]);

      const aiConfig = await aiClient.getAIConfig({
        userOptions: aiOptions,
        accessType: ['public'],
      });

      logAIConfig(aiOptions, appLogger);

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

  logAIConfig(aiOptions ?? {}, appLogger);

  return {
    isCustomAI: false,
    hasAIAccess,
  };
};
