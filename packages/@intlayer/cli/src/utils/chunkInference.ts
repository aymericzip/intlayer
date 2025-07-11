import { type AIOptions, type Messages, getAiAPI } from '@intlayer/api';
import { retryManager } from '@intlayer/config';

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
  oAuth2AccessToken?: string
): Promise<ChunkInferenceResult> => {
  let lastResult: ChunkInferenceResult;

  await retryManager(async () => {
    const response = await getAiAPI().customQuery(
      {
        aiOptions,
        messages,
      },
      {
        ...(oAuth2AccessToken && {
          headers: {
            Authorization: `Bearer ${oAuth2AccessToken}`,
          },
        }),
      }
    );

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
