import { createRequire } from 'node:module';
import { getProjectRequire } from '@intlayer/config/utils';

/**
 * Packages whose webpack resolution must agree for a CRA build to succeed.
 *
 * `react-scripts` owns the compiler, while `webpack-manifest-plugin` is a
 * plugin that taps it. Both are resolved independently by Node, so a hoisting
 * split between them is exactly the situation that breaks the build.
 */
const WEBPACK_CONSUMER_PACKAGES = ['react-scripts', 'webpack-manifest-plugin'];

/**
 * Resolves a function that maps a package name to the `webpack` entry point
 * that package would load, or `undefined` when the package (or its webpack) is
 * not installed.
 */
export type WebpackResolver = (packageName: string) => string | undefined;

/**
 * Resolve `webpack` from a package's own resolution root, mirroring what Node
 * does at runtime when that package calls `require('webpack')`.
 *
 * @param packageName - Name of the package to resolve `webpack` on behalf of.
 * @returns Absolute path to the webpack entry point, or `undefined` when it
 *   cannot be resolved.
 */
export const resolveWebpackFrom: WebpackResolver = (packageName) => {
  try {
    const packageJsonPath = getProjectRequire().resolve(
      `${packageName}/package.json`
    );

    return createRequire(packageJsonPath).resolve('webpack');
  } catch {
    // The package (or its webpack) is absent — nothing to compare.
    return undefined;
  }
};

/**
 * Detect whether the project tree contains more than one copy of webpack.
 *
 * `react-scripts` resolves webpack relative to itself, while hoisted plugins
 * such as `webpack-manifest-plugin` resolve it from the project root. When the
 * two resolutions land on different copies, the plugin's `Compilation` class is
 * not the one the compiler instantiated and webpack throws the opaque
 * `TypeError: The 'compilation' argument must be an instance of Compilation`.
 *
 * Neither `resolve.alias` nor any other webpack setting can fix this — the
 * duplication happens in Node's own `require` resolution, before webpack ever
 * runs — so the only remedy is deduplicating the install.
 *
 * @param resolver - Resolves the webpack entry a given package would load.
 *   Injectable for testing; defaults to real Node resolution.
 * @returns The distinct webpack entry points found, in discovery order. A
 *   result of fewer than two entries means the install is consistent.
 */
export const findDuplicateWebpackPaths = (
  resolver: WebpackResolver = resolveWebpackFrom
): string[] => {
  const webpackPaths = WEBPACK_CONSUMER_PACKAGES.map(resolver).filter(
    (webpackPath): webpackPath is string => Boolean(webpackPath)
  );

  const uniqueWebpackPaths = [...new Set(webpackPaths)];

  return uniqueWebpackPaths.length < 2 ? [] : uniqueWebpackPaths;
};
