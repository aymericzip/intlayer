import { join } from 'node:path';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, colorizePath, logger, v, x } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';

import { getAlias } from '@intlayer/config/utils';
import { initConfig } from '../initConfig';
import {
  detectJsonLocalePattern,
  detectMissingIntlayerPackages,
  detectPackageManager,
  ensureDirectory,
  exists,
  findTsConfigFiles,
  getGithubWorkflows,
  installPackages,
  parseJSONWithComments,
  readFileFromRoot,
  updateAstroConfig,
  updateIntlayerConfigWithSyncPlugin,
  updateNextConfig,
  updateNextConfigForNextI18next,
  updateNextConfigForNextIntl,
  updateNextConfigForNextTranslate,
  updateNuxtConfig,
  updateNuxtConfigForNuxtjsI18n,
  updateViteConfig,
  updateViteConfigForCompatPlugin,
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
 * OPTIONS
 */
export type InitOptions = {
  noGitignore?: boolean;
  /** Skip scaffolding the `fill` and `test` GitHub Actions workflows. */
  noGithubActions?: boolean;
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

  // INSTALL MISSING INTLAYER DEPENDENCIES
  const packageManager = detectPackageManager(rootDir);
  const {
    packagesToInstall,
    devPackagesToInstall,
    compatSyncConfig,
    compatVitePluginConfig,
  } = detectMissingIntlayerPackages(allDeps);

  if (packagesToInstall.length > 0) {
    logger(
      colorize('Installing missing Intlayer dependencies...', ANSIColors.CYAN)
    );
    try {
      installPackages(rootDir, packagesToInstall, packageManager);
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
      installPackages(rootDir, devPackagesToInstall, packageManager, true);
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

  // CHECK VS CODE LSP SETTINGS
  const settingsJsonPath = join(vscodeDir, 'settings.json');

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

  // CHECK TSCONFIGS
  const tsConfigFiles = await findTsConfigFiles(rootDir);
  let hasTsConfig = false;

  for (const fileName of tsConfigFiles) {
    if (await exists(rootDir, fileName)) {
      hasTsConfig = true;
      try {
        const fileContent = await readFileFromRoot(rootDir, fileName);
        const config = parseJSONWithComments(fileContent);
        const typeDefinition = '.intlayer/**/*.ts';

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

  await initConfig(format, rootDir, detectedPattern?.locales);

  // INJECT SYNC-JSON PLUGIN FOR COMPAT LIBRARIES
  if (compatSyncConfig) {
    const resolvedSyncConfig = detectedPattern
      ? { ...compatSyncConfig, sourceTemplate: detectedPattern.template }
      : compatSyncConfig;

    const intlayerConfigCandidates = [
      'intlayer.config.ts',
      'intlayer.config.mjs',
      'intlayer.config.js',
      'intlayer.config.cjs',
    ];

    for (const configFile of intlayerConfigCandidates) {
      if (await exists(rootDir, configFile)) {
        const configContent = await readFileFromRoot(rootDir, configFile);

        if (!configContent.includes('@intlayer/sync-json-plugin')) {
          const extension = configFile.split('.').pop()!;
          const updatedConfigContent = updateIntlayerConfigWithSyncPlugin(
            configContent,
            extension,
            resolvedSyncConfig
          );
          await writeFileToRoot(rootDir, configFile, updatedConfigContent);
          logger(
            `${v} Updated ${colorizePath(configFile)} with syncJSON compat plugin`
          );
        } else {
          logger(
            `${v} ${colorizePath(configFile)} already includes syncJSON plugin`
          );
        }
        break;
      }
    }
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
        if (!content.includes(compatVitePluginConfig.pluginPackageSource)) {
          const updatedContent = updateViteConfigForCompatPlugin(
            content,
            extension,
            compatVitePluginConfig
          );
          await writeFileToRoot(rootDir, file, updatedContent);
          logger(
            `${v} Updated ${colorizePath(file)} to include ${compatVitePluginConfig.pluginFunctionName} compat plugin`
          );
        } else {
          logger(
            `${v} ${colorizePath(file)} already includes ${compatVitePluginConfig.pluginPackageSource}`
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

  // UPDATE PACKAGE.JSON DEV SCRIPT
  // Next.js >= 16 uses a bun-specific wrapper; backend frameworks wrap whatever
  // the existing dev script is. Both use `intlayer watch --with`.
  const isVersionGreaterOrEqual = (
    versionString: string,
    major: number
  ): boolean => {
    if (!versionString || typeof versionString !== 'string') return false;
    const match = versionString.match(/^[^\d]*(\d+)/);

    if (!match?.[1]) return false;

    return parseInt(match[1], 10) >= major;
  };

  const backendIntlayerPackages = [
    'express-intlayer',
    'fastify-intlayer',
    'adonis-intlayer',
    'hono-intlayer',
  ];

  const devScript = packageJson.scripts?.dev;

  let newDevScript: string | undefined;

  if (
    ((isNextJsProject &&
      allDeps.next &&
      isVersionGreaterOrEqual(allDeps.next, 16)) ||
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
