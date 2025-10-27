import { readFileSync } from 'node:fs';
import { cleanup, render } from '@testing-library/react';
import {
  Component,
  createElement,
  type FC,
  Fragment,
  type JSX,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { compiler, RuleType, sanitizer } from './processor';

const container = document.body.appendChild(
  document.createElement('div')
) as HTMLDivElement;

let root: any = null;

function renderFn(jsx) {
  if (root) {
    root.unmount();
  }
  root = createRoot(container);
  flushSync(() => {
    act(() => {
      root.render(jsx);
    });
  });
}

afterEach(() => {
  if (root) {
    root.unmount();
    root = null;
  }
});

it('should throw if not passed a string (first arg)', () => {
  expect(() => compiler('')).not.toThrow();
  // @ts-ignore
  expect(() => compiler()).not.toThrow();
  // @ts-ignore
  expect(() => compiler(1)).toThrow();
  // @ts-ignore
  expect(() => compiler(() => {})).toThrow();
  // @ts-ignore
  expect(() => compiler({})).toThrow();
  // @ts-ignore
  expect(() => compiler([])).toThrow();
  // @ts-ignore
  expect(() => compiler(null)).toThrow();
  // @ts-ignore
  expect(() => compiler(true)).toThrow();
});

it('should handle a basic string', () => {
  renderFn(compiler('Hello.'));

  expect(container.textContent).toBe('Hello.');
});

it('wraps multiple block element returns in a div to avoid invalid nesting errors', () => {
  renderFn(compiler('# Boop\n\n## Blep'));

  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<div><h1 id="boop">Boop</h1><h2 id="blep">Blep</h2></div>"`
  );
});

it('wraps solely inline elements in a span, rather than a div', () => {
  renderFn(compiler("Hello. _Beautiful_ day isn't it?"));

  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<span>Hello. <em>Beautiful</em> day isn't it?</span>"`
  );
});

it('wraps solely inline elements in a span, rather than a div', () => {
  const input1 = "Hello. **Beautiful** day isn't it?";
  const { container: c1 } = render(compiler(input1));

  const html1 = c1.innerHTML;

  // render again with a template literal input (same content)
  cleanup();

  const input2 = `Hello. **Beautiful** day isn't it?`;
  const { container: c2 } = render(compiler(input2));

  const html2 = c2.innerHTML;

  console.log(html1, html2);

  // Test that both render the same
  expect(html2).toBe(html1);
});

it('#190 perf regression', () => {
  renderFn(
    compiler(
      'Lorum *ipsum*: <a href="" style="float: right"><small>foo</small></a><span style="float: right"><small>&nbsp;</small></span><a href="" style="float: right"><small>bar</small></a>'
    )
  );

  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<span>Lorum <em>ipsum</em>: <a href="" style="float: right;"><small>foo</small></a><span style="float: right;"><small>&nbsp;</small></span><a href="" style="float: right;"><small>bar</small></a></span>"`
  );
});

it('#234 perf regression', () => {
  renderFn(
    compiler(`
      <br /><b>1</b><b>2</b><b>3</b><b>4</b><b>5</b><b>6</b><b>7</b><b>8</b><b>9</b><b>10</b>
      <b>1</b><b>2</b><b>3</b><b>4</b><b>5</b><b>6</b><b>7</b><b>8</b><b>9</b><b>20</b>
      <b>1</b><b>2</b><b>3</b><b>4</b><b>5</b><b>6</b><b>7</b><b>8</b><b>9</b><b>30</b>
    `)
  );

  expect(container.innerHTML).toMatchInlineSnapshot(`
    "<pre><code class="lang-plaintext">  &lt;br /&gt;&lt;b&gt;1&lt;/b&gt;&lt;b&gt;2&lt;/b&gt;&lt;b&gt;3&lt;/b&gt;&lt;b&gt;4&lt;/b&gt;&lt;b&gt;5&lt;/b&gt;&lt;b&gt;6&lt;/b&gt;&lt;b&gt;7&lt;/b&gt;&lt;b&gt;8&lt;/b&gt;&lt;b&gt;9&lt;/b&gt;&lt;b&gt;10&lt;/b&gt;
      &lt;b&gt;1&lt;/b&gt;&lt;b&gt;2&lt;/b&gt;&lt;b&gt;3&lt;/b&gt;&lt;b&gt;4&lt;/b&gt;&lt;b&gt;5&lt;/b&gt;&lt;b&gt;6&lt;/b&gt;&lt;b&gt;7&lt;/b&gt;&lt;b&gt;8&lt;/b&gt;&lt;b&gt;9&lt;/b&gt;&lt;b&gt;20&lt;/b&gt;
      &lt;b&gt;1&lt;/b&gt;&lt;b&gt;2&lt;/b&gt;&lt;b&gt;3&lt;/b&gt;&lt;b&gt;4&lt;/b&gt;&lt;b&gt;5&lt;/b&gt;&lt;b&gt;6&lt;/b&gt;&lt;b&gt;7&lt;/b&gt;&lt;b&gt;8&lt;/b&gt;&lt;b&gt;9&lt;/b&gt;&lt;b&gt;30&lt;/b&gt;</code></pre>"
  `);
});

it('#700 perf regression with unclosed inline syntax', () => {
  renderFn(
    compiler(
      '«Cleanliness is the finest of uniforms and a great defender against disease»*. Silver fabric was flowing. A wasp, buzzing, touches the bronze lips of the dragon with delicate <Tooltip><TooltipTrigger>hymenous wings</TooltipTrigger><TooltipContent>wings thin like a membrane (hymenous = thin, like a hymen, meaning very thin skin).</TooltipContent></Tooltip>. On the <Tooltip><TooltipTrigger>carved</TooltipTrigger><TooltipContent>engraved.</TooltipContent></Tooltip> tree trunk like a <Tooltip><TooltipTrigger>cradle</TooltipTrigger><TooltipContent>a swing.</TooltipContent></Tooltip> trough, where the animals quench their thirst, the beehive rests after gathering from the flowers.'
    )
  );

  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<span>«Cleanliness is the finest of uniforms and a great defender against disease»*. Silver fabric was flowing. A wasp, buzzing, touches the bronze lips of the dragon with delicate <tooltip></tooltip><tooltiptrigger></tooltiptrigger>hymenous wings&lt;/TooltipTrigger&gt;<tooltipcontent></tooltipcontent>wings thin like a membrane (hymenous = thin, like a hymen, meaning very thin skin).&lt;/TooltipContent&gt;&lt;/Tooltip&gt;. On the <tooltip></tooltip><tooltiptrigger></tooltiptrigger>carved&lt;/TooltipTrigger&gt;<tooltipcontent></tooltipcontent>engraved.&lt;/TooltipContent&gt;&lt;/Tooltip&gt; tree trunk like a <tooltip></tooltip><tooltiptrigger></tooltiptrigger>cradle&lt;/TooltipTrigger&gt;<tooltipcontent></tooltipcontent>a swing.&lt;/TooltipContent&gt;&lt;/Tooltip&gt; trough, where the animals quench their thirst, the beehive rests after gathering from the flowers.</span>"`
  );
});

