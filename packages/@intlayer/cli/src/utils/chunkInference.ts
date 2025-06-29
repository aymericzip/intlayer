import { AIOptions, getAiAPI, Messages } from '@intlayer/api';
import {
  getAppLogger,
  getConfiguration,
  GetConfigurationOptions,
  retryManager,
} from '@intlayer/config';

/**
 * Translates a single chunk via the OpenAI API.
 * Includes retry logic if the call fails.
 */
export const chunkInference = async (
  messages: Messages,
  aiOptions?: AIOptions,
  configOptions?: GetConfigurationOptions,
  oAuth2AccessToken?: string
): Promise<string> => {
  let lastResult: string = '';

  const configuration = getConfiguration(configOptions);
  const appLogger = getAppLogger(configuration);

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

    appLogger(` -> ${tokenUsed} tokens used in the request`);

    const newContent = fileContent
      .replaceAll('///chunksStart///', '')
      .replaceAll('///chunkStart///', '')
      .replaceAll('///chunksEnd///', '')
      .replaceAll('///chunkEnd///', '');

    lastResult = newContent;
  })();

  return lastResult;
};
