// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock getIntlayer so tests don't need real compiled dictionaries.
vi.mock('@intlayer/core/interpreter', () => ({
  getIntlayer: vi.fn(),
}));

// Mock the dictionary registry so the namespace enumeration has keys to search.
vi.mock('@intlayer/dictionaries-entry', () => ({
  getDictionaries: vi.fn(),
}));

import { getIntlayer } from '@intlayer/core/interpreter';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import { I18nClass } from './I18nClass';

const mockGetIntlayer = vi.mocked(getIntlayer);
const mockGetDictionaries = vi.mocked(getDictionaries);

describe('I18nClass', () => {
  beforeEach(() => {
    mockGetIntlayer.mockReset();
    mockGetDictionaries.mockReset();
    // By default expose a single `messages` namespace; tests that need
    // namespaced behaviour override this.
    mockGetDictionaries.mockReturnValue({ messages: {} } as never);
  });

  // ── constructor ────────────────────────────────────────────────────────────

  it('defaults locale to "en" when none is provided', () => {
    const i18n = new I18nClass();
    expect(i18n.locale).toBe('en');
  });

  it('stores the initial locale', () => {
    const i18n = new I18nClass({ locale: 'fr' });
    expect(i18n.locale).toBe('fr');
  });

  // ── activate ───────────────────────────────────────────────────────────────

  it('updates locale and emits "change" event on activate()', () => {
    const i18n = new I18nClass({ locale: 'en' });
    const listener = vi.fn();
    i18n.on('change', listener);
    i18n.activate('de');
    expect(i18n.locale).toBe('de');
    expect(listener).toHaveBeenCalledOnce();
  });

  it('loadAndActivate delegates to activate()', () => {
    const i18n = new I18nClass({ locale: 'en' });
    const listener = vi.fn();
    i18n.on('change', listener);
    // messages is required by the type but ignored at runtime
    i18n.loadAndActivate({ locale: 'ja', messages: {} });
    expect(i18n.locale).toBe('ja');
    expect(listener).toHaveBeenCalledOnce();
  });

  it('on() returns an unsubscribe function', () => {
    const i18n = new I18nClass();
    const listener = vi.fn();
    const unsubscribe = i18n.on('change', listener);
    unsubscribe();
    i18n.activate('fr');
    expect(listener).not.toHaveBeenCalled();
  });

  // ── messages getter ────────────────────────────────────────────────────────

  it('messages getter returns the dictionary for the current locale', () => {
    const catalog = { greeting: 'Hello' };
    mockGetIntlayer.mockReturnValue(catalog as never);
    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n.messages).toEqual(catalog);
  });

  it('messages getter returns {} when dictionary lookup fails', () => {
    mockGetIntlayer.mockImplementation(() => {
      throw new Error('not found');
    });
    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n.messages).toEqual({});
  });

  // ── _() / t ───────────────────────────────────────────────────────────────

  it('resolves a flat string from the messages dictionary', () => {
    mockGetIntlayer.mockReturnValue({ greeting: 'Hello world' } as never);
    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n._('greeting')).toBe('Hello world');
  });

  it('resolves a nested path (dotted id)', () => {
    mockGetIntlayer.mockReturnValue({
      home: { title: 'Welcome' },
    } as never);
    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n._('home.title')).toBe('Welcome');
  });

  it('resolves a flat dotted key from the dictionary (lingui format)', () => {
    mockGetIntlayer.mockReturnValue({
      'results-table.bundleSize': 'Bundle Size',
    } as never);
    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n._('results-table.bundleSize')).toBe('Bundle Size');
  });

  it('resolves a key from a namespaced dictionary (syncJSON split catalogs)', () => {
    // Catalogs are split into per-namespace dictionaries, each wrapping the flat
    // id→message map under a lingui `messages` key.
    mockGetDictionaries.mockReturnValue({
      shared: {},
      home: {},
    } as never);
    mockGetIntlayer.mockImplementation(((key: string) => {
      if (key === 'home') {
        return {
          messages: {
            'hero.aTestApplicationDesignedTo': ['A test application'],
          },
        };
      }
      return { messages: {} };
    }) as never);

    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n._('hero.aTestApplicationDesignedTo')).toBe(
      'A test application'
    );
  });

  it('does not echo the key path when no dictionary matches (no proxy leak)', () => {
    // A missing `messages` dictionary used to return a safe-fallback proxy that
    // stringified to the key path (`messages.hero.title`); enumeration avoids it.
    mockGetDictionaries.mockReturnValue({ home: {} } as never);
    mockGetIntlayer.mockReturnValue({ messages: {} } as never);

    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n._('hero.title')).toBe('hero.title');
  });

  it('merges every namespace into the messages getter', () => {
    mockGetDictionaries.mockReturnValue({ home: {}, shared: {} } as never);
    mockGetIntlayer.mockImplementation(((key: string) =>
      key === 'home'
        ? { messages: { 'hero.title': 'Home' } }
        : { messages: { 'nav.about': 'About' } }) as never);

    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n.messages).toEqual({
      'hero.title': 'Home',
      'nav.about': 'About',
    });
  });

  it('interpolates ICU values', () => {
    mockGetIntlayer.mockReturnValue({
      greeting: 'Hello, {name}!',
    } as never);
    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n._('greeting', { name: 'Alice' })).toBe('Hello, Alice!');
  });

  it('supports ICU plural syntax', () => {
    mockGetIntlayer.mockReturnValue({
      items: '{count, plural, one {# item} other {# items}}',
    } as never);
    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n._('items', { count: 1 })).toBe('1 item');
    expect(i18n._('items', { count: 5 })).toBe('5 items');
  });

  it('supports ICU select syntax', () => {
    mockGetIntlayer.mockReturnValue({
      role: '{role, select, admin {Admin} other {User}}',
    } as never);
    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n._('role', { role: 'admin' })).toBe('Admin');
    expect(i18n._('role', { role: 'member' })).toBe('User');
  });

  it('falls back to descriptor.message when key is not found', () => {
    mockGetIntlayer.mockImplementation(() => {
      throw new Error('not found');
    });
    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n._({ id: 'missing', message: 'Default message' })).toBe(
      'Default message'
    );
  });

  it('falls back to the raw id when no dictionary entry and no default message', () => {
    mockGetIntlayer.mockImplementation(() => {
      throw new Error('not found');
    });
    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n._('unknown.key')).toBe('unknown.key');
  });

  it('descriptor.values are merged with the values argument', () => {
    mockGetIntlayer.mockReturnValue({ msg: '{a} {b}' } as never);
    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n._({ id: 'msg', values: { a: 'foo' } }, { b: 'bar' })).toBe(
      'foo bar'
    );
  });

  it('t is an alias for _()', () => {
    mockGetIntlayer.mockReturnValue({ hello: 'Hi' } as never);
    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n.t('hello')).toBe(i18n._('hello'));
  });

  // ── runtime fallback catalog (load / loadAndActivate / constructor) ─────────

  it('resolves from a catalog loaded via load(locale, messages)', () => {
    mockGetIntlayer.mockImplementation(() => {
      throw new Error('messages dictionary not found');
    });
    const i18n = new I18nClass({ locale: 'en' });
    i18n.load('en', { 'results-table.bundleSize': 'Bundle Size' });
    expect(i18n._('results-table.bundleSize')).toBe('Bundle Size');
  });

  it('resolves a compiled (.mjs) token-array catalog value', () => {
    mockGetIntlayer.mockImplementation(() => {
      throw new Error('messages dictionary not found');
    });
    const i18n = new I18nClass({ locale: 'en' });
    i18n.load('en', { greeting: ['Hello ', ['name'], '!'] } as never);
    expect(i18n._('greeting', { name: 'Alice' })).toBe('Hello Alice!');
  });

  it('resolves from a catalog passed to the constructor (AllMessages)', () => {
    mockGetIntlayer.mockImplementation(() => {
      throw new Error('messages dictionary not found');
    });
    const i18n = new I18nClass({
      locale: 'fr',
      messages: { fr: { hello: 'Bonjour' } } as never,
    });
    expect(i18n._('hello')).toBe('Bonjour');
  });

  it('loadAndActivate stores the catalog and resolves from it', () => {
    mockGetIntlayer.mockImplementation(() => {
      throw new Error('messages dictionary not found');
    });
    const i18n = new I18nClass({ locale: 'en' });
    i18n.loadAndActivate({ locale: 'de', messages: { hi: 'Hallo' } });
    expect(i18n._('hi')).toBe('Hallo');
  });

  it('prefers the compiled dictionary over the runtime fallback catalog', () => {
    mockGetIntlayer.mockReturnValue({ key: 'From dictionary' } as never);
    const i18n = new I18nClass({ locale: 'en' });
    i18n.load('en', { key: 'From fallback' });
    expect(i18n._('key')).toBe('From dictionary');
  });

  // ── locale change syncs with lookups ───────────────────────────────────────

  it('reads from the new locale after activate()', () => {
    mockGetIntlayer
      .mockReturnValueOnce({ msg: 'Hello' } as never) // first call: en
      .mockReturnValueOnce({ msg: 'Bonjour' } as never); // second call: fr
    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n._('msg')).toBe('Hello');
    i18n.activate('fr');
    expect(i18n._('msg')).toBe('Bonjour');
  });

  // ── deprecated helpers ─────────────────────────────────────────────────────

  it('date() formats using Intl.DateTimeFormat', () => {
    const i18n = new I18nClass({ locale: 'en-US' });
    const result = i18n.date(new Date('2024-01-15T00:00:00Z'), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
    expect(result).toContain('January');
    expect(result).toContain('2024');
  });

  it('date() returns empty string for undefined input', () => {
    const i18n = new I18nClass({ locale: 'en' });
    expect(i18n.date(undefined)).toBe('');
  });

  it('number() formats using Intl.NumberFormat', () => {
    const i18n = new I18nClass({ locale: 'en-US' });
    const result = i18n.number(1234567.89, { maximumFractionDigits: 2 });
    expect(result).toContain('1,234,567');
  });
});
