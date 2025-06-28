import { logger, retryManager } from '@intlayer/config';
import { OpenAI } from 'openai';

const OPEN_AI_MODEL: OpenAI.Chat.ChatModel = 'chatgpt-4o-latest';
const OPEN_AI_TEMPERATURE: number = 0.2;

const ERROR_MAX_RETRY_COUNT: number = 3;
const ERROR_WAIT_TIME: number = 30 * 1000; // 30 seconds

/**
 * Translates a single chunk via the OpenAI API.
 * Includes retry logic if the call fails.
 */
export const chunkInference = async (
  openai: any,
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
): Promise<string> => {
  let lastResult: string = '';

  await retryManager(async () => {
    const chatCompletion = await openai.chat.completions.create({
      model: OPEN_AI_MODEL,
      temperature: OPEN_AI_TEMPERATURE,
      messages,
    });

    // If the request succeeded but no content is returned, throw an error
    if (!chatCompletion.choices[0].message?.content) {
      throw new Error('Empty content returned from ChatGPT.');
    }

    logger(
      `    -> ${chatCompletion?.usage?.total_tokens} tokens used in the request`
    );

    // Remove code fence if present
    let newContent = chatCompletion.choices[0].message.content;

    newContent = newContent
      .replaceAll('///chunksStart///', '')
      .replaceAll('///chunkStart///', '')
      .replaceAll('///chunksEnd///', '')
      .replaceAll('///chunkEnd///', '');

    lastResult = newContent;
  })();

  return lastResult;
};
