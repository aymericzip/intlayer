import { ngxTranslateEsbuildPlugin } from '@intlayer/ngx-translate/esbuild';
import type { EsbuildPlugin } from 'angular-intlayer/esbuild';

/**
 * Monorepo only: workspace packages are symlinked with their own
 * `@angular/*` dev copies, and two `@angular/core` instances break DI
 * (NG0203). Resolving every `@angular/*` import from the app root keeps a
 * single copy. Not needed when the packages are installed from npm.
 */
const dedupeAngularPlugin: EsbuildPlugin = {
  name: 'dedupe-angular',
  setup(build) {
    build.onResolve({ filter: /^@angular\// }, (args) => {
      if (args.pluginData?.isDeduped) return undefined;

      return build.resolve(args.path, {
        kind: args.kind,
        resolveDir: process.cwd(),
        pluginData: { isDeduped: true },
      });
    });
  },
};

export default [
  dedupeAngularPlugin,
  /**
   * Resolves `@ngx-translate/core` to `@intlayer/ngx-translate` and registers
   * angular-intlayer's build integration (dictionary build, optimize, purge).
   */
  ngxTranslateEsbuildPlugin(),
];
