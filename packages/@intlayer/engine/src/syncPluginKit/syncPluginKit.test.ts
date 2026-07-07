import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import type { Locale } from '@intlayer/types/allLocales';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createFileAdapter } from './createFileAdapter';
import { createSyncPlugin } from './createSyncPlugin';
import type { FormatCodec } from './types';

const jsonCodec: FormatCodec = {
  parse: (raw) => JSON.parse(raw),
  serialize: (content) => `${JSON.stringify(content, null, 2)}\n`,
};

const createConfiguration = (baseDir: string): IntlayerConfig =>
  ({
    system: { baseDir },
    internationalization: {
      locales: ['en', 'fr'] as Locale[],
      defaultLocale: 'en' as Locale,
    },
    log: { mode: 'silent' },
  }) as unknown as IntlayerConfig;

const writeFixture = async (filePath: string, content: unknown) => {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(content, null, 2)}\n`, 'utf-8');
};

describe('syncPluginKit', () => {
  let testDir: string;
  let configuration: IntlayerConfig;

  beforeEach(async () => {
    testDir = await mkdtemp(join(tmpdir(), 'sync-plugin-kit-'));
    configuration = createConfiguration(testDir);
  });

  afterEach(async () => {
    await rm(testDir, { recursive: true, force: true });
  });

  describe('createFileAdapter', () => {
    it('lists discovered files and fabricates missing locales in strict mode', async () => {
      await writeFixture(join(testDir, 'messages/en/home.json'), {
        title: 'Hello',
      });

      const adapter = createFileAdapter({
        source: './messages/{{locale}}/{{key}}.json',
        codec: jsonCodec,
        discovery: 'strict',
      });

      const entries = await adapter.list({ configuration });

      expect(entries).toHaveLength(2);
      expect(entries).toContainEqual({
        key: 'home',
        locale: 'en',
        uri: join(testDir, 'messages/en/home.json'),
        filePath: join(testDir, 'messages/en/home.json'),
      });
      // The fr file does not exist yet: strict mode fabricates the entry so a
      // write-back target exists for every declared locale.
      expect(entries).toContainEqual({
        key: 'home',
        locale: 'fr',
        uri: join(testDir, 'messages/fr/home.json'),
        filePath: join(testDir, 'messages/fr/home.json'),
      });
    });

    it('only lists actual files in inclusive mode', async () => {
      await writeFixture(join(testDir, 'messages/en/home.json'), {
        title: 'Hello',
      });

      const adapter = createFileAdapter({
        source: './messages/{{locale}}/{{key}}.json',
        codec: jsonCodec,
        discovery: 'inclusive',
      });

      const entries = await adapter.list({ configuration });

      expect(entries).toHaveLength(1);
      expect(entries[0]).toMatchObject({ key: 'home', locale: 'en' });
    });

    it('skips files whose path does not rebuild identically in strict mode', async () => {
      // Matches the glob for key `**` but its rebuilt canonical path differs
      // (nested directory not produced by the pattern for its extracted key).
      await writeFixture(join(testDir, 'messages/en/home.json'), {
        title: 'Hello',
      });
      await writeFixture(join(testDir, 'messages/en-extra/other.json'), {
        title: 'Foreign',
      });

      const adapter = createFileAdapter({
        source: './messages/{{locale}}/{{key}}.json',
        codec: jsonCodec,
        discovery: 'strict',
      });

      const entries = await adapter.list({ configuration });
      const keys = entries.map((entry) => entry.key);

      expect(keys).not.toContain('other');
    });

    it('reads a missing file as undefined', async () => {
      const adapter = createFileAdapter({
        source: './messages/{{locale}}/{{key}}.json',
        codec: jsonCodec,
      });

      const content = await adapter.read(
        {
          key: 'home',
          locale: 'fr' as Locale,
          uri: join(testDir, 'messages/fr/home.json'),
          filePath: join(testDir, 'messages/fr/home.json'),
        },
        { configuration }
      );

      expect(content).toBeUndefined();
    });

    it('writes against the configuration baseDir, not the process cwd', async () => {
      const adapter = createFileAdapter({
        source: './messages/{{locale}}/{{key}}.json',
        codec: jsonCodec,
      });

      await adapter.write(
        { key: 'home', locale: 'fr' as Locale },
        { title: 'Bonjour' },
        { configuration }
      );

      const written = await readFile(
        join(testDir, 'messages/fr/home.json'),
        'utf-8'
      );

      expect(JSON.parse(written)).toEqual({ title: 'Bonjour' });
    });

    it('auto-detects splitKeys from the source pattern', async () => {
      const perKeyAdapter = createFileAdapter({
        source: './messages/{{locale}}/{{key}}.json',
        codec: jsonCodec,
      });
      const perLocaleAdapter = createFileAdapter({
        source: './messages/{{locale}}.json',
        codec: jsonCodec,
      });

      await expect(perKeyAdapter.detectSplitKeys?.()).resolves.toBe(false);
      await expect(perLocaleAdapter.detectSplitKeys?.()).resolves.toBe(true);
    });
  });

  describe('createSyncPlugin', () => {
    it('loads one dictionary per discovered entry', async () => {
      await writeFixture(join(testDir, 'messages/en/home.json'), {
        title: 'Hello',
      });
      await writeFixture(join(testDir, 'messages/fr/home.json'), {
        title: 'Bonjour',
      });

      const plugin = createSyncPlugin({
        name: 'sync-json-test',
        adapter: createFileAdapter({
          source: './messages/{{locale}}/{{key}}.json',
          codec: jsonCodec,
        }),
        location: 'test-location',
      });

      const dictionaries = (await plugin.loadDictionaries?.({
        configuration,
      })) as Dictionary[];

      expect(dictionaries).toHaveLength(2);

      const englishDictionary = dictionaries.find(
        (dictionary) => dictionary.locale === 'en'
      );
      const frenchDictionary = dictionaries.find(
        (dictionary) => dictionary.locale === 'fr'
      );

      expect(englishDictionary).toMatchObject({
        key: 'home',
        location: 'test-location',
        fill: 'messages/{{locale}}/{{key}}.json',
        filePath: 'messages/en/home.json',
        content: { title: 'Hello' },
        priority: 0,
      });
      // Only non-default locales are flagged as filled
      expect(englishDictionary?.filled).toBeUndefined();
      expect(frenchDictionary?.filled).toBe(true);
      expect(frenchDictionary?.content).toEqual({ title: 'Bonjour' });
    });

    it('splits per-locale files into one dictionary per top-level key', async () => {
      await writeFixture(join(testDir, 'messages/en.json'), {
        Hero: { title: 'Hello' },
        Nav: { home: 'Home' },
      });

      const plugin = createSyncPlugin({
        name: 'sync-json-test',
        adapter: createFileAdapter({
          source: './messages/{{locale}}.json',
          codec: jsonCodec,
        }),
        location: 'test-location',
      });

      const dictionaries = (await plugin.loadDictionaries?.({
        configuration,
      })) as Dictionary[];

      const englishKeys = dictionaries
        .filter((dictionary) => dictionary.locale === 'en')
        .map((dictionary) => dictionary.key)
        .sort();

      expect(englishKeys).toEqual(['Hero', 'Nav']);
    });

    it('does not implement write-back hooks in pull direction', async () => {
      const plugin = createSyncPlugin({
        name: 'load-json-test',
        adapter: createFileAdapter({
          source: './messages/{{locale}}/{{key}}.json',
          codec: jsonCodec,
        }),
        direction: 'pull',
        location: 'test-location',
      });

      expect(plugin.formatOutput).toBeUndefined();
      expect(plugin.afterBuild).toBeUndefined();
    });

    it('applies the locale override to every generated dictionary', async () => {
      await writeFixture(join(testDir, 'messages/en/home.json'), {
        title: 'Hello',
      });

      const plugin = createSyncPlugin({
        name: 'load-json-test',
        adapter: createFileAdapter({
          source: './messages/{{locale}}/{{key}}.json',
          codec: jsonCodec,
          discovery: 'inclusive',
        }),
        direction: 'pull',
        location: 'test-location',
        localeOverride: 'fr' as Locale,
      });

      const dictionaries = (await plugin.loadDictionaries?.({
        configuration,
      })) as Dictionary[];

      expect(dictionaries[0]?.locale).toBe('fr');
    });

    it('writes back only the dictionaries owned by the plugin instance', async () => {
      const plugin = createSyncPlugin({
        name: 'sync-json-test',
        adapter: createFileAdapter({
          source: './messages/{{locale}}/{{key}}.json',
          codec: jsonCodec,
        }),
        location: 'test-location',
        splitKeys: false,
      });

      await plugin.afterBuild?.({
        dictionaries: {
          unmergedDictionaries: {},
          mergedDictionaries: {
            home: {
              dictionary: {
                key: 'home',
                location: 'test-location',
                content: { title: 'Hello' },
              },
            },
            foreign: {
              dictionary: {
                key: 'foreign',
                location: 'another-plugin',
                content: { title: 'Not mine' },
              },
            },
          },
        },
        configuration,
      });

      const ownedFile = await readFile(
        join(testDir, 'messages/en/home.json'),
        'utf-8'
      );
      expect(JSON.parse(ownedFile)).toEqual({ title: 'Hello' });

      await expect(
        readFile(join(testDir, 'messages/en/foreign.json'), 'utf-8')
      ).rejects.toThrow();
    });

    it('re-assembles namespaces into one file per locale in split mode', async () => {
      const plugin = createSyncPlugin({
        name: 'sync-json-test',
        adapter: createFileAdapter({
          source: './messages/{{locale}}.json',
          codec: jsonCodec,
        }),
        location: 'test-location',
      });

      await plugin.afterBuild?.({
        dictionaries: {
          unmergedDictionaries: {},
          mergedDictionaries: {
            Hero: {
              dictionary: {
                key: 'Hero',
                location: 'test-location',
                content: { title: 'Hello' },
              },
            },
            Nav: {
              dictionary: {
                key: 'Nav',
                location: 'test-location',
                content: { home: 'Home' },
              },
            },
          },
        },
        configuration,
      });

      const written = await readFile(
        join(testDir, 'messages/en.json'),
        'utf-8'
      );

      expect(JSON.parse(written)).toEqual({
        Hero: { title: 'Hello' },
        Nav: { home: 'Home' },
      });
    });

    it('skips empty content instead of erasing the target file', async () => {
      const targetPath = join(testDir, 'messages/en/home.json');
      await writeFixture(targetPath, { title: 'Keep me' });

      const plugin = createSyncPlugin({
        name: 'sync-json-test',
        adapter: createFileAdapter({
          source: './messages/{{locale}}/{{key}}.json',
          codec: jsonCodec,
        }),
        location: 'test-location',
        splitKeys: false,
      });

      await plugin.afterBuild?.({
        dictionaries: {
          unmergedDictionaries: {},
          mergedDictionaries: {
            home: {
              dictionary: {
                key: 'home',
                location: 'test-location',
                content: {},
              },
            },
          },
        },
        configuration,
      });

      const preserved = await readFile(targetPath, 'utf-8');
      expect(JSON.parse(preserved)).toEqual({ title: 'Keep me' });
    });

    it('only reformats content declarations targeting its canonical path', async () => {
      const plugin = createSyncPlugin({
        name: 'sync-json-test',
        adapter: createFileAdapter({
          source: './messages/{{locale}}/{{key}}.json',
          codec: jsonCodec,
        }),
        location: 'test-location',
        splitKeys: false,
      });

      const ownedDictionary = {
        key: 'home',
        locale: 'en' as Locale,
        filePath: 'messages/en/home.json',
        content: { title: 'Hello' },
      };

      const foreignDictionary = {
        ...ownedDictionary,
        filePath: 'other/en/home.json',
      };

      // Owned: the hook unwraps the dictionary into its raw content
      await expect(
        plugin.formatOutput?.({ dictionary: ownedDictionary, configuration })
      ).resolves.toEqual({ title: 'Hello' });

      // Foreign: the dictionary is returned untouched
      await expect(
        plugin.formatOutput?.({ dictionary: foreignDictionary, configuration })
      ).resolves.toBe(foreignDictionary);
    });
  });
});
