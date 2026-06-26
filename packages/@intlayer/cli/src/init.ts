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

/**
 * Compat i18n library options surfaced in the interactive init prompt.
 * The `packages` field lists the package names to inject as hint-deps so
 * `detectMissingIntlayerPackages` detects the right sync plugin even before
 * those libraries are installed.
 */
type CompatLibOption = {
  value: string;
  label: string;
  hint: string;
  /**
   * Package names to inject as hint-dependencies (fake "installed" so that
   * the detection logic schedules the correct sync plugin and compat adapter).
   */
  packages?: string[];
};

const COMPAT_LIB_OPTIONS: CompatLibOption[] = [
  {
    value: 'i18next',
    label: 'i18next / react-i18next',
    hint: 'i18next JSON format — installs @intlayer/i18next + @intlayer/sync-json-plugin',
    packages: ['i18next', 'react-i18next'],
  },
  {
    value: 'next-intl',
    label: 'next-intl / use-intl',
    hint: 'ICU format, Next.js — installs @intlayer/next-intl + @intlayer/sync-json-plugin',
    packages: ['next-intl'],
  },
  {
    value: 'vue-i18n',
    label: 'vue-i18n',
    hint: 'Vue i18n JSON format — installs @intlayer/vue-i18n + @intlayer/sync-json-plugin',
    packages: ['vue-i18n'],
  },
  {
    value: 'nuxtjs-i18n',
    label: '@nuxtjs/i18n',
    hint: 'Nuxt i18n module — installs @intlayer/nuxtjs-i18n + @intlayer/sync-json-plugin',
    packages: ['@nuxtjs/i18n'],
  },
  {
    value: 'next-i18next',
    label: 'next-i18next',
    hint: 'i18next JSON format, Next.js — installs @intlayer/next-i18next + @intlayer/sync-json-plugin',
    packages: ['next-i18next'],
  },
  {
    value: 'next-translate',
    label: 'next-translate',
    hint: 'i18next flat-namespace JSON, Next.js — installs @intlayer/next-translate + @intlayer/sync-json-plugin',
    packages: ['next-translate'],
  },
  {
    value: 'react-intl',
    label: 'react-intl',
    hint: 'ICU format — installs @intlayer/react-intl + @intlayer/sync-json-plugin',
    packages: ['react-intl'],
  },
  {
    value: 'lingui-po',
    label: 'Lingui (.po catalogs)',
    hint: "gettext PO — Lingui's default, installs @intlayer/lingui + @intlayer/sync-po-plugin",
    packages: ['@lingui/core'],
  },
  {
    value: 'lingui-json',
    label: 'Lingui (.json catalogs)',
    hint: 'JSON catalogs — installs @intlayer/lingui + @intlayer/sync-json-plugin',
    packages: ['@lingui/core'],
  },
  {
    value: 'svelte-i18n',
    label: 'svelte-i18n',
    hint: 'Flat i18next JSON — installs @intlayer/svelte-i18n + @intlayer/sync-json-plugin',
    packages: ['svelte-i18n'],
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

  // Compat i18n library detection / selection.
  // When a compat library is already present in package.json the detection
  // in detectMissingIntlayerPackages handles everything automatically. We
  // only show the prompt when none of the known compat libs is detected so
  // we don't ask redundant questions.
  const knownCompatPackages = [
    'i18next',
    'react-i18next',
    'next-intl',
    'use-intl',
    'vue-i18n',
    '@nuxtjs/i18n',
    'next-i18next',
    'next-translate',
    'react-intl',
    '@lingui/core',
    '@lingui/react',
    'svelte-i18n',
    '@ngneat/transloco',
    '@ngx-translate/core',
    'node-polyglot',
    'i18n-js',
  ];

  const existingDeps = getProjectDependencies(root);
  const hasCompatLib = knownCompatPackages.some((pkg) =>
    Boolean(existingDeps[pkg])
  );

  let hintDependencies: Record<string, string> | undefined;

  if (!hasCompatLib) {
    const selectedCompatLibs = await p.multiselect<string>({
      message:
        'Are you using any existing i18n library? (Select all that apply, or press Enter to skip)',
      options: COMPAT_LIB_OPTIONS.map((opt) => ({
        value: opt.value,
        label: opt.label,
        hint: opt.hint,
      })),
      required: false,
    });

    if (p.isCancel(selectedCompatLibs)) {
      p.cancel('Operation cancelled.');
      return;
    }

    const selectedLibs = selectedCompatLibs as string[];

    if (selectedLibs.length > 0) {
      hintDependencies = {};

      for (const value of selectedLibs) {
        const option = COMPAT_LIB_OPTIONS.find((o) => o.value === value);
        if (option?.packages) {
          for (const pkg of option.packages) {
            hintDependencies[pkg] = '*';
          }
        }
      }

      // Lingui-specific: determine the catalog format so the right sync plugin
      // is chosen. If both lingui variants are selected, ask for clarification.
      const hasLinguiPo = selectedLibs.includes('lingui-po');
      const hasLinguiJson = selectedLibs.includes('lingui-json');

      if (hasLinguiPo && hasLinguiJson) {
        // Both selected — ask for clarification
        const linguiFormat = await p.select<'po' | 'json'>({
          message: 'Which catalog format does Lingui use in your project?',
          options: [
            {
              value: 'po' as const,
              label: '.po files (gettext)',
              hint: "Lingui's default — installs @intlayer/sync-po-plugin",
            },
            {
              value: 'json' as const,
              label: '.json files',
              hint: 'JSON catalogs — installs @intlayer/sync-json-plugin',
            },
          ],
          initialValue: 'po' as const,
        });

        if (p.isCancel(linguiFormat)) {
          p.cancel('Operation cancelled.');
          return;
        }

        // Signal JSON format to detectMissingIntlayerPackages via a sentinel
        // hint dep (the lingui detection only needs @lingui/core; the format
        // is conveyed through linguiCatalogFormat option from the filesystem
        // scan). For JSON we override by injecting a flag the init/index.ts
        // can read back from hintDependencies.
        if (linguiFormat === 'json') {
          hintDependencies['__lingui_json__'] = '*';
        }
      } else if (hasLinguiJson && !hasLinguiPo) {
        hintDependencies['__lingui_json__'] = '*';
      }
      // hasLinguiPo alone: @lingui/core hint is enough; PO is the default
    }
  }

  const options: InitOptions = {
    ...baseOptions,
    routingMode,
    hintDependencies,
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
