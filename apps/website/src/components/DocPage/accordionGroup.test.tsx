import { MarkdownRenderer } from '@intlayer/design-system/mark-down-render';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Accordion, AccordionGroup } from './AccordionGroup';

const renderMarkdown = (source: string) =>
  renderToStaticMarkup(
    <MarkdownRenderer locale="en" components={{ Accordion, AccordionGroup }}>
      {source}
    </MarkdownRenderer>
  );

describe('AccordionGroup rendered from a documentation markdown source', () => {
  const source = `<AccordionGroup>

<Accordion header="Full Next.js coverage">

Intlayer is optimized to work with **Server Components**.

> Intlayer is compatible with Next.js 12, 13, 14, 15, and 16.

</Accordion>

<Accordion header="Bundle size">

Load only the necessary content, and [reduce](https://intlayer.org) your bundle by up to 50%.

</Accordion>

</AccordionGroup>
`;

  const markup = renderMarkdown(source);

  it('keeps the collapsed content in the markup, so it stays indexable', () => {
    expect(markup).toContain('Full Next.js coverage');
    expect(markup).toContain('Server Components');
    expect(markup).toContain('https://intlayer.org');
  });

  it('declares no structured data of its own', () => {
    // An `ItemList` of these sections can only feed a carousel, which Google
    // restricts to `Course`, `Movie`, `Recipe` and `Restaurant` entries — it
    // was reported as "Carousel: item or url field is required" instead. The
    // headers are statements, so a `FAQPage` would misdeclare them too.
    expect(markup).not.toContain('application/ld+json');
    expect(markup).not.toContain('ItemList');
    expect(markup).not.toContain('FAQPage');
    expect(markup).not.toContain('itemType="https://schema.org/');
  });
});
