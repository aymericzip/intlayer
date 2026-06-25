import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import * as p from '@clack/prompts';
import {
  type InitOptions,
  initIntlayer,
  PLATFORMS,
  type Platform,
  type RoutingMode,
  setupCmsCredentials,
} from '@intlayer/chokidar/cli';
import enquirer from 'enquirer';
import { login } from './auth/login';
import { initBuildOptimization } from './initBuildOptimization';
import { initCompiler } from './initCompiler';
import { initMCP } from './initMCP';
import {
  getDetectedPlatform,
  initSkills,
  PLATFORM_OPTIONS,
} from './initSkills';

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
type InitStep =
  | 'packages'
  | 'githubActions'
  | 'frameworkSetup'
  | 'vscodeExtension'
  | 'lsp'
  | 'skills'
  | 'mcp'
  | 'compiler'
  | 'buildOptimization';

const BASE_INIT_STEP_OPTIONS: Array<{
  value: InitStep;
  label: string;
  hint: string;
}> = [
  {
    value: 'packages',
    label: 'Install & upgrade packages',
    hint: 'install missing Intlayer dependencies and upgrade outdated ones',
  },
  {
    value: 'githubActions',
    label: 'CI/CD (GitHub Actions)',
    hint: 'scaffold the fill and test workflows that run on every pull request',
  },
  {
    value: 'frameworkSetup',
    label: 'Framework setup',
    hint: 'middleware/proxy and providers in layout/page',
  },
  {
    value: 'vscodeExtension',
    label: 'VS Code extension',
    hint: 'recommend the Intlayer extension',
  },
  {
    value: 'lsp',
    label: 'Editor LSP',
    hint: 'go-to-definition from keys to .content files',
  },
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
];

/** Locale routing strategies offered by the interactive init flow. */
const ROUTING_MODE_OPTIONS: Array<{
  value: RoutingMode;
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
];

/** Reads the merged dependencies of the project at `root`. */
const getProjectDependencies = (root: string): Record<string, string> => {
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

/** Returns true when the project at `root` depends on Next.js. */
const isNextJsProject = (root: string): boolean =>
  Boolean(getProjectDependencies(root).next);

/** Returns true when the project at `root` depends on Vite. */
const isViteProject = (root: string): boolean =>
  Boolean(getProjectDependencies(root).vite);

/**
 * Returns true when the project uses a URL-based router for which a locale
 * routing strategy is meaningful: Next.js, React Router, or TanStack Router.
 * Apps without URL routing (e.g. React Native / Expo) are excluded, since
 * `routing.mode` has no effect there.
 */
const hasUrlRouting = (root: string): boolean => {
  const deps = getProjectDependencies(root);

  // React Native / Expo apps have no URL routing — never ask for a strategy.
  if (deps['react-native'] || deps.expo) return false;

  return Boolean(
    deps.next ||
      deps['react-router'] ||
      deps['react-router-dom'] ||
      deps['@tanstack/react-router'] ||
      deps['@tanstack/react-start']
  );
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
  p.intro('Initialize Intlayer');

  const stepOptions = [...BASE_INIT_STEP_OPTIONS];

  const nextJsProject = isNextJsProject(root);

  // The compiler is plugged in directly on Vite; on Next.js it needs a Babel
  // config. Only offer the step when one of those frameworks is detected.
  if (nextJsProject || isViteProject(root)) {
    stepOptions.push({
      value: 'compiler',
      label: 'Compiler',
      hint: nextJsProject
        ? 'add the Babel compiler config to extract inline content (Next.js)'
        : 'auto-extract inline content at build time (already plugged in on Vite)',
    });
  }

  if (nextJsProject) {
    stepOptions.push({
      value: 'buildOptimization',
      label: 'Bundle optimization',
      hint: 'choose @intlayer/babel or @intlayer/swc for tree-shaking and minification (Next.js only)',
    });
  }

  const selected = await p.multiselect<InitStep>({
    message: 'Select what you want to set up:',
    options: stepOptions,
    initialValues: BASE_INIT_STEP_OPTIONS.map((option) => option.value),
    required: false,
  });

  if (p.isCancel(selected)) {
    p.cancel('Operation cancelled.');
    return;
  }

  const steps = selected as InitStep[];

  // Locale routing strategy → written to `routing.mode` in the config file.
  // Only relevant for URL-based routers (Next.js, React Router, TanStack);
  // skipped for apps without URL routing such as React Native / Expo.
  let routingMode: RoutingMode | undefined;

  if (hasUrlRouting(root)) {
    const selectedRoutingMode = await p.select<RoutingMode>({
      message: 'Which locale routing strategy do you want?',
      options: ROUTING_MODE_OPTIONS,
      initialValue: 'prefix-no-default',
    });

    if (p.isCancel(selectedRoutingMode)) {
      p.cancel('Operation cancelled.');
      return;
    }

    routingMode = selectedRoutingMode;
  }

  const options: InitOptions = {
    ...baseOptions,
    routingMode,
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
      baseOptions?.noFrameworkSetup || !steps.includes('frameworkSetup'),
    noVscodeExtension: !steps.includes('vscodeExtension'),
    noLsp: !steps.includes('lsp'),
  };

  await initIntlayer(root, options);

  const needsPlatform = steps.includes('skills') || steps.includes('mcp');

  let sharedPlatform: Platform | undefined;

  if (needsPlatform) {
    const detectedPlatform = getDetectedPlatform();

    try {
      const response = await enquirer.prompt<{ platforms: Platform }>({
        type: 'autocomplete',
        name: 'platforms',
        message: 'Which platform are you using? (Type to search)',
        multiple: false,
        initial: detectedPlatform
          ? PLATFORMS.indexOf(detectedPlatform)
          : undefined,
        choices: PLATFORM_OPTIONS.map((opt) => ({
          name: opt.value,
          message: opt.label,
          hint: opt.hint,
        })),
      });
      sharedPlatform = response.platforms;
    } catch {
      p.cancel('Operation cancelled.');
      return;
    }
  }

  if (steps.includes('skills')) {
    await initSkills(root, sharedPlatform);
  }

  if (steps.includes('mcp')) {
    await initMCP(root, sharedPlatform);
  }

  if (steps.includes('compiler')) {
    await initCompiler(root);
  }

  if (steps.includes('buildOptimization')) {
    await initBuildOptimization(root);
  }

  // CMS / visual editor is the last step: an opt-in browser login that
  // persists the access-key credentials to `.env` and enables the editor in the
  // config file. Asked last so the browser flow does not interrupt setup.
  const shouldSetUpCms = await p.confirm({
    message:
      'Set up the Intlayer CMS now? (opens your browser to log in, then stores the credentials in your .env)',
    initialValue: false,
  });

  if (p.isCancel(shouldSetUpCms)) {
    p.cancel('Operation cancelled.');
    return;
  }

  if (shouldSetUpCms) {
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
