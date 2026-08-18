import { PRELOADED_DYNAMIC_KEY } from '@intlayer/config/defaultValues';
import type { Dictionary } from '@intlayer/types/dictionary';
import type { LocalesValues } from '@intlayer/types/module_augmentation';

/**
 * Marker under which a generated dynamic entry point carries the dictionary it
 * preloaded while evaluating. Defined in `@intlayer/config` so the code
 * generator and the build plugins can read it without pulling the runtime in,
 * and re-exported here where the consumers of the loaded content live.
 */
export { PRELOADED_DYNAMIC_KEY };

/**
 * The value attached under {@link PRELOADED_DYNAMIC_KEY}.
 *
 * `locale` is the locale the preamble resolved at module-evaluation time. It is
 * compared against the locale the read actually asks for, so a disagreement
 * (a client-side locale switch, or a resolution the provider overrode) falls
 * back to loading rather than serving content in the wrong language.
 */
export type PreloadedDynamicEntry = {
  locale: LocalesValues;
  dictionary: Dictionary;
};

/** A plain dynamic loader map that may carry a preloaded entry. */
export type PreloadableDynamicLoaderMap = {
  [PRELOADED_DYNAMIC_KEY]?: PreloadedDynamicEntry;
};

/**
 * Reads the preloaded dictionary of a dynamic loader map, when one was resolved
 * for the requested locale.
 *
 * Deliberately synchronous, and deliberately not routed through the suspender
 * cache: a suspender only leaves `pending` inside a `.then` callback, so feeding
 * it an already-resolved promise would still suspend for one microtask — long
 * enough for a pending fallback to paint, which is the flash this whole
 * mechanism exists to remove.
 *
 * @param loaderMap - Default export of a generated dynamic entry point.
 * @param locale - Locale the caller is about to render.
 * @returns The dictionary when it was preloaded for `locale`, else `undefined`.
 */
export const getPreloadedDictionary = (
  loaderMap: unknown,
  locale: LocalesValues
): Dictionary | undefined => {
  if (typeof loaderMap !== 'object' || loaderMap === null) return undefined;

  const preloaded = (loaderMap as PreloadableDynamicLoaderMap)[
    PRELOADED_DYNAMIC_KEY
  ];

  if (!preloaded || preloaded.locale !== locale) return undefined;

  return preloaded.dictionary;
};
