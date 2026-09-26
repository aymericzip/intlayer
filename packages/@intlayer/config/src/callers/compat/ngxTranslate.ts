import type { CallerDescriptor } from '../types';

/**
 * @ngx-translate/core — `@intlayer/ngx-translate` compat adapter.
 *
 * ngx-translate keys are namespace-less dotted paths (`'HOME.TITLE'`), so the
 * dictionary is the key's first dot-segment and the rest is the field path.
 *
 * Covered call shapes:
 * - `translate('home.title')` — standalone signal helper
 * - `this.translate.instant('home.title')` / `.get(…)` / `.stream(…)` /
 *   `.translate(…)` — `TranslateService` methods
 *
 * The `| translate` pipe and `[translate]` directive live in Angular templates
 * that no JS analyser sees; the adapter's bundler plugin therefore widens these
 * descriptors to `translationFunction: 'all'` for field pruning, while editors
 * keep the precise `'self'` resolution below.
 *
 * No caller carries a build-time replacement: `TranslateService` is resolved
 * through Angular DI, not an import rename.
 *
 * Mirrors `compat-comming/ngx-translate/src/plugin/index.ts`.
 */
const NGX_TRANSLATE_IMPORT_SOURCES = [
  '@ngx-translate/core',
  '@intlayer/ngx-translate',
];

const createKeyCaller = (
  callerName: string,
  matchAsMethod: boolean
): CallerDescriptor => ({
  callerName,
  library: '@ngx-translate/core',
  importSources: NGX_TRANSLATE_IMPORT_SOURCES,
  // `get`, `instant`, `translate` are generic names — only files importing
  // ngx-translate participate.
  requiresImport: true,
  matchAsMethod,
  namespaceSources: [{ from: 'path-first-segment' }],
  translationFunction: 'self',
});

export const NGX_TRANSLATE_CALLERS: CallerDescriptor[] = [
  createKeyCaller('translate', true),
  createKeyCaller('instant', true),
  createKeyCaller('get', true),
  createKeyCaller('stream', true),
];
