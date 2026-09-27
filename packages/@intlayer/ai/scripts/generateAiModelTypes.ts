/**
 * Generates `@intlayer/types/src/aiModels.ts` from the model ids declared by
 * the installed AI SDK providers.
 *
 * `@intlayer/types` has no dependency on the (optional) `@ai-sdk/*` packages,
 * so the model ids are resolved here and written as plain literal unions.
 *
 * Run from `packages/@intlayer/ai`: `bun run generate:models`
 */
import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type * as TypeScript from 'typescript';

type ProviderSource = {
  /** Key of the generated map, matching an `AiProviders` value */
  provider: string;
  /** Name of the generated model id type */
  typeName: string;
  /** Module declaring the provider */
  moduleName: string;
  /** Callable provider type whose first parameter is the model id */
  providerTypeName: string;
};

const PROVIDER_SOURCES: ProviderSource[] = [
  {
    provider: 'openai',
    typeName: 'OpenAIModelId',
    moduleName: '@ai-sdk/openai',
    providerTypeName: 'OpenAIProvider',
  },
  {
    provider: 'anthropic',
    typeName: 'AnthropicModelId',
    moduleName: '@ai-sdk/anthropic',
    providerTypeName: 'AnthropicProvider',
  },
  {
    provider: 'mistral',
    typeName: 'MistralModelId',
    moduleName: '@ai-sdk/mistral',
    providerTypeName: 'MistralProvider',
  },
  {
    provider: 'deepseek',
    typeName: 'DeepSeekModelId',
    moduleName: '@ai-sdk/deepseek',
    providerTypeName: 'DeepSeekProvider',
  },
  {
    provider: 'gemini',
    typeName: 'GoogleModelId',
    moduleName: '@ai-sdk/google',
    providerTypeName: 'GoogleGenerativeAIProvider',
  },
  {
    provider: 'googlevertex',
    typeName: 'GoogleVertexModelId',
    moduleName: '@ai-sdk/google-vertex',
    providerTypeName: 'GoogleVertexProvider',
  },
  {
    provider: 'alibaba',
    typeName: 'AlibabaModelId',
    moduleName: '@ai-sdk/alibaba',
    providerTypeName: 'AlibabaProvider',
  },
  {
    provider: 'fireworks',
    typeName: 'FireworksModelId',
    moduleName: '@ai-sdk/fireworks',
    providerTypeName: 'FireworksProvider',
  },
  {
    provider: 'groq',
    typeName: 'GroqModelId',
    moduleName: '@ai-sdk/groq',
    providerTypeName: 'GroqProvider',
  },
  {
    provider: 'huggingface',
    typeName: 'HuggingFaceModelId',
    moduleName: '@ai-sdk/huggingface',
    providerTypeName: 'HuggingFaceProvider',
  },
  {
    provider: 'bedrock',
    typeName: 'AmazonBedrockModelId',
    moduleName: '@ai-sdk/amazon-bedrock',
    providerTypeName: 'AmazonBedrockProvider',
  },
  {
    provider: 'togetherai',
    typeName: 'TogetherAIModelId',
    moduleName: '@ai-sdk/togetherai',
    providerTypeName: 'TogetherAIProvider',
  },
  {
    provider: 'moonshotai',
    typeName: 'MoonshotAIModelId',
    moduleName: '@ai-sdk/moonshotai',
    providerTypeName: 'MoonshotAIProvider',
  },
];

/** Providers whose model ids are free-form (local runtimes, routers) */
const FREE_FORM_PROVIDERS = ['ollama', 'openrouter', 'lmstudio'];

/** Google Generative AI shares the Gemini model ids */
const PROVIDER_ALIASES: Record<string, string> = {
  googlegenerativeai: 'gemini',
};

const packageDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
/**
 * The package pins the TypeScript 7 native preview, which has no JS compiler
 * API: load the classic compiler installed at the repository root.
 */
