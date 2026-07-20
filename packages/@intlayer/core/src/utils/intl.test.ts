import { afterEach, describe, expect, it, vi } from 'vitest';
import { getLocaleName } from '../localization/getLocaleName';
import { getCachedIntl } from './intl';

/**
 * Temporarily removes an `Intl` constructor to emulate a JavaScript engine
 * that ships without it — notably Hermes release builds on React Native,
 * where `Intl.DisplayNames`, `Intl.ListFormat` and `Intl.Segmenter` are absent.
 */
const withoutIntlConstructor = <T>(
  constructorName: 'DisplayNames' | 'ListFormat' | 'Segmenter',
  run: () => T
): T => {
  const intlObject = Intl as unknown as Record<string, unknown>;
  const original = intlObject[constructorName];

  intlObject[constructorName] = undefined;

  try {
    return run();
  } finally {
    intlObject[constructorName] = original;
  }
};

describe('getCachedIntl', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should reuse the same instance for identical locale and options', () => {
    const first = getCachedIntl('NumberFormat', 'en', { style: 'percent' });
    const second = getCachedIntl('NumberFormat', 'en', { style: 'percent' });

    expect(first).toBe(second);
  });

  it('should keep distinct caches for distinct constructors', () => {
    const numberFormat = getCachedIntl('NumberFormat', 'en');
    const dateTimeFormat = getCachedIntl('DateTimeFormat', 'en');

    expect(numberFormat).not.toBe(dateTimeFormat);
  });

  it('should fall back to the raw code when `Intl.DisplayNames` is missing', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const displayName = withoutIntlConstructor('DisplayNames', () =>
      getCachedIntl('DisplayNames', 'fr', { type: 'language' }).of('en')
    );

    expect(displayName).toBe('en');
  });

  it('should fall back to a comma-joined list when `Intl.ListFormat` is missing', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const formattedList = withoutIntlConstructor('ListFormat', () =>
      getCachedIntl('ListFormat', 'en', { type: 'conjunction' }).format([
        'a',
        'b',
      ])
    );

    expect(formattedList).toBe('a, b');
  });

  it('should not collide the caches of two constructors missing from the engine', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const { displayName, formattedList } = withoutIntlConstructor(
      'DisplayNames',
      () =>
        withoutIntlConstructor('ListFormat', () => ({
          displayName: getCachedIntl('DisplayNames', 'en').of('fr'),
          formattedList: getCachedIntl('ListFormat', 'en').format(['a', 'b']),
        }))
    );

    expect(displayName).toBe('fr');
    expect(formattedList).toBe('a, b');
  });

  it('should warn once per missing constructor outside production', () => {
    const warnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined);

    withoutIntlConstructor('Segmenter', () => {
      getCachedIntl('Segmenter', 'en');
      getCachedIntl('Segmenter', 'fr');
    });

    expect(warnSpy.mock.calls.length).toBeLessThanOrEqual(1);
  });
});

describe('getLocaleName without Intl.DisplayNames', () => {
  it('should return the locale code instead of throwing', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const localeName = withoutIntlConstructor('DisplayNames', () =>
      getLocaleName('fr' as never, 'en' as never)
    );

    expect(localeName).toBe('fr');
  });
});
