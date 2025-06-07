import { anthropic } from '@ai-sdk/anthropic';
import { deepseek } from '@ai-sdk/deepseek';
import { google } from '@ai-sdk/google';
import { mistral } from '@ai-sdk/mistral';
import { openai } from '@ai-sdk/openai';
import { logger } from '@logger';

/**
 * Supported AI models
 */
export type Model =
  // OpenAI Models
  | 'gpt-4-0613'
  | 'gpt-4'
  | 'gpt-3.5-turbo'
  | 'gpt-4o-audio-preview-2025-06-03'
  | 'gpt-4.1-nano'
  | 'gpt-image-1'
  | 'codex-mini-latest'
  | 'gpt-4o-realtime-preview-2025-06-03'
  | 'davinci-002'
  | 'babbage-002'
  | 'gpt-3.5-turbo-instruct'
  | 'gpt-3.5-turbo-instruct-0914'
  | 'dall-e-3'
  | 'dall-e-2'
  | 'gpt-4-1106-preview'
  | 'gpt-3.5-turbo-1106'
  | 'tts-1-hd'
  | 'tts-1-1106'
  | 'tts-1-hd-1106'
  | 'text-embedding-3-small'
  | 'text-embedding-3-large'
  | 'gpt-4-0125-preview'
  | 'gpt-4-turbo-preview'
  | 'gpt-3.5-turbo-0125'
  | 'gpt-4-turbo'
  | 'gpt-4-turbo-2024-04-09'
  | 'gpt-4o'
  | 'gpt-4o-2024-05-13'
  | 'gpt-4o-mini-2024-07-18'
  | 'gpt-4o-mini'
  | 'gpt-4o-2024-08-06'
  | 'chatgpt-4o-latest'
  | 'o1-preview-2024-09-12'
  | 'o1-preview'
  | 'o1-mini-2024-09-12'
  | 'o1-mini'
  | 'gpt-4o-realtime-preview-2024-10-01'
  | 'gpt-4o-audio-preview-2024-10-01'
  | 'gpt-4o-audio-preview'
  | 'gpt-4o-realtime-preview'
  | 'omni-moderation-latest'
  | 'omni-moderation-2024-09-26'
  | 'gpt-4o-realtime-preview-2024-12-17'
  | 'gpt-4o-audio-preview-2024-12-17'
  | 'gpt-4o-mini-realtime-preview-2024-12-17'
  | 'gpt-4o-mini-audio-preview-2024-12-17'
  | 'o1-2024-12-17'
  | 'o1'
  | 'gpt-4o-mini-realtime-preview'
  | 'gpt-4o-mini-audio-preview'
  | 'o3-mini'
  | 'o3-mini-2025-01-31'
  | 'gpt-4o-2024-11-20'
  | 'gpt-4.5-preview'
  | 'gpt-4.5-preview-2025-02-27'
  | 'gpt-4o-search-preview-2025-03-11'
  | 'gpt-4o-search-preview'
  | 'gpt-4o-mini-search-preview-2025-03-11'
  | 'gpt-4o-mini-search-preview'
  | 'gpt-4o-transcribe'
  | 'gpt-4o-mini-transcribe'
  | 'o1-pro-2025-03-19'
  | 'o1-pro'
  | 'gpt-4o-mini-tts'
  | 'o4-mini-2025-04-16'
  | 'o4-mini'
  | 'gpt-4.1-2025-04-14'
  | 'gpt-4.1'
  | 'gpt-4.1-mini-2025-04-14'
  | 'gpt-4.1-mini'
  | 'gpt-4.1-nano-2025-04-14'
  | 'gpt-3.5-turbo-16k'
  | 'tts-1'
  | 'whisper-1'
  | 'text-embedding-ada-002'
  // Anthropic Models
  | 'claude-3-haiku-20240307'
  | 'claude-3-sonnet-20240229'
  | 'claude-3-opus-20240229'
  // Mistral Models
  | 'mistral-tiny'
  | 'mistral-small'
  | 'mistral-small-3.1'
  | 'mistral-medium'
  | 'mistral-medium-3'
  | 'mistral-large'
  | 'mistral-large-2'
  | 'mistral-large-latest'
  | 'codestral'
  | 'codestral-mamba'
  | 'mixtral-8x7b'
  | 'mixtral-8x22b'
  | 'mathstral-7b'
  | 'pixtral-large'
  // DeepSeek Models
  | 'deepseek-coder'
  | 'deepseek-chat'
  | 'deepseek-v3'
  // Google Models
  | 'gemini-1.0-pro'
  | 'gemini-1.5-pro'
  | 'gemini-1.5-flash'
  | (string & {});

