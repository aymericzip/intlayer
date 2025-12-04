import type { Dictionary } from '@intlayer/types';
import { describe, expect, it } from 'vitest';
import { getAvailableLocalesInDictionary } from './getAvailableLocalesInDictionary';

describe('getAvailableLocalesInDictionary', () => {
  it('should extract locales from translation nodes', () => {
    const dictionary: Dictionary = {
      key: 'test',
      content: {
        navigation: {
          home: {
            nodeType: 'translation',
            translation: { en: 'Home', fr: 'Accueil' },
          },
          about: {
            nodeType: 'translation',
            translation: { en: 'About', fr: 'À propos' },
          },
        },
        buttons: {
          submit: {
            nodeType: 'translation',
            translation: { en: 'Submit', fr: 'Envoyer', es: 'Enviar' },
          },
        },
      },
    };

    const locales = getAvailableLocalesInDictionary(dictionary);

    expect(locales).toContain('en');
    expect(locales).toContain('fr');
    expect(locales).toContain('es');
    expect(locales).toHaveLength(3);
  });

  it('should return empty array for dictionary with no translations', () => {
    const dictionary: Dictionary = {
      key: 'test',
      content: {
        someKey: 'someValue',
      },
    };

    const locales = getAvailableLocalesInDictionary(dictionary);

    expect(locales).toEqual([]);
  });

  it('should handle deeply nested translation nodes', () => {
    const dictionary: Dictionary = {
      key: 'test',
      content: {
        level1: {
          level2: {
            level3: {
              message: {
                nodeType: 'translation',
                translation: { en: 'Hello', de: 'Hallo' },
              },
            },
          },
        },
      },
    };

    const locales = getAvailableLocalesInDictionary(dictionary);

    expect(locales).toContain('en');
    expect(locales).toContain('de');
    expect(locales).toHaveLength(2);
  });

  it('should handle dictionary with only one locale', () => {
    const dictionary: Dictionary = {
      key: 'test',
      content: {
        greeting: {
          nodeType: 'translation',
          translation: { fr: 'Bonjour' },
        },
      },
    };

    const locales = getAvailableLocalesInDictionary(dictionary);

    expect(locales).toContain('fr');
    expect(locales).toHaveLength(1);
  });

  it('should handle empty content', () => {
    const dictionary: Dictionary = {
      key: 'test',
      content: {},
    };

    const locales = getAvailableLocalesInDictionary(dictionary);

    expect(locales).toEqual([]);
  });
});
