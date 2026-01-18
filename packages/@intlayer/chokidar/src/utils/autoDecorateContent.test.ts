import { insert, md, t } from '@intlayer/core'; // to reuse the functions
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
    expect(typeof output.myMarkdown.metadata).toBe('object');
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
