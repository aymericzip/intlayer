import { join } from 'node:path';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, colorizePath, logger, v, x } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import { getAlias } from '@intlayer/config/utils';
import { initConfig } from '../initConfig';
import { setCompilerOutputInConfig, setRoutingModeInConfig } from './cms';
import { setupFramework } from './frameworkSetup';
import type { CompatSyncConfig, RoutingMode } from './utils';
import {
  detectJsonLocalePattern,
  detectLinguiCatalogPattern,
  detectMissingIntlayerPackages,
  detectNextIntlMessagesPattern,
  detectOutdatedIntlayerPackages,
  detectPackageManager,
  ensureDirectory,
  exists,
  findTsConfigFiles,
  getGithubWorkflows,
  getMetroConfigTemplate,
  installPackages,
  isVersionAtLeast,
  parseJSONWithComments,
  readFileFromRoot,
  replaceViteConfigPluginImportSource,
  setupNextCompilerBabelConfig,
  updateAstroConfig,
  updateIntlayerConfigWithSyncPlugin,
  updateMetroConfig,
  updateNextConfig,
  updateNextConfigForNextI18next,
  updateNextConfigForNextIntl,
  updateNextConfigForNextTranslate,
  updateNuxtConfig,
  updateNuxtConfigForNuxtjsI18n,
  updateViteConfig,
  updateViteConfigForCompatPlugin,
  upgradePackages,
  writeFileToRoot,
} from './utils';

/**
 * Documentation URL Constants
 */
const DocumentationRouter = {
  NextJS: 'https://intlayer.org/doc/environment/nextjs.md',
  NextJS_15: 'https://intlayer.org/doc/environment/nextjs/15.md',
  NextJS_14: 'https://intlayer.org/doc/environment/nextjs/14.md',
  CRA: 'https://intlayer.org/doc/environment/create-react-app.md',
  Astro: 'https://intlayer.org/doc/environment/astro.md',
  ViteAndReact: 'https://intlayer.org/doc/environment/vite-and-react.md',
  ViteAndReact_ReactRouterV7:
    'https://intlayer.org/doc/environment/vite-and-react/react-router-v7.md',
  ViteAndReact_ReactRouterV7_FSRoutes:
    'https://intlayer.org/doc/environment/vite-and-react/react-router-v7-fs-routes.md',
  ViteAndVue: 'https://intlayer.org/doc/environment/vite-and-vue.md',
  ViteAndSolid: 'https://intlayer.org/doc/environment/vite-and-solid.md',
  ViteAndSvelte: 'https://intlayer.org/doc/environment/vite-and-svelte.md',
  ViteAndPreact: 'https://intlayer.org/doc/environment/vite-and-preact.md',
  TanStackRouter: 'https://intlayer.org/doc/environment/tanstack.md',
  NuxtAndVue: 'https://intlayer.org/doc/environment/nuxt-and-vue.md',
  Angular: 'https://intlayer.org/doc/environment/angular.md',
  SvelteKit: 'https://intlayer.org/doc/environment/sveltekit.md',
  ReactNativeAndExpo:
    'https://intlayer.org/doc/environment/react-native-and-expo.md',
  Lynx: 'https://intlayer.org/doc/environment/lynx-and-react.md',
  Express: 'https://intlayer.org/doc/environment/express.md',
  NestJS: 'https://intlayer.org/doc/environment/nestjs.md',
  Fastify: 'https://intlayer.org/doc/environment/fastify.md',
  Default: 'https://intlayer.org/doc/get-started',

  // Intlayer Language Server (Go-to-Definition from getter keys to .content files)
  LSP: 'https://intlayer.org/doc/lsp.md',

  // Check for competitors libs
  NextIntl: 'https://intlayer.org/blog/intlayer-with-next-intl.md',
  ReactI18Next: 'https://intlayer.org/blog/intlayer-with-react-i18next.md',
  ReactIntl: 'https://intlayer.org/blog/intlayer-with-react-intl.md',
  NextI18Next: 'https://intlayer.org/blog/intlayer-with-next-i18next.md',
  VueI18n: 'https://intlayer.org/blog/intlayer-with-vue-i18n.md',
};

/**
 * Helper: Detects the environment and returns the doc URL
 */
