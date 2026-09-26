import {
  type EsbuildPlugin,
  type IntlayerEsbuildPluginOptions,
  intlayerEsbuildPlugin,
} from 'angular-intlayer/esbuild';

/** Imports rewritten to the adapter. */
const NGX_TRANSLATE_IMPORT_FILTER = /^@ngx-translate\/core$/;

/** The adapter module every `@ngx-translate/core` import resolves to. */
const ADAPTER_MODULE = '@intlayer/ngx-translate';

/**
 * esbuild plugin for the Angular CLI (`@angular-builders/custom-esbuild`):
 * sets up angular-intlayer's build integration and resolves
 * `@ngx-translate/core` to `@intlayer/ngx-translate`.
 *
 * The redirect goes through `build.resolve`, so the adapter takes the same
 * path as any intlayer package — including angular-intlayer's handling of
 * the dev server, which would otherwise externalize it to Vite's
 * pre-bundler.
 *
 * @example
 * ```ts
 * // esbuild/plugins.ts (referenced from angular.json "plugins")
 * import { ngxTranslateEsbuildPlugin } from '@intlayer/ngx-translate/esbuild';
 * export default [ngxTranslateEsbuildPlugin()];
 * ```
 */
export const ngxTranslateEsbuildPlugin = (
  options?: IntlayerEsbuildPluginOptions
): EsbuildPlugin => {
  const intlayerPlugin = intlayerEsbuildPlugin(options);

  return {
    name: 'intlayer-ngx-translate',

    async setup(build) {
      await intlayerPlugin.setup(build);

      build.onResolve({ filter: NGX_TRANSLATE_IMPORT_FILTER }, (args) =>
        build.resolve(ADAPTER_MODULE, {
          kind: args.kind,
          importer: args.importer,
          resolveDir: args.resolveDir,
          pluginData: args.pluginData,
        })
      );
    },
  };
};

export default ngxTranslateEsbuildPlugin;
