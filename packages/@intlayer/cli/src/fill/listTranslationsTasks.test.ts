import { getDictionaries } from '@intlayer/dictionaries-entry';
import { getUnmergedDictionaries } from '@intlayer/dictionaries-entry/unmerged';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { listMissingTranslationsWithConfig } from '../test';
import {
  type FillSourceSnapshot,
  hashSourceContent,
} from './fillSourceSnapshot';
import { listTranslationsTasks } from './listTranslationsTasks';

vi.mock('@intlayer/dictionaries-entry', () => ({ getDictionaries: vi.fn() }));
vi.mock('@intlayer/dictionaries-entry/unmerged', () => ({
  getUnmergedDictionaries: vi.fn(),
}));
vi.mock('../test', () => ({ listMissingTranslationsWithConfig: vi.fn() }));
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

const listTasks = (fillSourceSnapshot?: FillSourceSnapshot) =>
  listTranslationsTasks(
    [dictionaryLocalId],
    ['en', 'fr', 'es'],
    'complete',
    'en',
    configuration,
    fillSourceSnapshot
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
    const sourceHashes = hashSourceContent({
      title: 'Hello',
      subtitle: 'Welcome',
    });

    expect(listTasks()).toEqual([]);
    expect(
      listTasks({
        [dictionaryLocalId]: { fr: sourceHashes, es: sourceHashes },
      })
    ).toEqual([]);
  });

  it('re-translates locales filled from a since changed source value', () => {
    const tasks = listTasks({
      [dictionaryLocalId]: {
        fr: hashSourceContent({ title: 'Hi', subtitle: 'Welcome' }),
        es: hashSourceContent({ title: 'Hello', subtitle: 'Welcome' }),
      },
    });

    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toMatchObject({
      dictionaryKey: 'home',
      sourceLocale: 'en',
      targetLocales: ['fr'],
      sourceContent: { title: 'Hello', subtitle: 'Welcome' },
      changedSourceContent: { fr: { title: 'Hello' } },
    });
  });
});
