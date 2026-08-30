import { MarkdownRenderer } from '@intlayer/design-system/mark-down-render';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FAQ, INITIAL_VISIBLE_QUESTIONS_COUNT, Question } from './FAQ';

/** Builds `count` uniquely-titled questions, so fixtures track the threshold. */
const buildQuestionTitles = (count: number) =>
  Array.from({ length: count }, (_, index) => `Question number ${index + 1}`);

/**
 * Counts elements carrying `hidden` as a standalone class token.
 *
 * A substring match would also hit `overflow-hidden` (rendered by the
 * accordion internals), so the class list is tokenised before comparing.
 */
const countHiddenElements = (html: string) =>
  (html.match(/class="([^"]*)"/g) ?? []).filter((attribute) =>
    attribute.slice('class="'.length, -1).split(/\s+/).includes('hidden')
  ).length;

/**
 * Reads back the `FAQPage` node the block serialises into its inline JSON-LD
 * script, so assertions run on the structured data a crawler consumes.
 */
const parseFAQPageJsonLd = (html: string) => {
  const script = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
  );

  return script ? JSON.parse(script[1]) : undefined;
};

const renderFAQ = (questionTitles: string[]) =>
  renderToStaticMarkup(
    <FAQ>
      {questionTitles.map((title) => (
        <Question key={title} title={title}>
          Answer to {title}
        </Question>
      ))}
    </FAQ>
  );

describe('FAQ', () => {
  const markup = renderToStaticMarkup(
    <FAQ>
      <Question title="What is Intlayer?">An i18n solution.</Question>
    </FAQ>
  );

  it('describes the block as a schema.org FAQPage, in JSON-LD', () => {
    expect(markup).toContain('type="application/ld+json"');
    expect(parseFAQPageJsonLd(markup)).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
    });
  });

  it('describes each entry as a Question with an accepted Answer', () => {
    expect(parseFAQPageJsonLd(markup).mainEntity).toEqual([
      {
        '@type': 'Question',
        name: 'What is Intlayer?',
        acceptedAnswer: { '@type': 'Answer', text: 'An i18n solution.' },
      },
    ]);
  });

  it('does not also emit the microdata JSON-LD supersedes', () => {
    // Both formats on one page would declare the entity twice.
    expect(markup).not.toContain('itemType="https://schema.org/');
    expect(markup).not.toContain('itemProp=');
  });

  it('exposes the question as a deep-linkable heading', () => {
    expect(markup).toContain('id="what-is-intlayer"');
  });
});

describe('FAQ with more questions than the initial visible count', () => {
  const questionTitles = buildQuestionTitles(
    INITIAL_VISIBLE_QUESTIONS_COUNT + 2
  );
  const collapsedTitles = questionTitles.slice(INITIAL_VISIBLE_QUESTIONS_COUNT);
  const markup = renderFAQ(questionTitles);

  it('keeps every question mounted in the markup, including the collapsed ones', () => {
    for (const title of questionTitles) {
      expect(markup).toContain(title);
    }
  });

  it('keeps the answers of the collapsed questions in the markup for indexation', () => {
    expect(collapsedTitles).not.toHaveLength(0);
    for (const title of collapsedTitles) {
      expect(markup).toContain(`Answer to ${title}`);
    }
  });

  it('collapses only the extra questions, with `display: none` per entry', () => {
    // One `hidden` per collapsed entry — the entries stay in the markup, and
    // the visible ones are untouched.
    expect(countHiddenElements(markup)).toBe(collapsedTitles.length);
  });

  it('renders every entry inside a single divided list, so the rhythm is unbroken', () => {
    // A single `divide-y` container holds all entries; a second list wrapper
    // would reintroduce the seam this layout is meant to avoid.
    const listCount = (markup.match(/\bdivide-y\b/g) ?? []).length;

    expect(listCount).toBe(1);
  });

  it('renders one extra "show more" toggle on top of each question accordion', () => {
    // Each Question's own Accordion renders `aria-expanded="false"`, plus one
    // more for the "show more" toggle button.
    const expandedAttributeCount = (
      markup.match(/aria-expanded="false"/g) ?? []
    ).length;
    expect(expandedAttributeCount).toBe(questionTitles.length + 1);
  });

  it('resolves the toggle copy through the `cond` content node', () => {
    // Collapsed on first render, so the condition resolves its `false` branch.
    expect(markup).toContain('Show more');
    expect(markup).not.toContain('Show less');
  });
});

describe('FAQ with no more questions than the initial visible count', () => {
  const questionTitles = buildQuestionTitles(INITIAL_VISIBLE_QUESTIONS_COUNT);

  const markup = renderFAQ(questionTitles);

  it('does not render a "show more" toggle', () => {
    const expandedAttributeCount = (
      markup.match(/aria-expanded="false"/g) ?? []
    ).length;
    expect(expandedAttributeCount).toBe(questionTitles.length);
    expect(markup).not.toContain('Show more');
  });
});

describe('FAQ rendered from a documentation markdown source', () => {
  const source = `## Frequently Asked Questions

<FAQ>

<Question title="What are the solutions to internationalize a Next.js app?">

The usual options are:

- **next-intl**: JSON namespaces.
- **Intlayer**: per component content, see [why Intlayer](https://intlayer.org/doc/why).

</Question>

</FAQ>
`;

  const markup = renderToStaticMarkup(
    <MarkdownRenderer locale="en" components={{ FAQ, Question }}>
      {source}
    </MarkdownRenderer>
  );

  it('describes the markdown question in the FAQPage node', () => {
    expect(markup).toContain(
      'What are the solutions to internationalize a Next.js app?'
    );
    expect(parseFAQPageJsonLd(markup).mainEntity[0].name).toBe(
      'What are the solutions to internationalize a Next.js app?'
    );
  });

  it('flattens the rendered answer into plain text, one line per block', () => {
    expect(parseFAQPageJsonLd(markup).mainEntity[0].acceptedAnswer.text).toBe(
      [
        'The usual options are:',
        'next-intl: JSON namespaces.',
        'Intlayer: per component content, see why Intlayer.',
      ].join('\n')
    );
  });

  it('renders markdown lists and links inside the answer', () => {
    expect(markup).toContain('<li');
    expect(markup).toContain('https://intlayer.org/doc/why');
  });

  it('does not let markdown whitespace nodes consume a visible slot', () => {
    // Markdown puts text nodes between the `<Question>` blocks. Counting them
    // as entries would hide a real question one slot early.
    const markdownSource = [
      '<FAQ>',
      ...buildQuestionTitles(INITIAL_VISIBLE_QUESTIONS_COUNT).flatMap(
        (title) => [
          '',
          `<Question title="${title}">`,
          '',
          `Answer to ${title}`,
          '',
          '</Question>',
        ]
      ),
      '',
      '</FAQ>',
      '',
    ].join('\n');

    const markdownMarkup = renderToStaticMarkup(
      <MarkdownRenderer locale="en" components={{ FAQ, Question }}>
        {markdownSource}
      </MarkdownRenderer>
    );

    // Exactly at the threshold: nothing hidden, and no toggle.
    expect(countHiddenElements(markdownMarkup)).toBe(0);
    expect(markdownMarkup).not.toContain('Show more');
  });
});
