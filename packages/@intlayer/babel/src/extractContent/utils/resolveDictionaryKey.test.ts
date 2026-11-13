import type { IntlayerConfig } from '@intlayer/types/config';
import type { Dictionary } from '@intlayer/types/dictionary';
import { describe, expect, it } from 'vitest';
import {
  getComponentFilePath,
  resolveDictionaryKey,
} from './resolveDictionaryKey';

const BASE_DIR = '/project';
const HOME_PATH = `${BASE_DIR}/src/home.tsx`;

const configuration = {
  system: { baseDir: BASE_DIR },
  content: { fileExtensions: ['.content.ts'] },
} as unknown as IntlayerConfig;

const createDictionary = (
  key: string,
  componentFilePath?: string
): Dictionary => ({
  key,
  content: {},
  filePath: `locales/en/${key}.content.json`,
  componentFilePath,
});

describe('getComponentFilePath', () => {
  it('returns a POSIX path relative to the project root', () => {
    expect(getComponentFilePath(HOME_PATH, configuration)).toBe('src/home.tsx');
  });
});

describe('resolveDictionaryKey', () => {
  it('returns the initial key when no dictionary uses it', () => {
    expect(resolveDictionaryKey('home', HOME_PATH, configuration, {})).toBe(
      'home'
    );
  });

  it('reuses the key of a dictionary extracted from the same component', () => {
    const unmergedDictionaries = {
      home: [createDictionary('home', 'src/home.tsx')],
    };

    expect(
      resolveDictionaryKey(
        'home',
        HOME_PATH,
        configuration,
        unmergedDictionaries
      )
    ).toBe('home');
  });

  it('increments when the key belongs to another component', () => {
    const unmergedDictionaries = {
      route: [createDictionary('route', 'src/routes/about.tsx')],
    };

    expect(
      resolveDictionaryKey(
        'route',
        `${BASE_DIR}/src/routes/index.tsx`,
        configuration,
        unmergedDictionaries
      )
    ).toBe('route1');
  });

  it('finds the incremented key already owned by the component', () => {
    const unmergedDictionaries = {
      route: [createDictionary('route', 'src/routes/about.tsx')],
      route1: [createDictionary('route1', 'src/routes/index.tsx')],
    };

    expect(
      resolveDictionaryKey(
        'route',
        `${BASE_DIR}/src/routes/index.tsx`,
        configuration,
        unmergedDictionaries
      )
    ).toBe('route1');
  });

  it('does not claim a dictionary that has no componentFilePath', () => {
    const unmergedDictionaries = { home: [createDictionary('home')] };

    expect(
      resolveDictionaryKey(
        'home',
        HOME_PATH,
        configuration,
        unmergedDictionaries
      )
    ).toBe('home1');
  });

  it('ignores dictionaries without owner next to the owned one', () => {
    const unmergedDictionaries = {
      home: [
        createDictionary('home', 'src/home.tsx'),
        { ...createDictionary('home'), locale: 'fr' } as Dictionary,
      ],
    };

    expect(
      resolveDictionaryKey(
        'home',
        HOME_PATH,
        configuration,
        unmergedDictionaries
      )
    ).toBe('home');
  });

  it('does not reuse a key already taken in the same file', () => {
    const unmergedDictionaries = {
      home: [createDictionary('home', 'src/home.tsx')],
    };

    expect(
      resolveDictionaryKey(
        'home',
        HOME_PATH,
        configuration,
        unmergedDictionaries,
        new Set(['home'])
      )
    ).toBe('home1');
  });

  it('keeps the key a component already owns when its derived key changes', () => {
    const unmergedDictionaries = {
      async: [createDictionary('async', 'src/app/about/page.tsx')],
    };

    expect(
      resolveDictionaryKey(
        'about',
        `${BASE_DIR}/src/app/about/page.tsx`,
        configuration,
        unmergedDictionaries
      )
    ).toBe('async');
  });
});
