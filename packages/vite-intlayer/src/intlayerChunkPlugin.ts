import { relative } from 'node:path';
import { GREY_LIGHT } from '@intlayer/config/colors';
import { DYNAMIC_DICTIONARIES_JSON_SUBDIR } from '@intlayer/config/defaultValues';
import {
  colorize,
  colorizeKey,
  colorizeNumber,
  colorizePath,
  getAppLogger,
} from '@intlayer/config/logger';
import { normalizePath } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Plugin } from 'vite';

/**
 * Module-graph accessor Rolldown passes to a chunk-name function.
 *
 * Declared structurally rather than imported from `rolldown` so this plugin
 * keeps working against the Rolldown bundled inside Vite, whose types are not
 * re-exported.
 */
export type ChunkingContext = {
  getModuleInfo: (moduleId: string) => ModuleGraphNode | null;
};

export type ModuleGraphNode = {
  id: string;
  isEntry: boolean;
  /** Ids of the modules that statically `import` this one. */
  importers: string[];
  /** Ids of the modules that reach this one through `import()`. */
  dynamicImporters: string[];
};

/** A per-locale dictionary chunk, identified from its module id. */
export type DictionaryModule = {
  key: string;
  locale: string;
};

/**
 * Builds the parser that recognises a per-locale dictionary chunk emitted in
 * `dynamic` import mode.
 *
 * The layout is read relative to `dynamicDictionariesDir` rather than matched
 * anywhere in the path, so an application file that happens to sit under its own
 * `json/<something>/<something>.json` cannot be mistaken for a dictionary.
 * Everything between the key and the locale is a qualifier dimension
 * (collections, variants), which is why the middle segments are skipped instead
 * of being required to be absent.
 *
 * @param dynamicDictionariesDir - Absolute, POSIX-normalized dictionaries root.
 * @returns Parser returning the key and locale, or `null` for any other module.
 */
export const createDictionaryModuleParser = (
  dynamicDictionariesDir: string
): ((moduleId: string) => DictionaryModule | null) => {
  const prefix = `${dynamicDictionariesDir}/${DYNAMIC_DICTIONARIES_JSON_SUBDIR}/`;

  return (moduleId) => {
    // Vite appends query suffixes (`?import`, `?url`) to module ids.
    const posixId = normalizePath(moduleId.split('?', 1)[0] ?? moduleId);
    if (!posixId.startsWith(prefix)) return null;

    const segments = posixId.slice(prefix.length).split('/');
    // `<key>/…qualifier segments…/<locale>.json` — at least a key and a file.
    if (segments.length < 2) return null;

    const fileName = segments[segments.length - 1]!;
    if (!fileName.endsWith('.json')) return null;

    return {
      key: segments[0]!,
      locale: fileName.slice(0, -'.json'.length),
    };
  };
};

/** Characters that are unsafe in a chunk file name. */
const UNSAFE_NAME_CHARACTERS = /[^a-zA-Z0-9]+/g;

/**
 * Short, stable digest of a module id, appended to a boundary name so two
 * boundaries sharing a basename (`index.tsx` and `index.tsx`) do not collapse
 * into a single chunk.
 */
