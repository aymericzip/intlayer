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
import type {
  createOpenAICompatible,
  OpenAICompatibleProvider,
} from '@ai-sdk/openai-compatible';
import type { createTogetherAI, TogetherAIProvider } from '@ai-sdk/togetherai';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, logger, x } from '@intlayer/config/logger';
import { AiProviders } from '@intlayer/types/config';
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
import { generateText as generateTextFn } from 'ai';

const DEFAULT_PROVIDER = AiProviders.ANTHROPIC;
const DEFAULT_MODEL = 'claude-haiku-4-5';
const DEFAULT_API_KEY = process.env.ANTHROPIC_API_KEY;

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
type LMStudioModel = Parameters<OpenAICompatibleProvider>[0];

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
export type LMStudioProviderOptions = Parameters<
  typeof createOpenAICompatible
>[0];

export type SystemMessage =
  | string
  | SystemModelMessage
  | SystemModelMessage[]
  | undefined;

export type Messages = (
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
  | LMStudioModel
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
      provider:
        | AiProviders.GOOGLEGENERATIVEAI
        | `${AiProviders.GOOGLEGENERATIVEAI}`;
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
  | ({
      provider: AiProviders.LMSTUDIO | `${AiProviders.LMSTUDIO}`;
    } & LMStudioProviderOptions)
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

const isMaskedKey = (key?: string): boolean => !!key?.includes('*');

const getAPIKey = (
  accessType: AccessType[],
  aiOptions?: AIOptions,
  isAuthenticated: boolean = false
) => {
  const apiKey =
    aiOptions?.apiKey && !isMaskedKey(aiOptions.apiKey)
      ? aiOptions.apiKey
      : undefined;

  if (accessType.includes('public')) {
    return apiKey ?? DEFAULT_API_KEY;
  }

  if (accessType.includes('apiKey') && apiKey) {
    return apiKey;
  }

  if (accessType.includes('registered_user') && isAuthenticated) {
    return apiKey ?? DEFAULT_API_KEY;
  }

  // TODO: Implement premium user access
  if (accessType.includes('premium_user') && isAuthenticated) {
    return apiKey ?? DEFAULT_API_KEY;
  }

  return undefined;
};

const getModelName = (
  provider: AiProviders,
  isUserProvidedKey: boolean,
  userModel?: Model
): Model => {
  // If the user provides their own API key, allow custom model selection
  if (
    isUserProvidedKey ||
    provider === AiProviders.OLLAMA ||
    provider === AiProviders.LMSTUDIO
  ) {
    if (userModel) {
      return userModel;
    }

    // No custom model specified — fall back to the default
    return DEFAULT_MODEL;
  }

  // Using backend's default API key — always use the default model,
  // ignore any custom model the user may have passed
  return DEFAULT_MODEL;
};

const getLanguageModel = async (
  aiOptions: AIOptions,
  apiKey: string | undefined
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
    !!aiOptions.apiKey, // true only when the user explicitly provided their own key
    aiOptions.model
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

    case AiProviders.GOOGLEGENERATIVEAI: {
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

    case AiProviders.LMSTUDIO: {
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

      const { createOpenAICompatible } = await loadModule<
        typeof import('@ai-sdk/openai-compatible')
      >('@ai-sdk/openai-compatible');

      const lmstudio = createOpenAICompatible({
        name: 'lmstudio',
        baseURL: baseURL ?? 'http://localhost:1234/v1',
        ...otherOptions,
      });

      return lmstudio(selectedModel as string);
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

export type AIConfigOptions = {
  userOptions?: AIOptions;
  projectOptions?: AIOptions;
  defaultOptions?: AIOptions;
  accessType?: AccessType[];
};

/**
 * Sends a minimal request to verify that the configured AI provider credentials
 * are valid and reachable before starting any bulk operation.
 *
 * @returns true if access is confirmed, false otherwise
 */
export const checkAISDKAccess = async (
  aiConfig: AIConfig
): Promise<{ hasAIAccess: boolean; error?: string }> => {
  try {
    await generateTextFn({
      ...aiConfig,
      messages: [
        {
          role: 'user',
          content: 'ping',
        },
      ],
      maxOutputTokens: 20,
    });
    return { hasAIAccess: true };
  } catch (error) {
    return { hasAIAccess: false, error: (error as Error).message };
  }
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

  const mergeWithoutUndefined = (...sources: (AIOptions | undefined)[]) => {
    const result: Record<string, unknown> = { provider: DEFAULT_PROVIDER };
    for (const source of sources) {
      if (!source) continue;
      for (const [key, value] of Object.entries(source)) {
        if (value === undefined) continue;
        if (key === 'apiKey' && isMaskedKey(value as string)) continue;
        result[key] = value;
      }
    }
    return result;
  };

  const aiOptions = mergeWithoutUndefined(
    defaultOptions,
    projectOptions,
    userOptions
  ) as AIOptions;

  const apiKey = getAPIKey(accessType, aiOptions, isAuthenticated);

  // Check if API key is provided
  if (
    !apiKey &&
    aiOptions.provider !== AiProviders.OLLAMA &&
    aiOptions.provider !== AiProviders.LMSTUDIO
  ) {
    throw new Error(`API key for ${aiOptions.provider} is missing`);
  }

  const languageModel = await getLanguageModel(aiOptions, apiKey);

  return {
    model: languageModel,
    temperature: aiOptions.temperature,
    dataSerialization: aiOptions.dataSerialization,
  };
};
