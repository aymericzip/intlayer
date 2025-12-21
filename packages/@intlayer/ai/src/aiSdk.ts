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
  OLLAMA = 'ollama',
}

export type ReasoningEffort = 'minimal' | 'low' | 'medium' | 'high' | 'none';

/**
 * Common options for all AI providers
 */
export type AIOptions = {
  provider?: AIProvider;
  model?: Model;
  temperature?: number;
  baseURL?: string;
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
  accessType: AccessType[],
  aiOptions?: AIOptions,
  isAuthenticated: boolean = false
) => {
  const defaultApiKey = process.env.OPENAI_API_KEY;

  if (accessType.includes('public')) {
    return aiOptions?.apiKey ?? defaultApiKey;
  }

  if (accessType.includes('apiKey') && aiOptions?.apiKey) {
    return aiOptions?.apiKey;
  }

  if (accessType.includes('registered_user') && isAuthenticated) {
    return aiOptions?.apiKey ?? defaultApiKey;
  }

  // TODO: Implement premium user access
  if (accessType.includes('premium_user') && isAuthenticated) {
    return aiOptions?.apiKey ?? defaultApiKey;
  }

  return undefined;
};

const getModelName = (
  provider: AIProvider,
  userApiKey: string,
  userModel?: Model,
  defaultModel: Model = 'gpt-5-mini'
): Model => {
  // If the user uses their own API key, allow custom model selection
  if (userApiKey || provider === AIProvider.OLLAMA) {
    if (provider === AIProvider.OPENAI) {
      return userModel ?? defaultModel;
    }

    if (userModel) {
      return userModel;
    }

    switch (provider) {
      case AIProvider.ANTHROPIC:
        return 'claude-sonnet-4-5-20250929';
      case AIProvider.MISTRAL:
        return 'mistral-large-latest';
      case AIProvider.DEEPSEEK:
        return 'deepseek-coder';
      case AIProvider.GEMINI:
        return 'gemini-2.5-flash';
      case AIProvider.OLLAMA:
        return '';
      default:
        return defaultModel;
    }
  }

  // Guard: Prevent custom model usage without a user API key
  if (userModel || provider) {
    throw new Error(
      'The user should use his own API key to use a custom model'
    );
  }

  return defaultModel;
};

const getLanguageModel = (
  aiOptions: AIOptions,
  apiKey: string,
  defaultModel?: Model
) => {
  const selectedModel = getModelName(
    aiOptions.provider as AIProvider,
    apiKey,
    aiOptions.model,
    defaultModel
  );

  const baseURL = aiOptions.baseURL;

  switch (aiOptions.provider) {
    case AIProvider.OPENAI: {
      return createOpenAI({
        apiKey,
        baseURL,
      })(selectedModel);
    }

    case AIProvider.ANTHROPIC: {
      return createAnthropic({
        apiKey,
        baseURL,
      })(selectedModel);
    }

    case AIProvider.MISTRAL: {
      return createMistral({
        apiKey,
        baseURL,
      })(selectedModel);
    }

    case AIProvider.DEEPSEEK: {
      return createDeepSeek({
        apiKey,
        baseURL,
      })(selectedModel);
    }

    case AIProvider.GEMINI: {
      return createGoogleGenerativeAI({
        apiKey,
        baseURL,
      })(selectedModel);
    }

    case AIProvider.OLLAMA: {
      // Ollama compatible mode:
      const ollama = createOpenAI({
        baseURL: baseURL ?? 'http://localhost:11434/v1',
        apiKey: 'ollama', // Required but unused by Ollama
      });

      return ollama.chat(selectedModel);
    }

    default: {
      throw new Error(`Provider ${aiOptions.provider} not supported`);
    }
  }
};

export type AIConfig = Omit<Parameters<typeof generateText>[0], 'prompt'> & {
  reasoningEffort?: ReasoningEffort;
  textVerbosity?: 'low' | 'medium' | 'high';
};

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
  options: AIConfigOptions,
  isAuthenticated: boolean = false
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

  const apiKey = getAPIKey(accessType, aiOptions, isAuthenticated);

  // Check if API key is provided
  if (!apiKey) {
    throw new Error(`API key for ${aiOptions.provider} is missing`);
  }

  const languageModel = getLanguageModel(
    aiOptions,
    apiKey,
    defaultOptions?.model
  );

  return {
    model: languageModel,
    temperature: aiOptions.temperature,
  };
};
