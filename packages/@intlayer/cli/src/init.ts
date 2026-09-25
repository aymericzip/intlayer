import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import {
  detectCompatI18nLibraries,
  hasLintTooling,
  hasUrlRoutingFramework,
  type InitOptions,
  initIntlayer,
  type RoutingMode,
  setupCmsCredentials,
} from '@intlayer/engine/cli';
import { login } from './auth/login';
import { initChromeExtension } from './initChromeExtension';
import { initInfra } from './initInfra';
import { initMCP } from './initMCP';
import { initSkills } from './initSkills';
import { loadPrompts } from './loadPrompts';

export const findProjectRoot = (startDir: string) => {
  let currentDir = startDir;

  while (currentDir !== resolve(currentDir, '..')) {
    if (existsSync(join(currentDir, 'package.json'))) {
      return currentDir;
    }
    currentDir = resolve(currentDir, '..');
  }

  // If no package.json is found, return the start directory.
  // The initIntlayer function will handle the missing package.json error.
  return startDir;
};

/** Individually selectable setup steps exposed by the interactive init flow. */
export type InitStep =
  | 'packages'
  | 'githubActions'
  | 'projectSetup'
  | 'vscodeExtension'
  | 'lsp'
  | 'eslint'
  | 'skills'
  | 'mcp'
  | 'infra'
  | 'cms'
  | 'chromeExtension';

/** A checkbox entry of the interactive init flow. */
export type InitStepOption = {
  value: InitStep;
  label: string;
  hint: string;
};

/**
 * Steps shown but not pre-selected. The infrastructure installer touches the
 * machine (downloads an app, pulls Docker images) and browser extensions open external URLs
 * rather than modifying the project, so they must be an explicit choice.
 */
export const OPT_IN_INIT_STEPS: InitStep[] = ['infra', 'chromeExtension'];

/** Grouped checkbox entries of the interactive init flow, in display order. */
export const INIT_STEP_GROUPS: Record<string, InitStepOption[]> = {
  Codebase: [
    {
      value: 'packages',
      label: 'Install & upgrade packages',
      hint: 'install missing Intlayer dependencies and upgrade outdated ones',
    },
    {
      value: 'projectSetup',
      label: 'Project setup',
      hint: 'intlayer config, tsconfig, bundler plugin, middleware/proxy and providers in layout/page',
    },
    {
      value: 'githubActions',
      label: 'CI/CD (GitHub Actions)',
      hint: 'scaffold the fill and test workflows that run on every pull request (covers every project in a monorepo)',
    },
  ],
  DevTools: [
    {
      value: 'vscodeExtension',
      label: 'VS Code extension',
      hint: 'recommend the Intlayer extension',
    },
    {
      value: 'eslint',
      label: 'Lint rules (ESLint / oxlint)',
      hint: 'flag hardcoded text and dynamic calls the compiler cannot optimize',
    },
    {
      value: 'chromeExtension',
      label: 'Chrome extension',
      hint: 'for audit, debug and analysis purpose',
    },
  ],
  'Coding assistant': [
    {
      value: 'skills',
      label: 'AI skills',
      hint: 'install the Intlayer documentation as agent skills',
    },
    {
      value: 'mcp',
      label: 'MCP server',
      hint: 'configure the Intlayer MCP server',
    },
    {
      value: 'lsp',
      label: 'Editor LSP',
      hint: 'go-to-definition from keys to .content files',
    },
  ],
  CMS: [
    {
      value: 'cms',
      label: 'CMS',
      hint: 'log in through your browser, then store the credentials in your .env',
    },
    {
      value: 'infra',
      label: 'Infrastructure (desktop app / self-hosting)',
      hint: 'install the desktop app, or self-host with Docker (all-in-one or Compose)',
    },
  ],
};

/**
 * Locale routing choice: a `routing.mode` served through the locale proxy, or
 * `none` to leave routing to the app (`no-prefix` with the proxy disabled).
 */
export type LocaleRoutingChoice = RoutingMode | 'none';

