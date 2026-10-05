import type { AIConfig } from '@intlayer/ai';
import { getUnmergedDictionaries } from '@intlayer/dictionaries-entry/unmerged';
import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { AIClient } from '../utils/setupAI';
import type { TranslationTask } from './listTranslationsTasks';
import { translateDictionary } from './translateDictionary';

vi.mock('@intlayer/dictionaries-entry/unmerged', () => ({
  getUnmergedDictionaries: vi.fn(),
}));
vi.mock('@intlayer/engine/build', () => ({}));
vi.mock('@intlayer/engine/cli', () => ({}));
vi.mock('../utils/checkAccess', () => ({
  getAuthenticatedAPI: async () => ({}),
}));
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
  location: 'local',
  title: 'Home',
  description: 'Home page',
  tags: [],
  content: {
    title: {
      nodeType: 'translation',
      translation: { en: 'Hello', fr: 'Salut' },
    },
    subtitle: {
      nodeType: 'translation',
      translation: { en: 'Welcome', fr: 'Bienvenue' },
    },
  },
};

const configuration = {
  internationalization: { defaultLocale: 'en', locales: ['en', 'fr'] },
  dictionary: { fill: true },
} as unknown as IntlayerConfig;

describe('translateDictionary', () => {
  beforeEach(() => {
    vi.mocked(getUnmergedDictionaries).mockReturnValue({ home: [dictionary] });
  });

  it('re-translates only the source values changed since the last fill', async () => {
    const translateJSON = vi.fn(
      async ({ entryFileContent }: { entryFileContent: unknown }) => ({
        fileContent: Object.fromEntries(
          Object.entries(entryFileContent as Record<number, string>).map(
            ([index, value]) => [index, `[fr] ${value}`]
          )
        ),
      })
    );

    const task: TranslationTask = {
      dictionaryKey: 'home',
      dictionaryLocalId,
      sourceLocale: 'en',
      targetLocales: ['fr'],
      dictionaryPreset: '',
      dictionaryFilePath: 'src/home.content.ts',
      changedSourceContent: { fr: { title: 'Hello' } },
    };

    const result = await translateDictionary(task, configuration, {
      mode: 'complete',
      fillMetadata: false,
      aiClient: { translateJSON } as unknown as AIClient,
      aiConfig: {} as AIConfig,
    });

    expect(translateJSON).toHaveBeenCalledTimes(1);
    expect(translateJSON.mock.calls[0]?.[0].entryFileContent).toEqual({
      1: 'Hello',
    });
    expect(result.dictionaryOutput?.content).toEqual({
      title: {
        nodeType: 'translation',
        translation: { en: 'Hello', fr: '[fr] Hello' },
      },
      subtitle: {
        nodeType: 'translation',
        translation: { en: 'Welcome', fr: 'Bienvenue' },
      },
    });
  });
});
