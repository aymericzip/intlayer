import type {
  AlibabaProviderOptions,
  AmazonBedrockProviderOptions,
  AnthropicProviderOptions,
  DeepSeekProviderOptions,
  FireworksProviderOptions,
  GoogleProviderOptions,
  GroqProviderOptions,
  HuggingFaceProviderOptions,
  LMStudioProviderOptions,
  MistralProviderOptions,
  OpenAIProviderOptions,
  OpenRouterProviderOptions,
  TogetherAIProviderOptions,
  VertexProviderOptions,
} from './aiSdk';

export {
  generateText,
  jsonSchema,
  stepCountIs,
  streamText,
  Tool,
  tool,
} from 'ai';
export * from './aiSdk';
export {
  type AuditDictionaryMetadataOptions,
  type AuditFileResultData,
  auditDictionaryMetadata,
} from './auditDictionaryMetadata';
export {
  type CustomQueryOptions,
  type CustomQueryResultData,
  customQuery,
} from './customQuery';
export {
  type TranslateJSONOptions,
  type TranslateJSONResultData,
  translateJSON,
} from './translateJSON';
export { extractJson } from './utils/extractJSON';

declare module '@intlayer/types/config' {
  // @ts-ignore redeclared for module augmentations
  interface AiProviderConfigMap {
    openai: OpenAIProviderOptions;
    anthropic: AnthropicProviderOptions;
    mistral: MistralProviderOptions;
    deepseek: DeepSeekProviderOptions;
    gemini: GoogleProviderOptions;
    googlevertex: VertexProviderOptions;
    ollama: OpenAIProviderOptions;
    openrouter: OpenRouterProviderOptions;
    alibaba: AlibabaProviderOptions;
    fireworks: FireworksProviderOptions;
    groq: GroqProviderOptions;
    huggingface: HuggingFaceProviderOptions;
    bedrock: AmazonBedrockProviderOptions;
    togetherai: TogetherAIProviderOptions;
    lmstudio: LMStudioProviderOptions;
  }
}
