import type { Dictionary } from '@intlayer/types/dictionary';
import type {
  DictionaryKeys,
  LocalesValues,
} from '@intlayer/types/module_augmentation';
import type { ValidDotPathsFor } from '../transpiler';
import type { NodeProps } from './getContent';
import { getDictionary } from './getDictionary';
import type { GetNestingResult } from './getNesting';

/**
 * Walks a dot-separated path on an already-interpreted dictionary content.
 *
 * Mirrors the registry-based resolver: an unresolvable segment yields the whole
 * content rather than `undefined`, so a stale path degrades to the parent
 * object instead of crashing the render.
 */
const walkPath = (content: unknown, path: string): unknown => {
  let current: unknown = content;

  for (const segment of path.split('.')) {
    current = (current as Record<string, unknown> | undefined)?.[segment];

    if (current === undefined) return content;
  }

  return current;
};

/**
 * Optimized-build replacement for `getNesting`.
 *
 * Resolves a `nest()` reference from the dictionaries the compiler attached to
 * the consuming dictionary (`props.nestedDictionaries`) instead of looking the
 * key up in the global registry exposed by `@intlayer/dictionaries-entry`.
 *
 * That is what lets the build optimization erase the registry entirely: this
 * module never imports `getIntlayer`, so no dictionary reaches the bundle
 * except through the static import injected at the call site. The nest target
 * then lands in the same chunk as the dictionary referencing it — and, in
 * `dynamic` / `fetch` mode, is loaded by the same lazy per-locale loader.
 *
 * The compiler guarantees the attachment for every dictionary holding a nested
 * node, so a missing entry means the dictionary was not produced by the
 * optimized pipeline; the reference then resolves to `undefined`.
 *
 * @param dictionaryKey - The key of the dictionary to nest.
 * @param path - Optional dot-separated path within the nested dictionary.
 * @param props - Interpreter node props, carrying the attached dictionaries.
 * @returns The nested content.
 */
export const getNesting = <const K extends DictionaryKeys, const P>(
  dictionaryKey: K,
  path?: P extends ValidDotPathsFor<K> ? P : never,
  props?: NodeProps
): GetNestingResult<K, P> => {
  const nestedDictionaries = props?.nestedDictionaries;
  const nestedDictionary = nestedDictionaries?.[dictionaryKey as string];

  if (!nestedDictionary) return undefined as GetNestingResult<K, P>;

  // The attached dictionaries are the raw compiled artifacts, which carry no
  // attachment of their own. Hand the consumer's map down so a nest target that
  // nests further dictionaries resolves too — the map is the transitive
  // closure, so one level of propagation covers any depth, and cycles simply
  // re-read the same finite map.
  const content = getDictionary(
    {
      ...(nestedDictionary as Dictionary),
      nestedDictionaries: {
        ...nestedDictionaries,
        ...(nestedDictionary as Dictionary).nestedDictionaries,
      },
    } as Dictionary,
    props?.locale as LocalesValues,
    props?.plugins
  );

  if (typeof path !== 'string') return content as GetNestingResult<K, P>;

  return walkPath(content, path) as GetNestingResult<K, P>;
};