/** Locale routing strategies offered by the interactive init flow. */
const ROUTING_OPTIONS: Array<{
  value: LocaleRoutingChoice;
  label: string;
  hint: string;
}> = [
  {
    value: 'prefix-no-default',
    label: 'Prefix all except the default locale',
    hint: '/about, /fr/about (default)',
  },
  {
    value: 'prefix-all',
    label: 'Prefix all locales',
    hint: '/en/about, /fr/about',
  },
  {
    value: 'no-prefix',
    label: 'No locale in the URL',
    hint: '/about',
  },
  {
    value: 'search-params',
    label: 'Use a search parameter',
    hint: '/about?locale=fr',
  },
  {
    value: 'none',
    label: 'No locale routing',
    hint: 'no proxy, no locale route segment — handle the locale yourself',
  },
];

/** Locale routing choices accepted by `--routing`. */
export const LOCALE_ROUTING_CHOICES = ROUTING_OPTIONS.map(
  (option) => option.value
);

/** Validates a `--routing` value, throwing on an unknown choice. */
export const parseLocaleRoutingChoice = (
  value: string
): LocaleRoutingChoice => {
  const choice = LOCALE_ROUTING_CHOICES.find((routing) => routing === value);

  if (!choice) {
    throw new Error(
      `Invalid --routing value "${value}". Expected one of: ${LOCALE_ROUTING_CHOICES.join(', ')}.`
    );
  }

  return choice;
};

/** Maps a routing choice to the init options it sets. */
export const getRoutingInitOptions = (
  choice: LocaleRoutingChoice
): Pick<InitOptions, 'routingMode' | 'enableProxy'> =>
  choice === 'none'
    ? { routingMode: 'no-prefix', enableProxy: false }
    : { routingMode: choice, enableProxy: true };

/** Known ESLint and oxlint configuration file names. */
export const ESLINT_CONFIG_FILES = [
  'eslint.config.js',
  'eslint.config.mjs',
  'eslint.config.cjs',
  'eslint.config.ts',
  'eslint.config.mts',
  'eslint.config.cts',
  '.eslintrc.js',
  '.eslintrc.cjs',
  '.eslintrc.yaml',
  '.eslintrc.yml',
  '.eslintrc.json',
  '.eslintrc',
  '.oxlintrc.json',
];

/**
 * Checks whether ESLint or a compatible linter (oxlint) is installed or
 * configured in the project.
 */
export const isEslintInstalled = (
  dependencies: Record<string, string>,
  root?: string
): boolean => {
  if (hasLintTooling(dependencies)) return true;
  if (dependencies.eslint || dependencies.oxlint) return true;

  if (root) {
    return ESLINT_CONFIG_FILES.some((file) => existsSync(join(root, file)));
  }

  return false;
};

/**
 * Computes the initial setup steps selected by default in the interactive prompt.
 * Steps like infrastructure and browser extension require opt-in, while
 * eslint is preselected only if installed on the project.
 */
export const getInitialInitSteps = (
  dependencies: Record<string, string>,
  root?: string
): InitStep[] => {
  const isEslintPresent = isEslintInstalled(dependencies, root);

  return Object.values(INIT_STEP_GROUPS)
    .flat()
    .map((option) => option.value)
    .filter((step) => {
      if (OPT_IN_INIT_STEPS.includes(step)) return false;
      if (step === 'eslint' && !isEslintPresent) return false;
      return true;
    });
};

/** Reads the merged dependencies of the project at `root`. */
export const getProjectDependencies = (
  root: string
): Record<string, string> => {
  try {
    const packageJsonPath = join(root, 'package.json');
    if (!existsSync(packageJsonPath)) return {};
    const { dependencies = {}, devDependencies = {} } = JSON.parse(
      readFileSync(packageJsonPath, 'utf-8')
    );
    return { ...dependencies, ...devDependencies };
  } catch {
    return {};
  }
};

/**
 * Runs `init` in interactive mode: prompts the user with a checkbox of setup
 * steps, then forwards the selection to {@link initIntlayer} (packages, GitHub
 * Actions, VS Code extension, LSP) and runs the dedicated skills/MCP installers
 * for the steps that own their own prompts. The `.gitignore` entry is not
 * offered as a checkbox — it is always added (unless `--no-gitignore` is set).
 */
