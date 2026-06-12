import { createRequire } from 'node:module';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { runOnce } from '@intlayer/chokidar/utils';
import * as ANSIColors from '@intlayer/config/colors';
import { colorize, getAppLogger } from '@intlayer/config/logger';
import { getConfiguration } from '@intlayer/config/node';
import type { NextConfig } from 'next';
import { withIntlayer } from 'next-intlayer/server';

/**
 * `require` that works in both the CJS and ESM builds of this plugin.
 * `import.meta.url` is rewritten to the module path in the CJS output by the
 * bundler, so `createRequire` resolves correctly in either format.
 */
const compatRequire = createRequire(import.meta.url);

/**
 * Maps each original import specifier (next-i18next, react-i18next, i18next) to
 * the `@intlayer/*` specifier that should serve it instead.
 */
const ALIAS_ENTRIES: { request: string; replacement: string }[] = [
  { request: 'next-i18next', replacement: '@intlayer/next-i18next' },
  { request: 'react-i18next', replacement: '@intlayer/react-i18next' },
  { request: 'i18next', replacement: '@intlayer/i18next' },
];

/**
 * Split a package specifier into its package name and export subpath.
 *
 * @param specifier - e.g. `@intlayer/react-i18next` or `i18next`.
 * @returns `{ packageName, exportKey }` where `exportKey` is the `exports` map
 * key (`.` for the package root).
 */
const splitSpecifier = (
  specifier: string
): { packageName: string; exportKey: string } => {
  const segments = specifier.split('/');
  const packageName = specifier.startsWith('@')
    ? segments.slice(0, 2).join('/')
    : (segments[0] ?? specifier);
  const subpath = specifier.slice(packageName.length);
  return { packageName, exportKey: subpath === '' ? '.' : `.${subpath}` };
};

/**
 * Resolve the absolute path of a package export, preferring the ESM (`import`)
 * condition so Turbopack and modern bundlers load the `.mjs` build (which keeps
 * the `"use client"` directives) rather than the CommonJS fallback.
 *
 * Both Turbopack and webpack ignore alias values that are bare package
 * specifiers, so the aliases must point at real files.
 *
 * @param specifier - Package specifier, e.g. `@intlayer/react-i18next`.
 * @returns Absolute path to the resolved module file.
 */
const resolveEsmPath = (specifier: string): string => {
  const { packageName, exportKey } = splitSpecifier(specifier);
  const packageJson = compatRequire(`${packageName}/package.json`) as {
    exports?: Record<
      string,
      string | { import?: string; require?: string; default?: string }
    >;
  };
  const packageDir = dirname(
    compatRequire.resolve(`${packageName}/package.json`)
  );

  const exportEntry = packageJson.exports?.[exportKey];
  const relativeFile =
    typeof exportEntry === 'string'
      ? exportEntry
      : (exportEntry?.import ?? exportEntry?.require ?? exportEntry?.default);

  // Fall back to Node resolution if the exports map is unexpected.
  if (!relativeFile) return compatRequire.resolve(specifier);

  return resolve(packageDir, relativeFile);
};

/**
 * Format an absolute path as a project-root-relative specifier (prefixed with
 * `./` and using forward slashes). Turbopack only honours `resolveAlias` values
 * that are project-root-relative paths — bare specifiers are ignored and
 * absolute paths are misread as root-relative. Mirrors `withIntlayer`'s
 * Turbopack alias formatter.
 *
 * @param absolutePath - Absolute path to the target module file.
 * @returns Relative specifier such as `./node_modules/@intlayer/react-i18next/...`.
 */
const toTurbopackAlias = (absolutePath: string): string =>
  `./${relative(process.cwd(), absolutePath).split(sep).join('/')}`;

const NEXT_I18NEXT_SWC_CALLERS = [
  {
    callerName: 'useTranslation',
    importSources: ['react-i18next', '@intlayer/react-i18next', 'next-i18next'],
    namespaceArgIndex: 0,
    staticReplacement: 'useDictionary',
    dynamicReplacement: 'useDictionaryDynamic',
  },
];

/**
 * Disables the SWC `replaceDictionaryEntry` optimization on the resolved Next.js
 * config so the runtime dictionary registry stays populated. Mutates the
 * `@intlayer/swc` plugin options in place (both webpack and Turbopack read the
 * same `experimental.swcPlugins` entry).
 *
 * @param config - The Next.js config returned by `withIntlayer`.
 */
