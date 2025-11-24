import type { AIConfig, AIOptions } from '@intlayer/ai';
import { getIntlayerAPIProxy, type Messages } from '@intlayer/api';
import { retryManager } from '@intlayer/config';
import type { IntlayerConfig } from '@intlayer/types';
import type { AIClient } from './setupAI';

type ChunkInferenceResult = {
  fileContent: string;
  tokenUsed: number;
};

/**
 * Translates a single chunk via the OpenAI API.
 * Includes retry logic if the call fails.
 */
export const chunkInference = async (
  messages: Messages,
  aiOptions?: AIOptions,
  configuration?: IntlayerConfig,
  aiClient?: AIClient,
  aiConfig?: AIConfig
): Promise<ChunkInferenceResult> => {
  let lastResult: ChunkInferenceResult;

  await retryManager(async () => {
    if (aiClient && aiConfig) {
      const response = await aiClient.customQuery({
        aiConfig,
        messages,
      });

      if (!response) {
        throw new Error('No response from AI API');
      }

      const { fileContent, tokenUsed } = response;

      lastResult = {
        fileContent: processContent(fileContent),
        tokenUsed,
      };

      return;
    }

    const api = getIntlayerAPIProxy(undefined, configuration);

    const response = await api.ai.customQuery({
      aiOptions,
      messages,
    });

    if (!response.data) {
      throw new Error('No response from AI API');
    }

    const { fileContent, tokenUsed } = response.data;

    lastResult = {
      fileContent: processContent(fileContent),
      tokenUsed,
    };
  })();

  return lastResult!;
};

const processContent = (content: string) => {
  return content
    .replaceAll('///chunksStart///', '')
    .replaceAll('///chunkStart///', '')
    .replaceAll('///chunksEnd///', '')
    .replaceAll('///chunkEnd///', '')
    .replaceAll('///chunksStart///', '')
    .replaceAll('chunkStart///', '')
    .replaceAll('chunksEnd///', '')
    .replaceAll('chunkEnd///', '')
    .replaceAll('///chunksStart', '')
    .replaceAll('///chunkStart', '')
    .replaceAll('///chunksEnd', '')
    .replaceAll('///chunkEnd', '')
    .replaceAll('chunksStart', '')
    .replaceAll('chunkStart', '')
    .replaceAll('chunksEnd', '')
    .replaceAll('chunkEnd', '');
};
