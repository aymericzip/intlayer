import { describe, expect, it, vi } from 'vitest';
import { listMissingTranslationsWithConfig } from './listMissingTranslations';

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('@intlayer/unmerged-dictionaries-entry', () => ({
  getUnmergedDictionaries: vi.fn(),
}));

vi.mock('@intlayer/dictionaries-entry', () => ({
  getDictionaries: vi.fn(),
}));

// Use the real getMissingLocalesContentFromDictionary so the detection logic
// is exercised end-to-end.
vi.mock('@intlayer/core/plugins', async (importOriginal) => {
  const real = await importOriginal<typeof import('@intlayer/core/plugins')>();
  return real;
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

import { getDictionaries } from '@intlayer/dictionaries-entry';
import { getUnmergedDictionaries } from '@intlayer/unmerged-dictionaries-entry';

const mockUnmerged = getUnmergedDictionaries as ReturnType<typeof vi.fn>;
const mockMerged = getDictionaries as ReturnType<typeof vi.fn>;

const baseConfig = {
  internationalization: {
    locales: ['fr', 'en', 'es'],
    defaultLocale: 'en',
    requiredLocales: ['fr', 'en', 'es'],
  },
} as any;

// A merged multilingual dictionary that has `en` translated and `fr`/`es` empty
// — exactly what intlayer build produces when only `en` was authored.
const mergedTestDict = {
  key: 'test',
  content: {
    nodeType: 'translation',
    translation: {
      fr: {},
      en: { test: 'test in english' },
      es: {},
    },
  },
};

// A multilingual (unmerged) dictionary with all locales present
const fullyTranslatedDict = {
  key: 'full',
  content: {
    nodeType: 'translation',
    translation: {
      fr: 'bonjour',
      en: 'hello',
      es: 'hola',
    },
  },
};

// A multilingual (unmerged) dictionary missing fr and es
const partialUnmergedDict = {
  key: 'partial',
  content: {
    nodeType: 'translation',
    translation: {
      en: 'hello',
    },
  },
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('listMissingTranslationsWithConfig', () => {
  describe('merged-only dictionaries (unmerged_dictionaries.cjs is empty)', () => {
    it('detects missing locales when the dict only exists in mergedDictionaries', () => {
      mockUnmerged.mockReturnValue({});
      mockMerged.mockReturnValue({ test: mergedTestDict });

      const { missingTranslations, missingLocales, missingRequiredLocales } =
        listMissingTranslationsWithConfig(baseConfig);

      expect(missingTranslations).toHaveLength(1);
      expect(missingTranslations[0].key).toBe('test');
      expect(missingTranslations[0].locales).toEqual(
        expect.arrayContaining(['fr', 'es'])
      );
      expect(missingTranslations[0].locales).not.toContain('en');

      expect(missingLocales).toEqual(expect.arrayContaining(['fr', 'es']));
      expect(missingRequiredLocales).toEqual(
        expect.arrayContaining(['fr', 'es'])
      );
    });

    it('reports nothing when all locales are present in the merged dict', () => {
      mockUnmerged.mockReturnValue({});
      mockMerged.mockReturnValue({ full: fullyTranslatedDict });

      const { missingTranslations } =
        listMissingTranslationsWithConfig(baseConfig);

      expect(missingTranslations).toHaveLength(0);
    });
  });

  describe('unmerged multilingual dictionaries', () => {
    it('detects missing locales from an unmerged multilingual dictionary', () => {
      mockUnmerged.mockReturnValue({ partial: [partialUnmergedDict] });
      mockMerged.mockReturnValue({});

      const { missingTranslations } =
        listMissingTranslationsWithConfig(baseConfig);

      expect(missingTranslations).toHaveLength(1);
      expect(missingTranslations[0].key).toBe('partial');
      expect(missingTranslations[0].locales).toEqual(
        expect.arrayContaining(['fr', 'es'])
      );
    });

    it('reports nothing when the unmerged multilingual dict has all locales', () => {
      mockUnmerged.mockReturnValue({ full: [fullyTranslatedDict] });
      mockMerged.mockReturnValue({});

      const { missingTranslations } =
        listMissingTranslationsWithConfig(baseConfig);

      expect(missingTranslations).toHaveLength(0);
    });
  });

  describe('mixed: both unmerged and merged have entries', () => {
    it('checks unmerged multilingual dicts and also merged-only dicts in one pass', () => {
      mockUnmerged.mockReturnValue({ partial: [partialUnmergedDict] });
      mockMerged.mockReturnValue({
        partial: mergedTestDict, // should be ignored — unmerged takes priority
        test: mergedTestDict, // merged-only entry, should still be checked
      });

      const { missingTranslations } =
        listMissingTranslationsWithConfig(baseConfig);

      const keys = missingTranslations.map((t) => t.key);
      // 'partial' detected via unmerged path
      expect(keys).toContain('partial');
      // 'test' detected via merged-only fallback path
      expect(keys).toContain('test');
      // should not appear twice for 'partial'
      expect(keys.filter((k) => k === 'partial')).toHaveLength(1);
    });
  });

  describe('requiredLocales filtering', () => {
    it('only flags missing required locales', () => {
      const configPartialRequired = {
        internationalization: {
          locales: ['fr', 'en', 'es'],
          defaultLocale: 'en',
          requiredLocales: ['en'], // only en is required
        },
      } as any;

      mockUnmerged.mockReturnValue({});
      mockMerged.mockReturnValue({ test: mergedTestDict });

      const { missingRequiredLocales } = listMissingTranslationsWithConfig(
        configPartialRequired
      );

      // fr and es are missing but not required
      expect(missingRequiredLocales).toHaveLength(0);
    });
  });
});