const ts: typeof TypeScript = createRequire(
  resolve(packageDirectory, '../../../package.json')
)('typescript');

const outputPath = resolve(packageDirectory, '../types/src/aiModels.ts');
const virtualFileName = join(packageDirectory, '__aiModelTypes__.ts');

/**
 * Resolves the string literal members of `Parameters<Provider>[0]` for every
 * provider, keyed by provider.
 */
const resolveModelIds = (): Map<string, string[]> => {
  const virtualSource = PROVIDER_SOURCES.map(
    ({ typeName, moduleName, providerTypeName }) =>
      `export type ${typeName} = Parameters<import('${moduleName}').${providerTypeName}>[0];`
  ).join('\n');

  const compilerOptions: TypeScript.CompilerOptions = {
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ESNext,
    strict: true,
    skipLibCheck: true,
    noEmit: true,
  };
  const compilerHost = ts.createCompilerHost(compilerOptions);
  const readSourceFile = compilerHost.getSourceFile;

  compilerHost.getSourceFile = (fileName, languageVersion, ...rest) =>
    fileName === virtualFileName
      ? ts.createSourceFile(fileName, virtualSource, languageVersion)
      : readSourceFile(fileName, languageVersion, ...rest);

  const program = ts.createProgram(
    [virtualFileName],
    compilerOptions,
    compilerHost
  );
  const typeChecker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(virtualFileName);

  if (!sourceFile) {
    throw new Error('Unable to create the virtual model type file');
  }

  const modelIdsByProvider = new Map<string, string[]>();

  for (const statement of sourceFile.statements) {
    if (!ts.isTypeAliasDeclaration(statement)) continue;

    const source = PROVIDER_SOURCES.find(
      ({ typeName }) => typeName === statement.name.text
    );

    if (!source) continue;

    const resolvedType = typeChecker.getTypeAtLocation(statement.name);
    const memberTypes = resolvedType.isUnion()
      ? resolvedType.types
      : [resolvedType];
    const modelIds = memberTypes
      .filter((memberType) => memberType.isStringLiteral())
      .map((memberType) => (memberType as TypeScript.StringLiteralType).value);

    if (modelIds.length === 0) {
      throw new Error(
        `No model id resolved for ${source.moduleName}. Is it installed?`
      );
    }

    modelIdsByProvider.set(source.provider, [...new Set(modelIds)].sort());
  }

  return modelIdsByProvider;
};

/**
 * Renders the generated TypeScript module.
 */
const renderModule = (modelIdsByProvider: Map<string, string[]>): string => {
  const modelTypes = PROVIDER_SOURCES.map(({ provider, typeName }) => {
    const members = (modelIdsByProvider.get(provider) ?? [])
      .map((modelId) => `  | '${modelId}'`)
      .join('\n');

    return `export type ${typeName} =\n${members}\n  | (string & {});`;
  }).join('\n\n');

  const mapEntries = [
    ...PROVIDER_SOURCES.map(
      ({ provider, typeName }) => `  ${provider}: ${typeName};`
    ),
    ...Object.entries(PROVIDER_ALIASES).map(
      ([provider, aliasedProvider]) =>
        `  ${provider}: ${
          PROVIDER_SOURCES.find((source) => source.provider === aliasedProvider)
            ?.typeName
        };`
    ),
    ...FREE_FORM_PROVIDERS.map((provider) => `  ${provider}: string;`),
  ].join('\n');

  return `// Generated by packages/@intlayer/ai/scripts/generateAiModelTypes.ts
// Do not edit manually. Run \`bun run generate:models\` in @intlayer/ai.

${modelTypes}

/**
 * Model ids suggested for each AI provider in the \`ai.model\` config field.
 *
 * Listed ids only drive autocompletion: any other string is still accepted.
 */
export interface AiProviderModelMap {
${mapEntries}
}
`;
};

writeFileSync(outputPath, renderModule(resolveModelIds()));

console.info(`AI model types written to ${outputPath}`);
