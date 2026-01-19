import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { compile, type MarkdownContext, type MarkdownRuntime } from './index';

// Simple mock runtime that returns strings for everything
const mockRuntime: MarkdownRuntime = {
  createElement: (tag, props, ...children) => {
    const propsStr = props
      ? Object.entries(props)
          .map(([k, v]) => ` ${k}="${v}"`)
          .join('')
      : '';
    const childrenStr = children.flat().join('');
    if (typeof tag === 'string') {
      return `<${tag}${propsStr}>${childrenStr}</${tag}>`;
    }
    return childrenStr; // Fragment or component
  },
  Fragment: Symbol('Fragment'),
};

const ctx: MarkdownContext = { runtime: mockRuntime };

describe('Markdown Core Compiler', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle a basic string', () => {
    const result = compile('Hello.', ctx);
    expect(result).toBe('<span>Hello.</span>');
  });

  it('should handle emphasized text', () => {
    const result = compile('*Hello.*', ctx);
    expect(result).toBe('<em>Hello.</em>');
  });

  it('should handle headings', () => {
    const result = compile('# Heading 1', ctx);
    expect(result).toBe('<h1 id="heading-1">Heading 1</h1>');
  });

  it('should handle links', () => {
    const result = compile('[Google](https://google.com)', ctx);
    expect(result).toBe('<a href="https://google.com">Google</a>');
  });

  it('should handle images', () => {
    const result = compile('![Alt](https://example.com/img.png)', ctx);
    expect(result).toBe(
      '<img alt="Alt" src="https://example.com/img.png"></img>'
    );
  });

  it('should handle code blocks', () => {
    const result = compile('```js\nconst x = 1;\n```', ctx);
    expect(result).toBe(
      '<pre><span><code class="lang-js">const x = 1;</code></span></pre>'
    );
  });

  it('should handle blockquotes', () => {
    const result = compile('> Quote', ctx);
    expect(result).toBe('<blockquote>Quote</blockquote>');
  });

  it('should handle lists', () => {
    const result = compile('- Item 1\n- Item 2', ctx);
    expect(result).toBe(
      '<ul><li key="item-0-0.5">Item 1</li><li key="item-1-0.5">Item 2</li></ul>'
    );
  });

  it('should handle multiple block elements', () => {
    const result = compile('# Heading\n\nParagraph', ctx);
    expect(result).toBe(
      '<div><h1 id="heading">Heading</h1><p>Paragraph</p></div>'
    );
  });

  it('should handle inline elements in a span', () => {
    const result = compile('Hello *World*', ctx);
    expect(result).toBe('<span>Hello <em>World</em></span>');
  });

  it('should handle nested elements', () => {
    const result = compile('*Bold [Link](url)*', ctx);
    expect(result).toBe('<em><span>Bold </span><a href="url">Link</a></em>');
  });
});
