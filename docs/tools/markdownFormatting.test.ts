import { validateMarkdown } from '@intlayer/core/transpiler';
import { describe, expect, it } from 'vitest';
import {
  getMarkdownHeadings,
  runMarkdownFormattingTest,
  validateHeadingStructure,
} from './markdownFormatting';

describe('validateMarkdown (via @intlayer/core)', () => {
  describe('code block validation', () => {
    it('should pass for a properly closed backtick code block', () => {
      const { valid } = validateMarkdown('```ts\nconst x = 1;\n```');
      expect(valid).toBe(true);
    });

    it('should fail for an unclosed backtick code block', () => {
      const { valid, issues } = validateMarkdown('```ts\nconst x = 1;');
      expect(valid).toBe(false);
      expect(issues[0].message).toContain('Unclosed code block');
    });

    it('should pass for a properly closed tilde code block', () => {
      const { valid } = validateMarkdown('~~~bash\necho hi\n~~~');
      expect(valid).toBe(true);
    });

    it('should fail for an unclosed tilde code block', () => {
      const { valid } = validateMarkdown('~~~bash\necho hi');
      expect(valid).toBe(false);
    });

    it('should pass for multiple properly closed code blocks', () => {
      const { valid } = validateMarkdown(
        '```js\nconst a = 1;\n```\n\n```ts\nconst b = 2;\n```'
      );
      expect(valid).toBe(true);
    });
  });

  describe('HTML tag validation', () => {
    it('should pass for properly nested and closed HTML tags', () => {
      const { valid } = validateMarkdown('<div><p>Hello</p></div>');
      expect(valid).toBe(true);
    });

    it('should pass for void elements without self-closing slash', () => {
      const { valid } = validateMarkdown('Line one<br>Line two<hr>');
      expect(valid).toBe(true);
    });

    it('should fail for an unclosed HTML tag', () => {
      const { valid, issues } = validateMarkdown('<div>No closing tag.');
      expect(valid).toBe(false);
      expect(issues[0].message).toContain('Unclosed HTML tag: <div>');
    });

    it('should fail for a closing tag with no opening tag', () => {
      const { valid, issues } = validateMarkdown('Text</div>');
      expect(valid).toBe(false);
      expect(issues[0].message).toContain(
        'Closing tag </div> has no matching opening tag'
      );
    });

    it('should fail for mismatched tags', () => {
      const { valid, issues } = validateMarkdown('<div><p>Text</div></p>');
      expect(valid).toBe(false);
      expect(issues[0].message).toContain('Mismatched closing tag');
    });

    it('should not validate HTML inside fenced code blocks', () => {
      const { valid } = validateMarkdown(
        '```html\n<div>unclosed\n</p>orphan\n```'
      );
      expect(valid).toBe(true);
    });

    it('should not validate HTML inside inline code', () => {
      const { valid } = validateMarkdown('Use the `<div>` element.');
      expect(valid).toBe(true);
    });
  });

  describe('combined', () => {
    it('should pass for a well-formed markdown document', () => {
      const content = [
        '# Heading',
        '',
        'Some text with <strong>bold</strong> and inline `<code>`.',
        '',
        '```ts',
        'const x = 42;',
        '```',
        '',
        '<div>',
        '  <p>Nested</p>',
        '</div>',
      ].join('\n');
      const { valid } = validateMarkdown(content);
      expect(valid).toBe(true);
    });

    it('should report both code block and HTML errors', () => {
      const content = '<div>unclosed\n```ts\nno closing fence';
      const { valid, issues } = validateMarkdown(content);
      expect(valid).toBe(false);
      expect(issues.length).toBeGreaterThanOrEqual(2);
    });
  });
});

describe('getMarkdownHeadings', () => {
  it('should ignore frontmatter and fenced code blocks', () => {
    const content = [
      '---',
      'title: Test',
      '---',
      '# Title',
      '',
      '    ```bash',
      '# install',
      '    ```',
      '',
      '## Section',
    ].join('\n');

    expect(getMarkdownHeadings(content)).toEqual([
      { level: 1, line: 4, text: 'Title' },
      { level: 2, line: 10, text: 'Section' },
    ]);
  });

  it('should not close a fence with a different fence character', () => {
    const content = ['~~~', '```', '# comment', '~~~', '## Real'].join('\n');

    expect(getMarkdownHeadings(content)).toEqual([
      { level: 2, line: 5, text: 'Real' },
    ]);
  });
});

describe('validateHeadingStructure', () => {
  it('should pass for a well nested outline', () => {
    const { errors } = validateHeadingStructure(
      '# Title\n## A\n### A.1\n## B\n### B.1\n#### B.1.a'
    );
    expect(errors).toEqual([]);
  });

  it('should fail for multiple H1 headings', () => {
    const { errors } = validateHeadingStructure('# One\n## A\n# Two');
    expect(errors).toEqual(['Multiple H1 headings detected at lines 1, 3']);
  });

  it('should fail for an H3 directly under an H1', () => {
    const { errors } = validateHeadingStructure('# Title\n### Orphan');
    expect(errors[0]).toContain('H1 followed by H3');
  });

  it('should fail for an H4 directly under an H2', () => {
    const { errors } = validateHeadingStructure('# T\n## A\n#### Deep');
    expect(errors[0]).toContain('line 3: H2 followed by H4');
  });

  it('should warn when there is no H1', () => {
    const { errors, warnings } = validateHeadingStructure('## A\n### B');
    expect(errors).toEqual([]);
    expect(warnings).toHaveLength(1);
  });
});

describe('Markdown Formatting (doc files)', () => {
  it('should run markdown formatting test', () => {
    const result = runMarkdownFormattingTest();

    console.info(result);
    expect(result.filesWithErrors).toBe(0);
  }, 30000); // 30 second timeout for processing many files
});
