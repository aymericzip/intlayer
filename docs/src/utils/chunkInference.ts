import { logger } from '@intlayer/config';
import { OpenAI } from 'openai';

const OPEN_AI_MODEL: OpenAI.Chat.ChatModel = 'chatgpt-4o-latest';
const OPEN_AI_TEMPERATURE: number = 0.2;

const ERROR_MAX_RETRY_COUNT: number = 3;
const ERROR_WAIT_TIME: number = 30 * 1000; // 30 seconds

// const MAX_TOKENS: number = 8192;

/**
 * Translates a single chunk via the OpenAI API.
 * Includes retry logic if the call fails.
 */
export const chunkInference = async (
  openai: any,
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
): Promise<string> => {
  let retryCount = 0;
  let lastError: unknown;

  while (retryCount < ERROR_MAX_RETRY_COUNT) {
    try {
      const chatCompletion = await openai.chat.completions.create({
        model: OPEN_AI_MODEL,
        temperature: OPEN_AI_TEMPERATURE,
        messages,
        // max_tokens: MAX_TOKENS,
      });

      // If the request succeeded but no content is returned, throw an error
      if (!chatCompletion.choices[0].message?.content) {
        throw new Error('Empty content returned from ChatGPT.');
      }

      // Remove code fence if present
      let newContent = chatCompletion.choices[0].message.content;

      newContent = newContent
        .replaceAll('---chunkStart---', '')
        .replaceAll('---chunkEnd---', '');

      if (newContent.endsWith('\n')) {
        newContent = newContent.slice(0, -1);
      }

      logger(
        `    -> ${chatCompletion?.usage?.total_tokens} tokens used in the request`
      );
      return newContent;
    } catch (error) {
      logger(
        `    -> ChatGPT request failed (attempt ${retryCount + 1}). Retrying in ${
          ERROR_WAIT_TIME / 1000
        } seconds... Error: ${error}`
      );
      lastError = error;
      retryCount++;
      await new Promise((resolve) => setTimeout(resolve, ERROR_WAIT_TIME));
    }
  }

  throw lastError;
};
