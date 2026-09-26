// @vitest-environment node
import { get } from 'svelte/store';
import { describe, expect, it } from 'vitest';
import {
  _,
  addMessages,
  date,
  defineMessages,
  dictionary,
  format,
  getDateFormatter,
  getMessageFormatter,
  getNumberFormatter,
  getTimeFormatter,
  init,
  isLoading,
  json,
  locale,
  locales,
  number,
  register,
  t,
  time,
  unwrapFunctionStore,
  waitLocale,
} from './index';

describe('svelte-i18n compat adapter', () => {
  it('handles locale store and init', async () => {
    let currentLocale: string | null | undefined;
    const unsub = locale.subscribe((val) => {
      currentLocale = val;
    });

    locale.set('fr');
    expect(currentLocale).toBe('fr');

    await init({ fallbackLocale: 'en', initialLocale: 'es' });
    expect(currentLocale).toBe('es');

    unsub();
  });

  it('provides locales and isLoading stores', () => {
    expect(Array.isArray(get(locales))).toBe(true);
    expect(get(isLoading)).toBe(false);
  });

  it('formats messages with dictionary store and interpolation', () => {
    addMessages('en', {
      greeting: 'Hello {name}!',
      items: '{count, plural, one {# item} other {# items}}',
    });

    locale.set('en');
    const $t = get(t);

    expect($t('greeting', { values: { name: 'World' } })).toBe('Hello World!');
    expect($t('items', { values: { count: 1 } })).toBe('1 item');
    expect($t('items', { values: { count: 5 } })).toBe('5 items');
  });

  it('supports MessageObject signature', () => {
    addMessages('en', {
      welcome: 'Welcome, {name}',
    });

    locale.set('en');
    const $format = get(format);

    expect(
      $format({
        id: 'welcome',
        values: { name: 'Alice' },
      })
    ).toBe('Welcome, Alice');
  });

  it('falls back to default or echoes id when key is missing', () => {
    locale.set('en');
    const $_ = get(_);

    expect($_('missing.key', { default: 'Default Text' })).toBe('Default Text');
    expect($_('missing.key')).toBe('missing.key');
  });

  it('formats date, time, and numbers', () => {
    locale.set('en');

    const $date = get(date);
    const $number = get(number);

    const testDate = new Date(2026, 0, 15);
    const formattedDate = $date(testDate);
    expect(typeof formattedDate).toBe('string');
    expect(formattedDate.length).toBeGreaterThan(0);

    const formattedNumber = $number(1234567.89);
    expect(formattedNumber).toContain('1,234,567');
  });

  it('supports unwrapFunctionStore with freeze', () => {
    addMessages('en', {
      test: 'Unwrapped {val}',
    });
    locale.set('en');

    const unwrappedT = unwrapFunctionStore(t);
    expect(unwrappedT('test', { values: { val: 'works' } })).toBe(
      'Unwrapped works'
    );

    unwrappedT.freeze();
  });

  it('supports defineMessages and waitLocale', async () => {
    const msgs = defineMessages({
      hello: { id: 'hello', default: 'Hello' },
    });
    expect(msgs.hello.id).toBe('hello');

    await expect(waitLocale()).resolves.toBeUndefined();
  });

  it('provides standalone formatter factories', () => {
    const numFormatter = getNumberFormatter({ locale: 'en' });
    expect(numFormatter.format(100)).toBe('100');

    const dateFormatter = getDateFormatter({ locale: 'en' });
    expect(dateFormatter.format(new Date(2026, 0, 1))).toBeDefined();

    const timeFormatter = getTimeFormatter({ locale: 'en' });
    expect(timeFormatter.format(new Date(2026, 0, 1))).toBeDefined();

    const msgFormatter = getMessageFormatter('Hello {name}', 'en');
    expect(msgFormatter.format({ name: 'Bob' })).toBe('Hello Bob');

    expect(get(dictionary)).toBeDefined();
    expect(get(json)('non.existent.key')).toBeUndefined();
    expect(get(time)(new Date())).toBeDefined();

    register('de', async () => ({ test: 'Hallo' }));
  });
});
