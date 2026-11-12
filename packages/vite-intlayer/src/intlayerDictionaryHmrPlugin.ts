import { basename, dirname } from 'node:path';
import { normalizePath } from '@intlayer/config/utils';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Plugin } from 'vite';

/**
 * Appended to the generated `.intlayer/main/*.mjs` entry points in the dev
 * client.
 *
 * The entry accepts its own update and writes the fresh dictionaries into the
 * object the previous instance exported. Every module that already imported it
 * keeps that reference, so the content they read is updated in place and the
 * update stops here instead of climbing through every `useIntlayer` consumer.
 *
 * Relies on the generated entry declaring its record as `const dictionaries`.
 */
export const DICTIONARY_ENTRY_HMR_FOOTER = `
if (import.meta.hot) {
  const previousDictionaries = import.meta.hot.data.dictionaries;
  if (previousDictionaries && previousDictionaries !== dictionaries) {
    for (const key of Object.keys(previousDictionaries)) {
      if (!(key in dictionaries)) delete previousDictionaries[key];
    }
    Object.assign(previousDictionaries, dictionaries);
  }
  import.meta.hot.data.dictionaries = previousDictionaries ?? dictionaries;
  import.meta.hot.accept();
}
`;

/** The part of a Vite module node the consumer lookup reads. */
type TransformedModule = {
  file: string | null;
  transformResult: { code: string } | null;
};

/** Escapes a dictionary key for use inside a regular expression. */
const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Callee names that read a dictionary by key — `useIntlayer`, `getIntlayer`,
 * `getDictionary`, compat `useTranslation(s)` / `getTranslations` — including
 * the `(0, module.useIntlayer)(…)` form of a transformed import.
 */
const CONTENT_ACCESSOR_CALLEE = String.raw`[\w$]*(?:Intlayer|Dictionary|Translations?)[\w$]*\)?\s*\(\s*`;

/**
 * Lists the modules whose transformed source passes the dictionary key as the
 * first argument of a content accessor — `useIntlayer('key')`,
 * `getIntlayer("key", locale)`, a compat `useTranslation('key')`.
 *
 * Requiring the accessor keeps generic keys such as `code` from matching every
 * `jsx("code")` or `type: "code"`. A module dragged in that cannot be hot
 * swapped would invalidate up to a full page reload.
 */
export const findDictionaryConsumers = <Module extends TransformedModule>(
  modules: Iterable<Module>,
  dictionaryKey: string,
  excludedDir: string
): Module[] => {
  const keyCallPattern = new RegExp(
    `${CONTENT_ACCESSOR_CALLEE}(["'\`])${escapeRegExp(dictionaryKey)}\\1`
  );

  return [...modules].filter((moduleNode) => {
    const transformedCode = moduleNode.transformResult?.code;
    if (!transformedCode) return false;

    const isGenerated =
      moduleNode.file !== null &&
      normalizePath(moduleNode.file).startsWith(`${excludedDir}/`);
    if (isGenerated) return false;

    return keyCallPattern.test(transformedCode);
  });
};

/**
 * Keeps a content edit from hot-updating the whole application in dev.
 *
 * Every consumer reaches dictionaries through the same generated entry point,
 * so by default one rewritten `<key>.json` propagates to every module that
 * imports an Intlayer package — hundreds of HMR boundaries, root layout and
 * route files included, which remounts the tree like a full reload.
 *
 * Instead, the entry point absorbs the JSON update (see
 * {@link DICTIONARY_ENTRY_HMR_FOOTER}) and only the modules that reference the
 * changed key are hot-updated, so their framework re-renders them with the new
 * content.
 *
 * Limitation: a dictionary that only reaches the screen through another
 * dictionary's `nest()` is re-rendered on the next update of its consumer.
 *
 * @param intlayerConfig - Resolved Intlayer configuration.
 */
export const intlayerDictionaryHmr = (
  intlayerConfig: IntlayerConfig
): Plugin => {
  const {
    mainDir,
    dictionariesDir,
    unmergedDictionariesDir,
    remoteDictionariesDir,
  } = intlayerConfig.system;

  const mainEntryDir = normalizePath(mainDir);
  const intlayerDir = normalizePath(dirname(mainDir));

  /** Directories holding one `<key>.json` per dictionary. */
  const dictionaryJsonDirs = new Set(
    [dictionariesDir, unmergedDictionariesDir, remoteDictionariesDir].map(
      (directory) => normalizePath(directory)
    )
  );

  /**
   * Returns the key of the dictionary a changed file holds, or `undefined`
   * when the file is not a compiled `<key>.json`.
   */
  const getChangedDictionaryKey = (file: string): string | undefined => {
    const posixFile = normalizePath(file);

    if (!posixFile.endsWith('.json')) return undefined;
    if (!dictionaryJsonDirs.has(dirname(posixFile))) return undefined;

    return basename(posixFile, '.json');
  };

  return {
    name: 'vite-intlayer-dictionary-hmr-plugin',

    apply: 'serve',

    transform(code, moduleId, options) {
      // The server reloads its module runner on its own; only the browser
      // holds state worth preserving.
      if (options?.ssr) return null;

      const posixId = normalizePath(moduleId.split('?', 1)[0] ?? moduleId);
      if (!posixId.endsWith('.mjs')) return null;
      if (dirname(posixId) !== mainEntryDir) return null;
      if (!/\bconst dictionaries\b/.test(code)) return null;

      return { code: `${code}${DICTIONARY_ENTRY_HMR_FOOTER}`, map: null };
    },

    // Vite 6+: scoped to the client, so the consumers never join the server
    // environment's update.
    hotUpdate({ file, modules }) {
      if (this.environment.config.consumer !== 'client') return;

      const dictionaryKey = getChangedDictionaryKey(file);
      if (!dictionaryKey) return;

      // The JSON module first, so the entry point holds the new content by the
      // time the consumers re-render.
      return [
        ...modules,
        ...findDictionaryConsumers(
          this.environment.moduleGraph.idToModuleMap.values(),
          dictionaryKey,
          intlayerDir
        ),
      ];
    },

    // Vite 4 and 5, which ignore `hotUpdate`.
    handleHotUpdate({ file, modules, server }) {
      const dictionaryKey = getChangedDictionaryKey(file);
      if (!dictionaryKey) return;

      return [
        ...modules,
        ...findDictionaryConsumers(
          server.moduleGraph.idToModuleMap.values(),
          dictionaryKey,
          intlayerDir
        ),
      ];
    },
  };
};
