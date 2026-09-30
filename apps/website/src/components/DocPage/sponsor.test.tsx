import { MarkdownRenderer } from '@intlayer/design-system/mark-down-render';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { isSponsorActive, Sponsor } from './Sponsor';

const contractWindow = { startDate: '2026-08-24', endDate: '2027-08-24' };

describe('isSponsorActive', () => {
  it('is live from the start day until the end day', () => {
    expect(
      isSponsorActive(contractWindow, new Date('2026-08-24T00:00:00Z'))
    ).toBe(true);
    expect(
      isSponsorActive(contractWindow, new Date('2027-08-23T23:59:59Z'))
    ).toBe(true);
  });

  it('is off before the start and from the end day on', () => {
    expect(
      isSponsorActive(contractWindow, new Date('2026-08-23T23:59:59Z'))
    ).toBe(false);
    expect(
      isSponsorActive(contractWindow, new Date('2027-08-24T00:00:00Z'))
    ).toBe(false);
  });

  it('treats missing or invalid bounds as open', () => {
    const now = new Date('2030-01-01T00:00:00Z');

    expect(isSponsorActive({}, now)).toBe(true);
    expect(isSponsorActive({ startDate: 'soon', endDate: 'later' }, now)).toBe(
      true
    );
  });
});

describe('Sponsor markdown tag', () => {
  const renderMarkdown = (markdown: string) =>
    renderToStaticMarkup(
      <MarkdownRenderer components={{ Sponsor }}>{markdown}</MarkdownRenderer>
    );

  it('passes camelCase date attributes through to the component', () => {
    expect(
      renderMarkdown(
        '<Sponsor startDate="2000-01-01" endDate="2001-01-01">\n\nPaid text\n\n</Sponsor>'
      )
    ).not.toContain('Paid text');

    expect(
      renderMarkdown(
        '<Sponsor startDate="2000-01-01" endDate="2999-01-01">\n\nPaid text\n\n</Sponsor>'
      )
    ).toContain('Paid text');
  });
});
