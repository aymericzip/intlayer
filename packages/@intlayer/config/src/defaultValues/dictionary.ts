import type { DictionaryLocation } from '@intlayer/types/dictionary';

export const FILL = true;
export const LOCATION: DictionaryLocation = 'local';
export const CONTENT_AUTO_TRANSFORMATION = false;
export const IMPORT_MODE = 'static';

/**
 * Directory the per-locale JSON chunks of `importMode: 'dynamic'` are written
 * under, relative to `system.dynamicDictionariesDir`.
 *
 * Plain dictionaries land at `<subdir>/<key>/<locale>.json`, qualified ones
 * (collections, variants) nest one directory per dimension in between. The
 * static first segment is required by Turbopack, and build-tool plugins match
 * module ids against this layout — hence the shared constant rather than a
 * literal repeated on both sides.
 */
export const DYNAMIC_DICTIONARIES_JSON_SUBDIR = 'json';

/**
 * Marker property carrying the ordered qualifier dimensions on a dynamic loader
 * map. Its presence distinguishes a qualified group loader map (a nested tree
 * of chunks) from a plain dynamic loader map (one chunk per `locale`). Prefixed
 * and unlikely to collide with a real locale code.
 */
export const QUALIFIER_DYNAMIC_TYPES_KEY = '__intlayerQualifierTypes';

/**
 * Marker property carrying the dictionary a generated dynamic entry point
 * already resolved for the browsing locale, before any component rendered.
 *
 * Build-tool plugins prepend a top-level `await` to those entry points, so the
 * chunk that statically imports one only finishes evaluating once the awaited
 * locale chunk has landed. A read during render then finds the content in place
 * instead of suspending.
 */
export const PRELOADED_DYNAMIC_KEY = '__intlayerPreloaded';

/**
 * Name of the local binding a generated dynamic entry point holds its loader
 * map in, before exporting it as default.
 *
 * The preload preamble is appended to that generated source and mutates the
 * binding, so the code generator and the build plugins have to agree on the
 * name — hence the shared constant rather than a literal repeated in both.
 */
export const DYNAMIC_ENTRY_LOADER_MAP_IDENTIFIER = 'content';
