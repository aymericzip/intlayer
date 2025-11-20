import { type anthropic, createAnthropic } from '@ai-sdk/anthropic';
import { createDeepSeek, type deepseek } from '@ai-sdk/deepseek';
import { createGoogleGenerativeAI, type google } from '@ai-sdk/google';
import { createMistral, type mistral } from '@ai-sdk/mistral';
import { createOpenAI, type openai } from '@ai-sdk/openai';
import type {
  AssistantModelMessage,
  generateText,
  SystemModelMessage,
  ToolModelMessage,
  UserModelMessage,
} from 'ai';
import type { Response } from 'express';

type AnthropicModel = Parameters<typeof anthropic>[0];
type DeepSeekModel = Parameters<typeof deepseek>[0];
type MistralModel = Parameters<typeof mistral>[0];
type OpenAIModel = Parameters<typeof openai>[0];
type GoogleModel = Parameters<typeof google>[0];

export type Messages = (
  | SystemModelMessage
  | UserModelMessage
  | AssistantModelMessage
  | ToolModelMessage
)[];

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
  applicationContext?: string;
};

// Define the structure of messages used in chat completions
export type ChatCompletionRequestMessage = {
  role: 'system' | 'user' | 'assistant'; // The role of the message sender
  content: string; // The text content of the message
  timestamp?: Date; // The timestamp of the message
};

type AccessType = 'apiKey' | 'registered_user' | 'premium_user' | 'public';

const getAPIKey = (
  res: Response,
  accessType: AccessType[],
  aiOptions?: AIOptions
) => {
  const defaultApiKey = process.env.OPENAI_API_KEY;

  if (accessType.includes('public')) {
    return aiOptions?.apiKey ?? defaultApiKey;
  }

  if (accessType.includes('apiKey') && aiOptions?.apiKey) {
    return aiOptions?.apiKey;
  }

  if (accessType.includes('registered_user') && res.locals.user) {
    return aiOptions?.apiKey ?? defaultApiKey;
  }

  // TODO: Implement premium user access
  if (accessType.includes('premium_user') && res.locals.user) {
    return aiOptions?.apiKey ?? defaultApiKey;
  }

  return undefined;
};

const getModel = (
  provider: AIProvider,
  userApiKey: string,
  userModel?: Model,
  defaultModel?: Model
): Model => {
  // Set default models based on provider
  const fallBackModel: Model = defaultModel ?? 'chatgpt-4o-latest';

  switch (provider) {
    case AIProvider.OPENAI:
      defaultModel = 'gpt-5-mini';
      break;
    case AIProvider.ANTHROPIC:
      defaultModel = 'claude-sonnet-4-5-20250929';
      break;
    case AIProvider.MISTRAL:
      defaultModel = 'mistral-large-latest';
      break;
    case AIProvider.DEEPSEEK:
      defaultModel = 'deepseek-coder';
      break;
    case AIProvider.GEMINI:
      defaultModel = 'gemini-2.5-flash';
      break;
  }

  // If the user use his own API, let him use the model he wants
  if (Boolean(userApiKey) && Boolean(userModel)) {
    return userModel!;
  }

  if (userModel) {
    throw new Error(
      'The user should use his own API key to use a custom model'
    );
  }

  return fallBackModel;
};

export type AIConfig = Omit<Parameters<typeof generateText>[0], 'prompt'>;

const DEFAULT_PROVIDER: AIProvider = AIProvider.OPENAI as AIProvider;
const DEFAULT_TEMPERATURE: number = 1; // ChatGPT 5 accept only temperature 1

export type AIConfigOptions = {
  userOptions?: AIOptions;
  defaultOptions?: AIOptions;
  accessType?: AccessType[];
};

/**
 * Get AI model configuration based on the selected provider and options
 * This function handles the configuration for different AI providers
 *
 * @param options Configuration options including provider, API keys, models and temperature
 * @returns Configured AI model ready to use with generateText
 */
export const getAIConfig = async (
  res: Response,
  options: AIConfigOptions
): Promise<AIConfig> => {
  const {
    userOptions,
    defaultOptions,
    accessType = ['registered_user'],
  } = options;

  const aiOptions = {
    provider: DEFAULT_PROVIDER,
    temperature: DEFAULT_TEMPERATURE,
    ...defaultOptions,
    ...userOptions,
  } satisfies AIOptions;

  const apiKey = getAPIKey(res, accessType, aiOptions);

  // Check if API key is provided
  if (!apiKey) {
    throw new Error(`API key for ${aiOptions.provider} is missing`);
  }

  const selectedModel = getModel(
    aiOptions.provider,
    apiKey,
    aiOptions.model,
    defaultOptions?.model
  );

  const protectedOptions = {
    ...aiOptions,
    apiKey,
    model: selectedModel,
  } satisfies AIOptions;

  let languageModel: AIConfig['model'];

  switch (protectedOptions.provider) {
    case AIProvider.OPENAI: {
      languageModel = createOpenAI({
        apiKey,
      })(selectedModel);
      break;
    }

    case AIProvider.ANTHROPIC: {
      languageModel = createAnthropic({
        apiKey,
      })(selectedModel);
      break;
    }

    case AIProvider.MISTRAL: {
      languageModel = createMistral({
        apiKey,
      })(selectedModel);
      break;
    }

    case AIProvider.DEEPSEEK: {
      languageModel = createDeepSeek({
        apiKey,
      })(selectedModel);
      break;
    }

    case AIProvider.GEMINI: {
      languageModel = createGoogleGenerativeAI({
        apiKey,
      })(selectedModel);
      break;
    }

    default: {
      throw new Error(`Provider ${protectedOptions.provider} not supported`);
    }
  }

  return {
    model: languageModel,
    temperature: protectedOptions.temperature,
  };
};
