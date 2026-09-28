import { describe, expect, it } from 'vitest';
import { transformDocLinks } from './fixLocalizedLinks';

describe('fixLocalizedLinks', () => {
  it('should transform English doc links to Arabic in an Arabic file', () => {
    const content =
      '- [Intlayer Configuration (intlayer.config.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md)';
    const result = transformDocLinks(
      content,
      'docs/ar/packages/hono-intlayer/t.md'
    );

    expect(result.replacements).toBe(1);
    expect(result.newContent).toBe(
      '- [Intlayer Configuration (intlayer.config.ts)](https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md)'
    );
  });

  it('should preserve URL hashes/anchors when transforming links', () => {
    const content =
      '[Step 1](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/intlayer_with_nextjs_16.md#step-1-install-intlayer)';
    const result = transformDocLinks(
      content,
      'docs/es/intlayer_with_nextjs_16.md'
    );

    expect(result.replacements).toBe(1);
    expect(result.newContent).toBe(
      '[Step 1](https://github.com/aymericzip/intlayer/blob/main/docs/docs/es/intlayer_with_nextjs_16.md#step-1-install-intlayer)'
    );
  });

  it('should normalize tree/main to blob/main', () => {
    const content =
      '[Markdown](https://github.com/aymericzip/intlayer/tree/main/docs/docs/en/dictionary/markdown.md)';
    const result = transformDocLinks(content, 'docs/fr/some_file.md');

    expect(result.replacements).toBe(1);
    expect(result.newContent).toBe(
      '[Markdown](https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/dictionary/markdown.md)'
    );
  });

  it('should fix links missing section directory (docs/<locale>/<file>)', () => {
    const content =
      '[CLI](https://github.com/aymericzip/intlayer/blob/main/docs/en/cli/index.md)';
    const result = transformDocLinks(content, 'docs/de/some_file.md');

    expect(result.replacements).toBe(1);
    expect(result.newContent).toBe(
      '[CLI](https://github.com/aymericzip/intlayer/blob/main/docs/docs/de/cli/index.md)'
    );
  });

  it('should preserve language switcher links in readme.md', () => {
    const content = `
<a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md">简体中文</a>
<a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md">Français</a>
<a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/configuration.md">Config</a>
`;
    const result = transformDocLinks(content, 'docs/ar/readme.md');

    expect(result.replacements).toBe(1);
    expect(result.newContent).toContain(
      '<a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/zh/readme.md">简体中文</a>'
    );
    expect(result.newContent).toContain(
      '<a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/fr/readme.md">Français</a>'
    );
    expect(result.newContent).toContain(
      '<a href="https://github.com/aymericzip/intlayer/blob/main/docs/docs/ar/configuration.md">Config</a>'
    );
  });

  it('should not touch asset links', () => {
    const content =
      '![Demo](https://github.com/aymericzip/intlayer/blob/main/docs/assets/demo.gif)';
    const result = transformDocLinks(content, 'docs/ar/some_file.md');

    expect(result.replacements).toBe(0);
    expect(result.newContent).toBe(content);
  });

  it('should not touch wildcard paths such as **/*.md in prompts', () => {
    const content =
      'Transform `https://github.com/aymericzip/intlayer/blob/main/docs/docs/en/**/*.md` to `...`';
    const result = transformDocLinks(content, 'blog/ar/seo.md');

    expect(result.replacements).toBe(0);
    expect(result.newContent).toBe(content);
  });

  it('should handle blog links correctly', () => {
    const content =
      '[Blog post](https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/icu_message_format.md)';
    const result = transformDocLinks(content, 'blog/ja/some_post.md');

    expect(result.replacements).toBe(1);
    expect(result.newContent).toBe(
      '[Blog post](https://github.com/aymericzip/intlayer/blob/main/docs/blog/ja/icu_message_format.md)'
    );
  });
});