const digest = (value: string): string => {
  let hash = 5381;
  for (let index = 0; index < value.length; index++) {
    hash = ((hash << 5) + hash + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36).slice(0, 6);
};

/** Turns a boundary module id into a readable chunk-name fragment. */
export const toBoundaryName = (moduleId: string): string => {
  const fileName = normalizePath(moduleId).split('/').pop() ?? 'chunk';
  const base = fileName
    .replace(/\.[^.]+$/, '')
    .replace(UNSAFE_NAME_CHARACTERS, '-')
    .replace(/^-+|-+$/g, '');
  return `${base || 'chunk'}-${digest(moduleId)}`;
};

/**
 * Walks up the import graph from a dictionary JSON to the code-split boundaries
 * that reach it.
 *
 * A module pulled in through `import()` — a `React.lazy` section, a split
 * route — begins its own chunk, so it is the unit whose dictionaries should
 * travel together: one request per Suspense boundary rather than one per
 * dictionary. The walk deliberately starts from the JSON's importers rather
 * than the JSON itself, because *every* dictionary is reached through
 * `import()` and would otherwise be read as its own boundary.
 *
 * @returns Boundary ids reaching this dictionary, empty when the graph is
 *          unavailable (the module was pruned, or resolution failed).
 */
export const resolveBoundaries = (
  jsonModuleId: string,
  context: ChunkingContext
): string[] => {
  const jsonNode = context.getModuleInfo(jsonModuleId);
  if (!jsonNode) return [];

  const visited = new Set<string>();
  const boundaries = new Set<string>();
  const queue: string[] = [...jsonNode.dynamicImporters, ...jsonNode.importers];

  while (queue.length > 0) {
    const currentId = queue.pop() as string;
    if (visited.has(currentId)) continue;
    visited.add(currentId);

    const node = context.getModuleInfo(currentId);
    if (!node) continue;

    const isCodeSplitBoundary = node.dynamicImporters.length > 0;
    const isGraphRoot = node.isEntry || node.importers.length === 0;

    if (isCodeSplitBoundary || isGraphRoot) {
      boundaries.add(currentId);
      continue;
    }

    queue.push(...node.importers);
  }

  return [...boundaries].sort();
};

/**
 * Groups dynamically imported dictionaries by the code-split boundary that
 * consumes them, so each lazily loaded page or section fetches its content in
 * a single request instead of one per dictionary.
 *
 * Without this, `importMode: 'dynamic'` emits a chunk per dictionary per
 * locale. A page assembled from many components then issues dozens of ~3 KB
 * requests, and because each is discovered only once its consumer has
 * executed, they land in the last wave of the request waterfall — page text
 * arrives after everything else.
 *
 * Switching to `importMode: 'static'` would collapse those requests but inline
 * every locale into the bundle, which does not scale past a handful of
 * languages. Grouping keeps the per-locale split and removes the fragmentation.
 *
 * Dictionaries reached from more than one boundary are placed in a shared
 * chunk, so no page ships another page's content and the bytes are not
 * duplicated across chunks.
 *
 * Because a boundary's dictionaries share one chunk, warming that chunk warms
 * the whole boundary in a single request — which is why the top-level-await
 * preload (`intlayerPreload`) costs one request per boundary rather than one
 * per dictionary, without any page loading content belonging to another.
 *
 * @param intlayerConfig - Resolved Intlayer configuration.
 */
export const intlayerChunk = (intlayerConfig: IntlayerConfig): Plugin => {
  const dynamicDictionariesDir = normalizePath(
    intlayerConfig.system.dynamicDictionariesDir
  );

  const parseDictionaryModule = createDictionaryModuleParser(
    dynamicDictionariesDir
  );

  const appLogger = getAppLogger(intlayerConfig);

  /** Dictionary modules assigned to each group, for the build summary. */
  const grouped = new Map<string, string[]>();
  /** Dictionaries the graph walk could not attribute to any boundary. */
  const unresolved: string[] = [];

  /** Records a dictionary against its group and returns the group name. */
  const assign = (groupName: string, dictionaryKey: string): string => {
    const members = grouped.get(groupName) ?? [];
    members.push(dictionaryKey);
    grouped.set(groupName, members);
    return groupName;
  };

  const isDictionaryModule = (moduleId: string): boolean =>
    parseDictionaryModule(moduleId) !== null;

  return {
    name: 'vite-intlayer-chunk-plugin',

    /**
     * Grouping only exists to undo build-time fragmentation, so the dev server —
     * which serves modules unbundled — is skipped.
     *
     * The build is deliberately *not* gated on the configured `importMode`: a
     * `.content` file can set `importMode: 'dynamic'` on a single dictionary
     * under a `static` or `fetch` global mode, and those dictionaries fragment
     * exactly like a fully dynamic build. Modules that reach the graph are the
     * honest signal, so the group's `test` does the gating instead — it simply
     * matches nothing when no dictionary resolves to dynamic.
     */
    apply: (_viteConfig, env) => env.command === 'build',

    config: () => {
      return {
        // Scoped to the client build. Dictionary chunks only exist to be
        // fetched by a browser, and `build` at the top level would apply to
        // every environment — re-chunking the server bundle too, where
        // reordering a dependency's modules can break their initialisation.
        environments: {
          client: {
            build: {
              rolldownOptions: {
                output: {
                  codeSplitting: {
                    groups: [
                      {
                        name: (moduleId: string, context: ChunkingContext) => {
                          const dictionary = parseDictionaryModule(moduleId);
                          if (!dictionary) return null;

                          const boundaries = resolveBoundaries(
                            moduleId,
                            context
                          );
                          if (boundaries.length === 0) {
                            unresolved.push(moduleId);
                            return null;
                          }

                          const scope =
                            boundaries.length > 1
                              ? 'shared'
                              : toBoundaryName(boundaries[0]!);
                          const groupName = `intlayer-${scope}-${dictionary.locale}`;

                          return assign(groupName, dictionary.key);
                        },
                        test: isDictionaryModule,
                        // Dictionaries are small individually; the point is to
                        // group them, so the surrounding build's size floor must
                        // not dissolve these chunks back into their parents.
                        minSize: 0,
                        minShareCount: 1,
                        priority: 50,
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      };
    },

    /**
     * Reports what the grouping actually did. Silence here means the group
     * never matched — the usual cause is an `importMode` that emits no
     * per-dictionary chunks at all.
     */
    closeBundle() {
      const groupCount = grouped.size;
      if (groupCount === 0 && unresolved.length === 0) return;

      const dictionaryCount = [...grouped.values()].reduce(
        (total, members) => total + members.length,
        0
      );

      appLogger(
        `Grouped ${colorizeNumber(dictionaryCount)} dictionary chunks into ${colorizeNumber(groupCount)} per-boundary chunks.`
      );

      if (unresolved.length > 0) {
        appLogger(
          `${unresolved.length} dictionaries had no resolvable boundary and kept their own chunk.`,
          { level: 'warn' }
        );
      }

      grouped.clear();
      unresolved.length = 0;
    },
  };
};
