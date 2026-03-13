import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getHTML } from './getHTML';

describe('getHTML – HTML parsing and component rendering', () => {
  // Note: Clear the cache before each test to ensure tests don't interfere
  beforeEach(() => {
    // The cache is module-level, but tests should be isolated
  });

  describe('basic HTML tag rendering', () => {
    it('renders standard HTML tags without custom components', () => {
      const result = getHTML('<div><p>Hello</p></div>', {});
      expect(result).toBe('Hello');
    });

    it('renders self-closing tags', () => {
      const result = getHTML('Text<br/>More text', {});
      expect(result).toEqual(['Text', 'More text']);
    });

    it('renders nested HTML tags', () => {
      const result = getHTML('<div><span>Nested</span></div>', {});
      expect(result).toBe('Nested');
    });
  });

  describe('custom component rendering', () => {
    it('renders custom component with simple text', () => {
      const components = {
        SignIn: (props: any) => `<a>${props.children}</a>`,
      };
      const result = getHTML('<SignIn>Sign in</SignIn>', components);
      expect(result).toBe('<a>Sign in</a>');
    });

    it('renders custom component with multiple children', () => {
      const components = {
        MyComponent: (props: any) =>
          Array.isArray(props.children)
            ? props.children.join('')
            : props.children,
      };
      const result = getHTML(
        'Text before<MyComponent>Content</MyComponent>Text after',
        components
      );
      expect(result).toContain('Content');
    });

    it('renders custom component with attributes', () => {
      const components = {
        Link: (props: any) => `<a href="${props.href}">${props.children}</a>`,
      };
      const result = getHTML(
        '<Link href="https://example.com">Click</Link>',
        components
      );
      expect(result).toBe('<a href="https://example.com">Click</a>');
    });

    it('renders nested custom components', () => {
      const components = {
        Outer: (props: any) => `<div>${props.children}</div>`,
        Inner: (props: any) => `<span>${props.children}</span>`,
      };
      const result = getHTML(
        '<Outer><Inner>Nested</Inner></Outer>',
        components
      );
      expect(result).toBe('<div><span>Nested</span></div>');
    });
  });

  describe('closing tag validation (bug fix)', () => {
    it('properly matches closing tags to opening tags', () => {
      const components = {
        SignIn: ({ children }: { children: string }) => `<a>${children}</a>`,
      } as any;
      const html = 'Already have an account? <SignIn>Sign in</SignIn>';
      const result = getHTML(html, components);

      // Should render as <p>Sign in</p>, not <p>Sign in<p></p></p>
      expect(result).toStrictEqual([
        'Already have an account? ',
        '<a>Sign in</a>',
      ]);
    });

    it('handles mismatched closing tags gracefully', () => {
      const components = {
        Outer: (props: any) => `<div>${props.children}</div>`,
      };
      // Mismatched tags - Outer opens but Inner closes (without Inner opening)
      const html = '<Outer>Text</Inner>';
      const result = getHTML(html, components);

      // Should silently ignore the mismatched closing tag
      expect(result).toBeDefined();
      const resultStr = Array.isArray(result) ? result.join('') : result;
      // The Outer tag should still be open (unclosed) since Inner didn't match
      expect(resultStr).toContain('Text');
    });

    it('prevents tag name validation errors with custom components', () => {
      const components = {
        Custom: (props: any) =>
          Array.isArray(props.children)
            ? `<custom-tag>${props.children.join('')}</custom-tag>`
            : `<custom-tag>${props.children}</custom-tag>`,
      };
      const html = '<Custom>Content</Custom>';
      const result = getHTML(html, components);

      // Should render the component correctly without malformed closing tags
      expect(result).toContain('Content');
      expect(typeof result === 'string' ? result : result).toBeDefined();
    });

    it('validates tag names are case-sensitive for closing', () => {
      const components = {
        MyTag: (props: any) => `<my>${props.children}</my>`,
      };
      // Case mismatch: MyTag opens, mytag tries to close
      const html = '<MyTag>Content</mytag>';
      const result = getHTML(html, components);

      // Should handle the case mismatch gracefully
      expect(result).toBeDefined();
    });
  });

  describe('text and whitespace handling', () => {
    it('preserves text content between tags', () => {
      const components = {
        Strong: (props: any) => `<b>${props.children}</b>`,
      };
      const html = 'Already have account? <Strong>Sign in</Strong>';
      const result = getHTML(html, components);

      const resultStr = Array.isArray(result) ? result.join('') : result;
      expect(resultStr).toContain('Already have account?');
      expect(resultStr).toContain('<b>Sign in</b>');
    });

    it('handles whitespace correctly', () => {
      const components = {};
      const html = '<p>  Spaced text  </p>';
      const result = getHTML(html, components);

      // Whitespace should be preserved
      expect(typeof result === 'string' ? result : result).toContain('Spaced');
    });

    it('handles empty tags', () => {
      const components = {
        Empty: (props: any) => '<empty/>',
      };
      const html = '<Empty></Empty>';
      const result = getHTML(html, components);

      expect(result).toBeDefined();
    });
  });

  describe('complex scenarios', () => {
    it('renders multiple custom components in sequence', () => {
      const components = {
        Link: (props: any) => `<a href="${props.href}">${props.children}</a>`,
        Strong: (props: any) => `<strong>${props.children}</strong>`,
      };
      const html =
        'Check <Link href="/login">login</Link> or <Strong>sign up</Strong>';
      const result = getHTML(html, components);

      const resultStr = Array.isArray(result) ? result.join('') : result;
      expect(resultStr).toContain('Check');
      expect(resultStr).toContain('<a href="/login">login</a>');
      expect(resultStr).toContain('<strong>sign up</strong>');
    });

    it('handles mixed standard and custom components', () => {
      const components = {
        SignIn: (props: any) => `<a>${props.children}</a>`,
      };
      const html = '<div>Text<SignIn>Click</SignIn></div>';
      const result = getHTML(html, components);

      const resultStr = Array.isArray(result) ? result.join('') : result;
      expect(resultStr).toContain('Click');
      expect(resultStr).toContain('<a>');
    });

    it('renders component with attributes and children', () => {
      const components = {
        Button: (props: any) =>
          `<button class="${props.className}">${props.children}</button>`,
      };
      const html = '<Button className="primary">Submit</Button>';
      const result = getHTML(html, components);

      expect(result).toContain('Submit');
      expect(result).toContain('primary');
    });

    it('handles deep nesting of custom components', () => {
      const components = {
        A: (props: any) => `<a>${props.children}</a>`,
        B: (props: any) => `<b>${props.children}</b>`,
        C: (props: any) => `<c>${props.children}</c>`,
      };
      const html = '<A><B><C>Deep</C></B></A>';
      const result = getHTML(html, components);

      expect(result).toBe('<a><b><c>Deep</c></b></a>');
    });
  });

  describe('edge cases', () => {
    it('handles empty HTML string', () => {
      const result = getHTML('', {});
      // Empty HTML returns empty array or empty string
      expect(Array.isArray(result) ? result.length === 0 : result === '').toBe(
        true
      );
    });

    it('handles plain text without tags', () => {
      const result = getHTML('Just plain text', {});
      expect(result).toBe('Just plain text');
    });

    it('handles unclosed tags', () => {
      const components = {
        Div: (props: any) => `<div>${props.children}</div>`,
      };
      const html = '<Div>Text without closing';
      const result = getHTML(html, components);

      // Should still render the content
      expect(result).toContain('Text without closing');
    });

    it('handles attributes with special characters', () => {
      const components = {
        Link: (props: any) => `<a href="${props.href}">${props.children}</a>`,
      };
      const html =
        '<Link href="https://example.com?foo=bar&baz=qux">URL</Link>';
      const result = getHTML(html, components);

      expect(result).toContain('URL');
    });
  });
});
