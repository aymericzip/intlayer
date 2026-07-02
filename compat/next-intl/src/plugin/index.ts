import { createRequire } from 'node:module';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { runOnce } from '@intlayer/chokidar/utils';
import { NEXT_INTL_CALLERS, toSwcExtraCallers } from '@intlayer/config/callers';
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
 * Maps each original `next-intl` import specifier to the `@intlayer/next-intl`
 * specifier that should serve it instead.
 */
const ALIAS_ENTRIES: { request: string; replacement: string }[] = [
  { request: 'next-intl/server', replacement: '@intlayer/next-intl/server' },
  { request: 'next-intl/routing', replacement: '@intlayer/next-intl/routing' },
  {
    request: 'next-intl/navigation',
    replacement: '@intlayer/next-intl/navigation',
  },
  {
    request: 'next-intl/middleware',
    replacement: '@intlayer/next-intl/middleware',
  },
  { request: 'next-intl', replacement: '@intlayer/next-intl' },
];

/**
 * Split a package specifier into its package name and export subpath.
 *
 * @param specifier - e.g. `@intlayer/next-intl/server` or `next-intl`.
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
  const subpath = specifier.slice(packageName?.length);
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
 * @param specifier - Package specifier, e.g. `@intlayer/next-intl/server`.
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
 * @returns Relative specifier such as `./node_modules/@intlayer/next-intl/...`.
 */
const toTurbopackAlias = (absolutePath: string): string =>
  `./${relative(process.cwd(), absolutePath).split(sep).join('/')}`;

/**
 * SWC extra-caller configs derived from the shared caller registry
 * (`@intlayer/config/callers`) — the single source of truth also consumed by
 * the babel analyzer/optimizer and the LSP.
 */
const NEXT_INTL_SWC_CALLERS = toSwcExtraCallers(NEXT_INTL_CALLERS);

/**
 * A Next.js plugin for next-intl compat that wraps next-intlayer's plugin
 * and configures resolve aliases so `next-intl` imports are served by
 * `@intlayer/next-intl`.
 */
export const createNextIntlPlugin = (_i18nPath?: string) => {
  return async (nextConfig: NextConfig = {}): Promise<NextConfig> => {
    const intlayerConfig = getConfiguration();
    const appLogger = getAppLogger(intlayerConfig);

    runOnce(
      join(
        intlayerConfig?.system?.baseDir ?? process.cwd(),
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

    // Only inject the NEXT_LOCALE cookie default when the user has not
    // configured their own routing.storage in intlayer.config.ts.
    // This lets users override via intlayer.config.ts while keeping
    // next-intl compatibility (NEXT_LOCALE) as the default.
    let hasUserDefinedStorage = false;
    try {
      hasUserDefinedStorage = !!(
        intlayerConfig?.routing &&
        'storage' in intlayerConfig.routing &&
        intlayerConfig.routing.storage !== undefined
      );
    } catch {
      // If the config file cannot be read, fall back to the NEXT_LOCALE default.
    }

    const configOptions = hasUserDefinedStorage
      ? { swcExtraCallers: NEXT_INTL_SWC_CALLERS }
      : {
          override: {
            routing: {
              storage: [
                { type: 'cookie' as const, name: 'NEXT_LOCALE' },
                { type: 'header' as const, name: 'x-intlayer-locale' },
              ],
            },
          },
          swcExtraCallers: NEXT_INTL_SWC_CALLERS,
        };

    return withIntlayer(mergedConfig, configOptions);
  };
};

export default createNextIntlPlugin;
