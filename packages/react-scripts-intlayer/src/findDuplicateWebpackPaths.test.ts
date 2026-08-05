import { describe, expect, it } from 'vitest';
import {
  findDuplicateWebpackPaths,
  type WebpackResolver,
} from './findDuplicateWebpackPaths';

/**
 * Build a resolver backed by a fixed package name → webpack path lookup.
 * Unlisted packages resolve to `undefined`, mimicking a missing install.
 */
const createResolver =
  (webpackPathByPackage: Record<string, string | undefined>): WebpackResolver =>
  (packageName) =>
    webpackPathByPackage[packageName];

const ROOT_WEBPACK = '/project/node_modules/webpack/lib/index.js';
const NESTED_WEBPACK =
  '/project/node_modules/react-scripts/node_modules/webpack/lib/index.js';

describe('findDuplicateWebpackPaths', () => {
  it('reports both copies when react-scripts and its plugin disagree', () => {
    const duplicateWebpackPaths = findDuplicateWebpackPaths(
      createResolver({
        'react-scripts': NESTED_WEBPACK,
        'webpack-manifest-plugin': ROOT_WEBPACK,
      })
    );

    expect(duplicateWebpackPaths).toEqual([NESTED_WEBPACK, ROOT_WEBPACK]);
  });

  it('reports nothing when every consumer resolves the same copy', () => {
    const duplicateWebpackPaths = findDuplicateWebpackPaths(
      createResolver({
        'react-scripts': ROOT_WEBPACK,
        'webpack-manifest-plugin': ROOT_WEBPACK,
      })
    );

    expect(duplicateWebpackPaths).toEqual([]);
  });

  it('reports nothing when only one consumer is installed', () => {
    const duplicateWebpackPaths = findDuplicateWebpackPaths(
      createResolver({
        'react-scripts': ROOT_WEBPACK,
        'webpack-manifest-plugin': undefined,
      })
    );

    expect(duplicateWebpackPaths).toEqual([]);
  });

  it('reports nothing when webpack cannot be resolved at all', () => {
    const duplicateWebpackPaths = findDuplicateWebpackPaths(createResolver({}));

    expect(duplicateWebpackPaths).toEqual([]);
  });
});
