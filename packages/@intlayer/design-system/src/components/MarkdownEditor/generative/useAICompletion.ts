'use client';

import { useCustomQuery } from '@api/index';
import { useCallback, useState } from 'react';

/**
 * The kind of transformation the AI should apply to the provided text.
 * Mirrors the options exposed by the Novel generative menu.
 */
export type AICompletionOption =
  | 'continue'
  | 'improve'
  | 'shorter'
  | 'longer'
  | 'fix'
  | 'zap';

export type CompleteOptions = {
  body: {
    option: AICompletionOption;
    /** Free-form instruction, only used by the `zap` option. */
    command?: string;
  };
};

type PromptParts = {
  system: string;
  userContent: string;
};

/**
 * Builds the system prompt + user message for a given AI option. The prompts
 * intentionally match the Novel reference implementation so behaviour is
 * consistent.
 */
const buildPromptParts = (
  option: AICompletionOption,
  prompt: string,
  command?: string
): PromptParts => {
  switch (option) {
    case 'continue':
      return {
        system:
          'You are an AI writing assistant that continues existing text based on context from prior text. ' +
          'Give more weight/priority to the later characters than the beginning ones. ' +
          'Limit your response to no more than 200 characters, but make sure to construct complete sentences. ' +
          'Use Markdown formatting when appropriate.',
        userContent: prompt,
      };
    case 'improve':
      return {
        system:
          'You are an AI writing assistant that improves existing text. ' +
          'Limit your response to no more than 200 characters, but make sure to construct complete sentences. ' +
          'Use Markdown formatting when appropriate.',
        userContent: `The existing text is: ${prompt}`,
      };
    case 'shorter':
      return {
        system:
          'You are an AI writing assistant that shortens existing text. ' +
          'Use Markdown formatting when appropriate.',
        userContent: `The existing text is: ${prompt}`,
      };
    case 'longer':
      return {
        system:
          'You are an AI writing assistant that lengthens existing text. ' +
          'Use Markdown formatting when appropriate.',
        userContent: `The existing text is: ${prompt}`,
      };
    case 'fix':
      return {
        system:
          'You are an AI writing assistant that fixes grammar and spelling errors in existing text. ' +
          'Limit your response to no more than 200 characters, but make sure to construct complete sentences. ' +
          'Use Markdown formatting when appropriate.',
        userContent: `The existing text is: ${prompt}`,
      };
    case 'zap':
      return {
        system:
          'You are an AI writing assistant that generates text based on a prompt. ' +
          'You take an input from the user and a command for manipulating the text. ' +
          'Use Markdown formatting when appropriate.',
        userContent: `For this text: ${prompt}. You have to respect the command: ${command ?? ''}`,
      };
    default:
      return { system: '', userContent: prompt };
  }
};

/**
 * Adapter around {@link useCustomQuery} that exposes a Novel-compatible
 * `useCompletion`-style API (`completion` / `complete` / `isLoading`).
 *
 * It routes generative requests through the Intlayer AI backend
 * (`@intlayer/api` → `@intlayer/ai`) instead of the Vercel AI SDK.
 *
 * @param onError - Optional error callback (e.g. to display a toast).
 */
export const useAICompletion = (onError?: (error: Error) => void) => {
  const { mutateAsync, isPending } = useCustomQuery();
  const [completion, setCompletion] = useState('');

  const complete = useCallback(
    async (prompt: string, options: CompleteOptions): Promise<string> => {
      const { option, command } = options.body;
      const { system, userContent } = buildPromptParts(option, prompt, command);

      try {
        const result = await mutateAsync({
          system,
          messages: [{ role: 'user', content: userContent }],
        });

        const text = result?.data?.fileContent ?? '';
        setCompletion(text);
        return text;
      } catch (error) {
        onError?.(
          error instanceof Error ? error : new Error('AI request failed')
        );
        return '';
      }
    },
    [mutateAsync, onError]
  );

  const reset = useCallback(() => setCompletion(''), []);

  return { completion, complete, isLoading: isPending, reset };
};
