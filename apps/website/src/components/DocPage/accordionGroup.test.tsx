import { MarkdownRenderer } from '@intlayer/design-system/mark-down-render';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Accordion, AccordionGroup } from './AccordionGroup';

/** Reads back the JSON-LD node the block serialises into its inline script. */
const parseJsonLd = (html: string) => {
  const script = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  );

  return script ? JSON.parse(script[1]) : undefined;
};

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

  it('describes the sections as a schema.org ItemList, in JSON-LD', () => {
    expect(markup).toContain('type="application/ld+json"');
    expect(parseJsonLd(markup)).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      numberOfItems: 2,
    });
  });

  it('numbers the entries in the order they are authored', () => {
    expect(
      parseJsonLd(markup).itemListElement.map(
        ({ position, name }: { position: number; name: string }) => [
          position,
          name,
        ]
      )
    ).toEqual([
      [1, 'Full Next.js coverage'],
      [2, 'Bundle size'],
    ]);
  });

  it('flattens the rendered section into a plain-text description', () => {
    const [firstItem, secondItem] = parseJsonLd(markup).itemListElement;

    expect(firstItem.description).toBe(
      [
        'Intlayer is optimized to work with Server Components.',
        'Intlayer is compatible with Next.js 12, 13, 14, 15, and 16.',
      ].join('\n')
    );
    expect(secondItem.description).toBe(
      'Load only the necessary content, and reduce your bundle by up to 50%.'
    );
  });

  it('does not describe the sections as questions', () => {
    // The headers are statements, so a `FAQPage` would misdeclare them.
    expect(markup).not.toContain('FAQPage');
    expect(markup).not.toContain('itemType="https://schema.org/');
  });

  it('keeps the collapsed content in the markup, so it stays indexable', () => {
    expect(markup).toContain('Server Components');
    expect(markup).toContain('https://intlayer.org');
  });

  it('ignores the whitespace nodes markdown inserts between the sections', () => {
    // Text nodes between the `<Accordion>` blocks are not sections, and would
    // otherwise be described as empty entries.
    expect(parseJsonLd(markup).itemListElement).toHaveLength(2);
  });
});

describe('AccordionGroup without a described section', () => {
  it('emits no JSON-LD script when a section has no content', () => {
    const markup = renderToStaticMarkup(
      <AccordionGroup>
        <Accordion header="Empty section" label="Empty section">
          {null}
        </Accordion>
      </AccordionGroup>
    );

    expect(markup).not.toContain('application/ld+json');
  });
});
