import { createRequire } from 'node:module';
import {
  addDynamicEntryPreload,
  DYNAMIC_ENTRY_PATTERN,
  resolvePreloadModuleId,
} from '@intlayer/config/dictionaryPreload';
import { colorizeNumber, getAppLogger } from '@intlayer/config/logger';
import { normalizePath } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Plugin } from 'vite';

/**
 * Absolute id of the locale resolver the injected preamble imports.
 *
 * Resolved from this package, which declares `@intlayer/core` as a dependency,
 * rather than left bare in the emitted source: the importer is a generated
 * entry point under the application's `.intlayer` directory, and an application
 * only depends on `intlayer` and its framework binding, so the bare specifier
 * would resolve from a tree that need not contain the package at all.
 */
const preloadModuleId = normalizePath(
  resolvePreloadModuleId(createRequire(import.meta.url))
);

/**
 * Makes dictionaries load with the chunk that needs them, instead of being
 * requested once that chunk renders.
 *
 * In `importMode: 'dynamic'` a component reads its dictionary through a loader
 * map and suspends while the matching chunk is fetched. The fetch is only
 * discovered once the component executes, so it lands at the very end of the
 * request waterfall and every navigation flashes the pending fallback before
 * any text appears — the cost that used to push applications towards
 * `importMode: 'static'`, which inlines every locale into the bundle.
 *
 * Starting that fetch from the generated entry point itself moves it forward to
 * module-evaluation time: it leaves with the chunk that needs it — on a
 * router's `import()` of a route, including a preload on hover — instead of
 * waiting for the consuming component to execute. By the time the read happens
 * the content is usually already there and the render is synchronous.
 *
 * The fetch is deliberately not awaited at the top level. Doing so would make
 * the entry point an async module and hold up every chunk that imports it,
 * which permanently strands `React.lazy` boundaries resolving during hydration
 * on their fallback — see `addDynamicEntryPreload`.
 *
 * Complements the grouping in `intlayerChunk`: grouping decides how many
 * requests a boundary makes, this decides when they start.
 *
 * @param intlayerConfig - Resolved Intlayer configuration.
 */
export const intlayerPreload = (intlayerConfig: IntlayerConfig): Plugin => {
  const dynamicDictionariesDir = normalizePath(
    intlayerConfig.system.dynamicDictionariesDir
  );

  const appLogger = getAppLogger(intlayerConfig);

  /** Entry points that received the preamble, for the build summary. */
  const preloadedKeys = new Set<string>();

  return {
    name: 'vite-intlayer-preload-plugin',

    apply: () => intlayerConfig.build.dictionariesPreload,

    // Runs before the optimize plugin's `post`-enforced transform, which only
    // rewrites component sources and dictionary list entries — never these
    // generated per-key entry points — so the two never touch the same module.
    enforce: 'pre',

    // Only the client suspends on a dictionary, and only the browser can
    // resolve a browsing locale. Transforming the server build too would make
    // its modules async for a branch that never runs there.
    //
    // Not gated on the configured `importMode`: a `.content` file can set
    // `importMode: 'dynamic'` on a single dictionary under a `static` or
    // `fetch` global mode, and that dictionary suspends exactly like a fully
    // dynamic one. Only entry points the optimizer actually imported reach this
    // hook, so membership of the module graph is the accurate gate.
    transform(code, moduleId, options) {
      if (options?.ssr) return null;

      const posixId = normalizePath(moduleId.split('?', 1)[0] ?? moduleId);
      if (!posixId.startsWith(dynamicDictionariesDir)) return null;

      const key = DYNAMIC_ENTRY_PATTERN.exec(posixId)?.groups?.key;
      if (!key) return null;

      const result = addDynamicEntryPreload(code, preloadModuleId);

      if (result.skipped) {
        if (result.skipped === 'unrecognized-shape') {
          appLogger(
            `Dictionary entry point ${key} has an unexpected shape and was not preloaded.`,
            { level: 'warn', isVerbose: true }
          );
        }
        return null;
      }

      preloadedKeys.add(key);

      return { code: result.code, map: null };
    },

    /**
     * Reports what the injection actually did. Silence means no entry point
     * matched — usually an `importMode` that emits none, or dictionaries that
     * are all qualified.
     */
    closeBundle() {
      if (preloadedKeys.size === 0) return;

      appLogger(
        `Preloaded ${colorizeNumber(preloadedKeys.size)} dictionary entry points into their consuming chunks.`
      );

      preloadedKeys.clear();
    },
  };
};
