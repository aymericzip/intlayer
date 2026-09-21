// @vitest-environment node

import { createRouter } from 'remix/router';
import { describe, expect, it } from 'vitest';
import {
  useCompact,
  useCurrency,
  useDate,
  useIntl,
  useList,
  useNumber,
  usePercentage,
  useRelativeTime,
  useUnit,
} from './format/index';
import { renderHTML } from './html/index';
import { compileMarkdown, renderMarkdown } from './markdown/index';
import { intlayer } from './middleware';

describe('remix-intlayer formatters outside of request', () => {
  it('formats with default locale (en)', () => {
    const formatDate = useDate();
    const formatted = formatDate(new Date('2026-01-15T12:00:00Z'), {
      dateStyle: 'short',
      timeZone: 'UTC',
    });
    expect(formatted).toBe('1/15/26');

    const formatNumber = useNumber();
    expect(formatNumber(1234567.89)).toBe('1,234,567.89');

    const formatCurrency = useCurrency();
    expect(formatCurrency(100, { currency: 'USD' })).toBe('$100.00');

    const formatCompact = useCompact();
    expect(formatCompact(1500)).toBe('1.5K');

    const formatPercentage = usePercentage();
    expect(formatPercentage(0.25)).toBe('25%');

    const formatUnit = useUnit();
    expect(formatUnit(5, { unit: 'kilometer' })).toBe('5 km');

    const formatList = useList();
    expect(formatList(['apple', 'banana'])).toBe('apple and banana');

    const formatRelative = useRelativeTime();
    expect(
      formatRelative(
        new Date('2026-01-01T00:00:00Z'),
        new Date('2026-01-02T00:00:00Z'),
        { unit: 'day' }
      )
    ).toBe('in 1 day');

    const { intl, subscribe } = useIntl();
    expect(
      new intl.NumberFormat({ style: 'currency', currency: 'USD' }).format(50)
    ).toBe('$50.00');
    expect(subscribe).toBeTypeOf('function');
  });

  it('allows explicit locale override', () => {
    const formatDate = useDate();
    const formatted = formatDate(new Date('2026-01-15T12:00:00Z'), {
      locale: 'fr',
      dateStyle: 'short',
      timeZone: 'UTC',
    });
    expect(formatted).toBe('15/01/2026');

    const formatNumber = useNumber();
    expect(formatNumber(1234.56, { locale: 'fr' })).toContain('1\u202f234,56');
  });
});

describe('remix-intlayer formatters inside request', () => {
  it('formats with request locale (fr)', async () => {
    const router = createRouter({
      middleware: [intlayer({ isDevServer: false })],
    });

    router.get('/', () => {
      const formatNumber = useNumber();
      const formatDate = useDate();
      const { intl } = useIntl();

      return Response.json({
        number: formatNumber(1234.56),
        date: formatDate(new Date('2026-01-15T12:00:00Z'), {
          dateStyle: 'short',
          timeZone: 'UTC',
        }),
        currency: new intl.NumberFormat({
          style: 'currency',
          currency: 'EUR',
        }).format(10),
      });
    });

    const response = await router.fetch(
      new Request('http://localhost/fr', {
        headers: { 'accept-language': 'fr' },
      })
    );

    const data = await response.json();
    expect(data.number).toContain('1\u202f234,56');
    expect(data.date).toBe('15/01/2026');
    expect(data.currency).toContain('10,00\u00a0€');
  });
});

describe('remix-intlayer html and markdown re-exports', () => {
  it('renders html and compiles markdown', () => {
    expect(renderHTML('<strong>hello</strong>')).toBe('<strong>hello</strong>');
    expect(compileMarkdown('# Title')).toContain('>Title</h1>');
    expect(renderMarkdown('**bold**')).toContain('>bold</strong>');
  });
});
