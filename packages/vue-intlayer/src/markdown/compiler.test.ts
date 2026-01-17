import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createApp, h } from 'vue';
import { compileMarkdown } from './index';

describe('Vue Markdown Compiler', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  const renderToHTML = (vnode: any) => {
    const app = createApp({
      render() {
        return vnode;
      },
    });
    const root = document.createElement('div');
    app.mount(root);
    return root.innerHTML;
  };

  it('should handle a basic string', () => {
    const vnode = compileMarkdown('Hello.');
    expect(renderToHTML(vnode)).toBe('<span>Hello.</span>');
  });

  it('should handle emphasized text', () => {
    const vnode = compileMarkdown('*Hello.*');
    expect(renderToHTML(vnode)).toBe('<em>Hello.</em>');
  });

  it('should handle headings', () => {
    const vnode = compileMarkdown('# Heading 1');
    expect(renderToHTML(vnode)).toBe('<h1 id="heading-1">Heading 1</h1>');
  });

  it('should handle links', () => {
    const vnode = compileMarkdown('[Google](https://google.com)');
    expect(renderToHTML(vnode)).toBe('<a href="https://google.com">Google</a>');
  });

  it('should handle images', () => {
    const vnode = compileMarkdown('![Alt](https://example.com/img.png)');
    expect(renderToHTML(vnode)).toBe(
      '<img alt="Alt" src="https://example.com/img.png">'
    );
  });

  it('should handle code blocks', () => {
    const vnode = compileMarkdown('```js\nconst x = 1;\n```');
    const html = renderToHTML(vnode);
    expect(html).toContain('<pre>');
    expect(html).toContain('<code class="lang-js">');
    expect(html).toContain('const x = 1;');
  });

  it('should handle blockquotes', () => {
    const vnode = compileMarkdown('> Quote');
    expect(renderToHTML(vnode)).toBe('<blockquote>Quote</blockquote>');
  });

  it('should handle nested lists', () => {
    const vnode = compileMarkdown('- xyz\n  - abc\n- foo');
    const html = renderToHTML(vnode);
    expect(html).toContain(
      '<ul><li>xyz<ul><li>abc</li></ul></li><li>foo</li></ul>'
    );
  });

  it('should handle multiple block elements', () => {
    const vnode = compileMarkdown('# Heading\n\nParagraph');
    const html = renderToHTML(vnode);
    expect(html).toBe(
      '<div><h1 id="heading">Heading</h1><p>Paragraph</p></div>'
    );
  });

  it('should handle inline elements in a span', () => {
    const vnode = compileMarkdown('Hello *World*');
    expect(renderToHTML(vnode)).toBe('<span>Hello <em>World</em></span>');
  });

  it('should handle GFM task lists', () => {
    const vnode = compileMarkdown('- [x] Done\n- [ ] Todo');
    const html = renderToHTML(vnode);
    expect(html).toContain('<input readonly="" type="checkbox">');
    // Vue might render checked as an attribute without value or checked=""
    expect(html).toContain('checked');
  });
});
