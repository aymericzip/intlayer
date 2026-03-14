import { describe, expect, it } from 'vitest';
import { validateMarkdown } from './validateMarkdown';

describe('validateMarkdown', () => {
  describe('code block validation', () => {
    it('should pass for valid fenced code block with backticks', () => {
      const content = [
        '# Heading',
        '```ts',
        'const x = 1;',
        '```',
        'Some text.',
      ].join('\n');

      const result = validateMarkdown(content);
      expect(result.valid).toBe(true);
      expect(result.issues).toHaveLength(0);
    });

    it('should pass for valid fenced code block with tildes', () => {
      const content = ['# Heading', '~~~bash', 'echo hello', '~~~'].join('\n');

      const result = validateMarkdown(content);
      expect(result.valid).toBe(true);
      expect(result.issues).toHaveLength(0);
    });

    it('should fail when a backtick code block is not closed', () => {
      const content = ['# Heading', '```ts', 'const x = 1;', 'Some text.'].join(
        '\n'
      );

      const result = validateMarkdown(content);
      expect(result.valid).toBe(false);
      expect(result.issues).toHaveLength(1);
      expect(result.issues[0].type).toBe('error');
      expect(result.issues[0].message).toContain('Unclosed code block');
      expect(result.issues[0].message).toContain('line 2');
    });

    it('should fail when a tilde code block is not closed', () => {
      const content = ['~~~', 'some code', 'text after'].join('\n');

      const result = validateMarkdown(content);
      expect(result.valid).toBe(false);
      expect(result.issues[0].message).toContain('Unclosed code block');
    });

    it('should pass for multiple properly closed code blocks', () => {
      const content = [
        '```js',
        'const a = 1;',
        '```',
        'Middle text.',
        '```ts',
        'const b = 2;',
        '```',
      ].join('\n');

      const result = validateMarkdown(content);
      expect(result.valid).toBe(true);
    });

    it('should close a backtick fence with 4+ backticks', () => {
      const content = ['````ts', 'const x = 1;', '````'].join('\n');

      const result = validateMarkdown(content);
      expect(result.valid).toBe(true);
    });

    it('should not close a backtick fence with tildes', () => {
      const content = ['```ts', 'const x = 1;', '~~~'].join('\n');

      const result = validateMarkdown(content);
      expect(result.valid).toBe(false);
    });
  });

  describe('HTML tag validation', () => {
    it('should pass for valid self-closing HTML tags', () => {
      const content = 'Text with <br /> and <img src="test.png" /> inline.';

      const result = validateMarkdown(content);
      expect(result.valid).toBe(true);
    });

    it('should pass for void HTML elements without self-closing slash', () => {
      const content = 'Line one<br>Line two with <hr> separator.';

      const result = validateMarkdown(content);
      expect(result.valid).toBe(true);
    });

    it('should pass for properly nested HTML tags', () => {
      const content = '<div><p>Hello</p></div>';

      const result = validateMarkdown(content);
      expect(result.valid).toBe(true);
    });

    it('should fail for an unclosed HTML tag', () => {
      const content = '<div>Some content without closing tag.';

      const result = validateMarkdown(content);
      expect(result.valid).toBe(false);
      expect(result.issues[0].message).toContain('Unclosed HTML tag: <div>');
    });

    it('should fail for a closing tag with no opening tag', () => {
      const content = 'Some text.</div>';

      const result = validateMarkdown(content);
      expect(result.valid).toBe(false);
      expect(result.issues[0].message).toContain(
        'Closing tag </div> has no matching opening tag'
      );
    });

    it('should fail for mismatched closing tag', () => {
      const content = '<div><p>Text</div></p>';

      const result = validateMarkdown(content);
      expect(result.valid).toBe(false);
      expect(result.issues[0].message).toContain('Mismatched closing tag');
      expect(result.issues[0].message).toContain('</p>');
      expect(result.issues[0].message).toContain('</div>');
    });

    it('should not validate HTML inside fenced code blocks', () => {
      const content = [
        'Normal text.',
        '```html',
        '<div>This is not closed',
        '</p>Mismatched',
        '```',
        'Text after.',
      ].join('\n');

      const result = validateMarkdown(content);
      expect(result.valid).toBe(true);
    });

    it('should not validate HTML inside tilde fenced code blocks', () => {
      const content = ['~~~html', '<div>unclosed', '</span>orphan', '~~~'].join(
        '\n'
      );

      const result = validateMarkdown(content);
      expect(result.valid).toBe(true);
    });

    it('should not validate HTML inside inline code', () => {
      const content = 'Use the `<div>` tag to wrap content.';

      const result = validateMarkdown(content);
      expect(result.valid).toBe(true);
    });

    it('should validate HTML outside code blocks while ignoring HTML inside', () => {
      const content = [
        '<div>',
        '```html',
        '<span>unclosed inside code',
        '```',
        '</div>',
      ].join('\n');

      const result = validateMarkdown(content);
      expect(result.valid).toBe(true);
    });

    it('should handle custom component tags', () => {
      const content = '<MyComponent prop="value">Content</MyComponent>';

      const result = validateMarkdown(content);
      expect(result.valid).toBe(true);
    });

    it('should fail for unclosed custom component tags', () => {
      const content = '<MyComponent prop="value">Content';

      const result = validateMarkdown(content);
      expect(result.valid).toBe(false);
      expect(result.issues[0].message).toContain(
        'Unclosed HTML tag: <MyComponent>'
      );
    });
  });

  describe('combined validation', () => {
    it('should report both code block and HTML errors', () => {
      const content = ['<div>unclosed', '```ts', 'unclosed code block'].join(
        '\n'
      );

      const result = validateMarkdown(content);
      expect(result.valid).toBe(false);
      // unclosed code block + unclosed div
      expect(result.issues.length).toBeGreaterThanOrEqual(2);
    });

    it('should pass for a well-formed markdown document', () => {
      const content = [
        '---',
        'title: Test',
        '---',
        '# Heading',
        '',
        'Some paragraph with <strong>bold HTML</strong> and inline `code`.',
        '',
        '```ts',
        'const x: number = 42;',
        '```',
        '',
        '<div className="wrapper">',
        '  <p>Nested content</p>',
        '</div>',
      ].join('\n');

      const result = validateMarkdown(content);
      expect(result.valid).toBe(true);
    });
  });
});
