import { createRequire } from 'node:module';
import { getPackageJsonPath } from './getPackageJsonPath';

export const isESModule = typeof import.meta.url === 'string';

/**
 * Require relative to the user project
 *
 * Note: Can resolve package that are installed in the user project, ex `'intlayer'`
 */
export const ESMxCJSRequire: NodeJS.Require = createRequire(
  getPackageJsonPath().packageJsonPath
);

/**
 * Require relative to the @intlayer/config package
 *
 * Note: Can resolve package that are installed in the config package, ex `'@intlayer/types'`
 */
export const configESMxCJSRequire: NodeJS.Require = isESModule
  ? createRequire(import.meta.url)
  : require;
