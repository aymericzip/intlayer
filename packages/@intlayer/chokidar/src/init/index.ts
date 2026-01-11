import {
  ANSIColors,
  colorize,
  colorizePath,
  logger,
  v,
  x,
} from '@intlayer/config';
import { initConfig } from '../initConfig';
import {
  exists,
  findTsConfigFiles,
  parseJSONWithComments,
  readFileFromRoot,
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
  if (deps['react-native'] || deps['expo']) {
    return DocumentationRouter.ReactNativeAndExpo;
  }

  // Meta-frameworks (Next, Nuxt, Astro, SvelteKit)
  if (deps['next']) {
    const version = deps['next'];

    if (isVersion(version, 14)) {
      return DocumentationRouter.NextJS_14;
    }

    if (isVersion(version, 15)) {
      return DocumentationRouter.NextJS_15;
    }

    return DocumentationRouter.NextJS;
  }

  if (deps['nuxt']) return DocumentationRouter.NuxtAndVue;
  if (deps['astro']) return DocumentationRouter.Astro;
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
  if (deps['vite']) {
    if (deps['vue']) return DocumentationRouter.ViteAndVue;
    if (deps['solid-js']) return DocumentationRouter.ViteAndSolid;
    if (deps['svelte']) return DocumentationRouter.ViteAndSvelte;
    if (deps['preact']) return DocumentationRouter.ViteAndPreact;

    // Default to React if Vite is present but specific other frameworks aren't found
    return DocumentationRouter.ViteAndReact;
  }

  // Other Web Frameworks
  if (deps['react-scripts']) return DocumentationRouter.CRA;
  if (deps['@angular/core']) return DocumentationRouter.Angular;

  // Backend
  if (deps['@nestjs/core']) return DocumentationRouter.NestJS;
  if (deps['express']) return DocumentationRouter.Express;
  if (deps['fastify']) return DocumentationRouter.Fastify;

  // Competitor Libs (Migration Guides)
  // We check these last as specific environment setup is usually higher priority,
  // but if no specific framework logic matched (or as a fallback), we guide to migration.
  if (deps['next-intl']) return DocumentationRouter.NextIntl;
  if (deps['react-i18next'] || deps['i18next'])
    return DocumentationRouter.ReactI18Next;
  if (deps['react-intl']) return DocumentationRouter.ReactIntl;
  if (deps['next-i18next']) return DocumentationRouter.NextI18Next;
  if (deps['vue-i18n']) return DocumentationRouter.VueI18n;

  return DocumentationRouter.Default;
};

/**
 * MAIN LOGIC
 */
export const initIntlayer = async (rootDir: string) => {
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

  // 2. CHECK .GITIGNORE
  const gitignorePath = '.gitignore';
  if (await exists(rootDir, gitignorePath)) {
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
  await initConfig(format, rootDir);

  // CHECK VITE CONFIG
  const viteConfigs = ['vite.config.ts', 'vite.config.js', 'vite.config.mjs'];
  for (const file of viteConfigs) {
    if (await exists(rootDir, file)) {
      let content = await readFileFromRoot(rootDir, file);

      if (!content.includes('vite-intlayer')) {
        const viteImport =
          "import { intlayer } from 'vite-intlayer'; // Add the plugin to the Vite plugin list";

        content = `${viteImport}\n${content}`;
        await writeFileToRoot(rootDir, file, content);
        logger(`${v} Injected import into ${colorizePath(file)}`);
      }
      break;
    }
  }

  // CHECK NEXT CONFIG
  const nextConfigs = ['next.config.js', 'next.config.mjs', 'next.config.ts'];
  for (const file of nextConfigs) {
    if (await exists(rootDir, file)) {
      let content = await readFileFromRoot(rootDir, file);

      if (!content.includes('next-intlayer')) {
        const nextImport =
          "import { withIntlayer } from 'next-intlayer/server'; // Add the plugin to the Next.js configuration";

        content = `${nextImport}\n${content}`;
        await writeFileToRoot(rootDir, file, content);
        logger(`${v} Injected import into ${colorizePath(file)}`);
      }
      break;
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
};
