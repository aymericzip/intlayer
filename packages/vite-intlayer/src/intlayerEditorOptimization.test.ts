import { createPruneContext, type PruneContext } from '@intlayer/babel';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Plugin } from 'vite';
import { describe, expect, it } from 'vitest';
import { intlayerMinify } from './intlayerMinifyPlugin';
import { intlayerPrune } from './intlayerPrunePlugin';

/**
 * Build-time optimization must stay on while the visual editor is enabled.
 * The editor resolves every edit through `dictionaryKey` + `keyPath`, so the
 * only step it rules out is field renaming — the one that rewrites the content
 * keys the `keyPath` is built from.
 */

const BASE_DIR = '/app';
const DICTIONARIES_DIR = `${BASE_DIR}/.intlayer/dictionary`;
const DYNAMIC_DICTIONARIES_DIR = `${BASE_DIR}/.intlayer/dynamic_dictionary`;
const FETCH_DICTIONARIES_DIR = `${BASE_DIR}/.intlayer/fetch_dictionary`;
const STATIC_DICTIONARY_PATH = `${DICTIONARIES_DIR}/about.json`;

/** A compiled translation node, as emitted by `intlayer build`. */
const translationNode = (value: string) => ({
  nodeType: 'translation',
  translation: { en: value },
});

/** The compiled dictionary the plugins receive, before any optimization. */
const compiledDictionary = {
  key: 'about',
  localIds: ['about::local::src/about.content.ts'],
  content: {
    title: translationNode('Title'),
    unusedField: translationNode('Unused'),
  },
};

const createConfig = (editorEnabled: boolean): IntlayerConfig =>
  ({
    build: { optimize: true, purge: true, minify: true },
    editor: { enabled: editorEnabled },
    log: { mode: 'disabled' },
    system: {
      baseDir: BASE_DIR,
      dictionariesDir: DICTIONARIES_DIR,
      dynamicDictionariesDir: DYNAMIC_DICTIONARIES_DIR,
      fetchDictionariesDir: FETCH_DICTIONARIES_DIR,
    },
  }) as unknown as IntlayerConfig;

/** A prune context as the usage analyser leaves it for a single-field usage. */
const createContextWithFieldRename = (): PruneContext => {
  const pruneContext = createPruneContext();

  pruneContext.dictionaryKeyToFieldUsageMap.set('about', new Set(['title']));
  pruneContext.dictionaryKeyToFieldRenameMap.set(
    'about',
    new Map([['title', { shortName: 'a', children: new Map() }]])
  );

  return pruneContext;
};

/** Narrows the first plugin of a plugin list to its object form. */
const firstPluginOf = (plugins: unknown[]): Plugin => plugins[0] as Plugin;

/** Runs a plugin's `transform` hook over a dictionary file. */
const runTransform = (plugin: Plugin, code: string): string => {
  const transform = plugin.transform as unknown as (
    code: string,
    moduleId: string
  ) => { code: string } | null;

  return transform(code, STATIC_DICTIONARY_PATH)?.code ?? code;
};

/** Whether a plugin opts into the production build. */
const appliesToBuild = (plugin: Plugin): boolean =>
  (plugin.apply as (config: unknown, env: { command: string }) => boolean)(
    {},
    { command: 'build' }
  );

describe('dictionary optimization with the visual editor enabled', () => {
  it('still purges the fields no component reads', () => {
    const prunePlugin = firstPluginOf(
      intlayerPrune(createConfig(true), createContextWithFieldRename())
    );

    expect(appliesToBuild(prunePlugin)).toBe(true);
    expect(
      JSON.parse(runTransform(prunePlugin, JSON.stringify(compiledDictionary)))
        .content
    ).toEqual({ title: translationNode('Title') });
  });

  it('minifies without renaming the fields the keyPath is built from', () => {
    const minifyPlugin = firstPluginOf(
      intlayerMinify(createConfig(true), createContextWithFieldRename())
    );

    expect(appliesToBuild(minifyPlugin)).toBe(true);

    // Metadata is stripped and the JSON compacted, but `title` — the key the
    // editor resolves its keyPath against — survives untouched.
    expect(
      JSON.parse(runTransform(minifyPlugin, JSON.stringify(compiledDictionary)))
    ).toEqual({
      key: 'about',
      content: {
        title: translationNode('Title'),
        unusedField: translationNode('Unused'),
      },
    });
  });

  it('renames the fields once the editor is disabled', () => {
    const minifyPlugin = firstPluginOf(
      intlayerMinify(createConfig(false), createContextWithFieldRename())
    );

    expect(
      JSON.parse(runTransform(minifyPlugin, JSON.stringify(compiledDictionary)))
    ).toEqual({
      key: 'about',
      content: {
        a: translationNode('Title'),
        unusedField: translationNode('Unused'),
      },
    });
  });
});
