import { getDictionaries } from '@intlayer/dictionaries-entry';
import { getUnmergedDictionaries } from '@intlayer/dictionaries-entry/unmerged';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listMissingTranslationsWithConfig } from '../test';
import { listTranslationsTasks } from './listTranslationsTasks';
import type { PreviousDictionaries } from './sourceChanges';

vi.mock('@intlayer/dictionaries-entry', () => ({ getDictionaries: vi.fn() }));
vi.mock('@intlayer/dictionaries-entry/unmerged', () => ({
  getUnmergedDictionaries: vi.fn(),
}));
vi.mock('../test', () => ({ listMissingTranslationsWithConfig: vi.fn() }));
vi.mock('@intlayer/engine/build', () => ({}));
vi.mock('@intlayer/engine/cli', () => ({}));
vi.mock('@intlayer/config/logger', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@intlayer/config/logger')>()),
  getAppLogger: () => () => undefined,
}));

const dictionaryLocalId: LocalDictionaryId = 'home::local::src/home.content.ts';

/** Fully translated dictionary, whose English title was edited to `Hello`. */
const dictionary: Dictionary = {
  key: 'home',
  localId: dictionaryLocalId,
  filePath: 'src/home.content.ts',
  content: {
    title: {
      nodeType: 'translation',
      translation: { en: 'Hello', fr: 'Salut', es: 'Hola' },
    },
    subtitle: {
      nodeType: 'translation',
      translation: { en: 'Welcome', fr: 'Bienvenue', es: 'Bienvenido' },
    },
  },
};

const configuration = {
  dictionary: { fill: true },
} as IntlayerConfig;

/** `dictionary` as it was in git, with the title and translations given. */
const getPreviousDictionary = (title: Record<string, string>): Dictionary => ({
  ...dictionary,
  content: {
    ...dictionary.content,
    title: { nodeType: 'translation', translation: title },
  },
});

const listTasks = (previousDictionaries?: PreviousDictionaries) =>
  listTranslationsTasks(
    [dictionaryLocalId],
    ['en', 'fr', 'es'],
    'complete',
    'en',
    configuration,
    previousDictionaries
  );

describe('listTranslationsTasks', () => {
  beforeEach(() => {
    vi.mocked(getDictionaries).mockReturnValue({ home: dictionary });
    vi.mocked(getUnmergedDictionaries).mockReturnValue({ home: [dictionary] });
    vi.mocked(listMissingTranslationsWithConfig).mockReturnValue({
      missingTranslations: [],
    } as unknown as ReturnType<typeof listMissingTranslationsWithConfig>);
  });

  it('skips a fully translated dictionary whose source did not change', () => {
    expect(listTasks()).toEqual([]);
    expect(
      listTasks({
        [dictionaryLocalId]: getPreviousDictionary({
          en: 'Hello',
          fr: 'Salut',
          es: 'Hola',
        }),
      })
    ).toEqual([]);
  });

  it('re-translates locales whose source value changed in git', () => {
    const tasks = listTasks({
      [dictionaryLocalId]: getPreviousDictionary({
        en: 'Hi',
        fr: 'Salut',
        es: 'Hola',
      }),
    });

    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toMatchObject({
      dictionaryKey: 'home',
      sourceLocale: 'en',
      targetLocales: ['fr', 'es'],
      changedSourceContent: {
        fr: { title: 'Hello' },
        es: { title: 'Hello' },
      },
    });
  });

  it('keeps a translation edited in the same change as its source', () => {
    const tasks = listTasks({
      [dictionaryLocalId]: getPreviousDictionary({
        en: 'Hi',
        fr: 'Salut',
        es: 'Holi',
      }),
    });

    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toMatchObject({
      targetLocales: ['fr'],
      changedSourceContent: { fr: { title: 'Hello' } },
    });
  });
});
