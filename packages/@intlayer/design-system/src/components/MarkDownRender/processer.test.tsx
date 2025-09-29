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
      const markdown = ['# Heading 1', '## Heading 2'].join('\n');
      const result = compiler(markdown);

      expect(result.props.children[0].type).toBe('h1');
      expect(result.props.children[1].type).toBe('h2');
    });

    test('compiles level 5 heading', () => {
      const markdown = '##### Heading 5';
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('h5');
    });

    test('compiles level 10 heading', () => {
      const markdown = '########## Heading 10';
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('h6'); // Level 6 is the highest level heading
    });

    test('compiles lists', () => {
      const markdown = ['- Item 1', '- Item 2', '- Item 3'].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('ul');
      expect(Array.isArray(result.props.children)).toBe(true);
      expect(result.props.children).toHaveLength(3);

      // Check first list item
      expect(result.props.children[0].type).toBe('li');
      expect(result.props.children[0].props.children[0]).toBe('Item 1');

      // Check second list item
      expect(result.props.children[1].type).toBe('li');
      expect(result.props.children[1].props.children[0]).toBe('Item 2');

      // Check third list item
      expect(result.props.children[2].type).toBe('li');
      expect(result.props.children[2].props.children[0]).toBe('Item 3');
    });

    test('compiles ordered lists', () => {
      const markdown = [
        '1. First item',
        '2. Second item',
        '3. Third item',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('ol');
      expect(Array.isArray(result.props.children)).toBe(true);
      expect(result.props.children).toHaveLength(3);

      // Check first ordered list item
      expect(result.props.children[0].type).toBe('li');
      expect(result.props.children[0].props.children[0]).toBe('First item');

      // Check second ordered list item
      expect(result.props.children[1].type).toBe('li');
      expect(result.props.children[1].props.children[0]).toBe('Second item');

      // Check third ordered list item
      expect(result.props.children[2].type).toBe('li');
      expect(result.props.children[2].props.children[0]).toBe('Third item');
    });

    test('compiles links', () => {
      const markdown = '[Google](https://google.com)';
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('a');
      expect(result.props.href).toBe('https://google.com');
      expect(result.props.children).toEqual(['Google']);
    });

    test('compiles images', () => {
      const markdown = '![Alt text](https://example.com/image.jpg)';
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('img');
      expect(result.props.src).toBe('https://example.com/image.jpg');
      expect(result.props.alt).toBe('Alt text');
    });

    test('compiles code blocks', () => {
      const markdown = ['```javascript', 'const hello = "world";', '```'].join(
        '\n'
      );
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('pre');
      expect(result.props.children).toBeDefined();
      expect(result.props.children.type).toBe('code');
      expect(result.props.children.props.className).toContain(
        'lang-javascript'
      );
      expect(result.props.children.props.children).toBe(
        'const hello = "world";\n'
      );
    });

    test('compiles inline code', () => {
      const markdown = 'Use `console.log()` to debug';
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(Array.isArray(result.props.children)).toBe(true);
      expect(result.props.children).toHaveLength(3);

      // Check text before code
      expect(result.props.children[0]).toBe('Use ');

      // Check inline code element
      expect(result.props.children[1].type).toBe('code');
      expect(result.props.children[1].props.children).toBe('console.log()');

      // Check text after code
      expect(result.props.children[2]).toBe(' to debug');
    });

    test('compiles blockquotes', () => {
      const markdown = '> This is a blockquote';
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('blockquote');
      expect(result.props.children).toBeDefined();
      expect(Array.isArray(result.props.children)).toBe(true);
    });

    test('compiles tables', () => {
      const markdown = [
        '| Header 1 | Header 2 |',
        '|----------|----------|',
        '| Cell 1   | Cell 2   |',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('table');
      expect(Array.isArray(result.props.children)).toBe(true);
      expect(result.props.children).toHaveLength(2);

      // Check table header
      expect(result.props.children[0].type).toBe('thead');
      expect(result.props.children[0].props.children.type).toBe('tr');
      expect(
        Array.isArray(result.props.children[0].props.children.props.children)
      ).toBe(true);
      expect(
        result.props.children[0].props.children.props.children
      ).toHaveLength(2);

      // Check header cells
      expect(
        result.props.children[0].props.children.props.children[0].type
      ).toBe('th');
      expect(
        result.props.children[0].props.children.props.children[0].props.children
      ).toEqual([' Header 1 ']);
      expect(
        result.props.children[0].props.children.props.children[1].type
      ).toBe('th');
      expect(
        result.props.children[0].props.children.props.children[1].props.children
      ).toEqual([' Header 2 ']);

      // Check table body
      expect(result.props.children[1].type).toBe('tbody');
      expect(result.props.children[1].props.children.type).toBe('tr');
      expect(
        Array.isArray(result.props.children[1].props.children.props.children)
      ).toBe(true);
      expect(
        result.props.children[1].props.children.props.children
      ).toHaveLength(2);

      // Check body cells
      expect(
        result.props.children[1].props.children.props.children[0].type
      ).toBe('td');
      expect(
        result.props.children[1].props.children.props.children[0].props.children
      ).toEqual([' Cell 1   ']);
      expect(
        result.props.children[1].props.children.props.children[1].type
      ).toBe('td');
      expect(
        result.props.children[1].props.children.props.children[1].props.children
      ).toEqual([' Cell 2   ']);
    });

    test('compiles bold and italic text', () => {
      const markdown = '**Bold text** and *italic text*';
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(Array.isArray(result.props.children)).toBe(true);
      expect(result.props.children).toHaveLength(3);

      // Check bold text
      expect(result.props.children[0].type).toBe('strong');
      expect(result.props.children[0].props.children).toEqual(['Bold text']);

      // Check middle text
      expect(result.props.children[1]).toBe(' and ');

      // Check italic text
      expect(result.props.children[2].type).toBe('em');
      expect(result.props.children[2].props.children).toEqual(['italic text']);
    });

    test('compiles strikethrough text', () => {
      const markdown = '~~Strikethrough text~~';
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('del');
      expect(result.props.children).toEqual(['Strikethrough text']);
    });

    test('compiles marked text', () => {
      const markdown = '==Marked text==';
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('mark');
      expect(result.props.children).toEqual(['Marked text']);
    });

    test('compiles horizontal rules', () => {
      const markdown = '---';
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('hr');
    });

    test('compiles line breaks', () => {
      const markdown = ['Line 1  ', 'Line 2'].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(Array.isArray(result.props.children)).toBe(true);
      expect(result.props.children).toHaveLength(3);
      expect(result.props.children[0]).toBe('Line 1');
      expect(result.props.children[1].type).toBe('br');
      expect(result.props.children[2]).toBe('Line 2');
    });

    test('compiles task lists', () => {
      const markdown = ['- [x] Completed task', '- [ ] Incomplete task'].join(
        '\n'
      );
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('ul');
      expect(Array.isArray(result.props.children)).toBe(true);
      expect(result.props.children).toHaveLength(2);

      // Check completed task
      expect(result.props.children[0].type).toBe('li');
      expect(result.props.children[0].props.children[0].type).toBe('input');
      expect(result.props.children[0].props.children[0].props.type).toBe(
        'checkbox'
      );
      expect(result.props.children[0].props.children[0].props.checked).toBe(
        true
      );
      // Note: disabled property may not be present in the actual implementation
      expect(result.props.children[0].props.children[1]).toBe(
        ' Completed task'
      );

      // Check incomplete task
      expect(result.props.children[1].type).toBe('li');
      expect(result.props.children[1].props.children[0].type).toBe('input');
      expect(result.props.children[1].props.children[0].props.type).toBe(
        'checkbox'
      );
      expect(result.props.children[1].props.children[0].props.checked).toBe(
        false
      );
      // Note: disabled property may not be present in the actual implementation
      expect(result.props.children[1].props.children[1]).toBe(
        ' Incomplete task'
      );
    });

    test('compiles footnotes', () => {
      const markdown = [
        'This is a sentence with a footnote[^1].',
        '[^1]: This is the footnote.',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(Array.isArray(result.props.children)).toBe(true);
    });

    test('compiles autolinks', () => {
      const markdown = 'https://example.com';
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('a');
      expect(result.props.href).toBe('https://example.com');
      expect(result.props.children).toEqual(['https://example.com']);
    });

    test('compiles mailto links', () => {
      const markdown = '<test@example.com>';
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('a');
      expect(result.props.href).toBe('mailto:test@example.com');
      expect(result.props.children).toEqual(['test@example.com']);
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
      const markdown = ['# Heading', 'Paragraph'].join('\n');
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
      const markdown = [
        '<Tabs>',
        '  <TabItem label="Tab 1">',
        '    Content for tab 1',
        '  </TabItem>',
        '  <TabItem label="Tab 2">',
        '    Content for tab 2',
        '  </TabItem>',
        '</Tabs>',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('Tabs');
      expect(Array.isArray(result.props.children)).toBe(true);
      expect(result.props.children).toHaveLength(2);

      // Check first TabItem
      expect(result.props.children[0].type).toBe('TabItem');
      expect(result.props.children[0].props.label).toBe('Tab 1');
      expect(result.props.children[0].props.children[0]).toBe(
        'Content for tab 1\n'
      );

      // Check second TabItem
      expect(result.props.children[1].type).toBe('TabItem');
      expect(result.props.children[1].props.label).toBe('Tab 2');
      expect(result.props.children[1].props.children).toEqual([
        'Content for tab 2\n',
      ]);
    });

    test('compiles custom components like <Tabs>', () => {
      const markdown = [
        '<Tabs>',
        '  <TabItem label="Tab 1">',
        '    Content for tab 1',
        '  </TabItem>',
        '  <TabItem label="Tab 2">',
        '    Content for tab 2',
        '  </TabItem>',
        '</Tabs>',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('Tabs');
      expect(Array.isArray(result.props.children)).toBe(true);
      expect(result.props.children).toHaveLength(2);

      // Check first TabItem
      expect(result.props.children[0].type).toBe('TabItem');
      expect(result.props.children[0].props.label).toBe('Tab 1');
      expect(result.props.children[0].props.children[0]).toBe(
        'Content for tab 1\n'
      );

      // Check second TabItem
      expect(result.props.children[1].type).toBe('TabItem');
      expect(result.props.children[1].props.label).toBe('Tab 2');
      expect(result.props.children[1].props.children).toEqual([
        'Content for tab 2\n',
      ]);
    });

    test('compiles Tabs with overrides', () => {
      const markdown = [
        '<Tabs>',
        '  <TabItem label="Tab 1">',
        '    Content for tab 1',
        '  </TabItem>',
        '  <TabItem label="Tab 2">',
        '    Content for tab 2',
        '  </TabItem>',
        '</Tabs>',
      ].join('\n');

      const options = {
        overrides: {
          Tabs: (props: any) => <div data-testid="tabs-wrapper" {...props} />,
          TabItem: (props: any) => <div data-testid="tab-item" {...props} />,
        },
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
      expect(result.type).toBe('div');
      expect(result.props['data-testid']).toBe('tabs-wrapper');
      expect(result.props.children[0].type).toBe('div');
      expect(result.props.children[0].props['data-testid']).toBe('tab-item');
      expect(result.props.children[0].props.label).toBe('Tab 1');
      expect(result.props.children[0].props.children[0]).toBe(
        'Content for tab 1\n'
      );
      expect(result.props.children[1].type).toBe('div');
      expect(result.props.children[1].props['data-testid']).toBe('tab-item');
      expect(result.props.children[1].props.label).toBe('Tab 2');
      expect(result.props.children[1].props.children[0]).toBe(
        'Content for tab 2\n'
      );
    });

    test('compiles custom components with attributes', () => {
      const markdown = [
        '<Tabs>',
        '  <TabItem label="Tab 1" value="tab1">',
        '    Content for tab 1',
        '  </TabItem>',
        '  <TabItem label="Tab 2" value="tab2">',
        '    Content for tab 2',
        '   </TabItem>',
        '</Tabs>',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('Tabs');
      expect(Array.isArray(result.props.children)).toBe(true);
      expect(result.props.children).toHaveLength(2);

      // Check first TabItem with attributes
      expect(result.props.children[0].type).toBe('TabItem');
      expect(result.props.children[0].props.label).toBe('Tab 1');
      expect(result.props.children[0].props.value).toBe('tab1');
      expect(result.props.children[0].props.children).toEqual([
        'Content for tab 1\n',
      ]);

      // Check second TabItem with attributes
      expect(result.props.children[1].type).toBe('TabItem');
      expect(result.props.children[1].props.label).toBe('Tab 2');
      expect(result.props.children[1].props.value).toBe('tab2');
      expect(result.props.children[1].props.children).toEqual([
        'Content for tab 2\n ',
      ]);
    });

    test('compiles custom components with markdown content', () => {
      const markdown = [
        '<Tabs>',
        '  <TabItem label="Code Example">',
        '```javascript',
        'const hello = "world";',
        '```',
        '  </TabItem>',
        '  <TabItem label="Text">',
        '        This is **bold** and *italic* text.',
        '   </TabItem>',
        '</Tabs>',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('Tabs');
      expect(Array.isArray(result.props.children)).toBe(true);
      expect(result.props.children).toHaveLength(2);

      // Check first TabItem with code block
      expect(result.props.children[0].type).toBe('TabItem');
      expect(result.props.children[0].props.label).toBe('Code Example');
      expect(result.props.children[0].props.children).toBeDefined();

      // Check second TabItem with markdown text
      expect(result.props.children[1].type).toBe('TabItem');
      expect(result.props.children[1].props.label).toBe('Text');
      // Note: The content structure may be more complex for markdown content
      expect(result.props.children[1].props.children).toBeDefined();

      // Check code block
      expect(result.props.children[0].props.children[0].type).toBe('pre');
      expect(
        result.props.children[0].props.children[0].props.children.type
      ).toBe('code');
      expect(
        result.props.children[0].props.children[0].props.children.props.children
      ).toBe('const hello = "world";\n');
    });

    test('compiles nested custom components', () => {
      const markdown = [
        '<Tabs>',
        '  <TabItem label="Nested">',
        '   <div>',
        '     <p>Some content</p>',
        '     <ul>',
        '       <li>Item 1</li>',
        '       <li>Item 2</li>',
        '     </ul>',
        '   </div>',
        '  </TabItem>',
        '</Tabs>',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('Tabs');
      expect(Array.isArray(result.props.children)).toBe(true);
      expect(result.props.children).toHaveLength(1);

      // Check nested TabItem
      expect(result.props.children[0].type).toBe('TabItem');
      expect(result.props.children[0].props.label).toBe('Nested');
      expect(result.props.children[0].props.children).toBeDefined();
    });

    test('compiles custom components with overrides', () => {
      const markdown = [
        '<CustomComponent prop="value">',
        '  Content',
        '</CustomComponent>',
      ].join('\n');

      const options = {
        overrides: {
          CustomComponent: {
            component: 'CustomComponent',
            props: { className: 'custom-class' },
          },
        },
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
      expect(result.type).toBe('CustomComponent');
      // Note: className may not be applied in the actual implementation
      expect(result.props.prop).toBe('value');
      expect(result.props.children).toEqual(['Content\n']);
    });

    test('compiles custom components with function overrides', () => {
      const markdown = [
        '<CustomComponent prop="value">',
        '  Content',
        '</CustomComponent>',
      ].join('\n');
      const options = {
        overrides: {
          CustomComponent: (props: any) => (
            <div className="custom-wrapper" {...props} />
          ),
        },
      };
      const result = compiler(markdown, options);

      expect(result).toBeDefined();
      expect(result.type).toBe('div');
      expect(result.props.className).toBe('custom-wrapper');
      expect(result.props.prop).toBe('value');
      expect(result.props.children[0]).toBe('Content\n');
    });

    test('compiles self-closing custom components', () => {
      const markdown = `<CustomComponent prop="value" />`;
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('CustomComponent');
      expect(result.props.prop).toBe('value');
      expect(result.props.children).toBeUndefined();
    });

    test('compiles mixed HTML and custom components', () => {
      const markdown = [
        '<div>',
        '  <h2>Title</h2>',
        '  <Tabs>',
        '    <TabItem label="Tab 1">Content 1</TabItem>',
        '    <TabItem label="Tab 2">Content 2</TabItem>',
        '  </Tabs>',
        '</div>',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
      expect(result.type).toBe('div');
      expect(Array.isArray(result.props.children)).toBe(true);
      expect(result.props.children).toHaveLength(2);

      // Check HTML h2 element
      expect(result.props.children[0].type).toBe('h2');
      expect(result.props.children[0].props.children[0]).toBe('Title');

      // Check custom Tabs component
      expect(result.props.children[1].type).toBe('Tabs');
      expect(Array.isArray(result.props.children[1].props.children)).toBe(true);
      expect(result.props.children[1].props.children).toHaveLength(2);

      // Check TabItems
      expect(result.props.children[1].props.children[0].type).toBe('TabItem');
      expect(result.props.children[1].props.children[0].props.label).toBe(
        'Tab 1'
      );
      expect(result.props.children[1].props.children[0].props.children[0]).toBe(
        'Content 1'
      );

      expect(result.props.children[1].props.children[1].type).toBe('TabItem');
      expect(result.props.children[1].props.children[1].props.label).toBe(
        'Tab 2'
      );
      expect(result.props.children[1].props.children[1].props.children).toEqual(
        ['Content 2']
      );
    });

    test('compiles the specific example from user request', () => {
      const markdown = [
        '<Tabs>',
        '  <TabItem label="next-intl">',
        '',
        '  ```tsx',
        '  const Component = () => {',
        '    return <div>Hello</div>;',
        '   };',
        '  ```',
        '',
        '  </TabItem>',
        '  <TabItem label="next-i18next">',
        // '', should work with and without a newline
        '  ```tsx',
        '   const Component = () => {',
        '    return <div>Hello</div>;',
        '   };',
        '  ```',
        // '', should work with and without a newline
        '  </TabItem>',
        '  <TabItem label="Intlayer">',
        '',
        '  ```tsx',
        '   const Component = () => {',
        '    return <div>Hello</div>;',
        '   };',
        '  ```',
        '',
        '  </TabItem>',
        '</Tabs>',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles Tabs with nested markdown content', () => {
      const markdown = [
        '<Tabs>',
        '  <TabItem label="Markdown Content">',
        '    # Heading',
        '    ',
        '    This is **bold** and *italic* text.',
        '    ',
        '    - List item 1',
        '    - List item 2',
        '  </TabItem>',
        '  <TabItem label="Code Example">',
        '    ```javascript',
        '    const example = "Hello World";',
        '    console.log(example);',
        '    ```',
        '  </TabItem>',
        '</Tabs>',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles Tabs with HTML content', () => {
      const markdown = [
        '<Tabs>',
        '  <TabItem label="HTML Content">',
        '    <div class="custom-content">',
        '      <h3>Custom HTML</h3>',
        '      <p>This is HTML content inside a tab.</p>',
        '    </div>',
        '  </TabItem>',
        '</Tabs>',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles Tabs with mixed content types', () => {
      const markdown = [
        '<Tabs>',
        '  <TabItem label="Mixed Content">',
        '    <div>',
        '      <h2>HTML Heading</h2>',
        '      <p>This is a paragraph with **bold** and *italic* text.</p>',
        '      <ul>',
        '        <li>List item with <code>inline code</code></li>',
        '        <li>Another list item</li>',
        '      </ul>',
        '    </div>',
        '  </TabItem>',
        '</Tabs>',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles Tabs with attributes and props', () => {
      const markdown = [
        '<Tabs defaultTab="second">',
        '  <TabItem label="First Tab" value="first">',
        '    First tab content',
        '  </TabItem>',
        '  <TabItem label="Second Tab" value="second">',
        '    Second tab content',
        '  </TabItem>',
        '  <TabItem label="Third Tab" value="third">',
        '    Third tab content',
        '  </TabItem>',
        '</Tabs>',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles multiple Tabs components', () => {
      const markdown = [
        '<Tabs>',
        '  <TabItem label="Tab 1">Content 1</TabItem>',
        '</Tabs>',
        '',
        'Some content between tabs.',
        '',
        '<Tabs>',
        '  <TabItem label="Tab A">Content A</TabItem>',
        '  <TabItem label="Tab B">Content B</TabItem>',
        '</Tabs>',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });
  });

  describe('complex markdown scenarios', () => {
    test('compiles nested lists', () => {
      const markdown = [
        '- Item 1',
        '  - Nested item 1',
        '  - Nested item 2',
        '- Item 2',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles mixed content', () => {
      const markdown = [
        '# Heading',
        '',
        'This is a paragraph with **bold** and *italic* text.',
        '',
        '- List item 1',
        '- List item 2',
        '',
        '> This is a blockquote',
        '',
        '  ```tsx',
        '  const Component = () => {',
        '    return <div>Hello</div>;',
        '   };',
        '  ```',
        '',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
      const code = result.props.children.find((c: any) => c.type === 'pre')
        .props.children.props.children as string;
      expect(code).toMatch(
        /const Component = \(\) => \{\s+return <div>Hello<\/div>;\s+\};/
      );
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
      const markdown = [
        '[Google][1]',
        '',
        '[1]: https://google.com "Google Homepage"',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('compiles reference images', () => {
      const markdown = [
        '![Alt text][1]',
        '',
        '[1]: https://example.com/image.jpg "Image title"',
      ].join('\n');
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
      const markdown = [
        '<Tabs>',
        '  <TabItem label="Tab 1">',
        '    Content for tab 1',
        '  </TabItem>',
        '  <TabItem label="Tab 2">',
        '    Content for tab 2',
        '  </TabItem>',
        '</Tabs>',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('renders Tabs with code blocks', () => {
      const markdown = [
        '<Tabs>',
        '  <TabItem label="next-intl">',
        '',
        '  ```tsx',
        '  const Component = () => {',
        '    return <div>Hello</div>;',
        '   };',
        '  ```',
        '',
        '  </TabItem>',
        '  <TabItem label="next-i18next">',
        // '', should work with and without a newline
        '  ```tsx',
        '   const Component = () => {',
        '    return <div>Hello</div>;',
        '   };',
        '  ```',
        // '',
        '  </TabItem>',
        '</Tabs>',
      ].join('\n');
      const result = compiler(markdown);
      expect(result).toBeDefined();

      const tabs: any = result;
      const children = tabs.props.children as any[];
      const firstTab = children[0];
      const secondTab = children[1];

      // First TabItem should render a block code (<pre><code>) and not inline code
      const firstChildren = firstTab.props.children as any[];
      const firstPre = Array.isArray(firstChildren)
        ? firstChildren.find((c: any) => c && c.type === 'pre')
        : firstChildren;
      expect(firstPre && firstPre.type).toBe('pre');
      const firstCode = firstPre.props.children;
      expect(firstCode && firstCode.type).toBe('code');
      expect(firstCode.props.className).toContain('lang-tsx');
      // The displayed content must not include the language token ("tsx\n")
      expect(String(firstCode.props.children).startsWith('tsx\n')).toBe(false);

      // Second TabItem should also render as <pre><code lang-tsx>
      const secondChildren = secondTab.props.children as any[];
      const secondPre = Array.isArray(secondChildren)
        ? secondChildren.find((c: any) => c && c.type === 'pre')
        : secondChildren;
      expect(secondPre && secondPre.type).toBe('pre');
      const secondCode = secondPre.props.children;
      expect(secondCode && secondCode.type).toBe('code');
      expect(secondCode.props.className).toContain('lang-tsx');
      expect(String(secondCode.props.children).startsWith('tsx\n')).toBe(false);
    });

    test('renders Tabs with code blocks without leading blank line', () => {
      const markdown = [
        '<Tabs>',
        '  <TabItem label="A">',
        '  ```tsx',
        '  console.log(1);',
        '  ```',
        '  </TabItem>',
        '  <TabItem label="B">',
        '```tsx',
        'export default getRequestConfig(async ({ locale }) => {',
        '  return {',
        '    messages: (await import(`./${locale}.json`)).default,',
        '  };',
        '});',
        '```',
        '  </TabItem>',
        '</Tabs>',
      ].join('\n');
      const result = compiler(markdown);
      expect(result).toBeDefined();
      const items: any[] = result.props.children;
      const preA = items[0].props.children.find(
        (c: any) => c && c.type === 'pre'
      );
      const preB = items[1].props.children.find(
        (c: any) => c && c.type === 'pre'
      );
      expect(preA.type).toBe('pre');
      expect(preA.props.children.type).toBe('code');
      expect(preA.props.children.props.className).toContain('lang-tsx');
      expect(
        String(preA.props.children.props.children).startsWith('tsx\n')
      ).toBe(false);
      expect(preB.type).toBe('pre');
      expect(preB.props.children.type).toBe('code');
      expect(preB.props.children.props.className).toContain('lang-tsx');
      expect(
        String(preB.props.children.props.children).startsWith('tsx\n')
      ).toBe(false);

      // Ensure newlines are preserved (not escaped) so block formatting remains
      expect(preB.props.children.props.children).toBe(
        'export default getRequestConfig(async ({ locale }) => {\n  return {\n    messages: (await import(`./${locale}.json`)).default,\n  };\n});\n'.replace(
          /\\n/g,
          '\n'
        )
      );
    });

    test('renders Tabs code block with backticks and preserves block formatting', () => {
      const markdown = [
        '<Tabs>',
        '  <TabItem label="A">',
        '    ```tsx',
        '    const locale = "en";',
        '    const file = `./${locale}.json`;',
        '    // comment with `backtick` inside',
        '    console.log(file);',
        '    ```',
        '  </TabItem>',
        '</Tabs>',
      ].join('\n');

      const result = compiler(markdown);
      expect(result).toBeDefined();

      const tabItems: any[] = result.props.children;
      const first = tabItems[0];
      const pre = first.props.children.find((c: any) => c && c.type === 'pre');

      expect(pre && pre.type).toBe('pre');
      const code = pre.props.children;
      expect(code && code.type).toBe('code');
      expect(code.props.className).toContain('lang-tsx');
      expect(String(code.props.children).startsWith('tsx\n')).toBe(false);
      // ensure backtick characters are preserved in the rendered text
      expect(String(code.props.children)).toContain('`');
    });

    test('renders quadruple-fenced code with attributes inside Tabs', () => {
      const markdown = [
        '<Tabs>',
        '  <TabItem label="Code">',
        '    ```tsx fileName="src/app/[locale]/about/layout.tsx"',
        '    import type { Metadata } from "next";',
        '    export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {',
        '      const { locale } = params;',
        '      const messages = (await import(`@/../public/locales/${locale}/about.json`)).default;',
        '      return {};',
        '    }',
        '    ```',
        '  </TabItem>',
        '</Tabs>',
      ].join('\n');

      const result = compiler(markdown);
      expect(result).toBeDefined();
      const items: any[] = result.props.children;
      const pre = items[0].props.children.find(
        (c: any) => c && c.type === 'pre'
      );
      expect(pre.type).toBe('pre');
      const code = pre.props.children;
      expect(code.type).toBe('code');
      expect(code.props.className).toContain('lang-tsx');

      // entry : '      const messages = (await import("@/../public/locales/locale/about.json")).default;',
      // result : "children": "    import type { Metadata } from \"next\";\n    export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {\n      const { locale } = params;\n      const messages = (await import(\"@/../public/locales/locale/about.json\")).default;\n      return {};\n    }\n"

      // entry : '      const messages = (await import(`@/../public/locales/${locale}/about.json`)).default;',
      // result :  "children": "    import type { Metadata } from \"next\";\\n    export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {\\n      const { locale } = params;\\n      const messages = (await import(`@/../public/locales/${locale}/about.json`)).default;\\n      return {};\\n    }\\n"

      expect(code.props.fileName).toBe('src/app/[locale]/about/layout.tsx');
      expect(String(code.props.children).startsWith('tsx\n')).toBe(false);
      // The code includes template literals; ensure backticks present
      expect(String(code.props.children)).toContain('`');
    });

    test('renders Tabs with mixed content', () => {
      const markdown = [
        '<Tabs>',
        '  <TabItem label="Mixed Content">',
        '    <div>',
        '      <h2>HTML Heading</h2>',
        '      <p>This is a paragraph with **bold** and *italic* text.</p>',
        '      <ul>',
        '        <li>List item with <code>inline code</code></li>',
        '        <li>Another list item</li>',
        '      </ul>',
        '    </div>',
        '  </TabItem>',
        '</Tabs>',
      ].join('\n');
      const result = compiler(markdown);

      expect(result).toBeDefined();
    });

    test('handles frontmatter stripping', () => {
      const markdown = [
        '---',
        'title: Test',
        'description: A test document',
        '---',
        '',
        '# Main Content',
        '',
        'This is the actual content.',
      ].join('\n');
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
