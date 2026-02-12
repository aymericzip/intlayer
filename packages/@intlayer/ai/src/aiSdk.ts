import type { AlibabaProvider, createAlibaba } from '@ai-sdk/alibaba';
import type {
  AmazonBedrockProvider,
  createAmazonBedrock,
} from '@ai-sdk/amazon-bedrock';
import type { AnthropicProvider, createAnthropic } from '@ai-sdk/anthropic';
import type { createDeepSeek, DeepSeekProvider } from '@ai-sdk/deepseek';
import type { createFireworks, FireworksProvider } from '@ai-sdk/fireworks';
import type {
  createGoogleGenerativeAI,
  GoogleGenerativeAIProvider,
} from '@ai-sdk/google';
import type {
  createVertex,
  GoogleVertexProvider as VertexProvider,
} from '@ai-sdk/google-vertex';
import type { createGroq, GroqProvider } from '@ai-sdk/groq';
import type {
  createHuggingFace,
  HuggingFaceProvider,
} from '@ai-sdk/huggingface';
import type { createMistral, MistralProvider } from '@ai-sdk/mistral';
import type { createOpenAI, OpenAIProvider } from '@ai-sdk/openai';
import type { createTogetherAI, TogetherAIProvider } from '@ai-sdk/togetherai';
import { ANSIColors, colorize, logger, x } from '@intlayer/config';
import { AiProviders } from '@intlayer/types';
import type {
  createOpenRouter,
  OpenRouterProvider,
} from '@openrouter/ai-sdk-provider';
import type {
  AssistantModelMessage,
  generateText,
  SystemModelMessage,
  ToolModelMessage,
  UserModelMessage,
} from 'ai';

export { AiProviders as AIProvider };

type AnthropicModel = Parameters<AnthropicProvider>[0];
type DeepSeekModel = Parameters<DeepSeekProvider>[0];
type MistralModel = Parameters<MistralProvider>[0];
type OpenAIModel = Parameters<OpenAIProvider>[0];
type OpenRouterModel = Parameters<OpenRouterProvider>[0];
type GoogleModel = Parameters<GoogleGenerativeAIProvider>[0];
type VertexModel = Parameters<VertexProvider>[0];
type AlibabaModel = Parameters<AlibabaProvider>[0];
type AmazonBedrockModel = Parameters<AmazonBedrockProvider>[0];
type FireworksModel = Parameters<FireworksProvider>[0];
type GroqModel = Parameters<GroqProvider>[0];
type HuggingFaceModel = Parameters<HuggingFaceProvider>[0];
type TogetherAIModel = Parameters<TogetherAIProvider>[0];

export type OpenAIProviderOptions = Parameters<typeof createOpenAI>[0];
export type AnthropicProviderOptions = Parameters<typeof createAnthropic>[0];
export type MistralProviderOptions = Parameters<typeof createMistral>[0];
export type DeepSeekProviderOptions = Parameters<typeof createDeepSeek>[0];
export type GoogleProviderOptions = Parameters<
  typeof createGoogleGenerativeAI
>[0];
export type VertexProviderOptions = Parameters<typeof createVertex>[0];
export type OpenRouterProviderOptions = Parameters<typeof createOpenRouter>[0];
export type AlibabaProviderOptions = Parameters<typeof createAlibaba>[0];
export type FireworksProviderOptions = Parameters<typeof createFireworks>[0];
export type GroqProviderOptions = Parameters<typeof createGroq>[0];
export type HuggingFaceProviderOptions = Parameters<
  typeof createHuggingFace
>[0];
export type AmazonBedrockProviderOptions = Parameters<
  typeof createAmazonBedrock
>[0];
export type TogetherAIProviderOptions = Parameters<typeof createTogetherAI>[0];

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
  | OpenRouterModel
  | GoogleModel
  | VertexModel
  | AlibabaModel
  | AmazonBedrockModel
  | FireworksModel
  | GroqModel
  | HuggingFaceModel
  | TogetherAIModel
  | (string & {});

/**
 * Supported AI SDK providers
 */

export type ReasoningEffort = 'minimal' | 'low' | 'medium' | 'high' | 'none';

/**
 * Common options for all AI providers
 */
type CommonAIOptions = {
  model?: Model;
  temperature?: number;
  baseURL?: string;
  apiKey?: string;
  applicationContext?: string;
  dataSerialization?: 'json' | 'toon';
};

