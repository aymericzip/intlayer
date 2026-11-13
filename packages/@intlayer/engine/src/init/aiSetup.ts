import * as ANSIColors from '@intlayer/config/colors';
import { colorize, colorizePath, logger, v, x } from '@intlayer/config/logger';
import { AiProviders } from '@intlayer/types/config';
import { setAiInConfig, writeEnvVariables } from './cms';
import { readFileFromRoot } from './utils/fileSystem';
import {
  detectPackageManager,
  installPackages,
  isIntlayerPackageName,
} from './utils/packageManager';

/** Package running the AI commands locally with the user's own key. */
export const AI_PACKAGE_NAME = '@intlayer/ai';

/** Request listing the models of a provider. */
type ModelsRequest = {
  url: string;
  headers?: Record<string, string>;
};

/** Everything `intlayer init ai` needs to know about a provider. */
export type AiProviderSetup = {
  provider: `${AiProviders}`;
  label: string;
  /**
   * AI SDK package to install. `undefined` when `@intlayer/ai` already ships
   * it (Anthropic, OpenAI and the OpenAI-compatible Ollama).
   */
  sdkPackage?: string;
  /**
   * Environment variable the API key is stored in. `undefined` for local
   * runtimes and cloud providers authenticated by their own credentials.
   */
  apiKeyEnvironmentVariable?: string;
  /** Start of a valid key, shown as the input placeholder. */
  apiKeyPlaceholder?: string;
  /** Where the user creates an API key. */
  apiKeyUrl?: string;
  /** Builds the request listing the available models, when the API has one. */
  getModelsRequest?: (apiKey?: string) => ModelsRequest;
  /** Models suggested when the list cannot be fetched (first is default). */
  suggestedModels: string[];
};

/** `Authorization: Bearer` header, only when a key is given. */
const bearer = (apiKey?: string): Record<string, string> =>
  apiKey ? { Authorization: `Bearer ${apiKey}` } : {};

/** Lists models from the Google Generative AI API. */
const getGoogleModelsRequest = (apiKey?: string): ModelsRequest => ({
  url: `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey ?? '')}`,
});

