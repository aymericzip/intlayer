import {
  type AIOptions,
  getIntlayerAPIProxy,
  type Messages,
} from '@intlayer/api';
import {
  getConfiguration,
  type GetConfigurationOptions,
  retryManager,
} from '@intlayer/config';

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
  configOptions?: GetConfigurationOptions
): Promise<ChunkInferenceResult> => {
  let lastResult: ChunkInferenceResult;

  await retryManager(async () => {
    const configuration = getConfiguration(configOptions);
    const api = getIntlayerAPIProxy(undefined, configuration);
    const response = await api.ai.customQuery({
      aiOptions,
      messages,
    });

    if (!response.data) {
      throw new Error('No response from AI API');
    }

    const { fileContent, tokenUsed } = response.data;

    const newContent = fileContent
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

    lastResult = {
      fileContent: newContent,
      tokenUsed,
    };
  })();

  return lastResult!;
};
