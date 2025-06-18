import { anthropic } from '@ai-sdk/anthropic';
import { deepseek } from '@ai-sdk/deepseek';
import { google } from '@ai-sdk/google';
import { mistral } from '@ai-sdk/mistral';
import { openai } from '@ai-sdk/openai';
import { logger } from '@logger';

type AnthropicModel = Parameters<typeof anthropic>[0];
type DeepSeekModel = Parameters<typeof deepseek>[0];
type MistralModel = Parameters<typeof mistral>[0];
type OpenAIModel = Parameters<typeof openai>[0];
type GoogleModel = Parameters<typeof google>[0];

/**
 * Supported AI models
 */
export type Model =
  | AnthropicModel
  | DeepSeekModel
  | MistralModel
  | OpenAIModel
  | GoogleModel
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
