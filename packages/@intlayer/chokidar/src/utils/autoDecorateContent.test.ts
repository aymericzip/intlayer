import { html, insert, md, t } from '@intlayer/core';
import { describe, expect, it } from 'vitest';
import { autoDecorateContent } from './autoDecorateContent';
import { resolveObjectPromises } from './resolveObjectPromises';

describe('autoDecorateContent', () => {
  it('should decorate markdown strings', () => {
    const input = {
      myMarkdown: '## Hello World',
    };
    const output = autoDecorateContent(input);

    expect(output.myMarkdown.nodeType).toBe('markdown');
    expect(output.myMarkdown.markdown).toBe('## Hello World');
  });

  describe('HTML Detection', () => {
    it('should decorate standard valid HTML tags', () => {
      const input = {
        simple: '<div>Hello</div>',
        nested: '<div><span>World</span></div>',
        selfClosing: 'Line<br />Break',
        attributes: '<a href="/link">Click</a>',
      };
      const output = autoDecorateContent(input);

      expect(output.simple).toEqual(html('<div>Hello</div>'));
      expect(output.nested).toEqual(html('<div><span>World</span></div>'));
      expect(output.selfClosing).toEqual(html('Line<br />Break'));
      expect(output.attributes).toEqual(html('<a href="/link">Click</a>'));
      expect(output.simple.nodeType).toBe('html');
    });

    it('should decorate custom/invalid HTML tags (Components)', () => {
      const input = {
        component: 'Hello <UserProfile />',
        nestedComponent: '<Card><Card.Title>Hi</Card.Title></Card>',
        custom: 'Go to <Link href="/home">Home</Link>',
      };
      const output = autoDecorateContent(input);

      expect(output.component).toEqual(html('Hello <UserProfile />'));
      expect(output.nestedComponent).toEqual(
        html('<Card><Card.Title>Hi</Card.Title></Card>')
      );
      expect(output.custom).toEqual(
        html('Go to <Link href="/home">Home</Link>')
      );
    });

    it('should NOT decorate math comparisons as HTML', () => {
      const input = {
        math: '10 < 20',
        mathComplex: 'if (a < b && c > d)',
      };
      const output = autoDecorateContent(input);

      // Should remain as string (or potentially be text if wrapped, but here just plain string)
      expect(output.math).toBe('10 < 20');
      expect(output.mathComplex).toBe('if (a < b && c > d)');
      // Should not have nodeType if not decorated
      expect((output.math as any).nodeType).toBeUndefined();
    });

    it('should prioritize HTML over Markdown when both are present (MDX conflict)', () => {
      // This looks like Markdown header, but contains a component
      const input = {
        mdx: '# Title <Badge>New</Badge>',
      };
      const output = autoDecorateContent(input);

      // Requirement: process HTML before Markdown to avoid conflicts
      expect(output.mdx.nodeType).toBe('html');
      expect(output.mdx).toEqual(html('# Title <Badge>New</Badge>'));
    });
  });

  it('should decorate insertion strings', () => {
    const input = {
      myInsertion: 'Hi {{name}}',
    };
    const output = autoDecorateContent(input);

    expect(output.myInsertion).toEqual(insert('Hi {{name}}'));
  });

  it('should recurse into objects and arrays', () => {
    const input = {
      list: ['## Item 1', 'Item 2'],
      nested: {
        title: '# Title',
        text: 'Hello {{name}}',
      },
    };
    const output = autoDecorateContent(input);

    expect(output.list[0].nodeType).toBe('markdown');
    expect(output.list[0].markdown).toBe('## Item 1');
    expect(output.list[1]).toBe('Item 2');
    expect(output.nested.title.nodeType).toBe('markdown');
    expect(output.nested.title.markdown).toBe('# Title');
    expect(output.nested.text).toEqual(insert('Hello {{name}}'));
  });

  it('should recurse into container nodes like translation', () => {
    const input = {
      myTranslation: t({
        en: '## Hello',
        fr: '## Bonjour',
      }),
    };
    const output = autoDecorateContent(input);

    expect(output.myTranslation.translation.en.nodeType).toBe('markdown');
    expect(output.myTranslation.translation.en.markdown).toBe('## Hello');
    expect(output.myTranslation.translation.fr.nodeType).toBe('markdown');
    expect(output.myTranslation.translation.fr.markdown).toBe('## Bonjour');
  });

  it('should not re-decorate already decorated leaf nodes', () => {
    const input = {
      myMarkdown: md('## Already decorated'),
    };
    const output = autoDecorateContent(input);

    expect(output.myMarkdown.markdown).toBe('## Already decorated');
    expect(output.myMarkdown.markdown.nodeType).toBeUndefined();
  });

  it('should decorate markdown strings with metadata', async () => {
    const markdownWithMetadata = `---
title: My Title
---
## Hello World`;
    const input = {
      myMarkdown: markdownWithMetadata,
    };
    const output = autoDecorateContent(input);

    expect(output.myMarkdown.nodeType).toBe('markdown');
    expect(output.myMarkdown.markdown).toBe(markdownWithMetadata);
    expect(typeof output.myMarkdown.metadata).toBe('object');

    expect(output.myMarkdown.metadata).toEqual({ title: 'My Title' });
  });

  it('should work with resolveObjectPromises', async () => {
    const input = {
      myMarkdown: '## Hello World',
    };
    const decorated = autoDecorateContent(input);
    const resolved: any = await resolveObjectPromises(decorated);

    expect(resolved.myMarkdown.nodeType).toBe('markdown');
    expect(resolved.myMarkdown.markdown).toBe('## Hello World');
    expect(resolved.myMarkdown.metadata).toEqual({});
  });
});