const getDocumentationUrl = (packageJson: any): string => {
  const deps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  /**
   * Helper to check if a version string matches a specific major version
   * Matches: "15", "^15.0.0", "~15.2", "15.0.0-beta"
   */
  const isVersion = (versionString: string, major: number): boolean => {
    if (!versionString || typeof versionString !== 'string') return false;
    const regex = new RegExp(`^[\\^~]?${major}(?:\\.|$)`);
    return regex.test(versionString);
  };

  // Mobile / Cross-platform
  if (deps['@lynx-js/react'] || deps['@lynx-js/core']) {
    return DocumentationRouter.Lynx;
  }
  if (deps['react-native'] || deps.expo) {
    return DocumentationRouter.ReactNativeAndExpo;
  }

  // Meta-frameworks (Next, Nuxt, Astro, SvelteKit)
  if (deps.next) {
    const version = deps.next;

    if (isVersion(version, 14)) {
      return DocumentationRouter.NextJS_14;
    }

    if (isVersion(version, 15)) {
      return DocumentationRouter.NextJS_15;
    }

    return DocumentationRouter.NextJS;
  }

  if (deps.nuxt) return DocumentationRouter.NuxtAndVue;
  if (deps.astro) return DocumentationRouter.Astro;
  if (deps['@sveltejs/kit']) return DocumentationRouter.SvelteKit;

  // Routers (TanStack & React Router v7)
  if (deps['@tanstack/react-router']) {
    return DocumentationRouter.TanStackRouter;
  }

  // Check for React Router v7
  const reactRouterVersion = deps['react-router'];
  if (reactRouterVersion && typeof reactRouterVersion === 'string') {
    // Distinguish between standard v7 and v7 with FS routes
    if (deps['@react-router/fs-routes']) {
      return DocumentationRouter.ViteAndReact_ReactRouterV7_FSRoutes;
    }

    // Use Regex to ensure it is v7
    if (isVersion(reactRouterVersion, 7)) {
      return DocumentationRouter.ViteAndReact_ReactRouterV7;
    }
  }

  // Vite Ecosystem (General)
  if (deps.vite) {
    if (deps.vue) return DocumentationRouter.ViteAndVue;
    if (deps['solid-js']) return DocumentationRouter.ViteAndSolid;
    if (deps.svelte) return DocumentationRouter.ViteAndSvelte;
    if (deps.preact) return DocumentationRouter.ViteAndPreact;

    // Default to React if Vite is present but specific other frameworks aren't found
    return DocumentationRouter.ViteAndReact;
  }

  // Other Web Frameworks
  if (deps['react-scripts']) return DocumentationRouter.CRA;
  if (deps['@angular/core']) return DocumentationRouter.Angular;

  // Backend
  if (deps['@nestjs/core']) return DocumentationRouter.NestJS;
  if (deps.express) return DocumentationRouter.Express;
  if (deps.fastify) return DocumentationRouter.Fastify;

  // Competitor Libs (Migration Guides)
  // We check these last as specific environment setup is usually higher priority,
  // but if no specific framework logic matched (or as a fallback), we guide to migration.
  if (deps['next-intl']) return DocumentationRouter.NextIntl;
  if (deps['react-i18next'] || deps.i18next)
    return DocumentationRouter.ReactI18Next;
  if (deps['react-intl']) return DocumentationRouter.ReactIntl;
  if (deps['next-i18next']) return DocumentationRouter.NextI18Next;
  if (deps['vue-i18n']) return DocumentationRouter.VueI18n;

  return DocumentationRouter.Default;
};

/**
 * Resolves the default dev-server URL of the detected framework, used as the
 * `editor.applicationURL` of the generated configuration file. Frameworks that
 * embed Vite (Astro, SvelteKit, …) are checked before the bare Vite fallback so
 * their own dev port wins.
 */
export const getDefaultApplicationURL = (
  dependencies: Record<string, string>
): string => {
  if (dependencies.next) return 'http://localhost:3000';
  if (dependencies.astro) return 'http://localhost:4321';
  if (dependencies['@angular/core']) return 'http://localhost:4200';
  if (dependencies.nuxt) return 'http://localhost:3000';
  if (dependencies['@sveltejs/kit']) return 'http://localhost:5173';
  if (dependencies['react-scripts']) return 'http://localhost:3000';
  if (dependencies.vite) return 'http://localhost:5173';

  return 'http://localhost:3000';
};

/**
 * How the interactive init organizes autogenerated content (compiler output /
 * autofill):
 * - `per-component` — multilingual `.content` files co-located with components
 *   (the configuration template default).
 * - `centralized` — per-locale JSON dictionaries under `/locales/{locale}/`.
 * - `json-namespaces` — plain per-locale JSON namespace files kept in sync
 *   through `@intlayer/sync-json-plugin`.
 */
export type ContentStrategy =
  | 'per-component'
  | 'centralized'
  | 'json-namespaces';

/**
 * OPTIONS
 */
export type InitOptions = {
  noGitignore?: boolean;
  /** Skip scaffolding the `fill` and `test` GitHub Actions workflows. */
  noGithubActions?: boolean;
  /**
   * Skip installing missing Intlayer dependencies and upgrading outdated ones.
   */
  noInstallPackages?: boolean;
  /** Skip adding the Intlayer extension to `.vscode/extensions.json`. */
  noVscodeExtension?: boolean;
  /** Skip writing the Intlayer LSP configuration to `.vscode/settings.json`. */
  noLsp?: boolean;
  /**
   * Skip framework-specific scaffolding (middleware/proxy, providers in
   * layout/page, example content). Defaults to enabled.
   */
  noFrameworkSetup?: boolean;
  /**
   * Version that outdated Intlayer packages should be upgraded to (typically the
   * running CLI version). When omitted, installed packages are left untouched and
   * only missing ones are installed.
   */
  upgradeToVersion?: string;
  /**
   * Locale routing strategy to write to `routing.mode` in the generated/existing
   * Intlayer configuration file. When omitted, the configuration default
   * (`prefix-no-default`) is kept.
   */
  routingMode?: RoutingMode;
  /**
   * Extra packages hinted by the interactive init prompt (compat i18n library
   * selections made before those libraries are actually installed). These are
   * merged into the dependency map used by {@link detectMissingIntlayerPackages}
   * so the correct sync plugin and compat adapter are always scheduled.
   */
  hintDependencies?: Record<string, string>;
  /**
   * Content organization strategy chosen by the interactive init prompt. Drives
   * the `compiler.output` template (`centralized`) or the injection of the
   * syncJSON plugin (`json-namespaces`). When omitted (or `per-component`), the
   * configuration template default is kept.
   */
  contentStrategy?: ContentStrategy;
};

/**
 * MAIN LOGIC
 */