/** Providers offered by `intlayer init ai`, in display order. */
export const AI_PROVIDER_SETUPS: AiProviderSetup[] = [
  {
    provider: AiProviders.ANTHROPIC,
    label: 'Anthropic',
    apiKeyEnvironmentVariable: 'ANTHROPIC_API_KEY',
    apiKeyPlaceholder: 'sk-ant-',
    apiKeyUrl: 'https://console.anthropic.com/settings/keys',
    getModelsRequest: (apiKey) => ({
      url: 'https://api.anthropic.com/v1/models?limit=100',
      headers: {
        'x-api-key': apiKey ?? '',
        'anthropic-version': '2023-06-01',
      },
    }),
    suggestedModels: [
      'claude-haiku-5-5',
      'claude-sonnet-5-5',
      'claude-opus-5-5',
    ],
  },
  {
    provider: AiProviders.OPENAI,
    label: 'OpenAI',
    apiKeyEnvironmentVariable: 'OPENAI_API_KEY',
    apiKeyPlaceholder: 'sk-',
    apiKeyUrl: 'https://platform.openai.com/api-keys',
    getModelsRequest: (apiKey) => ({
      url: 'https://api.openai.com/v1/models',
      headers: bearer(apiKey),
    }),
    suggestedModels: ['gpt-5.6-terra'],
  },
  {
    provider: AiProviders.GEMINI,
    label: 'Google Gemini',
    sdkPackage: '@ai-sdk/google',
    apiKeyEnvironmentVariable: 'GOOGLE_GENERATIVE_AI_API_KEY',
    apiKeyUrl: 'https://aistudio.google.com/apikey',
    getModelsRequest: getGoogleModelsRequest,
    suggestedModels: [],
  },
  {
    provider: AiProviders.MISTRAL,
    label: 'Mistral',
    sdkPackage: '@ai-sdk/mistral',
    apiKeyEnvironmentVariable: 'MISTRAL_API_KEY',
    apiKeyUrl: 'https://console.mistral.ai/api-keys',
    getModelsRequest: (apiKey) => ({
      url: 'https://api.mistral.ai/v1/models',
      headers: bearer(apiKey),
    }),
    suggestedModels: [],
  },
  {
    provider: AiProviders.DEEPSEEK,
    label: 'DeepSeek',
    sdkPackage: '@ai-sdk/deepseek',
    apiKeyEnvironmentVariable: 'DEEPSEEK_API_KEY',
    apiKeyPlaceholder: 'sk-',
    apiKeyUrl: 'https://platform.deepseek.com/api_keys',
    getModelsRequest: (apiKey) => ({
      url: 'https://api.deepseek.com/models',
      headers: bearer(apiKey),
    }),
    suggestedModels: [],
  },
  {
    provider: AiProviders.OPENROUTER,
    label: 'OpenRouter',
    sdkPackage: '@openrouter/ai-sdk-provider',
    apiKeyEnvironmentVariable: 'OPENROUTER_API_KEY',
    apiKeyPlaceholder: 'sk-or-',
    apiKeyUrl: 'https://openrouter.ai/settings/keys',
    getModelsRequest: () => ({ url: 'https://openrouter.ai/api/v1/models' }),
    suggestedModels: [],
  },
  {
    provider: AiProviders.GROQ,
    label: 'Groq',
    sdkPackage: '@ai-sdk/groq',
    apiKeyEnvironmentVariable: 'GROQ_API_KEY',
    apiKeyPlaceholder: 'gsk_',
    apiKeyUrl: 'https://console.groq.com/keys',
    getModelsRequest: (apiKey) => ({
      url: 'https://api.groq.com/openai/v1/models',
      headers: bearer(apiKey),
    }),
    suggestedModels: [],
  },
  {
    provider: AiProviders.FIREWORKS,
    label: 'Fireworks',
    sdkPackage: '@ai-sdk/fireworks',
    apiKeyEnvironmentVariable: 'FIREWORKS_API_KEY',
    apiKeyUrl: 'https://app.fireworks.ai/settings/users/api-keys',
    getModelsRequest: (apiKey) => ({
      url: 'https://api.fireworks.ai/inference/v1/models',
      headers: bearer(apiKey),
    }),
    suggestedModels: [],
  },
  {
    provider: AiProviders.TOGETHERAI,
    label: 'Together AI',
    sdkPackage: '@ai-sdk/togetherai',
    apiKeyEnvironmentVariable: 'TOGETHER_AI_API_KEY',
    apiKeyUrl: 'https://api.together.ai/settings/api-keys',
    getModelsRequest: (apiKey) => ({
      url: 'https://api.together.xyz/v1/models',
      headers: bearer(apiKey),
    }),
    suggestedModels: [],
  },
  {
    provider: AiProviders.MOONSHOTAI,
    label: 'Moonshot AI',
    sdkPackage: '@ai-sdk/moonshotai',
    apiKeyEnvironmentVariable: 'MOONSHOT_API_KEY',
    apiKeyPlaceholder: 'sk-',
    apiKeyUrl: 'https://platform.moonshot.ai/console/api-keys',
    getModelsRequest: (apiKey) => ({
      url: 'https://api.moonshot.ai/v1/models',
      headers: bearer(apiKey),
    }),
    suggestedModels: [],
  },
  {
    provider: AiProviders.ALIBABA,
    label: 'Alibaba (Qwen)',
    sdkPackage: '@ai-sdk/alibaba',
    apiKeyEnvironmentVariable: 'ALIBABA_API_KEY',
    apiKeyPlaceholder: 'sk-',
    getModelsRequest: (apiKey) => ({
      url: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1/models',
      headers: bearer(apiKey),
    }),
    suggestedModels: [],
  },
  {
    provider: AiProviders.HUGGINGFACE,
    label: 'Hugging Face',
    sdkPackage: '@ai-sdk/huggingface',
    apiKeyEnvironmentVariable: 'HUGGINGFACE_API_KEY',
    apiKeyPlaceholder: 'hf_',
    apiKeyUrl: 'https://huggingface.co/settings/tokens',
    suggestedModels: [],
  },
  {
    provider: AiProviders.BEDROCK,
    label: 'Amazon Bedrock',
    sdkPackage: '@ai-sdk/amazon-bedrock',
    suggestedModels: [],
  },
  {
    provider: AiProviders.GOOGLEVERTEX,
    label: 'Google Vertex AI',
    sdkPackage: '@ai-sdk/google-vertex',
    suggestedModels: [],
  },
  {
    provider: AiProviders.OLLAMA,
    label: 'Ollama (local)',
    getModelsRequest: () => ({ url: 'http://localhost:11434/v1/models' }),
    suggestedModels: [],
  },
  {
    provider: AiProviders.LMSTUDIO,
    label: 'LM Studio (local)',
    sdkPackage: '@ai-sdk/openai-compatible',
    getModelsRequest: () => ({ url: 'http://localhost:1234/v1/models' }),
    suggestedModels: [],
  },
];

/** Providers accepted by `--provider`. */
export const AI_PROVIDER_CHOICES = AI_PROVIDER_SETUPS.map(
  ({ provider }) => provider
);