const keepDictionaryRegistry = (config: NextConfig): void => {
  const swcPlugins = (
    config.experimental as { swcPlugins?: unknown[] } | undefined
  )?.swcPlugins;
  if (!Array.isArray(swcPlugins)) return;

  for (const plugin of swcPlugins) {
    if (!Array.isArray(plugin)) continue;
    const [pluginPath, pluginOptions] = plugin as [unknown, unknown];
    if (
      typeof pluginPath === 'string' &&
      pluginPath.includes('@intlayer/swc') &&
      pluginOptions !== null &&
      typeof pluginOptions === 'object'
    ) {
      (pluginOptions as Record<string, unknown>).replaceDictionaryEntry = false;
    }
  }
};

/**
 * A Next.js plugin for next-i18next compat that wraps next-intlayer's plugin
 * and configures resolve aliases so `next-i18next` imports are served by
 * `@intlayer/next-i18next`.
 */
export const createNextI18nPlugin = (_i18nPath?: string) => {
  return async (nextConfig: NextConfig = {}): Promise<NextConfig> => {
    const intlayerConfig = getConfiguration();
    const appLogger = getAppLogger(intlayerConfig);

    runOnce(
      join(
        intlayerConfig.system.baseDir,
        '.intlayer',
        'cache',
        'intlayer-issues-invitation.lock'
      ),
      () => {
        appLogger([
          colorize(
            'Please report any issues you met on GitHub:',
            ANSIColors.GREY
          ),
          colorize(
            'https://github.com/aymericzip/intlayer/issues',
            ANSIColors.GREY_LIGHT
          ),
        ]);
      },
      {
        cacheTimeoutMs: 1000 * 60 * 60, // 1 hour
      }
    );

    const customWebpack = nextConfig.webpack;

    const resolvedTargets = ALIAS_ENTRIES.map(({ request, replacement }) => ({
      request,
      absolutePath: resolveEsmPath(replacement),
    }));

    // Webpack resolves aliases from absolute paths.
    const webpackAlias = Object.fromEntries(
      resolvedTargets.map(({ request, absolutePath }) => [
        request,
        absolutePath,
      ])
    );

    // Turbopack only honours project-root-relative `./` paths.
    const turboAlias = Object.fromEntries(
      resolvedTargets.map(({ request, absolutePath }) => [
        request,
        toTurbopackAlias(absolutePath),
      ])
    );

    const aliasConfig = {
      webpack: (config: any, options: any) => {
        config.resolve.alias = {
          ...config.resolve.alias,
          ...webpackAlias,
        };

        if (typeof customWebpack === 'function') {
          return customWebpack(config, options);
        }
        return config;
      },
    };

    const mergedConfig: NextConfig = {
      ...nextConfig,
      ...aliasConfig,
      turbopack: {
        ...(nextConfig.turbopack ?? {}),
        resolveAlias: {
          ...(nextConfig.turbopack?.resolveAlias ?? {}),
          ...turboAlias,
        },
      },
    };

    const finalConfig = await withIntlayer(mergedConfig, {
      swcExtraCallers: NEXT_I18NEXT_SWC_CALLERS,
    });

    // i18next exposes runtime namespace APIs (`i18n.getFixedT(locale, ns)`,
    // `t('ns:key')`) that resolve dictionaries at runtime through `getIntlayer`.
    // Unlike `useTranslation('ns')`, these are not statically analyzable, so the
    // SWC cannot rewrite them to direct dictionary imports. The build optimization
    // normally empties the runtime dictionary registry (`replaceDictionaryEntry`),
    // which would make those APIs fall back to raw keys on the server. Keeping the
    // registry populated restores them; statically analyzable call sites are still
    // rewritten to direct imports, so client bundles stay tree-shaken.
    keepDictionaryRegistry(finalConfig);

    return finalConfig;
  };
};

export default createNextI18nPlugin;

/**
 * A pre-instantiated Next.js plugin for next-i18next compat.
 * Wraps a NextConfig directly without requiring the factory call pattern.
 *
 * Usage:
 * ```ts
 * import { withI18next } from '@intlayer/next-i18next/plugin';
 * export default withI18next(nextConfig);
 * ```
 */
export const withI18next = createNextI18nPlugin();