export const initIntlayer = async (rootDir: string, options?: InitOptions) => {
  logger(colorize('Checking Intlayer configuration...', ANSIColors.CYAN));

  // READ PACKAGE.JSON
  const packageJsonPath = 'package.json';
  if (!(await exists(rootDir, packageJsonPath))) {
    logger(
      `${x} No ${colorizePath('package.json')} found. Please run this script from the project root.`,
      { level: 'error' }
    );
    process.exit(1);
  }

  const packageJsonContent = await readFileFromRoot(rootDir, packageJsonPath);
  let packageJson: Record<string, any>;
  try {
    packageJson = JSON.parse(packageJsonContent);
  } catch {
    logger(`${x} Could not parse ${colorizePath('package.json')}.`, {
      level: 'error',
    });
    process.exit(1);
  }

  // Determine the correct documentation URL based on dependencies
  const guideUrl = getDocumentationUrl(packageJson);

  const allDeps: Record<string, string> = {
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
  };

  // Effective deps = real deps + interactive hint-deps (compat library selections
  // from the interactive init prompt that haven't been installed yet).
  const effectiveAllDeps: Record<string, string> = {
    ...allDeps,
    ...(options?.hintDependencies ?? {}),
  };

  // INSTALL MISSING INTLAYER DEPENDENCIES
  const packageManager = detectPackageManager(rootDir);

  // lingui keeps its catalogs as `.po` (default) or `.json`. Detect which so the
  // matching sync plugin (`syncPO` / `syncJSON`) + dev dependency are chosen.
  // Also respect the `__lingui_json__` sentinel injected by the interactive init
  // prompt when the user explicitly selected "Lingui (.json catalogs)".
  const linguiPresent = Boolean(
    effectiveAllDeps['@lingui/core'] ||
      effectiveAllDeps['@lingui/react'] ||
      effectiveAllDeps['@intlayer/lingui']
  );

  // Determine format: prefer filesystem scan, then the interactive sentinel.
  const linguiCatalog = linguiPresent
    ? await detectLinguiCatalogPattern(rootDir)
    : null;

  const hintLinguiJson = Boolean(
    options?.hintDependencies?.['__lingui_json__']
  );
  // `linguiCatalogFormat` resolution:
  // 1. Filesystem scan result (authoritative when catalogs already exist)
  // 2. Interactive sentinel `__lingui_json__` → 'json'
  // 3. Fallback: 'po' (lingui's default) when lingui is selected but no
  //    catalogs have been generated yet and no sentinel was injected.
  const linguiCatalogFormat: 'po' | 'json' | null =
    linguiCatalog?.format ??
    (linguiPresent ? (hintLinguiJson ? 'json' : 'po') : null);

  const {
    packagesToInstall,
    devPackagesToInstall,
    compatSyncConfig,
    compatVitePluginConfig,
  } = detectMissingIntlayerPackages(effectiveAllDeps, {
    linguiCatalogFormat,
  });

  // The `json-namespaces` content strategy uses the same syncJSON pipeline as
  // the compat libraries: plain per-locale JSON namespace files synced through
  // `@intlayer/sync-json-plugin`. A detected compat library keeps precedence —
  // its own catalog format/template is authoritative.
  const wantsJsonNamespaces =
    options?.contentStrategy === 'json-namespaces' && !compatSyncConfig;

  if (
    wantsJsonNamespaces &&
    !effectiveAllDeps['@intlayer/sync-json-plugin'] &&
    !devPackagesToInstall.includes('@intlayer/sync-json-plugin')
  ) {
    devPackagesToInstall.push('@intlayer/sync-json-plugin');
  }

  if (!options?.noInstallPackages) {
    const withVersion = (packages: string[]): string[] =>
      options?.upgradeToVersion
        ? packages.map((pkg) => `${pkg}@${options.upgradeToVersion}`)
        : packages;

    if (packagesToInstall.length > 0) {
      logger(
        colorize('Installing missing Intlayer dependencies...', ANSIColors.CYAN)
      );
      try {
        installPackages(
          rootDir,
          withVersion(packagesToInstall),
          packageManager
        );
        logger(
          `${v} Installed: ${packagesToInstall.map((pkg) => colorize(pkg, ANSIColors.MAGENTA)).join(', ')}`
        );
      } catch {
        logger(
          `${x} Failed to install packages. Please install manually: ${packagesToInstall.join(' ')}`,
          { level: 'warn' }
        );
      }
    }

    if (devPackagesToInstall.length > 0) {
      logger(
        colorize(
          'Installing missing Intlayer dev dependencies...',
          ANSIColors.CYAN
        )
      );
      try {
        installPackages(
          rootDir,
          withVersion(devPackagesToInstall),
          packageManager,
          true
        );
        logger(
          `${v} Installed: ${devPackagesToInstall.map((pkg) => colorize(pkg, ANSIColors.MAGENTA)).join(', ')}`
        );
      } catch {
        logger(
          `${x} Failed to install dev packages. Please install manually: ${devPackagesToInstall.join(' ')}`,
          { level: 'warn' }
        );
      }
    }

    // UPGRADE OUTDATED INTLAYER DEPENDENCIES
    // Only runs when a target version is provided (typically the running CLI
    // version). Already up-to-date packages are skipped. Prod and dev
    // dependencies are upgraded separately so their dependency type is kept.
    if (options?.upgradeToVersion) {
      const outdatedDependencies = detectOutdatedIntlayerPackages(
        rootDir,
        packageJson.dependencies ?? {},
        options.upgradeToVersion
      );
      const outdatedDevDependencies = detectOutdatedIntlayerPackages(
        rootDir,
        packageJson.devDependencies ?? {},
        options.upgradeToVersion
      );

      const allOutdated = [...outdatedDependencies, ...outdatedDevDependencies];

      if (allOutdated.length > 0) {
        logger(
          colorize(
            `Upgrading outdated Intlayer dependencies to ${options.upgradeToVersion}...`,
            ANSIColors.CYAN
          )
        );
        try {
          upgradePackages(
            rootDir,
            outdatedDependencies,
            packageManager,
            options.upgradeToVersion
          );
          upgradePackages(
            rootDir,
            outdatedDevDependencies,
            packageManager,
            options.upgradeToVersion,
            true
          );
          logger(
            `${v} Upgraded: ${allOutdated.map((pkg) => colorize(pkg, ANSIColors.MAGENTA)).join(', ')}`
          );
        } catch {
          logger(
            `${x} Failed to upgrade packages. Please upgrade manually: ${allOutdated.join(' ')}`,
            { level: 'warn' }
          );
        }
      } else {
        logger(`${v} Intlayer dependencies are up to date`);
      }
    }
  }

  // CHECK .GITIGNORE
  const gitignorePath = '.gitignore';
  if (!options?.noGitignore && (await exists(rootDir, gitignorePath))) {
    const gitignoreContent = await readFileFromRoot(rootDir, gitignorePath);

    if (!gitignoreContent.includes('intlayer')) {
      const newContent = `${gitignoreContent}\n# Intlayer\n.intlayer\n`;
      await writeFileToRoot(rootDir, gitignorePath, newContent);
      logger(
        `${v} Added ${colorizePath('.intlayer')} to ${colorizePath(gitignorePath)}`
      );
    } else {
      logger(`${v} ${colorizePath(gitignorePath)} already includes .intlayer`);
    }
  }

  // SCAFFOLD GITHUB ACTIONS WORKFLOWS (fill + test)
  // Generate two workflows whose commands match the detected package manager:
  // - intlayer-fill.yml: auto-fills missing translations on pull requests
  // - intlayer-test.yml: fails the PR when required locales are missing
  if (!options?.noGithubActions) {
    const workflows = getGithubWorkflows(packageManager);

    for (const workflow of workflows) {
      if (await exists(rootDir, workflow.filePath)) {
        logger(`${v} ${colorizePath(workflow.filePath)} already exists`);
        continue;
      }

      try {
        await ensureDirectory(rootDir, join('.github', 'workflows'));
        await writeFileToRoot(rootDir, workflow.filePath, workflow.content);
        logger(
          `${v} Added GitHub Actions workflow ${colorizePath(workflow.filePath)}`
        );
      } catch {
        logger(
          `${x} Could not create ${colorizePath(workflow.filePath)}. You may need to add it manually.`,
          { level: 'warn' }
        );
      }
    }
  }

  // CHECK VS CODE EXTENSION RECOMMENDATIONS
  const vscodeDir = '.vscode';
  const extensionsJsonPath = join(vscodeDir, 'extensions.json');
  const extensionId = 'intlayer.intlayer-vs-code-extension';

  if (!options?.noVscodeExtension) {
    try {
      let extensionsConfig: { recommendations: string[] } = {
        recommendations: [],
      };

      if (await exists(rootDir, extensionsJsonPath)) {
        const content = await readFileFromRoot(rootDir, extensionsJsonPath);
        extensionsConfig = parseJSONWithComments(content);
      } else {
        await ensureDirectory(rootDir, vscodeDir);
      }

      if (!extensionsConfig.recommendations) {
        extensionsConfig.recommendations = [];
      }

      if (!extensionsConfig.recommendations.includes(extensionId)) {
        extensionsConfig.recommendations.push(extensionId);
        await writeFileToRoot(
          rootDir,
          extensionsJsonPath,
          JSON.stringify(extensionsConfig, null, 2)
        );
        logger(
          `${v} Added ${colorize(extensionId, ANSIColors.MAGENTA)} to ${colorizePath(extensionsJsonPath)}`
        );
      } else {
        logger(
          `${v} ${colorizePath(extensionsJsonPath)} already includes ${colorize(extensionId, ANSIColors.MAGENTA)}`
        );
      }
    } catch {
      logger(
        `${x} Could not update ${colorizePath(extensionsJsonPath)}. You may need to add ${colorize(extensionId, ANSIColors.MAGENTA)} manually.`,
        { level: 'warn' }
      );
    }
  }

  // CHECK VS CODE LSP SETTINGS
  const settingsJsonPath = join(vscodeDir, 'settings.json');

  if (!options?.noLsp) {
    try {
      let settingsConfig: Record<string, unknown> = {};

      if (await exists(rootDir, settingsJsonPath)) {
        const content = await readFileFromRoot(rootDir, settingsJsonPath);
        settingsConfig = parseJSONWithComments(content);
      } else {
        await ensureDirectory(rootDir, vscodeDir);
      }

      let settingsUpdated = false;

      if (!settingsConfig['intlayer.languageServer.command']) {
        settingsConfig['intlayer.languageServer.command'] = 'npx';
        settingsUpdated = true;
      }

      if (!settingsConfig['intlayer.languageServer.args']) {
        settingsConfig['intlayer.languageServer.args'] = ['@intlayer/lsp'];
        settingsUpdated = true;
      }

      if (settingsUpdated) {
        await writeFileToRoot(
          rootDir,
          settingsJsonPath,
          JSON.stringify(settingsConfig, null, 2)
        );
        logger(
          `${v} Updated ${colorizePath(settingsJsonPath)} with LSP configuration`
        );
      } else {
        logger(
          `${v} ${colorizePath(settingsJsonPath)} already includes LSP configuration`
        );
      }
    } catch {
      logger(
        `${x} Could not update ${colorizePath(settingsJsonPath)}. You may need to add the LSP settings manually.`,
        { level: 'warn' }
      );
    }
  }

  // CHECK TSCONFIGS
  const tsConfigFiles = await findTsConfigFiles(rootDir);
  let hasTsConfig = false;

  for (const fileName of tsConfigFiles) {
    if (await exists(rootDir, fileName)) {
      hasTsConfig = true;
      try {
        const fileContent = await readFileFromRoot(rootDir, fileName);
        const config = parseJSONWithComments(fileContent);
        const typeDefinition = './.intlayer/**/*.ts';

        let updated = false;

        if (!config.include) {
          // Skip if no include array (solution-style)
        } else if (
          Array.isArray(config.include) &&
          !(config.include as string[]).some((pattern: string) =>
            pattern.includes('.intlayer')
          )
        ) {
          config.include.push(typeDefinition);
          updated = true;
        } else if (config.include.includes(typeDefinition)) {
          logger(
            `${v} ${colorizePath(fileName)} already includes intlayer types`
          );
        }

        if (updated) {
          await writeFileToRoot(
            rootDir,
            fileName,
            JSON.stringify(config, null, 2)
          );
          logger(
            `${v} Updated ${colorizePath(fileName)} to include intlayer types`
          );
        }
      } catch {
        logger(
          `${x} Could not parse or update ${colorizePath(fileName)}. You may need to add ${colorizePath('.intlayer/types/**/*.ts')} manually.`,
          { level: 'warn' }
        );
      }
    }
  }

  // INITIALIZE CONFIG FILE
  const format = hasTsConfig ? 'intlayer.config.ts' : 'intlayer.config.mjs';

  // Detect the locale JSON file pattern already in the project so we can
  // insert the matching locales into the config and produce the most
  // accurate source template for compat libraries.
  const detectedPattern = await detectJsonLocalePattern(rootDir);

  await initConfig(format, rootDir, {
    locales: detectedPattern?.locales,
    applicationURL: getDefaultApplicationURL(allDeps),
  });

  // APPLY CONTENT STRATEGY — CENTRALIZED
  // Point `compiler.output` at per-locale JSON dictionaries under `/locales/`
  // instead of the per-component template default.
  if (options?.contentStrategy === 'centralized') {
    await setCompilerOutputInConfig(
      rootDir,
      '/locales/{{locale}}/{{key}}.content.json'
    );
  }

  // INJECT SYNC-JSON PLUGIN FOR COMPAT LIBRARIES / JSON-NAMESPACES STRATEGY
  const syncConfigToInject: CompatSyncConfig | undefined =
    compatSyncConfig ??
    (wantsJsonNamespaces
      ? {
          format: 'i18next',
          sourceTemplate:
            detectedPattern?.template ?? './locales/${locale}/${key}.json',
        }
      : undefined);

  if (syncConfigToInject) {
    // For next-intl / use-intl, the messages path is authoritatively declared
    // in `i18n/request.ts` (e.g. `import(`../messages/${locale}.json`)`), so we
    // read it directly. It usually resolves to a single file per locale (no
    // `${key}` segment), whose first-level keys are namespaces — so the compat
    // config carries `splitKeys: true` to emit one dictionary per namespace.
    // Falls back to file-system globbing otherwise.
    const nextIntlMessagesPattern =
      allDeps['next-intl'] ||
      allDeps['@intlayer/next-intl'] ||
      allDeps['use-intl'] ||
      allDeps['@intlayer/use-intl']
        ? await detectNextIntlMessagesPattern(rootDir)
        : null;

    // lingui authoritatively resolves to `…/{locale}/messages.{po,json}`, where
    // the `messages` filename becomes the dictionary key. Prefer it so a `.po`
    // project gets `syncPO` (the generic JSON glob only sees `.json`).
    const sourceTemplate =
      linguiCatalog?.template ??
      nextIntlMessagesPattern?.template ??
      detectedPattern?.template;

    const resolvedSyncConfig = {
      ...syncConfigToInject,
      ...(sourceTemplate ? { sourceTemplate } : {}),
    };

    const syncPluginPackage =
      resolvedSyncConfig.plugin === 'po'
        ? '@intlayer/sync-po-plugin'
        : '@intlayer/sync-json-plugin';
    const syncPluginName =
      resolvedSyncConfig.plugin === 'po' ? 'syncPO' : 'syncJSON';

    // `splitKeys` only makes sense for a single file holding several namespaces.
    // If the resolved template addresses one namespace per file (`${key}`
    // segment), each file is already a single namespace — drop the flag so
    // syncJSON keeps one dictionary per file.
    if (
      resolvedSyncConfig.splitKeys &&
      resolvedSyncConfig.sourceTemplate.includes('${key}')
    ) {
      resolvedSyncConfig.splitKeys = false;
    }

    const intlayerConfigCandidates = [
      'intlayer.config.ts',
      'intlayer.config.mjs',
      'intlayer.config.js',
      'intlayer.config.cjs',
    ];

    for (const configFile of intlayerConfigCandidates) {
      if (await exists(rootDir, configFile)) {
        const configContent = await readFileFromRoot(rootDir, configFile);

        if (!configContent.includes(syncPluginPackage)) {
          const extension = configFile.split('.').pop()!;
          const updatedConfigContent = updateIntlayerConfigWithSyncPlugin(
            configContent,
            extension,
            resolvedSyncConfig
          );
          await writeFileToRoot(rootDir, configFile, updatedConfigContent);
          logger(
            `${v} Updated ${colorizePath(configFile)} with ${syncPluginName} compat plugin`
          );
        } else {
          logger(
            `${v} ${colorizePath(configFile)} already includes ${syncPluginName} plugin`
          );
        }
        break;
      }
    }
  }

  // APPLY ROUTING MODE
  // When a routing strategy was chosen (interactive init), write it to
  // `routing.mode` in the configuration file. Idempotent and comment-preserving.
  if (options?.routingMode) {
    await setRoutingModeInConfig(rootDir, options.routingMode);
  }

  let hasAliasConfiguration = false;

  // CHECK VITE CONFIG
  const viteConfigs = ['vite.config.ts', 'vite.config.js', 'vite.config.mjs'];

  for (const file of viteConfigs) {
    if (await exists(rootDir, file)) {
      hasAliasConfiguration = true;
      const content = await readFileFromRoot(rootDir, file);
      const extension = file.split('.').pop()!;

      if (compatVitePluginConfig) {
        const { replacesVitePlugin } = compatVitePluginConfig;

        if (content.includes(compatVitePluginConfig.pluginPackageSource)) {
          logger(
            `${v} ${colorizePath(file)} already includes ${compatVitePluginConfig.pluginPackageSource}`
          );
        } else if (
          replacesVitePlugin &&
          content.includes(replacesVitePlugin.fromPackageSource)
        ) {
          // Drop-in replacement: rewrite the original i18n vite plugin's import
          // source, keeping its binding and call site (e.g. lingui).
          const updatedContent = replaceViteConfigPluginImportSource(
            content,
            replacesVitePlugin.importName,
            replacesVitePlugin.fromPackageSource,
            compatVitePluginConfig.pluginPackageSource
          );
          await writeFileToRoot(rootDir, file, updatedContent);
          logger(
            `${v} Updated ${colorizePath(file)} to import ${replacesVitePlugin.importName} from ${compatVitePluginConfig.pluginPackageSource}`
          );
        } else {
          const updatedContent = updateViteConfigForCompatPlugin(
            content,
            extension,
            compatVitePluginConfig
          );
          await writeFileToRoot(rootDir, file, updatedContent);
          logger(
            `${v} Updated ${colorizePath(file)} to include ${compatVitePluginConfig.pluginFunctionName} compat plugin`
          );
        }
      } else if (!content.includes('vite-intlayer')) {
        const updatedContent = updateViteConfig(content, extension);
        await writeFileToRoot(rootDir, file, updatedContent);
        logger(`${v} Updated ${colorizePath(file)} to include Intlayer plugin`);
      }
      break;
    }
  }

  // CHECK NEXT CONFIG
  const nextConfigs = ['next.config.js', 'next.config.mjs', 'next.config.ts'];
  let isNextJsProject = false;

  for (const file of nextConfigs) {
    if (await exists(rootDir, file)) {
      isNextJsProject = true;
      hasAliasConfiguration = true;
      const content = await readFileFromRoot(rootDir, file);
      const extension = file.split('.').pop()!;

      if (allDeps['next-i18next']) {
        if (!content.includes('@intlayer/next-i18next')) {
          const updatedContent = updateNextConfigForNextI18next(
            content,
            extension
          );
          await writeFileToRoot(rootDir, file, updatedContent);
          logger(
            `${v} Updated ${colorizePath(file)} to include Intlayer next-i18next compat plugin`
          );
        } else {
          logger(
            `${v} ${colorizePath(file)} already includes @intlayer/next-i18next`
          );
        }
      } else if (allDeps['next-intl']) {
        if (!content.includes('@intlayer/next-intl/plugin')) {
          const updatedContent = updateNextConfigForNextIntl(
            content,
            extension
          );
          await writeFileToRoot(rootDir, file, updatedContent);
          logger(
            `${v} Updated ${colorizePath(file)} to include Intlayer next-intl compat plugin`
          );
        } else {
          logger(
            `${v} ${colorizePath(file)} already includes @intlayer/next-intl/plugin`
          );
        }
      } else if (allDeps['next-translate']) {
        if (!content.includes('@intlayer/next-translate')) {
          const updatedContent = updateNextConfigForNextTranslate(
            content,
            extension
          );
          await writeFileToRoot(rootDir, file, updatedContent);
          logger(
            `${v} Updated ${colorizePath(file)} to include Intlayer next-translate compat plugin`
          );
        } else {
          logger(
            `${v} ${colorizePath(file)} already includes @intlayer/next-translate`
          );
        }
      } else if (!content.includes('next-intlayer')) {
        const updatedContent = updateNextConfig(content, extension);
        await writeFileToRoot(rootDir, file, updatedContent);
        logger(`${v} Updated ${colorizePath(file)} to include Intlayer plugin`);
      }
      break;
    }
  }

  // CHECK NEXT.JS COMPILER (BABEL)
  // When a Next.js project already uses Babel, install @intlayer/babel and print
  // the compiler + build-optimization plugins (extract, purge, minify, optimize)
  // to add. SWC projects need no setup: withIntlayer injects @intlayer/swc.
  if (isNextJsProject) {
    await setupNextCompilerBabelConfig({
      rootDir,
      packageManager,
      allDeps,
      skipInstall: Boolean(options?.noInstallPackages),
    });
  }

  // CHECK OTHER FRAMEWORKS CONFIG
  const astroConfigs = [
    'astro.config.mjs',
    'astro.config.js',
    'astro.config.ts',
    'astro.config.cjs',
  ];

  for (const file of astroConfigs) {
    if (await exists(rootDir, file)) {
      hasAliasConfiguration = true;

      if (file.startsWith('astro.config.')) {
        const content = await readFileFromRoot(rootDir, file);

        if (!content.includes('astro-intlayer')) {
          const extension = file.split('.').pop()!;
          const updatedContent = updateAstroConfig(content, extension);
          await writeFileToRoot(rootDir, file, updatedContent);
          logger(
            `${v} Updated ${colorizePath(file)} to include Intlayer integration`
          );
        }
      }
      break;
    }
  }

  const nuxtConfigs = ['nuxt.config.js', 'nuxt.config.ts'];
  for (const file of nuxtConfigs) {
    if (await exists(rootDir, file)) {
      hasAliasConfiguration = true;

      const content = await readFileFromRoot(rootDir, file);

      if (allDeps['@nuxtjs/i18n']) {
        if (!content.includes('@intlayer/nuxtjs-i18n')) {
          const updatedContent = updateNuxtConfigForNuxtjsI18n(content);
          await writeFileToRoot(rootDir, file, updatedContent);
          logger(
            `${v} Updated ${colorizePath(file)} to include @intlayer/nuxtjs-i18n module`
          );
        } else {
          logger(
            `${v} ${colorizePath(file)} already includes @intlayer/nuxtjs-i18n`
          );
        }
      } else if (!content.includes('nuxt-intlayer')) {
        const updatedContent = updateNuxtConfig(content);
        await writeFileToRoot(rootDir, file, updatedContent);
        logger(`${v} Updated ${colorizePath(file)} to include Intlayer module`);
      }
      break;
    }
  }

  // CHECK METRO CONFIG (React Native / Expo)
  // Metro is the React Native bundler. The Intlayer Metro plugin
  // (`react-native-intlayer/metro`) handles dictionary aliasing and building.
  // When no config exists we scaffold one; when one exists we safely wrap its
  // exported config with `configMetroIntlayerSync`, leaving custom async
  // (IIFE) configs untouched so existing setups are never broken.
  const isReactNativeProject = Boolean(allDeps['react-native'] || allDeps.expo);

  if (isReactNativeProject) {
    // Metro resolves Intlayer aliases itself, so skip the alias fallback below.
    hasAliasConfiguration = true;

    const metroConfigs = [
      'metro.config.js',
      'metro.config.cjs',
      'metro.config.mjs',
      'metro.config.ts',
    ];

    let metroConfigFile: string | undefined;

    for (const file of metroConfigs) {
      if (await exists(rootDir, file)) {
        metroConfigFile = file;
        break;
      }
    }

    if (metroConfigFile) {
      const content = await readFileFromRoot(rootDir, metroConfigFile);

      if (content.includes('react-native-intlayer')) {
        logger(
          `${v} ${colorizePath(metroConfigFile)} already includes the Intlayer Metro plugin`
        );
      } else {
        const extension = metroConfigFile.split('.').pop()!;
        const updatedContent = updateMetroConfig(content, extension);

        if (updatedContent !== content) {
          await writeFileToRoot(rootDir, metroConfigFile, updatedContent);
          logger(
            `${v} Updated ${colorizePath(metroConfigFile)} to include the Intlayer Metro plugin`
          );
        } else {
          logger(
            `${x} Could not automatically update ${colorizePath(metroConfigFile)}. Wrap your exported config with ${colorize('configMetroIntlayer', ANSIColors.MAGENTA)}: ${colorizePath(DocumentationRouter.ReactNativeAndExpo)}`,
            { level: 'warn' }
          );
        }
      }
    } else {
      const newMetroConfigFile = 'metro.config.js';
      await writeFileToRoot(
        rootDir,
        newMetroConfigFile,
        getMetroConfigTemplate(Boolean(allDeps.expo))
      );
      logger(
        `${v} Created ${colorizePath(newMetroConfigFile)} with the Intlayer Metro plugin`
      );
    }
  }

  // UPDATE PACKAGE.JSON DEV SCRIPT
  // Next.js >= 16 uses a bun-specific wrapper; backend frameworks wrap whatever
  // the existing dev script is. Both use `intlayer watch --with`.
  const backendIntlayerPackages = [
    'express-intlayer',
    'fastify-intlayer',
    'adonis-intlayer',
    'hono-intlayer',
  ];

  const devScript = packageJson.scripts?.dev;

  let newDevScript: string | undefined;

  if (
    devScript &&
    ((isNextJsProject && allDeps.next && isVersionAtLeast(allDeps.next, 16)) ||
      backendIntlayerPackages.some((pkg) => allDeps[pkg])) &&
    !devScript.includes('intlayer watch')
  ) {
    newDevScript = `intlayer watch --with '${devScript}'`;
  }

  if (newDevScript) {
    packageJson.scripts.dev = newDevScript;

    await writeFileToRoot(
      rootDir,
      packageJsonPath,
      JSON.stringify(packageJson, null, 2)
    );

    logger(
      `${v} Updated ${colorizePath('package.json')} dev script to run intlayer watch`
    );
  }

  // CHECK WEBPACK CONFIG
  const webpackConfigs = [
    'webpack.config.js',
    'webpack.config.ts',
    'webpack.config.mjs',
    'webpack.config.cjs',
  ];

  for (const file of webpackConfigs) {
    if (await exists(rootDir, file)) {
      hasAliasConfiguration = true;
      logger(
        `${v} Found ${colorizePath(
          file
        )}. Make sure to configure aliases manually or use the Intlayer Webpack plugin.`
      );
      break;
    }
  }

  const backendConfigPackages = [
    'express',
    'fastify',
    '@adonisjs/core',
    'hono',
    ...backendIntlayerPackages,
  ];

  if (backendConfigPackages.some((pkg) => allDeps[pkg])) {
    hasAliasConfiguration = true;
  }

  if (!hasAliasConfiguration) {
    const configuration = getConfiguration({ baseDir: rootDir });
    const aliases = getAlias({ configuration });

    if (hasTsConfig && tsConfigFiles.length > 0) {
      const tsConfigPath =
        tsConfigFiles.find((file) => file === 'tsconfig.json') ||
        tsConfigFiles[0];

      if (tsConfigPath) {
        const tsConfigContent = await readFileFromRoot(rootDir, tsConfigPath);
        const config = parseJSONWithComments(tsConfigContent);

        config.compilerOptions ??= {};
        config.compilerOptions.paths ??= {};

        let updated = false;

        Object.entries(aliases).forEach(([alias, path]) => {
          if (!config.compilerOptions.paths[alias]) {
            config.compilerOptions.paths[alias] = [path];
            updated = true;
          }
        });

        if (updated) {
          await writeFileToRoot(
            rootDir,
            tsConfigPath,
            JSON.stringify(config, null, 2)
          );

          logger(
            `${v} Updated ${colorizePath(
              tsConfigPath
            )} to include Intlayer aliases`
          );
        }
      }
    } else {
      const jsConfigPath = 'jsconfig.json';

      if (await exists(rootDir, jsConfigPath)) {
        const jsConfigContent = await readFileFromRoot(rootDir, jsConfigPath);
        const config = parseJSONWithComments(jsConfigContent);

        config.compilerOptions ??= {};
        config.compilerOptions.paths ??= {};

        let updated = false;

        Object.entries(aliases).forEach(([alias, path]) => {
          if (!config.compilerOptions.paths[alias]) {
            config.compilerOptions.paths[alias] = [path];
            updated = true;
          }
        });

        if (updated) {
          await writeFileToRoot(
            rootDir,
            jsConfigPath,
            JSON.stringify(config, null, 2)
          );
          logger(
            `${v} Updated ${colorizePath(
              jsConfigPath
            )} to include Intlayer aliases`
          );
        }
      } else {
        packageJson.imports ??= {};

        let updated = false;

        Object.entries(aliases).forEach(([alias, path]) => {
          const importAlias = alias.replace('@', '#');
          const importPath = path.startsWith('.') ? path : `./${path}`;

          if (!packageJson.imports[importAlias]) {
            packageJson.imports[importAlias] = importPath;
            updated = true;
          }
        });

        if (updated) {
          await writeFileToRoot(
            rootDir,
            packageJsonPath,
            JSON.stringify(packageJson, null, 2)
          );
          logger(
            `${v} Updated ${colorizePath(
              packageJsonPath
            )} to include Intlayer imports`
          );
        }
      }
    }
  }

  // FRAMEWORK-SPECIFIC SCAFFOLDING
  // Sets up middleware/proxy and wraps the layout/page with the Intlayer
  // providers for the detected framework (Next.js App Router today). Idempotent
  // and non-destructive: it never overwrites user code it cannot safely
  // transform, skipping with guidance instead.
  //
  // Skipped entirely when a compat i18n library drives the app (i18next,
  // next-intl, vue-i18n, …): the app already owns its routing, providers and
  // layouts, and Intlayer only syncs its catalogs — restructuring routes or
  // injecting providers would break the existing setup.
  const hasCompatLibrary = Boolean(compatSyncConfig || compatVitePluginConfig);

  if (!options?.noFrameworkSetup && hasCompatLibrary) {
    logger(
      `${v} Compat i18n library detected — keeping the app structure untouched (no route restructure, no provider injection)`
    );
  }

  if (!options?.noFrameworkSetup && !hasCompatLibrary) {
    try {
      // Prefer the user's interactive choice, else the configured routing mode
      // (which itself defaults to `prefix-no-default`). Drives whether the
      // locale path segment is required (`prefix-all`) or optional.
      const routingMode =
        options?.routingMode ??
        getConfiguration({ baseDir: rootDir }).routing.mode;

      await setupFramework({
        rootDir,
        allDeps,
        packageManager,
        useTypeScript: hasTsConfig,
        routingMode,
      });
    } catch {
      logger(
        `${x} Framework-specific scaffolding failed. Your existing files were left untouched; follow the documentation to finish the setup.`,
        { level: 'warn' }
      );
    }
  }

  // FINAL SUCCESS MESSAGE
  logger(`${v} ${colorize('Intlayer init setup complete.', ANSIColors.GREEN)}`);
  logger([
    colorize('Next →', ANSIColors.MAGENTA),
    colorize(
      `Follow the instructions in the documentation to complete the setup:`,
      ANSIColors.GREY_LIGHT
    ),
    colorizePath(guideUrl),
  ]);

  // INTLAYER LSP — instruction for the AI agent running `intlayer init`.
  // The Intlayer Language Server (`@intlayer/lsp`) provides Go-to-Definition
  // from `useIntlayer` / `getIntlayer` keys to their `.content` files, for both
  // IDEs and AI agents. Setup is editor-specific (VS Code, Cursor, Windsurf,
  // Zed, Neovim, Claude Code, …), so we don't scaffold anything here — instead
  // we point to the doc and ask the agent to confirm the target platform.
  logger([
    colorize('Intlayer LSP →', ANSIColors.MAGENTA),
    colorize(
      'The Intlayer Language Server is available via the `@intlayer/lsp` package. It lets IDEs and AI agents jump from `useIntlayer`/`getIntlayer` keys to their `.content` files.',
      ANSIColors.GREY_LIGHT
    ),
    colorize(
      'Ask the user which platform/editor they want to enable it on (VS Code, Cursor, Windsurf, Zed, Neovim, Claude Code, …), then follow the matching setup instructions:',
      ANSIColors.GREY_LIGHT
    ),
    colorizePath(DocumentationRouter.LSP),
  ]);
};
