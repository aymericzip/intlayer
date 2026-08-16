import { relative, sep } from 'node:path';
import { GREY_LIGHT } from '@intlayer/config/colors';
import {
  colorize,
  colorizeKey,
  colorizeNumber,
  colorizePath,
  getAppLogger,
} from '@intlayer/config/logger';
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

/** Normalises Windows separators so one pattern matches on every platform. */
const toPosix = (filePath: string): string => filePath.split(sep).join('/');

/**
 * Matches a per-locale dictionary emitted in `dynamic` import mode, whose
 * layout is `<dynamicDictionariesDir>/json/<key>/<locale>.json`.
 */
export const DICTIONARY_JSON_PATTERN =
  /\/json\/(?<key>[^/]+)\/(?<locale>[^/]+)\.json$/;

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
  const fileName = toPosix(moduleId).split('/').pop() ?? 'chunk';
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
 * the whole boundary in a single request — which is how `preloadDictionaries`
 * from `react-intlayer` stops content from suspending, without any page loading
 * content belonging to another.
 *
 * @param intlayerConfig - Resolved Intlayer configuration.
 */
export const intlayerChunk = (intlayerConfig: IntlayerConfig): Plugin => {
  const importMode =
    intlayerConfig.build?.importMode ?? intlayerConfig.dictionary?.importMode;

  const dynamicDictionariesDir = toPosix(
    intlayerConfig.system.dynamicDictionariesDir
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

  const isDictionaryModule = (moduleId: string): boolean => {
    const posixId = toPosix(moduleId);
    return (
      posixId.startsWith(dynamicDictionariesDir) &&
      DICTIONARY_JSON_PATTERN.test(posixId)
    );
  };

  return {
    name: 'vite-intlayer-chunk-plugin',

    /**
     * Grouping only exists to undo build-time fragmentation, so it is skipped
     * unless there is something to regroup: the dev server serves modules
     * unbundled, and only `dynamic` mode emits a chunk per dictionary.
     */
    apply: (_viteConfig, env) =>
      env.command === 'build' && importMode === 'dynamic',

    config: () => {
      return {
        build: {
          rolldownOptions: {
            output: {
              advancedChunks: {
                groups: [
                  {
                    name: (moduleId: string, context: ChunkingContext) => {
                      const match = DICTIONARY_JSON_PATTERN.exec(
                        toPosix(moduleId)
                      );
                      const locale = match?.groups?.locale;
                      if (!locale) return null;

                      const boundaries = resolveBoundaries(moduleId, context);
                      if (boundaries.length === 0) {
                        unresolved.push(moduleId);
                        return null;
                      }

                      const scope =
                        boundaries.length > 1
                          ? 'shared'
                          : toBoundaryName(boundaries[0]!);

                      appLogger(
                        `Chunk group ${colorize(`intlayer-${scope}-${locale}`, GREY_LIGHT)} ← ${match?.groups?.key && colorizeKey(match?.groups?.key)} (boundaries: ${colorizePath(boundaries.map((path) => relative(intlayerConfig.system.baseDir, path)).join(', '))})`,
                        { isVerbose: true }
                      );

                      return assign(
                        `intlayer-${scope}-${locale}`,
                        match?.groups?.key ?? moduleId
                      );
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
      };
    },

    /**
     * Reports what the grouping actually did. Silence here means the group
     * never matched — the usual causes are a dictionary layout that does not
     * match `DICTIONARY_JSON_PATTERN`, or an `importMode` that emits no
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
