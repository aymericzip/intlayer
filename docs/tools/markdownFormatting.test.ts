import { validateMarkdown } from '@intlayer/core/transpiler';
import { describe, expect, it } from 'vitest';
import { runMarkdownFormattingTest } from './markdownFormatting';

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

describe('Markdown Formatting (doc files)', () => {
  it('should run markdown formatting test', () => {
    const result = runMarkdownFormattingTest();

    console.info(result);
    expect(result.filesWithErrors).toBe(0);
  }, 30000); // 30 second timeout for processing many files
});
