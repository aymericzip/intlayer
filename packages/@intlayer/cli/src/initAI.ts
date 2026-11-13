import {
  AI_PROVIDER_CHOICES,
  AI_PROVIDER_SETUPS,
  type AiProviderSetup,
  fetchAiProviderModels,
  getAiProviderSetup,
  installAiProviderPackages,
  setupAiProvider,
} from '@intlayer/engine/cli';
import { resolveProjectRoot } from './init';
import { loadPrompts } from './loadPrompts';
import { isInteractiveTerminal } from './utils/isInteractiveTerminal';
import { parseChoice } from './utils/parseChoice';

/** Options of {@link initAI}; anything omitted is prompted for. */
export type InitAIOptions = {
  provider?: string;
  model?: string;
  apiKey?: string;
  /** Version to install `@intlayer/ai` at (the running CLI version). */
  intlayerVersion?: string;
};

/** Validates a `--provider` value. */
export const parseAiProvider = (value: string): string =>
  parseChoice(value, AI_PROVIDER_CHOICES, '--provider');

/** Value of the model picker entry that opens a free-text input. */
const CUSTOM_MODEL_VALUE = '__custom__';

/** Number of models shown before the list is cut, the rest stays typeable. */
const MAXIMUM_LISTED_MODELS = 40;

/**
 * Configures the AI provider used by `intlayer fill` / `translate`: installs
 * `@intlayer/ai` and the provider SDK, lists the models available to the key,
 * stores the key in `.env` (e.g. `ANTHROPIC_API_KEY=sk-ant-…`) and writes the
 * `ai` block of the Intlayer config. Without a terminal, `--provider` is
 * required and nothing is prompted.
 */
export const initAI = async (
  projectRoot?: string,
  options: InitAIOptions = {}
): Promise<void> => {
  const p = await loadPrompts();
  const root = resolveProjectRoot(projectRoot);
  const isInteractive = isInteractiveTerminal();

  if (!isInteractive) {
    if (!options.provider) {
      p.log.error(
        `\`intlayer init ai\` needs a terminal, or --provider <${AI_PROVIDER_CHOICES.join('|')}> [--model <model>] [--api-key <key>].`
      );
      process.exitCode = 1;
      return;
    }

    await installAiProviderPackages(
      root,
      options.provider,
      options.intlayerVersion
    );
    await setupAiProvider(root, {
      provider: options.provider,
      model:
        options.model ??
        getAiProviderSetup(options.provider)?.suggestedModels[0],
      apiKey: options.apiKey,
    });
    return;
  }

  p.intro('Set up AI translation');

  const provider =
    options.provider ??
    (await p.select<string>({
      message: 'Which AI provider do you want to use?',
      options: AI_PROVIDER_SETUPS.map((setup) => ({
        value: setup.provider,
        label: setup.label,
        hint: setup.apiKeyEnvironmentVariable,
      })),
      initialValue: AI_PROVIDER_SETUPS[0]?.provider,
    }));

  if (p.isCancel(provider)) {
    p.cancel('Operation cancelled.');
    return;
  }

  const setup = getAiProviderSetup(provider);

  await installAiProviderPackages(root, provider, options.intlayerVersion);

  const apiKey = options.apiKey ?? (await promptApiKey(setup));

  if (typeof apiKey === 'symbol') {
    p.cancel('Operation cancelled.');
    return;
  }

  const model = options.model ?? (await promptModel(setup, provider, apiKey));

  if (typeof model === 'symbol') {
    p.cancel('Operation cancelled.');
    return;
  }

  await setupAiProvider(root, {
    provider,
    model: model || undefined,
    apiKey: apiKey || undefined,
  });

  p.outro('AI translation configured');
};

/**
 * Asks for the API key (masked); an empty answer skips it. Providers without a
 * key (local runtimes, cloud credentials) resolve to an empty string.
 */
const promptApiKey = async (
  setup?: AiProviderSetup
): Promise<string | symbol> => {
  if (!setup?.apiKeyEnvironmentVariable) return '';

  const p = await loadPrompts();

  if (setup.apiKeyUrl) {
    p.log.info(`Create a key at ${setup.apiKeyUrl}`);
  }

  return p.password({
    message: `Paste your ${setup.label} API key (saved as ${setup.apiKeyEnvironmentVariable} in .env — leave empty to skip):`,
    mask: '*',
    validate: (value) =>
      value &&
      setup.apiKeyPlaceholder &&
      !value.startsWith(setup.apiKeyPlaceholder)
        ? `${setup.label} keys start with "${setup.apiKeyPlaceholder}"`
        : undefined,
  });
};

/**
 * Lists the models available to the key (or the suggested ones when the list
 * cannot be fetched) with a free-text fallback.
 */
const promptModel = async (
  setup: AiProviderSetup | undefined,
  provider: string,
  apiKey: string
): Promise<string | symbol> => {
  const p = await loadPrompts();
  const spinner = p.spinner();

  spinner.start('Fetching the available models...');
  const fetchedModels = await fetchAiProviderModels(
    provider,
    apiKey || undefined
  );
  spinner.stop(
    fetchedModels.length > 0
      ? `${fetchedModels.length} models available`
      : 'Could not list the models, showing suggestions'
  );

  const suggestedModels = setup?.suggestedModels ?? [];
  // Suggested models first (when available to the key), then the rest.
  const models = [
    ...suggestedModels.filter(
      (model) => fetchedModels.length === 0 || fetchedModels.includes(model)
    ),
    ...fetchedModels.filter((model) => !suggestedModels.includes(model)),
  ].slice(0, MAXIMUM_LISTED_MODELS);

  if (models.length === 0) {
    return p.text({
      message:
        'Which model do you want to use? (leave empty for the provider default)',
    });
  }

  const selectedModel = await p.select<string>({
    message: 'Which model do you want to use?',
    options: [
      ...models.map((model) => ({ value: model, label: model })),
      { value: CUSTOM_MODEL_VALUE, label: 'Other…', hint: 'type a model id' },
    ],
    initialValue: models[0],
  });

  if (p.isCancel(selectedModel) || selectedModel !== CUSTOM_MODEL_VALUE) {
    return selectedModel;
  }

  return p.text({ message: 'Model id:' });
};
