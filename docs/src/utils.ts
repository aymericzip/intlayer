import { logger } from '@intlayer/config';
import { statSync } from 'fs';
import { OpenAI } from 'openai';

/**
 * Split a large string into smaller chunks of a specified maximum length.
 * Each chunk boundary tries not to break lines in the middle.
 *
 * @param text The full text to chunk
 * @param chunkSize The size limit for each chunk in characters
 * @returns An array of chunked strings
 */
export const chunkStringByCharacters = (
  text: string,
  chunkSize: number
): string[] => {
  const chunks: string[] = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    // End index as chunkSize from start
    let endIndex = Math.min(startIndex + chunkSize, text.length);

    // Attempt not to break lines in the middle (optional).
    // If endIndex is not at the end, we try to find a nearby newline.
    if (endIndex < text.length) {
      const nextNewline = text.lastIndexOf('\n', endIndex);
      if (nextNewline > startIndex) {
        endIndex = nextNewline;
      }
    }

    chunks.push(text.slice(startIndex, endIndex).trim());
    startIndex = endIndex;
  }

  return chunks;
};

const OPEN_AI_MODEL: OpenAI.Chat.ChatModel = 'chatgpt-4o-latest';
const OPEN_AI_TEMPERATURE: number = 0.2;

const ERROR_MAX_RETRY_COUNT: number = 3;
const ERROR_WAIT_TIME: number = 30 * 1000; // 30 seconds

const MAX_TOKENS: number = 8192;

/**
 * Translates a single chunk via the OpenAI API.
 * Includes retry logic if the call fails.
 */
export const chunkInference = async (
  openai: OpenAI,
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
        max_tokens: MAX_TOKENS,
      });

      // If the request succeeded but no content is returned, throw an error
      if (!chatCompletion.choices[0].message?.content) {
        throw new Error('Empty content returned from ChatGPT.');
      }

      // Remove code fence if present
      let newContent = chatCompletion.choices[0].message.content;
      if (newContent.startsWith('```')) {
        const codeBlock = newContent.split('\n').slice(1, -1).join('\n');
        newContent = codeBlock;
      }
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

/**
 * Simple structure check comparing the number of '#' characters
 */
export const getIsSimilarStructure = (
  baseFileContent: string,
  translatedFileContent: string
): boolean => {
  const translatedFileHashtagCount = (translatedFileContent.match(/#/g) || [])
    .length;
  const baseFileHashtagCount = (baseFileContent.match(/#/g) || []).length;

  logger(`   -> Number of '#' in base file: ${baseFileHashtagCount}`);
  logger(
    `   -> Number of '#' in translated file: ${translatedFileHashtagCount}`
  );

  return translatedFileHashtagCount === baseFileHashtagCount;
};

const SKIP_RANGE_OF_LAST_UPDATE_TIME: number = 0; //2 * 60 * 60 * 1000; // 2 hours

/**
 * Check if file was updated recently, to skip re-translation
 */
export const getIsFileUpdatedRecently = (localeFilePath: string): boolean => {
  const stats = statSync(localeFilePath);
  const lastModified = new Date(stats.mtime);
  const threshold = new Date(Date.now() - SKIP_RANGE_OF_LAST_UPDATE_TIME);

  return lastModified > threshold;
};