export type AIOptions = (
  | ({
      provider: AiProviders.OPENAI | `${AiProviders.OPENAI}`;
    } & OpenAIProviderOptions)
  | ({
      provider: AiProviders.ANTHROPIC | `${AiProviders.ANTHROPIC}`;
    } & AnthropicProviderOptions)
  | ({
      provider: AiProviders.MISTRAL | `${AiProviders.MISTRAL}`;
    } & MistralProviderOptions)
  | ({
      provider: AiProviders.DEEPSEEK | `${AiProviders.DEEPSEEK}`;
    } & DeepSeekProviderOptions)
  | ({
      provider: AiProviders.GEMINI | `${AiProviders.GEMINI}`;
    } & GoogleProviderOptions)
  | ({
      provider: AiProviders.OLLAMA | `${AiProviders.OLLAMA}`;
    } & OpenAIProviderOptions)
  | ({
      provider: AiProviders.OPENROUTER | `${AiProviders.OPENROUTER}`;
    } & OpenRouterProviderOptions)
  | ({
      provider: AiProviders.ALIBABA | `${AiProviders.ALIBABA}`;
    } & AlibabaProviderOptions)
  | ({
      provider: AiProviders.FIREWORKS | `${AiProviders.FIREWORKS}`;
    } & FireworksProviderOptions)
  | ({
      provider: AiProviders.GROQ | `${AiProviders.GROQ}`;
    } & GroqProviderOptions)
  | ({
      provider: AiProviders.HUGGINGFACE | `${AiProviders.HUGGINGFACE}`;
    } & HuggingFaceProviderOptions)
  | ({
      provider: AiProviders.BEDROCK | `${AiProviders.BEDROCK}`;
    } & AmazonBedrockProviderOptions)
  | ({
      provider: AiProviders.GOOGLEVERTEX | `${AiProviders.GOOGLEVERTEX}`;
    } & VertexProviderOptions)
  | ({
      provider: AiProviders.TOGETHERAI | `${AiProviders.TOGETHERAI}`;
    } & TogetherAIProviderOptions)
  | ({ provider?: undefined } & OpenAIProviderOptions)
) &
  CommonAIOptions;

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
  provider: AiProviders,
  userApiKey: string | undefined,
  userModel?: Model,
  defaultModel: Model = 'gpt-5-mini'
): Model => {
  // If the user uses their own API key, allow custom model selection
  if (userApiKey || provider === AiProviders.OLLAMA) {
    if (provider === AiProviders.OPENAI) {
      return userModel ?? defaultModel;
    }

    if (userModel) {
      return userModel;
    }

    switch (provider) {
      case AiProviders.ANTHROPIC:
        return 'claude-sonnet-4-5-20250929';
      case AiProviders.MISTRAL:
        return 'mistral-large-latest';
      case AiProviders.DEEPSEEK:
        return 'deepseek-coder';
      case AiProviders.GEMINI:
        return 'gemini-2.5-flash';
      case AiProviders.GOOGLEVERTEX:
        return 'gemini-2.5-flash';
      case AiProviders.OLLAMA:
        return '';
      case AiProviders.OPENROUTER:
        return 'openai/gpt-4o';
      case AiProviders.ALIBABA:
        return 'qwen-plus';
      case AiProviders.FIREWORKS:
        return 'accounts/fireworks/models/llama-v3p1-8b-instruct';
      case AiProviders.GROQ:
        return 'llama3-8b-8192';
      case AiProviders.HUGGINGFACE:
        return 'meta-llama/Meta-Llama-3.1-8B-Instruct';
      case AiProviders.BEDROCK:
        return 'meta.llama3-70b-instruct-v1:0';
      case AiProviders.TOGETHERAI:
        return 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo';
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

const getLanguageModel = async (
  aiOptions: AIOptions,
  apiKey: string | undefined,
  defaultModel?: Model
) => {
  const loadModule = async <T>(packageName: string): Promise<T> => {
    try {
      return (await import(packageName)) as T;
    } catch {
      logger(
        `${x} The package "${colorize(packageName, ANSIColors.GREEN)}" is required to use this AI provider. Please install it using: ${colorize(`npm install ${packageName}`, ANSIColors.GREY_DARK)}`,
        {
          level: 'error',
        }
      );
      process.exit();
    }
  };

  const provider = aiOptions.provider ?? AiProviders.OPENAI;
  const selectedModel = getModelName(
    provider as AiProviders,
    apiKey,
    aiOptions.model,
    defaultModel
  );

  const baseURL = aiOptions.baseURL;

  switch (provider) {
    case AiProviders.OPENAI: {
      const {
        provider,
        model,
        temperature,
        applicationContext,
        dataSerialization,
        apiKey: _apiKey,
        baseURL: _baseURL,
        ...otherOptions
      } = aiOptions as any;

      const { createOpenAI } =
        await loadModule<typeof import('@ai-sdk/openai')>('@ai-sdk/openai');

      return createOpenAI({
        apiKey,
        baseURL,
        ...otherOptions,
      })(selectedModel);
    }

    case AiProviders.ANTHROPIC: {
      const {
        provider,
        model,
        temperature,
        applicationContext,
        dataSerialization,
        apiKey: _apiKey,
        baseURL: _baseURL,
        ...otherOptions
      } = aiOptions as any;

      const { createAnthropic } =
        await loadModule<typeof import('@ai-sdk/anthropic')>(
          '@ai-sdk/anthropic'
        );

      return createAnthropic({
        apiKey,
        baseURL,
        ...otherOptions,
      })(selectedModel);
    }

    case AiProviders.MISTRAL: {
      const {
        provider,
        model,
        temperature,
        applicationContext,
        dataSerialization,
        apiKey: _apiKey,
        baseURL: _baseURL,
        ...otherOptions
      } = aiOptions as any;

      const { createMistral } =
        await loadModule<typeof import('@ai-sdk/mistral')>('@ai-sdk/mistral');

      return createMistral({
        apiKey,
        baseURL,
        ...otherOptions,
      })(selectedModel);
    }

    case AiProviders.DEEPSEEK: {
      const {
        provider,
        model,
        temperature,
        applicationContext,
        dataSerialization,
        apiKey: _apiKey,
        baseURL: _baseURL,
        ...otherOptions
      } = aiOptions as any;

      const { createDeepSeek } =
        await loadModule<typeof import('@ai-sdk/deepseek')>('@ai-sdk/deepseek');

      return createDeepSeek({
        apiKey,
        baseURL,
        ...otherOptions,
      })(selectedModel);
    }

    case AiProviders.GEMINI: {
      const {
        provider,
        model,
        temperature,
        applicationContext,
        dataSerialization,
        apiKey: _apiKey,
        baseURL: _baseURL,
        ...otherOptions
      } = aiOptions as any;

      const { createGoogleGenerativeAI } =
        await loadModule<typeof import('@ai-sdk/google')>('@ai-sdk/google');

      return createGoogleGenerativeAI({
        apiKey,
        baseURL,
        ...otherOptions,
      })(selectedModel);
    }

    case AiProviders.GOOGLEVERTEX: {
      const {
        provider,
        model,
        temperature,
        applicationContext,
        dataSerialization,
        apiKey: _apiKey,
        baseURL: _baseURL,
        ...otherOptions
      } = aiOptions as any;

      const { createVertex } = await loadModule<
        typeof import('@ai-sdk/google-vertex')
      >('@ai-sdk/google-vertex');

      return createVertex({
        apiKey,
        baseURL,
        ...otherOptions,
      })(selectedModel as string);
    }

    case AiProviders.OLLAMA: {
      const {
        provider,
        model,
        temperature,
        applicationContext,
        dataSerialization,
        apiKey: _apiKey,
        baseURL: _baseURL,
        ...otherOptions
      } = aiOptions as any;

      const { createOpenAI } =
        await loadModule<typeof import('@ai-sdk/openai')>('@ai-sdk/openai');

      // Ollama compatible mode:
      const ollama = createOpenAI({
        baseURL: baseURL ?? 'http://localhost:11434/v1',
        apiKey: apiKey ?? 'ollama', // Required but unused by Ollama
        ...otherOptions,
      });

      return ollama.chat(selectedModel);
    }

    case AiProviders.OPENROUTER: {
      const {
        provider,
        model,
        temperature,
        applicationContext,
        dataSerialization,
        apiKey: _apiKey,
        baseURL: _baseURL,
        ...otherOptions
      } = aiOptions as any;

      const { createOpenRouter } = await loadModule<
        typeof import('@openrouter/ai-sdk-provider')
      >('@openrouter/ai-sdk-provider');

      const openrouter = createOpenRouter({
        apiKey,
        baseURL,
        ...otherOptions,
      });

      return openrouter(selectedModel as string);
    }

    case AiProviders.ALIBABA: {
      const {
        provider,
        model,
        temperature,
        applicationContext,
        dataSerialization,
        apiKey: _apiKey,
        baseURL: _baseURL,
        ...otherOptions
      } = aiOptions as any;

      const { createAlibaba } =
        await loadModule<typeof import('@ai-sdk/alibaba')>('@ai-sdk/alibaba');

      const alibaba = createAlibaba({
        apiKey,
        baseURL,
        ...otherOptions,
      });

      return alibaba(selectedModel as string);
    }

    case AiProviders.FIREWORKS: {
      const {
        provider,
        model,
        temperature,
        applicationContext,
        dataSerialization,
        apiKey: _apiKey,
        baseURL: _baseURL,
        ...otherOptions
      } = aiOptions as any;

      const { createFireworks } =
        await loadModule<typeof import('@ai-sdk/fireworks')>(
          '@ai-sdk/fireworks'
        );

      const fireworks = createFireworks({
        apiKey,
        baseURL,
        ...otherOptions,
      });

      return fireworks(selectedModel as string);
    }

    case AiProviders.GROQ: {
      const {
        provider,
        model,
        temperature,
        applicationContext,
        dataSerialization,
        apiKey: _apiKey,
        baseURL: _baseURL,
        ...otherOptions
      } = aiOptions as any;

      const { createGroq } =
        await loadModule<typeof import('@ai-sdk/groq')>('@ai-sdk/groq');

      const groq = createGroq({
        apiKey,
        baseURL,
        ...otherOptions,
      });

      return groq(selectedModel as string);
    }

    case AiProviders.HUGGINGFACE: {
      const {
        provider,
        model,
        temperature,
        applicationContext,
        dataSerialization,
        apiKey: _apiKey,
        baseURL: _baseURL,
        ...otherOptions
      } = aiOptions as any;

      const { createHuggingFace } = await loadModule<
        typeof import('@ai-sdk/huggingface')
      >('@ai-sdk/huggingface');

      const huggingface = createHuggingFace({
        apiKey,
        baseURL,
        ...otherOptions,
      });

      return huggingface(selectedModel as string);
    }

    case AiProviders.BEDROCK: {
      const {
        provider,
        model,
        temperature,
        applicationContext,
        dataSerialization,
        apiKey: _apiKey,
        baseURL: _baseURL,
        ...otherOptions
      } = aiOptions as any;

      const { createAmazonBedrock } = await loadModule<
        typeof import('@ai-sdk/amazon-bedrock')
      >('@ai-sdk/amazon-bedrock');

      const bedrock = createAmazonBedrock({
        accessKeyId: apiKey,
        baseURL,
        ...otherOptions,
      });

      return bedrock(selectedModel as string);
    }

    case AiProviders.TOGETHERAI: {
      const {
        provider,
        model,
        temperature,
        applicationContext,
        dataSerialization,
        apiKey: _apiKey,
        baseURL: _baseURL,
        ...otherOptions
      } = aiOptions as any;

      const { createTogetherAI } =
        await loadModule<typeof import('@ai-sdk/togetherai')>(
          '@ai-sdk/togetherai'
        );

      const togetherai = createTogetherAI({
        apiKey,
        baseURL,
        ...otherOptions,
      });

      return togetherai(selectedModel as string);
    }

    default: {
      throw new Error(`Provider ${provider} not supported`);
    }
  }
};

export type AIConfig = Omit<Parameters<typeof generateText>[0], 'prompt'> & {
  reasoningEffort?: ReasoningEffort;
  textVerbosity?: 'low' | 'medium' | 'high';
  dataSerialization?: 'json' | 'toon';
};

const DEFAULT_PROVIDER: AiProviders = AiProviders.OPENAI as AiProviders;

export type AIConfigOptions = {
  userOptions?: AIOptions;
  projectOptions?: AIOptions;
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
    projectOptions,
    defaultOptions,
    accessType = ['registered_user'],
  } = options;

  const aiOptions = {
    provider: DEFAULT_PROVIDER,
    ...defaultOptions,
    ...projectOptions,
    ...userOptions,
  } as AIOptions;

  const apiKey = getAPIKey(accessType, aiOptions, isAuthenticated);

  // Check if API key is provided
  if (!apiKey && aiOptions.provider !== AiProviders.OLLAMA) {
    throw new Error(`API key for ${aiOptions.provider} is missing`);
  }

  const languageModel = await getLanguageModel(
    aiOptions,
    apiKey,
    defaultOptions?.model
  );

  return {
    model: languageModel,
    temperature: aiOptions.temperature,
    dataSerialization: aiOptions.dataSerialization,
  };
};