describe('inline textual elements', () => {
  it('should handle emphasized text', () => {
    renderFn(compiler('*Hello.*'));

    expect(container.innerHTML).toMatchInlineSnapshot(`"<em>Hello.</em>"`);
  });

  it('should handle emphasized text spanning multiple lines', () => {
    renderFn(compiler('*Hello\nWorld.*\n'));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><em>Hello
      World.</em></p>"
    `);
  });

  it('should handle double-emphasized text', () => {
    renderFn(compiler('**Hello.**'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<strong>Hello.</strong>"`
    );
  });

  it('should handle double-emphasized text with spaces', () => {
    renderFn(compiler('\n**Hello World.**'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>\n<strong>Hello World.</strong></span>"`
    );
  });

  it('should handle double-emphasized text spanning multiple lines', () => {
    renderFn(compiler('**Hello\nWorld.**\n'));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><strong>Hello
      World.</strong></p>"
    `);
  });

  it('should handle triple-emphasized text', () => {
    renderFn(compiler('***Hello.***'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<strong><em>Hello.</em></strong>"`
    );
  });

  it('should handle triple-emphasized text spanning multiple lines', () => {
    renderFn(compiler('***Hello\nWorld.***\n'));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><strong><em>Hello
      World.</em></strong></p>"
    `);
  });

  it('should handle triple-emphasized text with mixed syntax 1/2', () => {
    renderFn(compiler('**_Hello._**'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<strong><em>Hello.</em></strong>"`
    );
  });

  it('should handle triple-emphasized text with mixed syntax 2/2', () => {
    renderFn(compiler('_**Hello.**_'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<em><strong>Hello.</strong></em>"`
    );
  });

  it('should handle the alternate form of bold/italic', () => {
    renderFn(compiler('___Hello.___'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<strong><em>Hello.</em></strong>"`
    );
  });

  it('should handle deleted text', () => {
    renderFn(compiler('~~Hello.~~'));

    expect(container.innerHTML).toMatchInlineSnapshot(`"<del>Hello.</del>"`);
  });

  it('should handle deleted text containing other syntax with a tilde', () => {
    renderFn(compiler('~~Foo `~~bar` baz.~~'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<del>Foo <code>~~bar</code> baz.</del>"`
    );
  });

  it('should handle deleted text spanning multiple lines', () => {
    renderFn(compiler('~~Hello\nWorld.~~\n'));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><del>Hello
      World.</del></p>"
    `);
  });

  it('should handle consecutive marked text', () => {
    renderFn(compiler('==Hello== ==World=='));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span><mark>Hello</mark> <mark>World</mark></span>"`
    );
  });

  it('should handle marked text containing other syntax with an equal sign', () => {
    renderFn(compiler('==Foo `==bar` baz.=='));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<mark>Foo <code>==bar</code> baz.</mark>"`
    );
  });

  it('should handle marked text spanning multiple lines', () => {
    renderFn(compiler('==Hello\nWorld.==\n'));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><mark>Hello
      World.</mark></p>"
    `);
  });

  it('should handle block deleted text containing other syntax with a tilde', () => {
    renderFn(compiler('~~Foo `~~bar` baz.~~\n\nFoo ~~bar~~.'));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<div><p><del>Foo <code>~~bar</code> baz.</del></p>
      <p>Foo <del>bar</del>.</p></div>"
    `);
  });

  it('should handle escaped text', () => {
    renderFn(compiler('Hello.\\_\\_foo\\_\\_'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Hello.__foo__</span>"`
    );
  });

  it('regression test for #188, mismatched syntaxes triggered the wrong result', () => {
    renderFn(compiler('*This should render as normal text, not emphasized._'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>*This should render as normal text, not emphasized._</span>"`
    );
  });

  it('ignore similar syntax inside inline syntax', () => {
    renderFn(
      compiler(
        '*This should not misinterpret the asterisk <span>*</span> in the HTML.*'
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<em>This should not misinterpret the asterisk <span>*</span> in the HTML.</em>"`
    );

    renderFn(
      compiler(
        '*This should not misinterpret the asterisk [*](x) in the anchor text.*'
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<em>This should not misinterpret the asterisk <a href="x">*</a> in the anchor text.</em>"`
    );

    renderFn(
      compiler(
        '*This should not misinterpret the asterisk [foo](x*) in the link href.*'
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<em>This should not misinterpret the asterisk <a href="x*">foo</a> in the link href.</em>"`
    );

    renderFn(
      compiler(
        String.raw`*This should not misinterpret the asterisk ~~\*~~ in the strikethrough.*`
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<em>This should not misinterpret the asterisk <del>*</del> in the strikethrough.</em>"`
    );

    renderFn(
      compiler(
        '*This should not misinterpret the asterisk `*` in the backticks.*'
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<em>This should not misinterpret the asterisk <code>*</code> in the backticks.</em>"`
    );

    renderFn(
      compiler(
        `_This should not misinterpret the under\\_score that forms part of a word._`
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<em>This should not misinterpret the under_score that forms part of a word.</em>"`
    );
  });

  it('replaces common HTML character codes with unicode equivalents so React will render correctly', () => {
    renderFn(compiler('Foo &nbsp; bar&amp;baz.'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Foo &nbsp; bar&amp;baz.</span>"`
    );
  });

  it('replaces custom named character codes with unicode equivalents so React will render correctly', () => {
    renderFn(
      compiler('Apostrophe&#39;s and &le; equal', {
        namedCodesToUnicode: {
          le: '\u2264',
          '#39': '\u0027',
        },
      })
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Apostrophe's and ≤ equal</span>"`
    );
  });
});

describe('misc block level elements', () => {
  it('should handle blockquotes', () => {
    renderFn(compiler('> Something important, perhaps?'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<blockquote>Something important, perhaps?</blockquote>"`
    );
  });

  it('should handle lazy continuation lines of blockquotes', () => {
    renderFn(compiler('> Line 1\nLine 2\n>Line 3'));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<blockquote><p>Line 1\nLine 2\nLine 3</p>\n</blockquote>"
    `);
  });

  it('should handle consecutive blockquotes', () => {
    renderFn(compiler('> Something important, perhaps?\n\n> Something else'));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<div><blockquote>Something important, perhaps?</blockquote>
      <blockquote>Something else</blockquote></div>"
    `);
  });

  it('should handle alert blockquotes', () => {
    renderFn(compiler('> [!NOTE]\n> Something important, perhaps?'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<blockquote class="markdown-alert-note"><header>NOTE</header>Something important, perhaps?</blockquote>"`
    );
  });

  it('should handle a link in a blockquotes', () => {
    renderFn(compiler('> Here is a link: [More info](https://example.com)'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<blockquote>Here is a link: <a href="https://example.com">More info</a></blockquote>"`
    );
  });

  it('should handle an image in a blockquotes', () => {
    renderFn(compiler('> ![Alt text](https://example.com/image.png)'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<blockquote><img alt="Alt text" src="https://example.com/image.png"></blockquote>"`
    );
  });

  it('should handle a code block in a blockquotes in multiple lines', () => {
    renderFn(compiler('> `foo`\n> `bar`'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<blockquote><p><code>foo</code>\n<code>bar</code></p>\n</blockquote>"`
    );
  });
});

describe('headings', () => {
  it('should handle level 1 properly', () => {
    renderFn(compiler('# Hello World'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<h1 id="hello-world">Hello World</h1>"`
    );
  });

  it('should enforce atx when option is passed', () => {
    renderFn(compiler('#Hello World', { enforceAtxHeadings: true }));

    expect(container.innerHTML).toMatchInlineSnapshot(`"<p>#Hello World</p>"`);
  });

  it('should handle level 2 properly', () => {
    renderFn(compiler('## Hello World'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<h2 id="hello-world">Hello World</h2>"`
    );
  });

  it('should handle level 3 properly', () => {
    renderFn(compiler('### Hello World'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<h3 id="hello-world">Hello World</h3>"`
    );
  });

  it('should handle level 4 properly', () => {
    renderFn(compiler('#### Hello World'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<h4 id="hello-world">Hello World</h4>"`
    );
  });

  it('should handle level 5 properly', () => {
    renderFn(compiler('##### Hello World'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<h5 id="hello-world">Hello World</h5>"`
    );
  });

  it('should handle level 6 properly', () => {
    renderFn(compiler('###### Hello World'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<h6 id="hello-world">Hello World</h6>"`
    );
  });

  it('should handle setext level 1 style', () => {
    renderFn(compiler('Hello World\n===========\n\nsomething'));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<div><h1>Hello World</h1>
      <p>something</p></div>"
    `);
  });

  it('should handle setext level 2 style', () => {
    renderFn(compiler('Hello World\n-----------\n\nsomething'));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<div><h2>Hello World</h2>
      <p>something</p></div>"
    `);
  });

  it('should handle consecutive headings without a padding newline', () => {
    renderFn(compiler('# Hello World\n## And again'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div><h1 id="hello-world">Hello World</h1><h2 id="and-again">And again</h2></div>"`
    );
  });

  it('trims closing hashes in headers', () => {
    renderFn(compiler('# Hello World #########\nHere is the body'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div><h1 id="hello-world">Hello World</h1><p>Here is the body</p></div>"`
    );
  });

  it('keeps hashes before closing hashes in headers and hashes without whitespace preceding', () => {
    renderFn(compiler('# Hello World # #\n## Subheader#\nHere is the body'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div><h1 id="hello-world-">Hello World #</h1><h2 id="subheader">Subheader#</h2><p>Here is the body</p></div>"`
    );
  });

  it('adds an "id" attribute to headings for deeplinking purposes', () => {
    renderFn(compiler("# This is~ a very' complicated> header!"));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<h1 id="this-is-a-very-complicated-header">This is~ a very' complicated&gt; header!</h1>"`
    );
  });

  it('#595 regression - handle pipe character inside header', () => {
    renderFn(compiler('# Heading | text'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<h1 id="heading--text">Heading | text</h1>"`
    );
  });
});

describe('images', () => {
  it('should handle a basic image', () => {
    renderFn(compiler('![](/xyz.png)'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<img alt="" src="/xyz.png">"`
    );
  });

  it('should handle a base64-encoded image', () => {
    renderFn(
      compiler(
        '![Red Dot](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==)'
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<img alt="Red Dot" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==">"`
    );
  });

  it('should handle an image with alt text', () => {
    renderFn(compiler('![test](/xyz.png)'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<img alt="test" src="/xyz.png">"`
    );
  });

  it('should handle an image with escaped alt text', () => {
    renderFn(compiler('![\\-\\<stuff](https://somewhere)'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<img alt="-<stuff" src="https://somewhere">"`
    );
  });

  it('should handle an image with title', () => {
    renderFn(compiler('![test](/xyz.png "foo")'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<img alt="test" title="foo" src="/xyz.png">"`
    );
  });

  it('should handle an image reference', () => {
    const markdown = ['![][1]', '[1]: /xyz.png'].join('\n');
    renderFn(compiler(markdown));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><img src="/xyz.png">
      </p>"
    `);
  });

  it('should gracefully handle an empty image reference', () => {
    const markdown = ['![][1]', '[2]: /xyz.png'].join('\n');
    renderFn(compiler(markdown));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p>
      </p>"
    `);
  });

  it('should handle an image reference with alt text', () => {
    const markdown = ['![test][1]', '[1]: /xyz.png'].join('\n');
    renderFn(compiler(markdown));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><img alt="test" src="/xyz.png">
      </p>"
    `);
  });

  it('should handle an image reference with title', () => {
    const markdown = ['![test][1]', '[1]: /xyz.png "foo"'].join('\n');
    renderFn(compiler(markdown));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><img alt="test" title="foo" src="/xyz.png">
      </p>"
    `);
  });

  it('should handle an image inside a link', () => {
    renderFn(
      compiler(
        `[![youtubeImg](https://www.gstatic.com/youtube/img/promos/growth/ytp_lp2_logo_phone_landscape_300x44.png)](https://www.youtube.com/)`
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<a href="https://www.youtube.com/"><img alt="youtubeImg" src="https://www.gstatic.com/youtube/img/promos/growth/ytp_lp2_logo_phone_landscape_300x44.png"></a>"`
    );
  });
});

describe('links', () => {
  it('should handle a basic link', () => {
    renderFn(compiler('[foo](/xyz.png)'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<a href="/xyz.png">foo</a>"`
    );
  });

  it('should handle a link with title', () => {
    renderFn(compiler('[foo](/xyz.png "bar")'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<a href="/xyz.png" title="bar">foo</a>"`
    );
  });

  it('should handle a link reference', () => {
    renderFn(compiler(['[foo][1]', '[1]: /xyz.png'].join('\n')));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><a href="/xyz.png">foo</a>
      </p>"
    `);
  });

  it('should handle a link reference with a space', () => {
    renderFn(compiler(['[foo] [1]', '[1]: /xyz.png'].join('\n')));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><a href="/xyz.png">foo</a>
      </p>"
    `);
  });

  it('should handle a link reference with title', () => {
    renderFn(compiler(['[foo][1]', '[1]: /xyz.png "bar"'].join('\n')));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><a href="/xyz.png" title="bar">foo</a>
      </p>"
    `);
  });

  it('should handle a link reference with angle brackets', () => {
    renderFn(compiler(['[foo][1]', '[1]: </xyz.png>'].join('\n')));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><a href="/xyz.png">foo</a>
      </p>"
    `);
  });

  it('should handle a link reference with angle brackets and a space', () => {
    renderFn(compiler(['[foo] [1]', '[1]: </xyz.png>'].join('\n')));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><a href="/xyz.png">foo</a>
      </p>"
    `);
  });

  it('should handle a link reference with angle brackets and a title', () => {
    renderFn(compiler(['[foo][1]', '[1]: </xyz.png> "bar"'].join('\n')));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><a href="/xyz.png" title="bar">foo</a>
      </p>"
    `);
  });

  it('should gracefully handle an empty link reference', () => {
    const markdown = ['[][1]', '[2]: foo'].join('\n');
    renderFn(compiler(markdown));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><span>[][1]</span>
      </p>"
    `);
  });

  it('list item should break paragraph', () => {
    renderFn(compiler('foo\n- item'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div><p>foo</p><ul><li>item</li></ul></div>"`
    );
  });

  it('#474 link regression test', () => {
    renderFn(
      compiler(
        '[Markdown](https://cdn.vox-cdn.com/thumbor/ZGzvLsLuAaPPVW8yZMGqL77xyY8=/0x0:1917x789/1720x0/filters:focal(0x0:1917x789):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/24148777/cavill6.png)'
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<a href="https://cdn.vox-cdn.com/thumbor/ZGzvLsLuAaPPVW8yZMGqL77xyY8=/0x0:1917x789/1720x0/filters:focal(0x0:1917x789):format(webp):no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/24148777/cavill6.png">Markdown</a>"`
    );
  });

  it('header should break paragraph', () => {
    renderFn(compiler('foo\n# header'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div><p>foo</p><h1 id="header">header</h1></div>"`
    );
  });

  it('should handle autolink style', () => {
    renderFn(compiler('<https://google.com>'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<a href="https://google.com">https://google.com</a>"`
    );
  });

  it('should handle autolinks after a paragraph (regression)', () => {
    const markdown = ['**autolink** style', '', '<https://google.com>'].join(
      '\n'
    );
    renderFn(compiler(markdown));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<div><p><strong>autolink</strong> style</p>
      <p><a href="https://google.com">https://google.com</a></p></div>"
    `);
  });

  it('should handle mailto autolinks after a paragraph', () => {
    const markdown = [
      '**autolink** style',
      '',
      '<mailto:probablyup@gmail.com>',
    ].join('\n');
    renderFn(compiler(markdown));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<div><p><strong>autolink</strong> style</p>
      <p><a href="mailto:probablyup@gmail.com">probablyup@gmail.com</a></p></div>"
    `);
  });

  it('should handle a mailto autolink', () => {
    renderFn(compiler('<mailto:probablyup@gmail.com>'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<a href="mailto:probablyup@gmail.com">probablyup@gmail.com</a>"`
    );
  });

  it('should an email autolink and add a mailto: prefix', () => {
    renderFn(compiler('<probablyup@gmail.com>'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<a href="mailto:probablyup@gmail.com">probablyup@gmail.com</a>"`
    );
  });

  it('should automatically link found URLs', () => {
    renderFn(compiler('https://google.com'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<a href="https://google.com">https://google.com</a>"`
    );
  });

  it('should not link bare URL if it is already inside an anchor tag', () => {
    renderFn(compiler('<a href="https://google.com">https://google.com</a>'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<a href="https://google.com">https://google.com</a>"`
    );
  });

  it('should not link URL if it is nested inside an anchor tag', () => {
    renderFn(
      compiler(
        '<a href="https://google.com">some text <span>with a link https://google.com</span></a>'
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<a href="https://google.com">some text <span>with a link https://google.com</span></a>"`
    );

    renderFn(
      compiler(
        '<a href="https://google.com">some text <span>with a nested link <span>https://google.com</span></span></a>'
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<a href="https://google.com">some text <span>with a nested link <span>https://google.com</span></span></a>"`
    );
  });

  it('should not link bare URL if disabled via options', () => {
    renderFn(compiler('https://google.com', { disableAutoLink: true }));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>https://google.com</span>"`
    );
  });

  it('should not sanitize markdown when explicitly disabled', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(
      compiler('[foo](javascript:doSomethingBad)', { sanitizer: (x) => x })
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<a href="javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')">foo</a>"`
    );

    expect(console.warn).not.toHaveBeenCalled();
  });

  it('tag and attribute are provided to allow for conditional override', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(
      compiler(
        '[foo](javascript:doSomethingBad)\n![foo](javascript:doSomethingBad)',
        {
          sanitizer: (value, tag) => (tag === 'a' ? value : sanitizer(value)),
        }
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p><a href="javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')">foo</a>
      <img alt="foo"></p>"
    `);

    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it('should sanitize markdown links containing JS expressions', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(compiler('[foo](javascript:doSomethingBad)'));

    expect(container.innerHTML).toMatchInlineSnapshot(`"<a>foo</a>"`);

    expect(console.warn).toHaveBeenCalled();
  });

  it('should sanitize markdown links containing JS expressions', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(compiler('![foo](javascript:doSomethingBad)'));

    expect(container.innerHTML).toMatchInlineSnapshot(`"<img alt="foo">"`);

    expect(console.warn).toHaveBeenCalled();
  });

  it('should sanitize markdown links containing Data expressions', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(compiler('[foo](data:doSomethingBad)'));
    expect(container.innerHTML).toMatchInlineSnapshot(`"<a>foo</a>"`);
    expect(console.warn).toHaveBeenCalled();
  });

  it('should sanitize markdown links containing VBScript expressions', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(compiler('[foo](vbScript:doSomethingBad)'));
    expect(container.innerHTML).toMatchInlineSnapshot(`"<a>foo</a>"`);
    expect(console.warn).toHaveBeenCalled();
  });

  it('should sanitize markdown links containing encoded JS expressions', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(compiler('[foo](javascript%3AdoSomethingBad)'));

    expect(container.innerHTML).toMatchInlineSnapshot(`"<a>foo</a>"`);

    expect(console.warn).toHaveBeenCalled();
  });

  it('should sanitize markdown links containing padded JS expressions', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(compiler('[foo](  javascript%3AdoSomethingBad)'));

    expect(container.innerHTML).toMatchInlineSnapshot(`"<a>foo</a>"`);

    expect(console.warn).toHaveBeenCalled();
  });

  it('should sanitize markdown links containing padded encoded vscript expressions', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(compiler('[foo](  VBScript%3AdoSomethingBad)'));

    expect(container.innerHTML).toMatchInlineSnapshot(`"<a>foo</a>"`);
    expect(console.warn).toHaveBeenCalled();
  });

  it('should sanitize markdown images containing padded encoded vscript expressions', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(compiler('![foo](  VBScript%3AdoSomethingBad)'));
    expect(container.innerHTML).toMatchInlineSnapshot(`"<img alt="foo">"`);
    expect(console.warn).toHaveBeenCalled();
  });

  it('should sanitize markdown links containing padded encoded data expressions', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(compiler('[foo](`<data:doSomethingBad)'));
    expect(container.innerHTML).toMatchInlineSnapshot(`"<a>foo</a>"`);
    expect(console.warn).toHaveBeenCalled();
  });

  it('should sanitize markdown images containing padded encoded data expressions', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(compiler('![foo](`<data:doSomethingBad)'));
    expect(container.innerHTML).toMatchInlineSnapshot(`"<img alt="foo">"`);
    expect(console.warn).toHaveBeenCalled();
  });

  it('should sanitize markdown links containing invalid characters', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(compiler('[foo](https://google.com/%AF)'));

    expect(container.innerHTML).toMatchInlineSnapshot(`"<a>foo</a>"`);
    expect(console.warn).toHaveBeenCalled();
  });

  it('should sanitize html links containing JS expressions', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(compiler('<a href="javascript:doSomethingBad">foo</a>'));

    expect(container.innerHTML).toMatchInlineSnapshot(`"<a>foo</a>"`);

    expect(console.warn).toHaveBeenCalled();
  });

  it('should sanitize html links containing encoded, prefixed data expressions', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(compiler('<a href="<`data:doSomethingBad">foo</a>'));
    expect(container.innerHTML).toMatchInlineSnapshot(`"<a>foo</a>"`);
    expect(console.warn).toHaveBeenCalled();
  });

  it('should sanitize html images containing encoded, prefixed JS expressions', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(compiler('<img src="`<javascript:alert>`(\'alertstr\')" />'));
    expect(container.innerHTML).toMatchInlineSnapshot(`"<img>"`);
    expect(console.warn).toHaveBeenCalled();
  });

  it('should sanitize html images containing weird parsing src=s', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(compiler('<img src="<src=\\"javascript:alert(`xss`)">'));
    expect(container.innerHTML).toMatchInlineSnapshot(`"<img>"`);
    expect(console.warn).toHaveBeenCalled();
  });

  it('should sanitize style attribute containing known XSS payloads', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(
      compiler(
        '<div style="background-image: url(javascript:alert(`xss`)); color: red;">'
      )
    );
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div style="color: red;"></div>"`
    );
    expect(console.warn).toHaveBeenCalled();
  });

  it('should not sanitize style attribute with an acceptable data image payload', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    renderFn(
      compiler(
        '<div style="background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==); color: red;">'
      )
    );
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==&quot;); color: red;"></div>"`
    );
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('should handle a link with a URL in the text', () => {
    renderFn(
      compiler('[https://www.google.com *heck yeah*](http://www.google.com)')
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<a href="http://www.google.com">https://www.google.com <em>heck yeah</em></a>"`
    );
  });

  it('regression test for #188, link inside underscore emphasis with underscore', () => {
    renderFn(
      compiler(
        '_This is emphasized text with [a link](https://example.com/asdf_asdf.pdf), and another [link](https://example.com)._'
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<em>This is emphasized text with <a href="https://example.com/asdf_asdf.pdf">a link</a>, and another <a href="https://example.com">link</a>.</em>"`
    );
  });

  it('regression test for #188, link inside underscore bolding with underscore', () => {
    renderFn(
      compiler(
        '__This is emphasized text with [a link](https://example.com/asdf__asdf.pdf), and another [link](https://example.com).__'
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<strong>This is emphasized text with <a href="https://example.com/asdf__asdf.pdf">a link</a>, and another <a href="https://example.com">link</a>.</strong>"`
    );
  });

  it('renders plain links preceded by text', () => {
    renderFn(compiler('Some text http://www.test.com/some-resource/123'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Some text <a href="http://www.test.com/some-resource/123">http://www.test.com/some-resource/123</a></span>"`
    );
  });
});

describe('lists', () => {
  it('should handle a tight list', () => {
    renderFn(compiler(['- xyz', '- abc', '- foo'].join('\n')));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<ul><li>xyz</li><li>abc</li><li>foo</li></ul>"`
    );
  });

  it('should handle a loose list', () => {
    renderFn(compiler(['- xyz', '', '- abc', '', '- foo'].join('\n')));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<ul><li><p>xyz</p>
      </li><li><p>abc</p>
      </li><li><p>foo</p>
      </li></ul>"
    `);
  });

  it('should handle an ordered list', () => {
    renderFn(compiler(['1. xyz', '1. abc', '1. foo'].join('\n')));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<ol start="1"><li>xyz</li><li>abc</li><li>foo</li></ol>"`
    );
  });

  it('should handle an ordered list with a specific start index', () => {
    renderFn(compiler(['2. xyz', '3. abc', '4. foo'].join('\n')));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<ol start="2"><li>xyz</li><li>abc</li><li>foo</li></ol>"`
    );
  });

  it('should handle a nested list', () => {
    renderFn(compiler(['- xyz', '  - abc', '- foo'].join('\n')));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<ul><li>xyz
      <ul><li>abc</li></ul></li><li>foo</li></ul>"
    `);
  });

  it('should handle a mixed nested list', () => {
    renderFn(compiler(['- xyz', '  1. abc', '    - def', '- foo'].join('\n')));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<ul><li>xyz
      <ol start="1"><li>abc
      <ul><li>def</li></ul></li></ol></li><li>foo</li></ul>"
    `);
  });

  it('should not add an extra wrapper around a list', () => {
    const markdown = ['', '- xyz', '  1. abc', '    - def', '- foo', ''].join(
      '\n'
    );
    renderFn(compiler(markdown));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<ul><li>xyz
      <ol start="1"><li>abc
      <ul><li>def</li></ul></li></ol></li><li>foo</li></ul>"
    `);
  });

  it('should handle link trees', () => {
    renderFn(
      compiler(`
- [buttermilk](#buttermilk)
- [installation](#installation)
- [usage](#usage)
    - [configuration](#configuration)
    - [components](#components)
        - [\`<Router>\`](#router)
        - [\`<RoutingState>\`](#routingstate)
        - [\`<Link>\`](#link)
    - [utilities](#utilities)
        - [\`route(url: String, addNewHistoryEntry: Boolean = true)\`](#routeurl-string-addnewhistoryentry-boolean--true)
    - [holistic example](#holistic-example)
- [goals](#goals)
            `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<ul><li><a href="#buttermilk">buttermilk</a></li><li><a href="#installation">installation</a></li><li><a href="#usage">usage</a>
        <ul><li><a href="#configuration">configuration</a></li><li><a href="#components">components</a>
        <ul><li><a href="#router"><code>&lt;Router&gt;</code></a></li><li><a href="#routingstate"><code>&lt;RoutingState&gt;</code></a></li><li><a href="#link"><code>&lt;Link&gt;</code></a></li></ul></li><li><a href="#utilities">utilities</a>
        <ul><li><a href="#routeurl-string-addnewhistoryentry-boolean--true"><code>route(url: String, addNewHistoryEntry: Boolean = true)</code></a></li></ul></li><li><a href="#holistic-example">holistic example</a></li></ul></li><li><a href="#goals">goals</a></li></ul>"
    `);
  });

  it('handles horizontal rules after lists', () => {
    renderFn(
      compiler(`
-   one
-   two

* * *
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div><ul><li>one</li><li>two</li></ul><hr></div>"`
    );
  });

  it('regression #613 - list false detection inside inline syntax', () => {
    renderFn(
      compiler(`
- foo
- bar **+ baz** qux **quux**
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<ul><li>foo</li><li>bar <strong>+ baz</strong> qux <strong>quux</strong></li></ul>"`
    );
  });
});

describe('GFM task lists', () => {
  it('should handle unchecked items', () => {
    renderFn(compiler('- [ ] foo'));

    const checkbox = container.querySelector('ul li input') as HTMLInputElement;

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<ul><li><input readonly="" type="checkbox"> foo</li></ul>"`
    );
    expect(checkbox.checked).toBe(false);
  });

  it('should handle checked items', () => {
    renderFn(compiler('- [x] foo'));

    const checkbox = container.querySelector('ul li input') as HTMLInputElement;

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<ul><li><input readonly="" type="checkbox" checked=""> foo</li></ul>"`
    );
    expect(checkbox.checked).toBe(true);
  });

  it('should mark the checkboxes as readonly', () => {
    renderFn(compiler('- [x] foo'));

    const checkbox = container.querySelector('ul li input') as HTMLInputElement;

    expect(checkbox).not.toBe(null);
    expect(checkbox.readOnly).toBe(true);
  });
});

describe('GFM tables', () => {
  it('should handle a basic table', () => {
    renderFn(
      compiler(`
        |foo|bar|
        ---|---
        1  |2
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    |foo|bar|
          ---|---
          1  |2</code></pre>"
    `);
  });

  it('should handle a table with aligned columns', () => {
    renderFn(
      compiler(`
        |foo|bar|baz|
        --:|:---:|:--
        1|2|3
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    |foo|bar|baz|
          --:|:---:|:--
          1|2|3</code></pre>"
    `);
  });

  it('should handle the other syntax for tables', () => {
    renderFn(
      compiler(`
        | Foo | Bar |
        | --- | --- |
        | 1   | 2   |
        | 3   | 4   |
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    | Foo | Bar |
          | --- | --- |
          | 1   | 2   |
          | 3   | 4   |</code></pre>"
    `);
  });

  it('should handle the other syntax for tables with alignment', () => {
    renderFn(
      compiler(`
        | Foo | Bar | Baz |
        | --: | :-: | :-- |
        | 1   | 2   | 3   |
        | 4   | 5   | 6   |
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    | Foo | Bar | Baz |
          | --: | :-: | :-- |
          | 1   | 2   | 3   |
          | 4   | 5   | 6   |</code></pre>"
    `);
  });

  it('#241 should not ignore the first cell when its contents is empty', () => {
    renderFn(
      compiler(`
        | Foo | Bar | Baz |
        | --- | --- | --- |
        |   | 2   | 3   |
        |   | 5   | 6   |
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    | Foo | Bar | Baz |
          | --- | --- | --- |
          |   | 2   | 3   |
          |   | 5   | 6   |</code></pre>"
    `);
  });

  it('should handle other content after a table', () => {
    renderFn(
      compiler(`
        | Foo | Bar | Baz |
        | --: | :-: | :-- |
        | 1   | 2   | 3   |
        | 4   | 5   | 6   |

        Foo
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    | Foo | Bar | Baz |
          | --: | :-: | :-- |
          | 1   | 2   | 3   |
          | 4   | 5   | 6   |

          Foo</code></pre>"
    `);
  });

  it('should handle escaped pipes inside a table', () => {
    renderFn(
      compiler(`
        | \\|Attribute\\| | \\|Type\\|         |
        | --------------- | ------------------ |
        | pos\\|position  | "left" \\| "right" |
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    | |Attribute| | |Type|         |
          | --------------- | ------------------ |
          | pos|position  | "left" | "right" |</code></pre>"
    `);
  });

  it('should handle pipes in code inside a table', () => {
    renderFn(
      compiler(`
        | Attribute    | Type                  |
        | ------------ | --------------------- |
        | \`position\`   | \`"left" | "right"\`    |
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    | Attribute    | Type                  |
          | ------------ | --------------------- |
          | \`position\`   | \`"left" | "right"\`    |</code></pre>"
    `);
  });

  it('processeses HTML inside of a table row', () => {
    renderFn(
      compiler(`
        | Header                     |
        | -------------------------- |
        | <div>I'm in a "div"!</div> |
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    | Header                     |
          | -------------------------- |
          | &lt;div&gt;I'm in a "div"!&lt;/div&gt; |</code></pre>"
    `);
  });

  it('regression #625 - processes self-closing HTML inside of a table row', () => {
    renderFn(
      compiler(`
        | col1 | col2 | col3 |
        |------|-----------------|------------------|
        | col1 | <custom-element>col2</custom-element><br> col2 | <custom-element>col3</custom-element><br>col3 |
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    | col1 | col2 | col3 |
          |------|-----------------|------------------|
          | col1 | &lt;custom-element&gt;col2&lt;/custom-element&gt;&lt;br&gt; col2 | &lt;custom-element&gt;col3&lt;/custom-element&gt;&lt;br&gt;col3 |</code></pre>"
    `);
  });

  it('processes markdown inside of a table row when a preceeding column contains HTML', () => {
    renderFn(
      compiler(`
        | Column A                   | Column B                 |
        | -------------------------- | ------------------------ |
        | <div>I'm in column A</div> | **Hello from column B!** |
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    | Column A                   | Column B                 |
          | -------------------------- | ------------------------ |
          | &lt;div&gt;I'm in column A&lt;/div&gt; | **Hello from column B!** |</code></pre>"
    `);
  });

  it('processes HTML inside of a table row when a preceeding column contains markdown', () => {
    renderFn(
      compiler(`
        | Markdown         | HTML                          |
        | ---------------- | ----------------------------- |
        | **I'm Markdown** | <strong>And I'm HTML</strong> |
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    | Markdown         | HTML                          |
          | ---------------- | ----------------------------- |
          | **I'm Markdown** | &lt;strong&gt;And I'm HTML&lt;/strong&gt; |</code></pre>"
    `);
  });

  it('processes markdown inside of a table row when a preceeding column contains HTML with nested elements', () => {
    renderFn(
      compiler(`
        | Nested HTML                        | MD                   |
        | ---------------------------------- | -------------------- |
        | <div><strong>Nested</strong></div> | **I should be bold** |
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    | Nested HTML                        | MD                   |
          | ---------------------------------- | -------------------- |
          | &lt;div&gt;&lt;strong&gt;Nested&lt;/strong&gt;&lt;/div&gt; | **I should be bold** |</code></pre>"
    `);
  });

  it('processes a markdown link inside of a table row when a preceeding column contains HTML with nested elements', () => {
    renderFn(
      compiler(`
        | Nested HTML                        | Link                         |
        | ---------------------------------- | ---------------------------- |
        | <div><strong>Nested</strong></div> | [I'm a link](www.google.com) |
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    | Nested HTML                        | Link                         |
          | ---------------------------------- | ---------------------------- |
          | &lt;div&gt;&lt;strong&gt;Nested&lt;/strong&gt;&lt;/div&gt; | [I'm a link](www.google.com) |</code></pre>"
    `);
  });

  it('#568 handle inline syntax around table separators', () => {
    const markdown = ['|_foo|bar_|', '|-|-|', '|1|2|'].join('\n');
    renderFn(compiler(markdown));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<table><thead><tr><th style="text-align: left;">_foo</th><th style="text-align: left;">bar_</th></tr></thead><tbody><tr><td style="text-align: left;">1</td><td style="text-align: left;">2</td></tr></tbody></table>"`
    );
  });

  it('#568 handle inline code syntax around table separators', () => {
    const markdown = ['|`foo|bar`|baz|', '|-|-|', '|1|2|'].join('\n');
    renderFn(compiler(markdown));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<table><thead><tr><th style="text-align: left;"><code>foo|bar</code></th><th style="text-align: left;">baz</th></tr></thead><tbody><tr><td style="text-align: left;">1</td><td style="text-align: left;">2</td></tr></tbody></table>"`
    );
  });

  it('#644 handles nested inlines within table cells', () => {
    renderFn(
      compiler(`
      | Nested HTML                        | Link                         |
      | ---------------------------------- | ---------------------------- |
      | <div><strong>Nested</strong></div> | [I'm a \`link\`](www.google.com) |
    `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">  | Nested HTML                        | Link                         |
        | ---------------------------------- | ---------------------------- |
        | &lt;div&gt;&lt;strong&gt;Nested&lt;/strong&gt;&lt;/div&gt; | [I'm a \`link\`](www.google.com) |</code></pre>"
    `);
  });

  it('#641 handles only a single newline prior to the start of the table', () => {
    renderFn(
      compiler(`
      Test
      | Nested HTML                        | Link                         |
      | ---------------------------------- | ---------------------------- |
      | <div><strong>Nested</strong></div> | [I'm a \`link\`](www.google.com) |
    `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">  Test
        | Nested HTML                        | Link                         |
        | ---------------------------------- | ---------------------------- |
        | &lt;div&gt;&lt;strong&gt;Nested&lt;/strong&gt;&lt;/div&gt; | [I'm a \`link\`](www.google.com) |</code></pre>"
    `);
  });
});

describe('arbitrary HTML', () => {
  it('preserves the HTML given', () => {
    const ast = compiler('<dd class="foo">Hello</dd>');
    expect(ast).toMatchInlineSnapshot(`
      <dd
        className="foo"
      >
        Hello
      </dd>
    `);

    renderFn(ast);
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<dd class="foo">Hello</dd>"`
    );
  });

  it('processes markdown within inline HTML', () => {
    renderFn(compiler('<time>**Hello**</time>'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<time><strong>Hello</strong></time>"`
    );
  });

  it('processes markdown within nested inline HTML', () => {
    renderFn(compiler('<time><span>**Hello**</span></time>'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<time><span><strong>Hello</strong></span></time>"`
    );
  });

  it('processes markdown within nested inline HTML where childen appear more than once', () => {
    renderFn(
      compiler('<dl><dt>foo</dt><dd>bar</dd><dt>baz</dt><dd>qux</dd></dl>')
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<dl><dt>foo</dt><dd>bar</dd><dt>baz</dt><dd>qux</dd></dl>"`
    );
  });

  it('processes attributes within inline HTML', () => {
    renderFn(compiler('<time data-foo="bar">Hello</time>'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<time data-foo="bar">Hello</time>"`
    );
  });

  it('processes attributes that need JSX massaging within inline HTML', () => {
    renderFn(compiler('<span tabindex="0">Hello</span>'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span tabindex="0">Hello</span>"`
    );
  });

  it('processes inline HTML with inline styles', () => {
    renderFn(
      compiler(
        '<span style="color: red; position: top; margin-right: 10px">Hello</span>'
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span style="color: red; position: top; margin-right: 10px;">Hello</span>"`
    );
  });

  it('processes markdown within block-level arbitrary HTML', () => {
    renderFn(compiler('<p>**Hello**</p>'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<p><strong>Hello</strong></p>"`
    );
  });

  it('processes markdown within block-level arbitrary HTML (regression)', () => {
    renderFn(compiler('<div style="float: right">\n# Hello\n</div>'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div style="float: right;"><h1 id="hello">Hello</h1></div>"`
    );
  });

  it('renders inline <code> tags', () => {
    renderFn(compiler('Text and <code>**code**</code>'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Text and <code><strong>code</strong></code></span>"`
    );
  });

  it('handles self-closing html inside parsable html (regression)', () => {
    renderFn(
      compiler(
        '<a href="https://opencollective.com/react-dropzone/sponsor/0/website" target="_blank"><img src="https://opencollective.com/react-dropzone/sponsor/0/avatar.svg"></a>'
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<a href="https://opencollective.com/react-dropzone/sponsor/0/website" target="_blank"><img src="https://opencollective.com/react-dropzone/sponsor/0/avatar.svg"></a>"`
    );
  });

  it('throws out HTML comments', () => {
    renderFn(compiler('Foo\n<!-- blah -->'));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p>Foo
      </p>"
    `);
  });

  it('throws out multiline HTML comments', () => {
    renderFn(
      compiler(`Foo\n<!-- this is
a
multiline
comment -->`)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p>Foo
      </p>"
    `);
  });

  it('block HTML regression test', () => {
    renderFn(
      compiler(`
        <ul id="ProjectSubmenu">
          <li><a href="/projects/markdown/" title="Markdown Project Page">Main</a></li>
          <li><a href="/projects/markdown/basics" title="Markdown Basics">Basics</a></li>
          <li><a class="selected" title="Markdown Syntax Documentation">Syntax</a></li>
          <li><a href="/projects/markdown/license" title="Pricing and License Information">License</a></li>
          <li><a href="/projects/markdown/dingus" title="Online Markdown Web Form">Dingus</a></li>
        </ul>
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    &lt;ul id="ProjectSubmenu"&gt;
            &lt;li&gt;&lt;a href="/projects/markdown/" title="Markdown Project Page"&gt;Main&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href="/projects/markdown/basics" title="Markdown Basics"&gt;Basics&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a class="selected" title="Markdown Syntax Documentation"&gt;Syntax&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href="/projects/markdown/license" title="Pricing and License Information"&gt;License&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href="/projects/markdown/dingus" title="Online Markdown Web Form"&gt;Dingus&lt;/a&gt;&lt;/li&gt;
          &lt;/ul&gt;</code></pre>"
    `);
  });

  it('handles svg', () => {
    renderFn(
      compiler(`
      <svg xmlns="http://www.w3.org/2000/svg">
        <path >
        </path>
      </svg>
    `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">  &lt;svg xmlns="http://www.w3.org/2000/svg"&gt;
          &lt;path &gt;
          &lt;/path&gt;
        &lt;/svg&gt;</code></pre>"
    `);
  });

  it('handles nested HTML blocks of the same type (regression)', () => {
    renderFn(
      compiler(`
        <table>
        <tbody>
            <tr>
            <td>Time</td>
            <td>Payment Criteria</td>
            <td>Payment</td>
            </tr>
            <tr>
            <td>Office Visit </td>
            <td>
                <ul>
                <li>
                    Complete full visit and enroll
                    <ul>
                    <li>Enrolling is fun!</li>
                    </ul>
                </li>
                </ul>
            </td>
            <td>$20</td>
            </tr>
        </tbody>
        </table>
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    &lt;table&gt;
          &lt;tbody&gt;
              &lt;tr&gt;
              &lt;td&gt;Time&lt;/td&gt;
              &lt;td&gt;Payment Criteria&lt;/td&gt;
              &lt;td&gt;Payment&lt;/td&gt;
              &lt;/tr&gt;
              &lt;tr&gt;
              &lt;td&gt;Office Visit &lt;/td&gt;
              &lt;td&gt;
                  &lt;ul&gt;
                  &lt;li&gt;
                      Complete full visit and enroll
                      &lt;ul&gt;
                      &lt;li&gt;Enrolling is fun!&lt;/li&gt;
                      &lt;/ul&gt;
                  &lt;/li&gt;
                  &lt;/ul&gt;
              &lt;/td&gt;
              &lt;td&gt;$20&lt;/td&gt;
              &lt;/tr&gt;
          &lt;/tbody&gt;
          &lt;/table&gt;</code></pre>"
    `);
  });

  it('regression test for #136', () => {
    renderFn(
      compiler(`
        $25
        <br>
        <br>
        <br>$50
        <br>
        <br>
        <br>$50
        <br>
        <br>
        <br>$50
        <br>
        <br>
        <br>
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    $25
          &lt;br&gt;
          &lt;br&gt;
          &lt;br&gt;$50
          &lt;br&gt;
          &lt;br&gt;
          &lt;br&gt;$50
          &lt;br&gt;
          &lt;br&gt;
          &lt;br&gt;$50
          &lt;br&gt;
          &lt;br&gt;
          &lt;br&gt;</code></pre>"
    `);
  });

  it('regression test for #170', () => {
    renderFn(
      compiler(`
        <table>
          <tbody>
            <tr>
              <td>a</td>
              <td>b</td>
              <td>c</td>
            </tr>
            <tr>
              <td>left</td>
              <td>
                <p>Start of table</p>
                <ul>
                  <li>List 1</li>
                  <li>
                    <ul>
                      <li>Nested List 1</li>
                    </ul>
                  </li>
                  <li>
                    <ul>
                      <li>list 2</li>
                    </ul>
                  </li>
                </ul>
              </td>
              <td>right</td>
            </tr>
          </tbody>
        </table>
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    &lt;table&gt;
            &lt;tbody&gt;
              &lt;tr&gt;
                &lt;td&gt;a&lt;/td&gt;
                &lt;td&gt;b&lt;/td&gt;
                &lt;td&gt;c&lt;/td&gt;
              &lt;/tr&gt;
              &lt;tr&gt;
                &lt;td&gt;left&lt;/td&gt;
                &lt;td&gt;
                  &lt;p&gt;Start of table&lt;/p&gt;
                  &lt;ul&gt;
                    &lt;li&gt;List 1&lt;/li&gt;
                    &lt;li&gt;
                      &lt;ul&gt;
                        &lt;li&gt;Nested List 1&lt;/li&gt;
                      &lt;/ul&gt;
                    &lt;/li&gt;
                    &lt;li&gt;
                      &lt;ul&gt;
                        &lt;li&gt;list 2&lt;/li&gt;
                      &lt;/ul&gt;
                    &lt;/li&gt;
                  &lt;/ul&gt;
                &lt;/td&gt;
                &lt;td&gt;right&lt;/td&gt;
              &lt;/tr&gt;
            &lt;/tbody&gt;
          &lt;/table&gt;</code></pre>"
    `);
  });

  it('#140 self-closing HTML with indentation', () => {
    function DatePicker() {
      return <div className="datepicker" />;
    }

    renderFn(
      compiler(
        `
          <DatePicker
            biasTowardDateTime="2017-12-05T07:39:36.091Z"
            timezone="UTC+5"
          />
        `,
        { overrides: { DatePicker } }
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">      &lt;DatePicker
              biasTowardDateTime="2017-12-05T07:39:36.091Z"
              timezone="UTC+5"
            /&gt;</code></pre>"
    `);
  });

  it('handles jsx attribute interpolation as a string', () => {
    const DatePicker = ({
      endTime,
      startTime,
    }: {
      endTime: string;
      startTime: string;
    }) => {
      return (
        <div>
          {startTime}
          to; endTime;
        </div>
      );
    };

    renderFn(
      compiler(
        `
          <DatePicker
            startTime={1514579720511}
            endTime={"1514579720512"}
          />
        `,
        { overrides: { DatePicker } }
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">      &lt;DatePicker
              startTime={1514579720511}
              endTime={"1514579720512"}
            /&gt;</code></pre>"
    `);
  });

  it('handles jsx inside jsx interpolations', () => {
    function InterpolationTest({
      component,
      component2,
      component3,
      component4,
    }: {
      component: ReactNode;
      component2: ReactNode;
      component3: ReactNode;
      component4: ReactNode;
    }) {
      return (
        <div>
          {component}
          and; component2; and; component3; and; component4;
        </div>
      );
    }

    function Inner({
      children,
      ...props
    }: {
      children: ReactNode;
      [key: string]: any;
    }) {
      return (
        <div {...props} className="inner">
          {children}
        </div>
      );
    }

    renderFn(
      compiler(
        `
          <InterpolationTest
            component={<Inner children="bah" />}
            component2={<Inner>blah</Inner>}
            component3={<Inner disabled />}
            component4={<Inner disabled={false} />}
          />
        `,
        { overrides: { Inner, InterpolationTest } }
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">      &lt;InterpolationTest
              component={&lt;Inner children="bah" /&gt;}
              component2={&lt;Inner&gt;blah&lt;/Inner&gt;}
              component3={&lt;Inner disabled /&gt;}
              component4={&lt;Inner disabled={false} /&gt;}
            /&gt;</code></pre>"
    `);
  });

  it('handles malformed HTML', () => {
    renderFn(
      compiler(
        `
          <g>
          <g>
          <path fill="#ffffff"/>
          </g>
          <path fill="#ffffff"/>
        `
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">      &lt;g&gt;
            &lt;g&gt;
            &lt;path fill="#ffffff"/&gt;
            &lt;/g&gt;
            &lt;path fill="#ffffff"/&gt;</code></pre>"
    `);
  });

  it('allows whitespace between attribute and value', () => {
    renderFn(
      compiler(
        `
          <div class = "foo" style= "background:red;" id ="baz">
          Bar
          </div>
        `
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">      &lt;div class = "foo" style= "background:red;" id ="baz"&gt;
            Bar
            &lt;/div&gt;</code></pre>"
    `);
  });

  it('handles a raw hashtag inside HTML', () => {
    renderFn(compiler(['"<span>#</span>"'].join('\n')));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>"<span>#</span>"</span>"`
    );
  });

  it('handles a heading inside HTML', () => {
    renderFn(compiler('"<span># foo</span>"'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>"<span><h1 id="foo">foo</h1></span>"</span>"`
    );
  });

  it('does not parse the inside of <style> blocks', () => {
    renderFn(
      compiler(
        `
          <style>
            .bar {
              color: red;
            }
          </style>
        `
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">      &lt;style&gt;
              .bar {
                color: red;
              }
            &lt;/style&gt;</code></pre>"
    `);
  });

  it('does not parse the inside of <script> blocks', () => {
    renderFn(
      compiler(`
        <script>
          new Date();
        </script>
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    &lt;script&gt;
            new Date();
          &lt;/script&gt;</code></pre>"
    `);
  });

  it('does not parse the inside of <script> blocks with weird capitalization', () => {
    renderFn(compiler(['<SCRIPT>', '  new Date();', '</SCRIPT>'].join('\n')));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<script>new Date();
      </script>"
    `);
  });

  it('handles nested tags of the same type with attributes', () => {
    renderFn(
      compiler(`
        <div id="foo">
          <div id="bar">Baz</div>
        </div>
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    &lt;div id="foo"&gt;
            &lt;div id="bar"&gt;Baz&lt;/div&gt;
          &lt;/div&gt;</code></pre>"
    `);
  });

  it('#180 handles invalid character error with angle brackets', () => {
    renderFn(compiler('1<2 or 2>1'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>1&lt;2 or 2&gt;1</span>"`
    );
  });

  it('#181 handling of figure blocks', () => {
    renderFn(
      compiler(
        `
          <figure>
          ![](//placehold.it/300x200)
          <figcaption>This is a placeholder image</figcaption>
          </figure>
        `
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">      &lt;figure&gt;
            ![](//placehold.it/300x200)
            &lt;figcaption&gt;This is a placeholder image&lt;/figcaption&gt;
            &lt;/figure&gt;</code></pre>"
    `);
  });

  it('#185 handles block syntax MD + HTML inside HTML', () => {
    renderFn(
      compiler(`
        <details>
        <summary>Solution</summary>

        \`\`\`jsx
        import styled from 'styled-components';
        \`\`\`
        </details>
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    &lt;details&gt;
          &lt;summary&gt;Solution&lt;/summary&gt;

          \`\`\`jsx
          import styled from 'styled-components';
          \`\`\`
          &lt;/details&gt;</code></pre>"
    `);
  });

  it('#207 handles tables inside HTML', () => {
    renderFn(
      compiler(`
        <details>
        <summary>Click here</summary>

        | Heading 1 | Heading 2 |
        | --------- | --------- |
        | Foo       | Bar       |

        </details>
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    &lt;details&gt;
          &lt;summary&gt;Click here&lt;/summary&gt;

          | Heading 1 | Heading 2 |
          | --------- | --------- |
          | Foo       | Bar       |

          &lt;/details&gt;</code></pre>"
    `);
  });

  it('#185 misc regression test', () => {
    renderFn(
      compiler(`
        <details>
        <summary>View collapsed content</summary>

        # Title h1

        ## Title h2

        Text content

        * list 1
        * list 2
        * list 3


        </details>
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    &lt;details&gt;
          &lt;summary&gt;View collapsed content&lt;/summary&gt;

          # Title h1

          ## Title h2

          Text content

          * list 1
          * list 2
          * list 3


          &lt;/details&gt;</code></pre>"
    `);
  });

  it('multiline left-trims by the same amount as the first line', () => {
    renderFn(
      compiler(`
        <div>
        \`\`\`kotlin
        fun main() {
            print("Hello world")
        }
        \`\`\`
        </div>
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    &lt;div&gt;
          \`\`\`kotlin
          fun main() {
              print("Hello world")
          }
          \`\`\`
          &lt;/div&gt;</code></pre>"
    `);
  });

  it('nested lists work inside html', () => {
    renderFn(
      compiler(`
        <div>
        * hi
        * hello
            * how are you?
        </div>
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    &lt;div&gt;
          * hi
          * hello
              * how are you?
          &lt;/div&gt;</code></pre>"
    `);
  });

  it('#214 nested paragraphs work inside html', () => {
    renderFn(
      compiler(`
        <div>
          Hello

          World
        </div>
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    &lt;div&gt;
            Hello

            World
          &lt;/div&gt;</code></pre>"
    `);
  });

  it('does not consume trailing whitespace if there is no newline', () => {
    const Foo = () => <span>Hello </span>;

    renderFn(compiler('<Foo/> World!', { overrides: { Foo } }));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span><span>Hello </span> World!</span>"`
    );
  });

  it('should not fail with lots of \\n in the middle of the text', () => {
    renderFn(
      compiler(
        'Text\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\ntext',
        {
          forceBlock: true,
        }
      )
    );
    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<div><p>Text</p>
      <p>text</p></div>"
    `);
  });

  it('should not render html if disableParsingRawHTML is true', () => {
    renderFn(
      compiler('Text with <span>html</span> inside', {
        disableParsingRawHTML: true,
      })
    );
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Text with &lt;span&gt;html&lt;/span&gt; inside</span>"`
    );
  });

  it('should render html if disableParsingRawHTML is false', () => {
    renderFn(
      compiler('Text with <span>html</span> inside', {
        disableParsingRawHTML: false,
      })
    );
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Text with <span>html</span> inside</span>"`
    );
  });

  it('#465 misc regression test', () => {
    renderFn(compiler('hello [h]:m **world**'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>hello [h]:m <strong>world</strong></span>"`
    );
  });

  it('#455 fenced code block regression test', () => {
    renderFn(
      compiler(`Hello world example

\`\`\`python data-start="2"
print("hello world")
\`\`\``)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<div><p>Hello world example</p>
      <pre><code data-start="2" class="lang-python" lang="python">print("hello world")
      </code></pre></div>"
    `);
  });

  it('#444 switching list formats regression test', () => {
    renderFn(
      compiler(
        `
1.  One
2.  Two
3.  Three

*   Red
*   Green
*   Blue
        `
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div><ol start="1"><li>One</li><li>Two</li><li>Three</li></ol><ul><li>Red</li><li>Green</li><li>Blue</li></ul></div>"`
    );
  });

  it('#466 list-like syntax inside link regression test', () => {
    renderFn(
      compiler(
        'Hello, I think that [6. Markdown](http://daringfireball.net/projects/markdown/) lets you write content in a really natural way.'
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Hello, I think that <a href="http://daringfireball.net/projects/markdown/">6. Markdown</a> lets you write content in a really natural way.</span>"`
    );
  });

  it('#540 multiline attributes are supported', () => {
    renderFn(
      compiler(
        `<p>
Item detail
<span
  style="
    color: #fddb67;
    font-size: 11px;
    font-style: normal;
    font-weight: 500;
    line-height: 18px;
    text-decoration-line: underline;
  "
  >debug item 1</span
>
</p>`
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p>Item detail
      <span style="color: rgb(253, 219, 103); font-size: 11px; font-style: normal; font-weight: 500; line-height: 18px; text-decoration-line: underline;"></span>debug item 1&lt;/span
      &gt;
      </p>"
    `);
  });

  it('#546 perf regression test, self-closing block + block HTML causes exponential degradation', () => {
    renderFn(
      compiler(
        `<span class="oh" data-self-closing="yes" />

You can have anything here. But it's best if the self-closing tag also appears in the document as a pair tag multiple times. We have found it when compiling a table with spans that had a self-closing span at the top.

<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>
<span class="oh">no</span>

Each span you copy above increases the time it takes by 2. Also, writing text here increases the time.`.trim()
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<div><span class="oh" data-self-closing="yes"></span><p>You can have anything here. But it's best if the self-closing tag also appears in the document as a pair tag multiple times. We have found it when compiling a table with spans that had a self-closing span at the top.</p>
      <span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><span class="oh">no</span><p>Each span you copy above increases the time it takes by 2. Also, writing text here increases the time.</p></div>"
    `);
  });

  it.skip('#686 should not add unnecessary paragraphs', () => {
    const markdown = ['<tag1><tag2>text1</tag2>text2</tag1>'].join('\n');
    renderFn(compiler(markdown));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<tag1><tag2>text1</tag2>text2</tag1>"`
    );
  });

  it('should not process pre blocks inside of arbitrary HTML', () => {
    const markdown = [
      '<table><tr><td>',
      '<pre>',
      '**Hello**,',
      '',
      '_world_.',
      '</pre>',
      '</td></tr></table>',
    ].join('\n');
    renderFn(compiler(markdown));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<table><tr><td><pre>**Hello**,

      _world_.
      </pre></td></tr></table>"
    `);
  });
});

describe('horizontal rules', () => {
  it('should handle the various syntaxes', () => {
    renderFn(
      compiler(`
        * * *

        ***

        *****

        - - -

        ---------------------------------------
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    * * *

          ***

          *****

          - - -

          ---------------------------------------</code></pre>"
    `);
  });
});

describe('line breaks', () => {
  it('should be added for 2-space sequences', () => {
    renderFn(compiler(['hello  ', 'there'].join('\n')));

    const lineBreak = container.querySelector('br');

    expect(lineBreak).not.toBe(null);
  });
});

describe('fenced code blocks', () => {
  it('should be handled', () => {
    renderFn(compiler(['```js', 'foo', '```'].join('\n')));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-js" lang="js">foo
      </code></pre>"
    `);
  });

  it('should not strip HTML comments inside fenced blocks', () => {
    renderFn(
      compiler(
        `
\`\`\`html
<!-- something -->
Yeah boi
\`\`\`
`.trim()
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-html" lang="html">&lt;!-- something --&gt;
      Yeah boi
      </code></pre>"
    `);
  });

  it('regression 602 - should treat anything following ``` as code until the closing pair', () => {
    renderFn(compiler('```\nfoo'));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">foo

      </code></pre>"
    `);
  });

  it('regression 670 - fenced code block intentional escape', () => {
    renderFn(compiler('```\n\\%\n```'));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">\\%
      </code></pre>"
    `);
  });
});

describe('indented code blocks', () => {
  it('should be handled', () => {
    renderFn(compiler('    foo\n\n'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<pre><code class="lang-plaintext">foo</code></pre>"`
    );
  });
});

describe('inline code blocks', () => {
  it('should be handled', () => {
    renderFn(compiler('`foo`'));

    expect(container.innerHTML).toMatchInlineSnapshot(`"<code>foo</code>"`);
  });

  it('naked backticks can be used unescaped if there are two or more outer backticks', () => {
    renderFn(compiler('``hi `foo` there``'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<code>hi \`foo\` there</code>"`
    );
  });
});

describe('footnotes', () => {
  it('should handle conversion of references into links', () => {
    renderFn(
      compiler(`
        foo[^abc] bar

        [^abc]: Baz baz
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    foo[^abc] bar

          [^abc]: Baz baz</code></pre>"
    `);
  });

  it('should handle complex references', () => {
    renderFn(
      compiler(`
        foo[^referencé heré 123] bar

        [^referencé heré 123]: Baz baz
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    foo[^referencé heré 123] bar

          [^referencé heré 123]: Baz baz</code></pre>"
    `);
  });

  it('should handle conversion of multiple references into links', () => {
    renderFn(
      compiler(`
        foo[^abc] bar. baz[^def]

        [^abc]: Baz baz
        [^def]: Def
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    foo[^abc] bar. baz[^def]

          [^abc]: Baz baz
          [^def]: Def</code></pre>"
    `);
  });

  it('should inject the definitions in a footer at the end of the root', () => {
    renderFn(
      compiler(`
        foo[^abc] bar

        [^abc]: Baz baz
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    foo[^abc] bar

          [^abc]: Baz baz</code></pre>"
    `);
  });

  it('should handle single word footnote definitions', () => {
    renderFn(
      compiler(`
        foo[^abc] bar

        [^abc]: Baz
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    foo[^abc] bar

          [^abc]: Baz</code></pre>"
    `);
  });

  it('should not blow up if footnote syntax is seen but no matching footnote was found', () => {
    expect(() => renderFn(compiler('[one] [two]'))).not.toThrow();
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>[one] [two]</span>"`
    );
  });

  it('should handle multiline footnotes', () => {
    renderFn(
      compiler(`
        foo[^abc] bar

        [^abc]: Baz
          line2
          line3

        After footnotes content
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    foo[^abc] bar

          [^abc]: Baz
            line2
            line3

          After footnotes content</code></pre>"
    `);
  });

  it('should handle mixed multiline and singleline footnotes', () => {
    renderFn(
      compiler(`
        a[^a] b[^b] c[^c]

        [^a]: single
        [^b]: bbbb
          bbbb
          bbbb
        [^c]: single-c
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    a[^a] b[^b] c[^c]

          [^a]: single
          [^b]: bbbb
            bbbb
            bbbb
          [^c]: single-c</code></pre>"
    `);
  });

  it('should handle indented multiline footnote', () => {
    renderFn(
      compiler(`
        Here's a simple footnote,[^1] and here's a longer one.[^bignote]

        [^1]: This is the first footnote.

        [^bignote]: Here's one with multiple paragraphs and code.

            Indent paragraphs to include them in the footnote.

            \`{ my code }\`

            Add as many paragraphs as you like.
      `)
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre><code class="lang-plaintext">    Here's a simple footnote,[^1] and here's a longer one.[^bignote]

          [^1]: This is the first footnote.

          [^bignote]: Here's one with multiple paragraphs and code.

              Indent paragraphs to include them in the footnote.

              \`{ my code }\`

              Add as many paragraphs as you like.</code></pre>"
    `);
  });
});

describe('options.namedCodesToUnicode', () => {
  // &amp; &gt; &lt; are already replaced by default
  const content =
    '&AElig;,&Aacute;,&Acirc;,&Agrave;,&Aring;,&Atilde;,&Auml;,&Ccedil;,&Eacute;,&Ecirc;,&Egrave;,&Euml;,&Iacute;,&Icirc;,&Igrave;,&Iuml;,&Ntilde;,&Oacute;,&Ocirc;,&Ograve;,&Oslash;,&Otilde;,&Ouml;,&Uacute;,&Ucirc;,&Ugrave;,&Uuml;,&Yacute;,&aacute;,&acirc;,&aelig;,&agrave;,&aring;,&atilde;,&auml;,&ccedil;,&coy;,&eacute;,&ecirc;,&egrave;,&euml;,&ge;,&iacute;,&icirc;,&igrave;,&iuml;,&laquo;,&le;,&nbsp;,&ntilde;,&oacute;,&ocirc;,&ograve;,&oslash;,&otilde;,&ouml;,&para;,&quot;,&raquo;,&szlig;,&uacute;,&ucirc;,&ugrave;,&uuml;,&yacute;';

  const namedCodesToUnicode = {
    AElig: 'Æ',
    Aacute: 'Á',
    Acirc: 'Â',
    Agrave: 'À',
    Aring: 'Å',
    Atilde: 'Ã',
    Auml: 'Ä',
    Ccedil: 'Ç',
    Eacute: 'É',
    Ecirc: 'Ê',
    Egrave: 'È',
    Euml: 'Ë',
    Iacute: 'Í',
    Icirc: 'Î',
    Igrave: 'Ì',
    Iuml: 'Ï',
    Ntilde: 'Ñ',
    Oacute: 'Ó',
    Ocirc: 'Ô',
    Ograve: 'Ò',
    Oslash: 'Ø',
    Otilde: 'Õ',
    Ouml: 'Ö',
    Uacute: 'Ú',
    Ucirc: 'Û',
    Ugrave: 'Ù',
    Uuml: 'Ü',
    Yacute: 'Ý',
    aacute: 'á',
    acirc: 'â',
    aelig: 'æ',
    agrave: 'à',
    aring: 'å',
    atilde: 'ã',
    auml: 'ä',
    ccedil: 'ç',
    coy: '©',
    eacute: 'é',
    ecirc: 'ê',
    egrave: 'è',
    euml: 'ë',
    ge: '\u2265',
    iacute: 'í',
    icirc: 'î',
    igrave: 'ì',
    iuml: 'ï',
    laquo: '«',
    le: '\u2264',
    nbsp: ' ',
    ntilde: 'ñ',
    oacute: 'ó',
    ocirc: 'ô',
    ograve: 'ò',
    oslash: 'ø',
    otilde: 'õ',
    ouml: 'ö',
    para: '§',
    quot: '"',
    raquo: '»',
    szlig: 'ß',
    uacute: 'ú',
    ucirc: 'û',
    ugrave: 'ù',
    uuml: 'ü',
    yacute: 'ý',
  };

  it('should replace special HTML characters', () => {
    renderFn(compiler(content, { namedCodesToUnicode }));
    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Æ,Á,Â,À,Å,Ã,Ä,Ç,É,Ê,È,Ë,Í,Î,Ì,Ï,Ñ,Ó,Ô,Ò,Ø,Õ,Ö,Ú,Û,Ù,Ü,Ý,á,â,æ,à,å,ã,ä,ç,©,é,ê,è,ë,≥,í,î,ì,ï,«,≤, ,ñ,ó,ô,ò,ø,õ,ö,§,",»,ß,ú,û,ù,ü,ý</span>"`
    );
  });
});

describe('options.forceBlock', () => {
  it('treats given markdown as block-context', () => {
    renderFn(
      compiler("Hello. _Beautiful_ day isn't it?", {
        forceBlock: true,
      })
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<p>Hello. <em>Beautiful</em> day isn't it?</p>"`
    );
  });
});

describe('options.forceInline', () => {
  it('treats given markdown as inline-context, passing through any block-level markdown syntax', () => {
    renderFn(compiler('# You got it babe!', { forceInline: true }));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span># You got it babe!</span>"`
    );
  });
});

describe('options.wrapper', () => {
  it('is ignored when there is a single child', () => {
    renderFn(compiler('Hello, world!', { wrapper: 'article' }));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Hello, world!</span>"`
    );
  });

  it('overrides the wrapper element when there are multiple children', () => {
    renderFn(compiler('Hello\n\nworld!', { wrapper: 'article' }));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<article><p>Hello</p>
      <p>world!</p></article>"
    `);
  });

  it('renders an array when `null`', () => {
    expect(
      compiler('Hello\n\nworld!', { wrapper: null })
    ).toMatchInlineSnapshot(`
      [
        <p>
          Hello
        </p>,
        "
      ",
        <p>
          world!
        </p>,
      ]
    `);
  });

  it('works with `Fragment`', () => {
    renderFn(compiler('Hello\n\nworld!', { wrapper: Fragment }));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p>Hello</p>
      <p>world!</p>"
    `);
  });
});

describe('options.forceWrapper', () => {
  it('ensures wrapper element is present even with a single child', () => {
    renderFn(compiler('Hi Evan', { wrapper: 'aside', forceWrapper: true }));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<aside>Hi Evan</aside>"`
    );
  });
});

describe('options.createElement', () => {
  it('should render a <custom> element if render function overrides the element type', () => {
    renderFn(
      compiler('Hello', {
        createElement(tag, props, children) {
          return createElement('custom', props, children);
        },
      })
    );

    // The tag name is always in the upper-case form.
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName
    expect(container.children[0].tagName).toBe('CUSTOM');
  });

  it('should render an empty <div> element', () => {
    renderFn(
      compiler('Hello', {
        createElement(tag, props, ...children) {
          return createElement(tag, props, ...children);
        },
      })
    );

    expect(container.children[0].innerHTML).toBe('Hello');
    expect(container.children[0].children.length).toBe(0);
  });
});

describe('options.renderRule', () => {
  it('should allow arbitrary modification of content', () => {
    renderFn(
      compiler('Hello.\n\n```latex\n$$f(X,n) = X_n + X_{n-1}$$\n```\n', {
        renderRule(next, node, renderChildren, state) {
          if (node.type === RuleType.codeBlock && node.lang === 'latex') {
            return <div key={state.key}>I 'm latex.</div>;
          }

          return next();
        },
      })
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<div><p>Hello.</p>
      <div>I 'm latex.</div></div>"
    `);
  });

  it('can be used to handle shortcodes', () => {
    const shortcodeMap = {
      'big-smile': '🙂',
    };

    const detector = /(:[^:]+:)/g;

    const replaceEmoji = (text: string): ReactNode => {
      return text.split(detector).map((part, index) => {
        if (part.startsWith(':') && part.endsWith(':')) {
          const shortcode = part.slice(1, -1);

          return (
            <span key={index}>
              {shortcodeMap[shortcode as keyof typeof shortcodeMap] ?? part}
            </span>
          );
        }

        return part;
      });
    };

    renderFn(
      compiler('Hey there! :big-smile:', {
        renderRule(next, node) {
          if (node.type === RuleType.text && detector.test(node.text)) {
            return replaceEmoji(node.text);
          }

          return next();
        },
      })
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>Hey there! <span>🙂</span></span>"`
    );
  });
});

describe('options.slugify', () => {
  it('should use a custom slugify function rather than the default if set and valid', () => {
    renderFn(compiler('# 中文', { slugify: (str) => str }));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<h1 id="中文">中文</h1>"`
    );
  });

  it('should use the default function if unset', () => {
    renderFn(compiler('# 中文'));

    expect(container.innerHTML).toMatchInlineSnapshot(`"<h1 id="">中文</h1>"`);
  });

  it('should throw error if invalid', () => {
    expect(() => {
      // @ts-ignore
      renderFn(compiler('# 中文', { slugify: 'invalid' }));
    }).toThrow();
  });
});

describe('overrides', () => {
  it('should substitute the appropriate JSX tag if given a component', () => {
    class FakeParagraph extends Component<PropsWithChildren<{}>> {
      render() {
        return <p className="foo">{this.props.children}</p>;
      }
    }

    renderFn(
      compiler('Hello.\n\n', {
        overrides: { p: { component: FakeParagraph } },
      })
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p class="foo">Hello.</p>"
    `);
  });

  it('should substitute custom components when found', () => {
    const CustomButton: FC<JSX.IntrinsicElements['button']> = (props) => (
      <button {...props} />
    );

    renderFn(
      compiler('<CustomButton>Click me!</CustomButton>', {
        overrides: { CustomButton },
      })
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span><button></button>Click me!&lt;/CustomButton&gt;</span>"`
    );
  });

  it('should allow for particular html tags to be voided by configuration', () => {
    renderFn(
      compiler(
        '<iframe src="https://my-malicious-web-page.ngrok-free.app/"></iframe>',
        {
          overrides: {
            iframe: () => null,
          },
        }
      )
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`""`);
  });

  it('should accept an override shorthand if props do not need to be overidden', () => {
    class FakeParagraph extends Component<PropsWithChildren<{}>> {
      render() {
        return <p className="foo">{this.props.children}</p>;
      }
    }

    renderFn(compiler('Hello.\n\n', { overrides: { p: FakeParagraph } }));

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p class="foo">Hello.</p>"
    `);
  });

  it('should add props to the appropriate JSX tag if supplied', () => {
    renderFn(
      compiler('Hello.\n\n', {
        overrides: { p: { props: { className: 'abc', title: 'foo' } } },
      })
    );

    expect(container.children[0].className).toBe('abc');
    expect(container.children[0].textContent).toBe('Hello.');
    expect((container.children[0] as HTMLAnchorElement).title).toBe('foo');
  });

  it('should override the title property when parsing a link', () => {
    class FakeLink extends Component<PropsWithChildren<{ title: string }>> {
      render() {
        const { title, children } = this.props;
        return <a title={title}>{children}</a>;
      }
    }

    renderFn(
      compiler('[link](https://example.org)', {
        overrides: { a: { component: FakeLink, props: { title: 'foo' } } },
      })
    );

    expect((container.children[0] as HTMLAnchorElement).title).toBe('foo');
  });

  it('should add props to pre & code tags if supplied', () => {
    renderFn(
      compiler(['```', 'foo', '```'].join('\n'), {
        overrides: {
          code: {
            props: {
              'data-foo': 'bar',
            },
          },

          pre: {
            props: {
              className: 'abc',
            },
          },
        },
      })
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre class="abc"><code class="lang-plaintext" data-foo="bar">foo
      </code></pre>"
    `);
  });

  it('should substitute pre & code tags if supplied with an override component', () => {
    class OverridenPre extends Component<PropsWithChildren<{}>> {
      render() {
        const { children, ...props } = this.props;

        return (
          <pre {...props} data-bar="baz">
            {children}
          </pre>
        );
      }
    }

    class OverridenCode extends Component<PropsWithChildren<{}>> {
      render() {
        const { children, ...props } = this.props;

        return (
          <code {...props} data-baz="fizz">
            {children}
          </code>
        );
      }
    }

    renderFn(
      compiler(['```', 'foo', '```'].join('\n'), {
        overrides: {
          code: {
            component: OverridenCode,
            props: {
              'data-foo': 'bar',
            },
          },

          pre: {
            component: OverridenPre,
            props: {
              className: 'abc',
            },
          },
        },
      })
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<pre class="abc" data-bar="baz"><code class="lang-plaintext" data-foo="bar" data-baz="fizz">foo
      </code></pre>"
    `);
  });

  it('should be able to override gfm task list items', () => {
    renderFn(
      compiler('- [ ] foo', {
        overrides: { li: { props: { className: 'foo' } } },
      })
    );
    const $element = container.querySelector('li')!;

    expect($element.outerHTML).toMatchInlineSnapshot(
      `"<li class="foo"><input readonly="" type="checkbox"> foo</li>"`
    );
  });

  it('should be able to override gfm task list item checkboxes', () => {
    renderFn(
      compiler('- [ ] foo', {
        overrides: { input: { props: { className: 'foo' } } },
      })
    );
    const $element = container.querySelector('input')!;

    expect($element.outerHTML).toMatchInlineSnapshot(
      `"<input readonly="" class="foo" type="checkbox">"`
    );
  });

  it('should substitute the appropriate JSX tag if given a component and disableParsingRawHTML is true', () => {
    const FakeParagraph = ({ children }: PropsWithChildren) => (
      <p className="foo">{children}</p>
    );

    renderFn(
      compiler('Hello.\n\n', {
        disableParsingRawHTML: true,
        overrides: { p: { component: FakeParagraph } },
      })
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<p class="foo">Hello.</p>"
    `);
  });

  it('should not substitute the appropriate JSX tag inline if given a component and disableParsingRawHTML is true', () => {
    const FakeSpan = ({ children }: { children: ReactNode }) => (
      <span className="foo">{children}</span>
    );

    renderFn(
      compiler('Hello.\n\n<FakeSpan>I am a fake span</FakeSpan>', {
        disableParsingRawHTML: true,
        overrides: { FakeSpan },
      })
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`
      "<div><p>Hello.</p>
      <span class="foo">I am a fake span</span></div>"
    `);
  });

  it('#530 nested overrides', () => {
    renderFn(
      compiler('<Accordion><AccordionItem>test</AccordionItem></Accordion>', {
        overrides: {
          Accordion: ({ children }: PropsWithChildren) => children,
          AccordionItem: ({ children }: PropsWithChildren) => children,
        },
      })
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<span>test&lt;/AccordionItem&gt;&lt;/Accordion&gt;</span>"`
    );
  });

  it('#520 handle deep nesting', () => {
    renderFn(compiler('<div><div><div></div></div></div>'));

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div><div><div></div></div></div>"`
    );
  });
});

it('should remove YAML front matter', () => {
  renderFn(
    compiler(`
      ---
      key: value
      other_key: different value
      ---
      Hello.
    `)
  );

  expect(container.innerHTML).toMatchInlineSnapshot(`
    "<pre><code class="lang-plaintext">  ---
      key: value
      other_key: different value
      ---
      Hello.</code></pre>"
  `);
});

it('handles a holistic example', () => {
  const md = readFileSync(`${__dirname}/_fixture.md`, 'utf8');
  renderFn(compiler(md));

  expect(container.innerHTML).toMatchSnapshot();
});

it('handles <code> brackets in link text', () => {
  renderFn(compiler('[`[text]`](https://example.com)'));

  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<a href="https://example.com"><code>[text]</code></a>"`
  );
});

it('handles naked brackets in link text', () => {
  renderFn(compiler('[[text]](https://example.com)'));

  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<a href="https://example.com">[text]</a>"`
  );
});

it('handles multiple nested brackets in link text', () => {
  renderFn(compiler('[title[bracket1][bracket2][3]](https://example.com)'));

  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<a href="https://example.com">title[bracket1][bracket2][3]</a>"`
  );
});

it('#597 handles script tag with empty content', () => {
  renderFn(compiler('<script src="dummy.js"></script>'));

  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<script src="dummy.js"></script>"`
  );
});

it('should handle bold text within mixed content', () => {
  renderFn(compiler('here a test **my strong content** and the rest'));

  expect(container.innerHTML).toMatchInlineSnapshot(
    `"<span>here a test <strong>my strong content</strong> and the rest</span>"`
  );
});
