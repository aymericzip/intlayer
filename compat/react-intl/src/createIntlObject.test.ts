// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock getIntlayer so we don't need real dictionaries
vi.mock('@intlayer/core/interpreter', () => ({
  getIntlayer: vi.fn(),
}));

import { getIntlayer } from '@intlayer/core/interpreter';
import { createIntlObject } from './createIntlObject';

const mockGetIntlayer = vi.mocked(getIntlayer);

describe('createIntlObject', () => {
  beforeEach(() => {
    mockGetIntlayer.mockReset();
  });

  // ── formatMessage ──────────────────────────────────────────────────────────

  it('resolves a simple string from a dictionary', () => {
    mockGetIntlayer.mockReturnValue({ title: 'Hello world' } as never);
    const intl = createIntlObject('en');
    expect(intl.formatMessage({ id: 'home.title' })).toBe('Hello world');
  });

  it('splits first dotted segment as dictionary key', () => {
    mockGetIntlayer.mockReturnValue({
      counter: { label: 'Count: {n}' },
    } as never);
    const intl = createIntlObject('en');
    expect(intl.formatMessage({ id: 'about.counter.label' }, { n: 42 })).toBe(
      'Count: 42'
    );
  });

  it('falls back to defaultMessage when key not found', () => {
    mockGetIntlayer.mockImplementation(() => {
      throw new Error('not found');
    });
    const intl = createIntlObject('en');
    expect(
      intl.formatMessage({ id: 'missing.key', defaultMessage: 'Fallback' })
    ).toBe('Fallback');
  });

  it('echoes the id when no dictionary and no defaultMessage', () => {
    mockGetIntlayer.mockImplementation(() => {
      throw new Error('not found');
    });
    const intl = createIntlObject('en');
    expect(intl.formatMessage({ id: 'unknown.key' })).toBe('unknown.key');
  });

  it('supports ICU plural syntax', () => {
    mockGetIntlayer.mockReturnValue({
      items: '{count, plural, one {# item} other {# items}}',
    } as never);
    const intl = createIntlObject('en');
    expect(intl.formatMessage({ id: 'shop.items' }, { count: 1 })).toBe(
      '1 item'
    );
    expect(intl.formatMessage({ id: 'shop.items' }, { count: 5 })).toBe(
      '5 items'
    );
  });

  it('supports ICU select syntax', () => {
    mockGetIntlayer.mockReturnValue({
      greeting: '{gender, select, female {Ms.} other {Mr.}} {name}',
    } as never);
    const intl = createIntlObject('en');
    expect(
      intl.formatMessage(
        { id: 'auth.greeting' },
        { gender: 'female', name: 'Alice' }
      )
    ).toBe('Ms. Alice');
    expect(
      intl.formatMessage(
        { id: 'auth.greeting' },
        { gender: 'male', name: 'Bob' }
      )
    ).toBe('Mr. Bob');
  });

  it('returns ReactNode[] when values contain render functions (rich text)', () => {
    mockGetIntlayer.mockReturnValue({
      terms: 'I agree to the <link>terms</link>',
    } as never);
    const intl = createIntlObject('en');
    const result = intl.formatMessage(
      { id: 'legal.terms' },
      { link: (chunks: unknown) => chunks }
    );
    expect(Array.isArray(result)).toBe(true);
  });

  // ── $t alias ────────────────────────────────────────────────────────────────

  it('$t is an alias for formatMessage', () => {
    mockGetIntlayer.mockReturnValue({ title: 'Hi' } as never);
    const intl = createIntlObject('en');
    expect(intl.$t({ id: 'home.title' })).toBe(
      intl.formatMessage({ id: 'home.title' })
    );
  });

  // ── formatDate ──────────────────────────────────────────────────────────────

  it('formats a date with Intl.DateTimeFormat', () => {
    const intl = createIntlObject('en-US');
    const date = new Date('2024-01-15T00:00:00Z');
    const result = intl.formatDate(date, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
    expect(result).toContain('January');
    expect(result).toContain('2024');
  });

  it('formats a date from a string value', () => {
    const intl = createIntlObject('en');
    const result = intl.formatDate('2024-06-01', {
      timeZone: 'UTC',
      year: 'numeric',
    });
    expect(result).toContain('2024');
  });

  // ── formatNumber ────────────────────────────────────────────────────────────

  it('formats a number', () => {
    const intl = createIntlObject('en');
    const result = intl.formatNumber(1234567.89, { maximumFractionDigits: 2 });
    expect(result).toContain('1,234,567');
  });

  it('formats a currency', () => {
    const intl = createIntlObject('en-US');
    const result = intl.formatNumber(42.5, {
      style: 'currency',
      currency: 'USD',
    });
    expect(result).toContain('42.50');
  });

  // ── formatPlural ────────────────────────────────────────────────────────────

  it('returns correct plural category', () => {
    const intl = createIntlObject('en');
    expect(intl.formatPlural(1)).toBe('one');
    expect(intl.formatPlural(2)).toBe('other');
  });

  // ── formatList ──────────────────────────────────────────────────────────────

  it('formats a list with Intl.ListFormat', () => {
    const intl = createIntlObject('en');
    const result = intl.formatList(['a', 'b', 'c']);
    expect(result).toContain('a');
    expect(result).toContain('b');
    expect(result).toContain('c');
  });

  // ── formatRelativeTime ──────────────────────────────────────────────────────

  it('formats relative time', () => {
    const intl = createIntlObject('en');
    const result = intl.formatRelativeTime(-1, 'day');
    expect(result.toLowerCase()).toContain('yesterday');
  });

  // ── formatDisplayName ───────────────────────────────────────────────────────

  it('formats a language display name', () => {
    const intl = createIntlObject('en');
    const result = intl.formatDisplayName('fr', { type: 'language' });
    expect(result?.toLowerCase()).toContain('french');
  });

  // ── locale ──────────────────────────────────────────────────────────────────

  it('exposes the locale on the intl object', () => {
    const intl = createIntlObject('fr');
    expect(intl.locale).toBe('fr');
  });
});
