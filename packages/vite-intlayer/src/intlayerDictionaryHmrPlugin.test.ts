import type { IntlayerConfig } from '@intlayer/types/config';
import type { Plugin } from 'vite';
import { describe, expect, it, vi } from 'vitest';
import {
  DICTIONARY_ENTRY_HMR_FOOTER,
  findDictionaryConsumers,
  intlayerDictionaryHmr,
} from './intlayerDictionaryHmrPlugin';

const INTLAYER_DIR = '/app/.intlayer';

const config = {
  system: {
    mainDir: `${INTLAYER_DIR}/main`,
    dictionariesDir: `${INTLAYER_DIR}/dictionary`,
    unmergedDictionariesDir: `${INTLAYER_DIR}/unmerged_dictionary`,
    remoteDictionariesDir: `${INTLAYER_DIR}/remote_dictionary`,
  },
} as unknown as IntlayerConfig;

/** Source shape of a generated `.intlayer/main` entry point. */
const generatedEntry = `const dictionaries = {
  "home": _home
};
const getDictionaries = () => dictionaries;

export { getDictionaries };
export default dictionaries;
`;

type FakeModule = {
  id: string;
  file: string | null;
  transformResult: { code: string } | null;
};

const createModule = (file: string, code: string | null): FakeModule => ({
  id: file,
  file,
  transformResult: code === null ? null : { code },
});

const homeJson = createModule(`${INTLAYER_DIR}/dictionary/home.json`, '{}');
const homePage = createModule(
  '/app/src/HomePage.tsx',
  'const content = useIntlayer("home");'
);
const aboutPage = createModule(
  '/app/src/AboutPage.tsx',
  "const content = useIntlayer('about');"
);
const generatedEntryModule = createModule(
  `${INTLAYER_DIR}/main/dictionaries.mjs`,
  '"home": _home'
);
const notLoaded = createModule('/app/src/Lazy.tsx', null);
const homeLookalike = createModule(
  '/app/src/Badge.tsx',
  'const badge = { type: "home" }; jsx("home", {}); isActive("home");'
);

const moduleGraphModules = [
  homeJson,
  homePage,
  aboutPage,
  generatedEntryModule,
  notLoaded,
  homeLookalike,
];

/** Invokes the plugin's `transform` hook the way Vite would. */
const transform = (
  plugin: Plugin,
  code: string,
  moduleId: string,
  options?: { ssr?: boolean }
): { code: string } | null => {
  const handler = plugin.transform as unknown as (
    code: string,
    id: string,
    options?: { ssr?: boolean }
  ) => { code: string } | null;

  return handler.call({} as never, code, moduleId, options);
};

/** Invokes the plugin's `hotUpdate` hook for the given environment. */
const hotUpdate = (
  plugin: Plugin,
  file: string,
  consumer: 'client' | 'server'
): FakeModule[] | undefined => {
  const handler = plugin.hotUpdate as unknown as (
    this: unknown,
    options: { file: string; modules: FakeModule[] }
  ) => FakeModule[] | undefined;

  const context = {
    environment: {
      config: { consumer },
      moduleGraph: {
        idToModuleMap: new Map(
          moduleGraphModules.map((moduleNode) => [moduleNode.id, moduleNode])
        ),
      },
    },
  };

  return handler.call(context, { file, modules: [homeJson] });
};

/** Runs the footer against a stand-in for `import.meta.hot`. */
const runFooter = (
  dictionaries: Record<string, unknown>,
  hot: { data: Record<string, unknown>; accept: () => void }
): void => {
  const footer = DICTIONARY_ENTRY_HMR_FOOTER.replaceAll(
    'import.meta.hot',
    'hot'
  );

  new Function('dictionaries', 'hot', footer)(dictionaries, hot);
};