const runInteractiveInit = async (
  root: string,
  baseOptions?: InitOptions
): Promise<void> => {
  const p = await loadPrompts();

  p.intro('Initialize Intlayer');

  const projectDependencies = getProjectDependencies(root);

  const selected = await p.groupMultiselect<InitStep>({
    message: 'Select what you want to set up:',
    options: INIT_STEP_GROUPS,
    initialValues: getInitialInitSteps(projectDependencies, root),
    required: false,
  });

  if (p.isCancel(selected)) {
    p.cancel('Operation cancelled.');
    return;
  }

  const steps = selected as InitStep[];

  // Compat i18n library detection — never asked, always derived from the
  // installed packages. `detectMissingIntlayerPackages` reads the very same
  // dependency map to schedule the compat adapter, the sync plugin and the
  // catalog template, so a project without any of those packages is simply set
  // up on Intlayer alone.
  const detectedCompatLibraries =
    detectCompatI18nLibraries(projectDependencies);
  const hasCompatLib = detectedCompatLibraries.length > 0;

  if (hasCompatLib) {
    p.log.info(
      `Detected existing i18n ${detectedCompatLibraries.length > 1 ? 'libraries' : 'library'}: ${detectedCompatLibraries.join(', ')} — the matching Intlayer compat adapter and catalog sync will be set up.`
    );
  }

  // Locale routing → `routing.mode` + `routing.enableProxy` in the config, and
  // the route segment the framework scaffolding creates. Only asked for web
  // frontends; projects without URL routing (backend, React Native / Expo) keep
  // only `routing.storage` in a freshly created config. Skipped for compat
  // i18n libraries, which keep their own routing.
  let routingOptions: Pick<InitOptions, 'routingMode' | 'enableProxy'> = {};

  if (
    steps.includes('projectSetup') &&
    baseOptions?.routingMode === undefined &&
    !hasCompatLib &&
    hasUrlRoutingFramework(projectDependencies)
  ) {
    const selectedRouting = await p.select<LocaleRoutingChoice>({
      message: 'How should the locale appear in your URLs?',
      options: ROUTING_OPTIONS,
      initialValue: 'prefix-no-default',
    });

    if (p.isCancel(selectedRouting)) {
      p.cancel('Operation cancelled.');
      return;
    }

    routingOptions = getRoutingInitOptions(selectedRouting);
  }

  const options: InitOptions = {
    ...baseOptions,
    ...routingOptions,
    noInstallPackages: !steps.includes('packages'),
    // The `.gitignore` entry is never offered as a checkbox: in interactive
    // mode we always add `.intlayer` to `.gitignore`, only honoring an explicit
    // `--no-gitignore` flag from the command line.
    noGitignore: baseOptions?.noGitignore,
    // Respect explicit `--no-*` flags from the command line even when the
    // corresponding step is selected in the checkbox.
    noGithubActions:
      baseOptions?.noGithubActions || !steps.includes('githubActions'),
    noFrameworkSetup:
      baseOptions?.noFrameworkSetup || !steps.includes('projectSetup'),
    noVscodeExtension: !steps.includes('vscodeExtension'),
    noLsp: !steps.includes('lsp'),
    noEslint: !steps.includes('eslint'),
  };

  await initIntlayer(root, options);

  // Skills ask for the platform after the skill selection; MCP reuses it.
  const skillsPlatform = steps.includes('skills')
    ? await initSkills(root)
    : undefined;

  if (steps.includes('mcp')) {
    await initMCP(root, skillsPlatform);
  }

  // Delegated to the hosted install script, which owns its own menu.
  if (steps.includes('infra')) {
    await initInfra();
  }

  if (steps.includes('chromeExtension')) {
    await initChromeExtension();
  }

  // CMS / visual editor runs last: the browser login persists the access-key
  // credentials to `.env` and enables the editor in the config file. Kept last
  // so the browser flow does not interrupt setup.
  if (steps.includes('cms')) {
    p.log.info('Opening your browser to log in to the Intlayer CMS...');
    // `exitAfter: false` keeps the process alive so the flow can finish; the
    // credentials are persisted to `.env` and the editor enabled in the config.
    await login({
      exitAfter: false,
      onCredentials: (credentials) => setupCmsCredentials(root, credentials),
    });
  }

  p.outro('Intlayer initialization complete');
};

export const init = async (
  projectRoot?: string,
  options?: InitOptions,
  interactive?: boolean
) => {
  const root = projectRoot
    ? findProjectRoot(resolve(projectRoot))
    : findProjectRoot(process.cwd());

  if (interactive) {
    await runInteractiveInit(root, options);
    return;
  }

  await initIntlayer(root, options);
};