/**
 * Supported AI SDK providers
 */
export enum AIProvider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  MISTRAL = 'mistral',
  DEEPSEEK = 'deepseek',
  GEMINI = 'gemini',
}

/**
 * Common options for all AI providers
 */
export type AIOptions = {
  provider?: AIProvider;
  model?: Model;
  temperature?: number;
  apiKey?: string;
  customPrompt?: string;
  applicationContext?: string;
};

/**
 * Configuration for AI model based on provider
 */
export type AIModelConfig = {
  model: any; // Using any to handle different provider model types
  temperature?: number;
};

// Define the structure of messages used in chat completions
export type ChatCompletionRequestMessage = {
  role: 'system' | 'user' | 'assistant'; // The role of the message sender
  content: string; // The text content of the message
  timestamp?: Date; // The timestamp of the message
};

/**
 * Get AI model configuration based on the selected provider and options
 * This function handles the configuration for different AI providers
 *
 * @param options Configuration options including provider, API keys, models and temperature
 * @returns Configured AI model ready to use with generateText
 */
export const getAIConfig = async (
  options?: AIOptions
): Promise<AIModelConfig | undefined> => {
  try {
    const {
      provider = AIProvider.OPENAI,
      model,
      temperature = 0.1,
    } = options ?? {};

    // Set default models based on provider
    let defaultModel: string;
    switch (provider) {
      case AIProvider.OPENAI:
        defaultModel = 'chatgpt-4o-latest';
        break;
      case AIProvider.ANTHROPIC:
        defaultModel = 'claude-3-haiku-20240307';
        break;
      case AIProvider.MISTRAL:
        defaultModel = 'mistral-large-latest';
        break;
      case AIProvider.DEEPSEEK:
        defaultModel = 'deepseek-coder';
        break;
      case AIProvider.GEMINI:
        defaultModel = 'gemini-1.5-pro';
        break;
      default:
        defaultModel = 'chatgpt-4o-latest';
    }

    // Check if API key is provided
    if (!options?.apiKey) {
      logger.error(`API key for ${provider} is missing`);
      return undefined;
    }

    // Handle each provider with appropriate model loading
    if (provider === AIProvider.OPENAI) {
      // OpenAI is imported statically at the top
      return {
        model: openai(model ?? defaultModel),
        temperature,
      };
    } else {
      // For other providers, attempt to load using require
      try {
        switch (provider) {
          case AIProvider.ANTHROPIC:
            try {
              return {
                model: anthropic(model ?? defaultModel),
                temperature,
              };
            } catch (err) {
              throw new Error(
                'Failed to load @ai-sdk/anthropic. Please install it with: npm install @ai-sdk/anthropic'
              );
            }

          case AIProvider.MISTRAL:
            try {
              return {
                model: mistral(model ?? defaultModel),
                temperature,
              };
            } catch (err) {
              throw new Error(
                'Failed to load @ai-sdk/mistral. Please install it with: npm install @ai-sdk/mistral'
              );
            }

          case AIProvider.DEEPSEEK:
            try {
              return {
                model: deepseek(model ?? defaultModel),
                temperature,
              };
            } catch (err) {
              throw new Error(
                'Failed to load @ai-sdk/deepseek. Please install it with: npm install @ai-sdk/deepseek'
              );
            }

          case AIProvider.GEMINI:
            try {
              return {
                model: google(model ?? defaultModel),
                temperature,
              };
            } catch (err) {
              throw new Error(
                'Failed to load @ai-sdk/google. Please install it with: npm install @ai-sdk/google'
              );
            }

          default:
            throw new Error(`Provider ${provider} not supported`);
        }
      } catch (error) {
        logger.error(`Error loading SDK for provider ${provider}:`, error);
        return undefined;
      }
    }
  } catch (error) {
    logger.error('Error configuring AI model:', error);
    return undefined;
  }
};
