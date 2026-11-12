import { describe, expect, it } from 'vitest';
import { resolveSelectedLocales } from './resolveSelectedLocales';

describe('resolveSelectedLocales', () => {
  const availableLocales = ['en', 'fr', 'es'];

  it('keeps the valid stored locales in their order', () => {
    expect(resolveSelectedLocales(['fr', 'en'], availableLocales)).toEqual([
      'fr',
      'en',
    ]);
  });

  it('drops stored locales the project does not declare', () => {
    expect(resolveSelectedLocales(['de', 'es'], availableLocales)).toEqual([
      'es',
    ]);
  });

  it('falls back to the default locales when the selection is empty', () => {
    expect(resolveSelectedLocales([], availableLocales, ['es'], 'en')).toEqual([
      'es',
    ]);
  });

  it('falls back to the interface locale', () => {
    expect(resolveSelectedLocales([], availableLocales, [], 'fr')).toEqual([
      'fr',
    ]);
  });

  it('falls back to the first available locale', () => {
    expect(resolveSelectedLocales(null, availableLocales, [], 'de')).toEqual([
      'en',
    ]);
  });

  it('keeps the stored selection while available locales are loading', () => {
    expect(resolveSelectedLocales(['de'], [])).toEqual(['de']);
  });
});
