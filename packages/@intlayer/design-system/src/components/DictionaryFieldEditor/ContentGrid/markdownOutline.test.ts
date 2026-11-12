// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  countMarkdownWords,
  getMarkdownOutline,
  splitFrontMatter,
} from './markdownOutline';

describe('getMarkdownOutline', () => {
  it('lists headings with their level', () => {
    expect(
      getMarkdownOutline('# Title\n\nText\n\n## Sub **bold** ##\n### Third')
    ).toEqual([
      { level: 1, text: 'Title', lineIndex: 0 },
      { level: 2, text: 'Sub bold', lineIndex: 4 },
      { level: 3, text: 'Third', lineIndex: 5 },
    ]);
  });

  it('ignores fenced code and front matter', () => {
    const markdown = [
      '---',
      'key: doc',
      '# not a heading',
      '---',
      '# Real',
      '```md',
      '# Inside code',
      '```',
      '#NoSpace',
    ].join('\n');

    expect(getMarkdownOutline(markdown).map((heading) => heading.text)).toEqual(
      ['Real']
    );
  });

  it('keeps link text', () => {
    expect(getMarkdownOutline('## See [the docs](https://x.y)')[0]?.text).toBe(
      'See the docs'
    );
  });
});

describe('countMarkdownWords', () => {
  it('counts words without markup', () => {
    expect(countMarkdownWords('# Title\n\n**Hello** world - 42')).toBe(4);
    expect(countMarkdownWords('```js\nconst a = 1\n```\nDone')).toBe(1);
    expect(countMarkdownWords('')).toBe(0);
  });
});

describe('splitFrontMatter', () => {
  it('separates the front matter block from the body', () => {
    const markdown = '---\nkey: doc\nlocale: en\n---\n# Title\n';
    const { frontMatter, body } = splitFrontMatter(markdown);

    expect(frontMatter).toBe('---\nkey: doc\nlocale: en\n---\n');
    expect(body).toBe('# Title\n');
    expect(frontMatter + body).toBe(markdown);
  });

  it('returns the whole text as body without front matter', () => {
    expect(splitFrontMatter('# Title')).toEqual({
      frontMatter: '',
      body: '# Title',
    });
  });
});
