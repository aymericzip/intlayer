import { describe, expect, test } from 'vitest';
import { compiler, sanitizer, slugify } from './processer';

describe('processer', () => {
  describe('compiler', () => {
    test('compiles basic markdown text', () => {
      const markdown = 'Hello **world**!';
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('span'); // Inline content returns span
    });

    test('compiles headings', () => {
      const markdown = '# Heading 1\n## Heading 2';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles lists', () => {
      const markdown = '- Item 1\n- Item 2\n- Item 3';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles ordered lists', () => {
      const markdown = '1. First item\n2. Second item\n3. Third item';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles links', () => {
      const markdown = '[Google](https://google.com)';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles images', () => {
      const markdown = '![Alt text](https://example.com/image.jpg)';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles code blocks', () => {
      const markdown = '```javascript\nconst hello = "world";\n```';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles inline code', () => {
      const markdown = 'Use `console.log()` to debug';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles blockquotes', () => {
      const markdown = '> This is a blockquote';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles tables', () => {
      const markdown = `| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles bold and italic text', () => {
      const markdown = '**Bold text** and *italic text*';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles strikethrough text', () => {
      const markdown = '~~Strikethrough text~~';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles marked text', () => {
      const markdown = '==Marked text==';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles horizontal rules', () => {
      const markdown = '---';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles line breaks', () => {
      const markdown = 'Line 1  \nLine 2';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles task lists', () => {
      const markdown = '- [x] Completed task\n- [ ] Incomplete task';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles footnotes', () => {
      const markdown =
        'This is a sentence with a footnote[^1].\n\n[^1]: This is the footnote.';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles autolinks', () => {
      const markdown = 'https://example.com';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles mailto links', () => {
      const markdown = '<test@example.com>';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('handles empty input', () => {
      const result = compiler('');

      expect(result).toBeDefined();
    });

    test('handles undefined input', () => {
      const result = compiler(undefined as any);

      expect(result).toBeDefined();
    });

    test('compiles with custom options', () => {
      const markdown = 'Hello world';
      const options = {
        forceInline: true,
        wrapper: 'span',
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('compiles with overrides', () => {
      const markdown = '**Bold text**';
      const options = {
        overrides: {
          strong: {
            component: 'b',
          },
        },
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('compiles with custom sanitizer', () => {
      const markdown = 'https://example.com';
      const customSanitizer = (input: string) => input;
      const options = {
        sanitizer: customSanitizer,
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('compiles with custom slugify', () => {
      const markdown = '# My Heading';
      const customSlugify = (input: string) =>
        input.toLowerCase().replace(/\s+/g, '-');
      const options = {
        slugify: customSlugify,
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('compiles with disableAutoLink option', () => {
      const markdown = 'https://example.com';
      const options = {
        disableAutoLink: true,
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('compiles with disableParsingRawHTML option', () => {
      const markdown = '<div>HTML content</div>';
      const options = {
        disableParsingRawHTML: true,
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('compiles with enforceAtxHeadings option', () => {
      const markdown = '#Heading without space';
      const options = {
        enforceAtxHeadings: true,
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('compiles with forceBlock option', () => {
      const markdown = 'Simple text';
      const options = {
        forceBlock: true,
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('compiles with forceInline option', () => {
      const markdown = '# Heading\nParagraph';
      const options = {
        forceInline: true,
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('compiles with forceWrapper option', () => {
      const markdown = 'Single paragraph';
      const options = {
        forceWrapper: true,
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('compiles with custom namedCodesToUnicode', () => {
      const markdown = '&custom;';
      const options = {
        namedCodesToUnicode: {
          custom: '★',
        },
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('compiles with custom renderRule', () => {
      const markdown = '**Bold text**';
      const options = {
        renderRule: (
          next: () => any,
          node: any,
          renderChildren: any,
          state: any
        ) => {
          if (node.type === '28') {
            // textBolded
            return (
              <strong key={state.key}>
                Custom: {renderChildren(node.children)}
              </strong>
            );
          }
          return next();
        },
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('compiles with wrapper set to null', () => {
      const markdown = 'Multiple\n\nParagraphs';
      const options = {
        wrapper: null,
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });
  });

  describe('MarkdownProcessor component', () => {
    test('compiles markdown content', () => {
      const markdown = 'Hello **world**!';
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('span');
    });

    test('compiles with custom options', () => {
      const markdown = 'Hello world';
      const options = {
        forceInline: true,
      };

      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('handles empty children', () => {
      const result = compiler('');

      expect(result).toBeDefined();
    });

    test('handles undefined children', () => {
      const result = compiler(undefined as any);

      expect(result).toBeDefined();
    });
  });

  describe('slugify', () => {
    test('converts text to URL-friendly slug', () => {
      const input = 'Hello World!';
      const result = slugify(input);

      expect(result).toBe('hello-world');
    });

    test('handles accented characters', () => {
      const input = 'Café';
      const result = slugify(input);

      expect(result).toBe('cafe');
    });

    test('handles special characters', () => {
      const input = 'Hello@World#123';
      const result = slugify(input);

      expect(result).toBe('helloworld123');
    });

    test('handles multiple spaces', () => {
      const input = 'Hello    World';
      const result = slugify(input);

      expect(result).toBe('hello----world'); // Multiple spaces become multiple dashes
    });

    test('handles empty string', () => {
      const result = slugify('');

      expect(result).toBe('');
    });

    test('handles already lowercase text', () => {
      const input = 'hello world';
      const result = slugify(input);

      expect(result).toBe('hello-world');
    });
  });

  describe('sanitizer', () => {
    test('allows safe URLs', () => {
      const input = 'https://example.com';
      const result = sanitizer(input);

      expect(result).toBe('https://example.com');
    });

    test('allows HTTP URLs', () => {
      const input = 'http://example.com';
      const result = sanitizer(input);

      expect(result).toBe('http://example.com');
    });

    test('blocks javascript URLs', () => {
      const input = 'javascript:alert("xss")';
      const result = sanitizer(input);

      expect(result).toBeNull();
    });

    test('blocks vbscript URLs', () => {
      const input = 'vbscript:msgbox("xss")';
      const result = sanitizer(input);

      expect(result).toBeNull();
    });

    test('blocks data URLs (except images)', () => {
      const input = 'data:text/html,<script>alert("xss")</script>';
      const result = sanitizer(input);

      expect(result).toBeNull();
    });

    test('allows data image URLs', () => {
      const input =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
      const result = sanitizer(input);

      expect(result).toBe(input);
    });

    test('handles malformed URLs', () => {
      const input = 'https://example.com%AFc';
      const result = sanitizer(input);

      expect(result).toBeNull();
    });

    test('handles empty string', () => {
      const result = sanitizer('');

      expect(result).toBe('');
    });

    test('handles URLs with special characters', () => {
      const input = 'https://example.com/path?query=value&other=123';
      const result = sanitizer(input);

      expect(result).toBe(input);
    });
  });

  describe('MDX-like custom components', () => {
    test('compiles custom components like <Tabs>', () => {
      const markdown = `<Tabs>
  <TabItem label="Tab 1">
    Content for tab 1
  </TabItem>
  <TabItem label="Tab 2">
    Content for tab 2
  </TabItem>
</Tabs>`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles Tabs with overrides', () => {
      const markdown = `<Tabs>
  <TabItem label="Tab 1">
    Content for tab 1
  </TabItem>
  <TabItem label="Tab 2">
    Content for tab 2
  </TabItem>
</Tabs>`;
      const options = {
        overrides: {
          Tabs: (props: any) => <div data-testid="tabs-wrapper" {...props} />,
          TabItem: (props: any) => <div data-testid="tab-item" {...props} />,
        },
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('compiles custom components with attributes', () => {
      const markdown = `<Tabs defaultValue="tab1">
  <TabItem label="Tab 1" value="tab1">
    Content for tab 1
  </TabItem>
  <TabItem label="Tab 2" value="tab2">
    Content for tab 2
  </TabItem>
</Tabs>`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles custom components with markdown content', () => {
      const markdown = `<Tabs>
  <TabItem label="Code Example">
    \`\`\`javascript
    const hello = "world";
    \`\`\`
  </TabItem>
  <TabItem label="Text">
    This is **bold** and *italic* text.
  </TabItem>
</Tabs>`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles nested custom components', () => {
      const markdown = `<Tabs>
  <TabItem label="Nested">
    <div>
      <p>Some content</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </div>
  </TabItem>
</Tabs>`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles custom components with overrides', () => {
      const markdown = `<CustomComponent prop="value">
  Content
</CustomComponent>`;
      const options = {
        overrides: {
          CustomComponent: {
            component: 'div',
            props: { className: 'custom-class' },
          },
        },
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('compiles custom components with function overrides', () => {
      const markdown = `<CustomComponent prop="value">
  Content
</CustomComponent>`;
      const options = {
        overrides: {
          CustomComponent: (props: any) => (
            <div className="custom-wrapper" {...props} />
          ),
        },
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });

    test('compiles self-closing custom components', () => {
      const markdown = `<CustomComponent prop="value" />`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles mixed HTML and custom components', () => {
      const markdown = `<div>
  <h2>Title</h2>
  <Tabs>
    <TabItem label="Tab 1">Content 1</TabItem>
    <TabItem label="Tab 2">Content 2</TabItem>
  </Tabs>
</div>`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles the specific example from user request', () => {
      const markdown = `<Tabs>
  <TabItem label="next-intl">
  \`\`\`tsx
  const Component = () => {
    return <div>Hello</div>;
   };
  \`\`\`
  </TabItem>
  <TabItem label="next-i18next">
  \`\`\`tsx
   const Component = () => {
    return <div>Hello</div>;
   };
  \`\`\`
  </TabItem>
  <TabItem label="Intlayer">
  \`\`\`tsx
   const Component = () => {
    return <div>Hello</div>;
   };
  \`\`\`
  </TabItem>
</Tabs>`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles Tabs with nested markdown content', () => {
      const markdown = `<Tabs>
  <TabItem label="Markdown Content">
    # Heading
    
    This is **bold** and *italic* text.
    
    - List item 1
    - List item 2
  </TabItem>
  <TabItem label="Code Example">
    \`\`\`javascript
    const example = "Hello World";
    console.log(example);
    \`\`\`
  </TabItem>
</Tabs>`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles Tabs with HTML content', () => {
      const markdown = `<Tabs>
  <TabItem label="HTML Content">
    <div class="custom-content">
      <h3>Custom HTML</h3>
      <p>This is HTML content inside a tab.</p>
    </div>
  </TabItem>
</Tabs>`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles Tabs with mixed content types', () => {
      const markdown = `<Tabs>
  <TabItem label="Mixed Content">
    <div>
      <h2>HTML Heading</h2>
      <p>This is a paragraph with **bold** and *italic* text.</p>
      <ul>
        <li>List item with <code>inline code</code></li>
        <li>Another list item</li>
      </ul>
    </div>
  </TabItem>
</Tabs>`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles Tabs with attributes and props', () => {
      const markdown = `<Tabs defaultTab="second">
  <TabItem label="First Tab" value="first">
    First tab content
  </TabItem>
  <TabItem label="Second Tab" value="second">
    Second tab content
  </TabItem>
  <TabItem label="Third Tab" value="third">
    Third tab content
  </TabItem>
</Tabs>`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles multiple Tabs components', () => {
      const markdown = `<Tabs>
  <TabItem label="Tab 1">Content 1</TabItem>
</Tabs>

Some content between tabs.

<Tabs>
  <TabItem label="Tab A">Content A</TabItem>
  <TabItem label="Tab B">Content B</TabItem>
</Tabs>`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });
  });

  describe('complex markdown scenarios', () => {
    test('compiles nested lists', () => {
      const markdown = `- Item 1
  - Nested item 1
  - Nested item 2
- Item 2`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles mixed content', () => {
      const markdown = `# Heading

This is a paragraph with **bold** and *italic* text.

- List item 1
- List item 2

> This is a blockquote

\`\`\`javascript
const code = "example";
\`\`\``;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles HTML content', () => {
      const markdown = '<div class="custom">HTML content</div>';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles self-closing HTML tags', () => {
      const markdown = '<br /><hr />';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles HTML comments', () => {
      const markdown = '<!-- This is a comment -->';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles reference links', () => {
      const markdown = `[Google][1]

[1]: https://google.com "Google Homepage"`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles reference images', () => {
      const markdown = `![Alt text][1]

[1]: https://example.com/image.jpg "Image title"`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles escaped characters', () => {
      const markdown = '\\*Not italic\\*';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles shortcodes', () => {
      const markdown = ':smile: :heart:';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });
  });

  describe('MarkdownRenderer component', () => {
    test('renders basic markdown content', () => {
      const markdown = 'Hello **world**!';
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('renders Tabs component with custom overrides', () => {
      const markdown = `<Tabs>
  <TabItem label="Tab 1">
    Content for tab 1
  </TabItem>
  <TabItem label="Tab 2">
    Content for tab 2
  </TabItem>
</Tabs>`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('renders Tabs with code blocks', () => {
      const markdown = `<Tabs>
  <TabItem label="next-intl">
  \`\`\`tsx
  const Component = () => {
    return <div>Hello</div>;
   };
  \`\`\`
  </TabItem>
  <TabItem label="next-i18next">
  \`\`\`tsx
   const Component = () => {
    return <div>Hello</div>;
   };
  \`\`\`
  </TabItem>
</Tabs>`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('renders Tabs with mixed content', () => {
      const markdown = `<Tabs>
  <TabItem label="Mixed Content">
    <div>
      <h2>HTML Heading</h2>
      <p>This is a paragraph with **bold** and *italic* text.</p>
      <ul>
        <li>List item with <code>inline code</code></li>
        <li>Another list item</li>
      </ul>
    </div>
  </TabItem>
</Tabs>`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('handles frontmatter stripping', () => {
      const markdown = `---
title: Test
description: A test document
---

# Main Content

This is the actual content.`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('renders with custom options', () => {
      const markdown = 'Hello **world**!';
      const options = {
        forceInline: true,
        wrapper: 'span',
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
    });
  });
});