describe('findDictionaryConsumers', () => {
  it('matches the key passed as the first argument of a call', () => {
    expect(
      findDictionaryConsumers(moduleGraphModules, 'home', INTLAYER_DIR)
    ).toEqual([homePage]);
    expect(
      findDictionaryConsumers(moduleGraphModules, 'about', INTLAYER_DIR)
    ).toEqual([aboutPage]);
  });

  it('ignores generated files and modules not transformed yet', () => {
    const consumers = findDictionaryConsumers(
      moduleGraphModules,
      'home',
      INTLAYER_DIR
    );

    expect(consumers).not.toContain(generatedEntryModule);
    expect(consumers).not.toContain(notLoaded);
  });

  it('matches compat accessors and transformed import calls', () => {
    const compatConsumer = createModule(
      '/app/src/Compat.tsx',
      "const { t } = useTranslation('home');"
    );
    const transformedConsumer = createModule(
      '/app/src/Transformed.js',
      'const content = (0, _react_intlayer.useIntlayer)("home");'
    );

    expect(
      findDictionaryConsumers(
        [compatConsumer, transformedConsumer],
        'home',
        INTLAYER_DIR
      )
    ).toEqual([compatConsumer, transformedConsumer]);
  });

  it('ignores the key used as a plain string or element name', () => {
    expect(
      findDictionaryConsumers(moduleGraphModules, 'home', INTLAYER_DIR)
    ).not.toContain(homeLookalike);
  });

  it('matches a template literal argument and escapes the key', () => {
    const templateConsumer = createModule(
      '/app/src/Dot.tsx',
      'getIntlayer(`a.b`, locale);'
    );
    const lookalike = createModule('/app/src/Other.tsx', 'getIntlayer("axb");');

    expect(
      findDictionaryConsumers(
        [templateConsumer, lookalike],
        'a.b',
        INTLAYER_DIR
      )
    ).toEqual([templateConsumer]);
  });

  it('does not match a key that only prefixes another', () => {
    expect(
      findDictionaryConsumers(moduleGraphModules, 'hom', INTLAYER_DIR)
    ).toEqual([]);
  });
});

describe('intlayerDictionaryHmr', () => {
  const plugin = intlayerDictionaryHmr(config);

  it('only runs on the dev server', () => {
    expect(plugin.apply).toBe('serve');
  });

  it('makes the client main entry points accept their own updates', () => {
    const result = transform(
      plugin,
      generatedEntry,
      `${INTLAYER_DIR}/main/dictionaries.mjs?v=123`
    );

    expect(result?.code).toBe(
      `${generatedEntry}${DICTIONARY_ENTRY_HMR_FOOTER}`
    );
  });

  it('leaves server, CommonJS and unrelated modules untouched', () => {
    const entryId = `${INTLAYER_DIR}/main/dictionaries.mjs`;

    expect(
      transform(plugin, generatedEntry, entryId, { ssr: true })
    ).toBeNull();
    expect(
      transform(plugin, generatedEntry, `${INTLAYER_DIR}/main/dictionaries.cjs`)
    ).toBeNull();
    expect(transform(plugin, generatedEntry, '/app/src/main.mjs')).toBeNull();
    expect(transform(plugin, 'export default {};', entryId)).toBeNull();
  });

  it('hot-updates the changed dictionary consumers on the client', () => {
    expect(
      hotUpdate(plugin, `${INTLAYER_DIR}/dictionary/home.json`, 'client')
    ).toEqual([homeJson, homePage]);
    expect(
      hotUpdate(
        plugin,
        `${INTLAYER_DIR}/unmerged_dictionary/home.json`,
        'client'
      )
    ).toEqual([homeJson, homePage]);
  });

  it('keeps the default behavior for other files and environments', () => {
    expect(
      hotUpdate(plugin, `${INTLAYER_DIR}/dictionary/home.json`, 'server')
    ).toBeUndefined();
    expect(
      hotUpdate(plugin, `${INTLAYER_DIR}/types/home.json`, 'client')
    ).toBeUndefined();
    expect(
      hotUpdate(plugin, '/app/src/HomePage.tsx', 'client')
    ).toBeUndefined();
  });
});

describe('DICTIONARY_ENTRY_HMR_FOOTER', () => {
  it('stores the first instance and accepts its own updates', () => {
    const initialDictionaries = { home: { title: 'Hello' } };
    const hot = { data: {} as Record<string, unknown>, accept: vi.fn() };

    runFooter(initialDictionaries, hot);

    expect(hot.data.dictionaries).toBe(initialDictionaries);
    expect(hot.accept).toHaveBeenCalledOnce();
  });

  it('writes an update into the object earlier importers hold', () => {
    const initialDictionaries: Record<string, unknown> = {
      home: { title: 'Hello' },
      removed: { title: 'Gone' },
    };
    const hot = { data: {} as Record<string, unknown>, accept: vi.fn() };
    runFooter(initialDictionaries, hot);

    const updatedHome = { title: 'Hello!' };
    const addedAbout = { title: 'About' };
    runFooter({ home: updatedHome, about: addedAbout }, hot);

    expect(initialDictionaries).toEqual({
      home: updatedHome,
      about: addedAbout,
    });
    expect(hot.data.dictionaries).toBe(initialDictionaries);
  });
});