/** Looks up the setup of a provider. */
export const getAiProviderSetup = (
  provider: string
): AiProviderSetup | undefined =>
  AI_PROVIDER_SETUPS.find((setup) => setup.provider === provider);

/**
 * Reads model ids out of a `/models` response: OpenAI-style `{ data: [{ id }] }`,
 * Google-style `{ models: [{ name: 'models/…' }] }`, or a bare array.
 */
export const parseModelIds = (body: unknown): string[] => {
  const entries: unknown[] = Array.isArray(body)
    ? body
    : typeof body === 'object' && body !== null
      ? ((body as { data?: unknown[]; models?: unknown[] }).data ??
        (body as { models?: unknown[] }).models ??
        [])
      : [];

  const modelIds = entries
    .map((entry) => {
      if (typeof entry !== 'object' || entry === null) return undefined;
      const { id, name } = entry as { id?: unknown; name?: unknown };
      const modelId = typeof id === 'string' ? id : name;
      return typeof modelId === 'string'
        ? modelId.replace(/^models\//, '')
        : undefined;
    })
    .filter((modelId): modelId is string => Boolean(modelId));

  return [...new Set(modelIds)].sort((first, second) =>
    first.localeCompare(second)
  );
};

/**
 * Lists the models available to the given key from the provider API. Resolves
 * to an empty list when the provider has no listing endpoint, the key is
 * rejected or the API cannot be reached.
 */
export const fetchAiProviderModels = async (
  provider: string,
  apiKey?: string
): Promise<string[]> => {
  const request = getAiProviderSetup(provider)?.getModelsRequest?.(apiKey);

  if (!request) return [];

  try {
    const response = await fetch(request.url, {
      headers: request.headers,
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) return [];

    return parseModelIds(await response.json());
  } catch {
    return [];
  }
};

/**
 * Installs `@intlayer/ai` (runs the AI commands locally with the user's key)
 * and the provider AI SDK when `@intlayer/ai` does not ship it, as dev
 * dependencies. Already declared packages are skipped.
 */
export const installAiProviderPackages = async (
  rootDir: string,
  provider: string,
  version?: string
): Promise<void> => {
  const setup = getAiProviderSetup(provider);
  const packageJson = JSON.parse(
    await readFileFromRoot(rootDir, 'package.json')
  ) as {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  };
  const declaredDependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  const packagesToInstall = [AI_PACKAGE_NAME, setup?.sdkPackage]
    .filter((packageName): packageName is string => Boolean(packageName))
    .filter((packageName) => !declaredDependencies[packageName]);

  if (packagesToInstall.length === 0) {
    logger(`${v} AI packages already installed`);
    return;
  }

  const packageSpecifiers = packagesToInstall.map((packageName) =>
    version && isIntlayerPackageName(packageName)
      ? `${packageName}@${version}`
      : packageName
  );

  try {
    installPackages(
      rootDir,
      packageSpecifiers,
      detectPackageManager(rootDir),
      true
    );
    logger(
      `${v} Installed: ${packagesToInstall.map((packageName) => colorize(packageName, ANSIColors.MAGENTA)).join(', ')}`
    );
  } catch {
    logger(
      `${x} Failed to install the AI packages. Please install them manually: ${packageSpecifiers.join(' ')}`,
      { level: 'warn' }
    );
  }
};

/** Choices of `intlayer init ai`. */
export type SetupAiProviderOptions = {
  provider: string;
  model?: string;
  /** Stored in the environment file when given. */
  apiKey?: string;
};

/**
 * Persists an AI provider setup: the API key to the environment file (e.g.
 * `ANTHROPIC_API_KEY=sk-ant-…` in `.env`) and the provider, model and
 * `process.env` key reference to the `ai` block of the Intlayer config.
 */
export const setupAiProvider = async (
  rootDir: string,
  { provider, model, apiKey }: SetupAiProviderOptions
): Promise<void> => {
  const apiKeyEnvironmentVariable =
    getAiProviderSetup(provider)?.apiKeyEnvironmentVariable;

  if (apiKey && apiKeyEnvironmentVariable) {
    const envFile = await writeEnvVariables(rootDir, {
      [apiKeyEnvironmentVariable]: apiKey,
    });
    logger(
      `${v} Saved ${colorize(apiKeyEnvironmentVariable, ANSIColors.GREY_LIGHT)} to ${colorizePath(envFile)}`
    );
  }

  await setAiInConfig(rootDir, {
    provider,
    model,
    apiKeyEnvironmentVariable,
  });

  if (!apiKey && apiKeyEnvironmentVariable) {
    logger(
      `Set ${colorize(`${apiKeyEnvironmentVariable}=…`, ANSIColors.GREY_LIGHT)} in your ${colorizePath('.env')} to enable the AI features.`
    );
  }
};
