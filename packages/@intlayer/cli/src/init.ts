import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import {
  detectCompatI18nLibraries,
  hasLintTooling,
  hasUrlRoutingFramework,
  type InitOptions,
  initIntlayer,
  logInitSuccessMessage,
  type RoutingMode,
  setupCmsCredentials,
} from '@intlayer/engine/cli';
import { login } from './auth/login';
import { initChromeExtension } from './initChromeExtension';
import { initInfra } from './initInfra';
import { initMCP } from './initMCP';
import { initSkills } from './initSkills';
import { loadPrompts } from './loadPrompts';
import { isInteractiveTerminal } from './utils/isInteractiveTerminal';
import { parseChoice } from './utils/parseChoice';

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

/** Resolves the project root from `--project-root`, else the working directory. */
export const resolveProjectRoot = (projectRoot?: string): string =>
  findProjectRoot(projectRoot ? resolve(projectRoot) : process.cwd());

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

/**
 * Steps run by `intlayer init` without `--interactive`: install the packages
 * and set up the framework. Every other step has its own command
 * ({@link INIT_STEP_COMMANDS}), so nothing outside the app code is touched
 * unless asked for.
 */
export const DEFAULT_INIT_STEPS: InitStep[] = ['packages', 'projectSetup'];

/**
 * Command running each interactive step on its own, without prompts when every
 * value is passed as a flag. Printed when `--interactive` has no terminal.
 */
export const INIT_STEP_COMMANDS: Record<InitStep, string> = {
  packages: 'intlayer init packages',
  projectSetup: 'intlayer init project [--routing <routing>]',
  githubActions: 'intlayer init github-actions',
  vscodeExtension: 'intlayer init vscode-extension',
  eslint: 'intlayer init eslint',
  chromeExtension: 'intlayer init extension [--browser <chrome|firefox>]',
  skills: 'intlayer init skills [--platform <platform>] [--skills <skills...>]',
  mcp: 'intlayer init mcp [--platform <platform>] [--transport <stdio|sse>]',
  lsp: 'intlayer init lsp',
  cms: 'intlayer init cms',
  infra: 'intlayer init infra --mode <desktop|docker|compose>',
};

/**
 * Maps setup steps to the {@link initIntlayer} options: every step handled by
 * `initIntlayer` that is not listed is skipped. Explicit `--no-*` flags in
 * `baseOptions` still win over a listed step.
 */
export const getInitOptionsForSteps = (
  steps: InitStep[],
  baseOptions?: InitOptions
): InitOptions => ({
  ...baseOptions,
  noInstallPackages:
    baseOptions?.noInstallPackages || !steps.includes('packages'),
  // The `.gitignore` entry is tied to project setup.
  noGitignore: baseOptions?.noGitignore || !steps.includes('projectSetup'),
  noGithubActions:
    baseOptions?.noGithubActions || !steps.includes('githubActions'),
  noFrameworkSetup:
    baseOptions?.noFrameworkSetup || !steps.includes('projectSetup'),
  noVscodeExtension:
    baseOptions?.noVscodeExtension || !steps.includes('vscodeExtension'),
  noLsp: baseOptions?.noLsp || !steps.includes('lsp'),
  noEslint: baseOptions?.noEslint || !steps.includes('eslint'),
  // The documentation link only matters once the project itself is set up.
  skipFinalMessage:
    baseOptions?.skipFinalMessage || !steps.includes('projectSetup'),
});

/**
 * Runs the given {@link initIntlayer} steps only (packages, project setup, CI,
 * VS Code extension, LSP, lint rules). Backs `intlayer init` and its
 * single-step subcommands.
 */
export const initSteps = async (
  projectRoot: string | undefined,
  steps: InitStep[],
  options?: InitOptions
): Promise<void> => {
  await initIntlayer(
    resolveProjectRoot(projectRoot),
    getInitOptionsForSteps(steps, options)
  );
};

/**
 * Logs in to the Intlayer CMS through the browser, then stores the access-key
 * credentials in `.env` and enables the editor in the config file.
 */
export const initCms = async (projectRoot?: string): Promise<void> => {
  const root = resolveProjectRoot(projectRoot);
  const p = await loadPrompts();

  p.log.info('Opening your browser to log in to the Intlayer CMS...');
  // `exitAfter: false` keeps the process alive so the flow can finish; the
  // credentials are persisted to `.env` and the editor enabled in the config.
  await login({
    exitAfter: false,
    onCredentials: (credentials) => setupCmsCredentials(root, credentials),
  });
};

/** Explains why `--interactive` cannot run, and what to run instead. */
const getNoTerminalMessage = (): string =>
  [
    '`intlayer init --interactive` needs a terminal to answer its prompts (none is attached, e.g. when run by an AI agent or in CI).',
    'Run the steps directly instead:',
    '  intlayer init    (installs the packages and sets up the framework)',
    ...Object.values(INIT_STEP_COMMANDS).map((command) => `  ${command}`),
  ].join('\n');

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
export const parseLocaleRoutingChoice = (value: string): LocaleRoutingChoice =>
  parseChoice(value, LOCALE_ROUTING_CHOICES, '--routing');

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
    ...getInitOptionsForSteps(steps, { ...baseOptions, ...routingOptions }),
    skipFinalMessage: true,
  };

  const { guideUrl } = await initIntlayer(root, options);

  // Skills ask for the platform after the skill selection; MCP reuses it.
  const skillsPlatform = steps.includes('skills')
    ? await initSkills(root)
    : undefined;

  if (steps.includes('mcp')) {
    await initMCP(root, { platform: skillsPlatform });
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
    await initCms(root);
  }

  p.outro('Intlayer initialization complete');

  if (guideUrl) {
    logInitSuccessMessage(guideUrl);
  }
};

/**
 * `intlayer init`: installs the packages and sets up the framework, or, with
 * `interactive`, lets the user pick every setup step. `--interactive` needs a
 * terminal; without one it fails and lists the single-step commands instead.
 */
export const init = async (
  projectRoot?: string,
  options?: InitOptions,
  interactive?: boolean
) => {
  if (!interactive) {
    await initSteps(projectRoot, DEFAULT_INIT_STEPS, options);
    return;
  }

  if (!isInteractiveTerminal()) {
    const p = await loadPrompts();

    p.log.error(getNoTerminalMessage());
    process.exitCode = 1;
    return;
  }

  await runInteractiveInit(resolveProjectRoot(projectRoot), options);
};
