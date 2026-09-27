import type { AlibabaProvider } from '@ai-sdk/alibaba';
import type { AmazonBedrockProvider } from '@ai-sdk/amazon-bedrock';
import type { AnthropicProvider } from '@ai-sdk/anthropic';
import type { DeepSeekProvider } from '@ai-sdk/deepseek';
import type { FireworksProvider } from '@ai-sdk/fireworks';
import type { GoogleGenerativeAIProvider } from '@ai-sdk/google';
import type { GoogleVertexProvider } from '@ai-sdk/google-vertex';
import type { GroqProvider } from '@ai-sdk/groq';
import type { HuggingFaceProvider } from '@ai-sdk/huggingface';
import type { MistralProvider } from '@ai-sdk/mistral';
import type { MoonshotAIProvider } from '@ai-sdk/moonshotai';
import type { OpenAIProvider } from '@ai-sdk/openai';
import type { OpenAICompatibleProvider } from '@ai-sdk/openai-compatible';
import type { TogetherAIProvider } from '@ai-sdk/togetherai';
import type { OpenRouterProvider } from '@openrouter/ai-sdk-provider';

/**
 * Model id accepted by an AI SDK provider, read from its call signature.
 *
 * The provider SDKs are optional peer dependencies: when one is not installed
 * its type is unresolved, and the model id falls back to `string`. The
 * `unknown extends` check catches both `any` and the unresolved import type,
 * which `0 extends 1 & Provider` lets through.
 */
export type ProviderModelId<Provider> = unknown extends Provider
  ? string
  : Provider extends (modelId: infer ModelId) => unknown
    ? ModelId
    : string;

/**
 * Model ids suggested for each AI provider in the `ai.model` config field,
 * as declared by the installed provider SDK. Suggested ids only drive
 * autocompletion: any other string is still accepted.
 */
export type AiProviderModelMap = {
  openai: ProviderModelId<OpenAIProvider>;
  anthropic: ProviderModelId<AnthropicProvider>;
  mistral: ProviderModelId<MistralProvider>;
  deepseek: ProviderModelId<DeepSeekProvider>;
  gemini: ProviderModelId<GoogleGenerativeAIProvider>;
  googlegenerativeai: ProviderModelId<GoogleGenerativeAIProvider>;
  googlevertex: ProviderModelId<GoogleVertexProvider>;
  /** Local runtime: models are whatever is pulled locally */
  ollama: string;
  openrouter: ProviderModelId<OpenRouterProvider>;
  alibaba: ProviderModelId<AlibabaProvider>;
  fireworks: ProviderModelId<FireworksProvider>;
  groq: ProviderModelId<GroqProvider>;
  huggingface: ProviderModelId<HuggingFaceProvider>;
  bedrock: ProviderModelId<AmazonBedrockProvider>;
  togetherai: ProviderModelId<TogetherAIProvider>;
  lmstudio: ProviderModelId<OpenAICompatibleProvider>;
  moonshotai: ProviderModelId<MoonshotAIProvider>;
};
