import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { compile, type MarkdownContext, type MarkdownRuntime } from './index';

// Simple mock runtime that returns objects for elements
const mockRuntime: MarkdownRuntime = {
  createElement: (tag, props, ...children) => {
    return {
      tag,
      props: props ?? {},
      children: children.flat(),
      toString() {
        const self = this as any;
        const propsStr = Object.entries(self.props)
          .map(([k, v]) => ` ${k}="${v}"`)
          .join('');
        const childrenStr = self.children
          .map((c: any) => (c?.toString ? c.toString() : String(c)))
          .join('');
        if (typeof self.tag === 'string') {
          return `<${self.tag}${propsStr}>${childrenStr}</${self.tag}>`;
        }
        return childrenStr;
      },
    };
  },
  Fragment: Symbol('Fragment'),
};

const ctx: MarkdownContext<any> = { runtime: mockRuntime };

describe('Markdown Core Compiler', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle a basic string', () => {
    const result = compile('Hello.', ctx) as any;
    expect(result.toString()).toBe('<span key="outer">Hello.</span>');
  });

  it('should handle emphasized text', () => {
    const result = compile('*Hello.*', ctx) as any;
    expect(result.toString()).toBe('<em key="0">Hello.</em>');
  });

  it('should handle headings', () => {
    const result = compile('# Heading 1', ctx) as any;
    expect(result.toString()).toBe('<h1 id="heading-1" key="0">Heading 1</h1>');
  });

  it('should handle links', () => {
    const result = compile('[Google](https://google.com)', ctx) as any;
    expect(result.toString()).toBe(
      '<a key="0" href="https://google.com">Google</a>'
    );
  });

  it('should handle images', () => {
    const result = compile('![Alt](https://example.com/img.png)', ctx) as any;
    expect(result.toString()).toBe(
      '<img key="0" alt="Alt" src="https://example.com/img.png"></img>'
    );
  });

  it('should handle code blocks', () => {
    const result = compile('```js\nconst x = 1;\n```', ctx) as any;
    expect(result.toString()).toBe(
      '<pre key="0"><code className="lang-js">const x = 1;\n</code></pre>'
    );
  });

  it('should handle blockquotes', () => {
    const result = compile('> Quote', ctx) as any;
    expect(result.toString()).toBe('<blockquote key="0">Quote</blockquote>');
  });

  it('should handle lists', () => {
    const result = compile('- Item 1\n- Item 2', ctx) as any;
    expect(result.toString()).toBe(
      '<ul key="0"><li key="0">Item 1</li><li key="1">Item 2</li></ul>'
    );
  });

  it('should handle multiple block elements', () => {
    const result = compile('# Heading\n\nParagraph', ctx) as any;
    expect(result.toString()).toBe(
      '<div key="outer"><h1 id="heading" key="0">Heading</h1><p key="1">Paragraph</p></div>'
    );
  });

  it('should handle inline elements in a span', () => {
    const result = compile('Hello *World*', ctx) as any;
    expect(result.toString()).toBe(
      '<span key="outer">Hello <em key="1">World</em></span>'
    );
  });

  it('should handle nested elements', () => {
    const result = compile('*Bold [Link](url)*', ctx) as any;
    expect(result.toString()).toBe(
      '<em key="0">Bold <a key="1" href="url">Link</a></em>'
    );
  });

  it('should handle custom components with leading newlines and indentation', () => {
    const markdown = `<Tab label="React">

    #### Title

</Tab>`;
    const result = compile(markdown, ctx) as any;
    expect(result.toString()).toContain('<h4 id="title" key="1">Title</h4>');
  });

  it('should handle HTML blocks with leading newlines and indentation', () => {
    const markdown = `<div>

    #### Heading

</div>`;
    const result = compile(markdown, ctx) as any;
    expect(result.toString()).toContain(
      '<h4 id="heading" key="1">Heading</h4>'
    );
  });

  it('should render fenced code blocks inside a custom component whose content starts with a soft-wrapped paragraph', () => {
    const markdown = `<Tab label="test" value="test">
    Since version \`1.0.0\`, you can declare content directly. Intlayer will
    automatically detect and parse the content.

    \`\`\`md fileName="example.en.content.md"
    # My content

    Here is an example
    \`\`\`

    The \`locale\` field is optional.
</Tab>`;
    const result = compile(markdown, ctx) as any;
    const html = result.toString();
    // Fenced block must render as <pre><code> not as inline <code>
    expect(html).toContain('<pre');
    expect(html).toContain('<code');
    // The language class should be set (block code path)
    expect(html).toContain('lang-md');
    // The raw language identifier must NOT appear as text content of an inline code element
    expect(html).not.toContain('>md fileName=');
    // Code content must not carry the 4-space structural indentation
    expect(html).not.toContain('    # My content');
  });

  it('should keep an angle bracket held inside a quoted attribute value', () => {
    const markdown = `<Tab label='Intlayer >=9.4' value='>=9.4'>\n\nrecent\n\n</Tab>`;
    const html = (compile(markdown, ctx) as any).toString();

    expect(html).toContain('label="Intlayer >=9.4"');
    expect(html).toContain('value=">=9.4"');
    expect(html).toContain('recent');
  });

  it('should drop the padding an aligned table pads its cells with', () => {
    const markdown = '| A   | B      |\n| --- | ------ |\n| `x` |  **y** |\n';
    const html = (compile(markdown, ctx) as any).toString();

    expect(html).toContain('<th key="0" style="[object Object]">A</th>');
    expect(html).toContain('<code key="0">x</code></td>');
    expect(html).not.toContain('> A ');
  });

  it('should only close a fenced code block at a fence starting a line', () => {
    const html = (
      compile('```js\nline```\nrest\n```\n', ctx) as any
    ).toString();

    expect(html).toContain('line```\nrest\n');
  });

  it('should close a fenced code block left unterminated at the end of the source', () => {
    const html = (compile('```js\nconst a = 1;', ctx) as any).toString();

    expect(html).toContain('<pre');
    expect(html).toContain('lang-js');
    expect(html).toContain('const a = 1;');
  });

  it('should keep a loose list separated by blank lines as one list', () => {
    const html = (compile('- one\n\n- two\n', ctx) as any).toString();

    expect(html).toBe(
      '<ul key="0"><li key="0"><p key="0">one</p>\n</li><li key="1"><p key="0">two</p>\n</li></ul>'
    );
  });

  it('should not read a bullet with nothing after it as a list', () => {
    const html = (compile('- ', ctx) as any).toString();

    expect(html).toBe('<p key="0">-</p>');
  });

  it('should close an HTML block whose tags disagree in case', () => {
    const html = (compile('<DIV>\n\nhello\n\n</div>\n', ctx) as any).toString();

    expect(html).toContain('<DIV key="0">');
    expect(html).toContain('<p key="1">hello</p>');
  });

  it('should pair each HTML block with its own closing tag when they nest', () => {
    const markdown = '<div>\n\na\n\n<div>\n\nb\n\n</div>\n\n</div>\n';
    const html = (compile(markdown, ctx) as any).toString();

    expect(html).toContain('<p key="1">a</p>');
    expect(html).toContain('<p key="1">b</p>');
    expect(html.match(/<div /g)).toHaveLength(2);
  });

  it('should keep an element indented by up to three spaces as a sibling block', () => {
    // Mirrors `<Tabs>` docs where one `<Tab>` carries an extra space of indentation.
    const markdown = [
      '<Tabs>',
      '  <Tab label="a">',
      '',
      'first',
      '',
      '  </Tab>',
      '   <Tab label="b">',
      '',
      'second',
      '',
      '  </Tab>',
      '  <Tab label="c">',
      '',
      'third',
      '',
      '  </Tab>',
      '</Tabs>',
    ].join('\n');
    const html = (compile(markdown, ctx) as any).toString();

    expect(html.match(/<Tab /g)).toHaveLength(3);
    expect(html).not.toContain('<p key="1">&lt;/Tab');
    expect(html).not.toContain('<Tab label="b"></Tab>');
  });

  it('should read an element indented by four spaces as an indented code block', () => {
    const html = (compile('    <div>code</div>\n', ctx) as any).toString();

    expect(html).toContain('<pre');
    expect(html).not.toContain('<div ');
  });

  it('should keep the space before inline HTML that follows another inline node', () => {
    const html = (compile('*a* <b>b</b>\n', ctx) as any).toString();

    expect(html).toContain('</em> <b');
  });

  it('should not read a self-closing tag followed by its own closing tag as self-closing', () => {
    const html = (compile('<span/></span>\n', ctx) as any).toString();

    expect(html).toContain('<span/></span>');
  });

  it('should not backtrack exponentially through nested tags carrying long attribute lists', () => {
    // Every character of an inner opening tag must have a single way to be
    // read; two readings of the same character turn this into 2^n paths.
    const innerAttributes = Array.from(
      { length: 20 },
      (_, index) => `data-index-${index}="value"`
    ).join(' ');
    const markdown = `<Tab>\n\n${`<Tab ${innerAttributes}>inner</Tab>\n\n`.repeat(5)}`;

    const start = performance.now();
    compile(markdown, ctx);

    expect(performance.now() - start).toBeLessThan(500);
  });
});
