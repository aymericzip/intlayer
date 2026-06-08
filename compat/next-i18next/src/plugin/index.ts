import { createRequire } from 'node:module';
import { dirname, relative, resolve, sep } from 'node:path';
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

/**
 * A Next.js plugin for next-i18next compat that wraps next-intlayer's plugin
 * and configures resolve aliases so next-i18next, react-i18next, and i18next
 * imports are served by their `@intlayer/*` compat counterparts.
 */
export const createNextI18nPlugin = () => {
  return async (nextConfig: NextConfig = {}): Promise<NextConfig> => {
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

    return withIntlayer(mergedConfig);
  };
};

export default createNextI18nPlugin;
