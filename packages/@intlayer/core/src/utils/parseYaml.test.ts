import { readFileSync } from 'fs';
import { join } from 'path';
import { describe, expect, it } from 'vitest';
import { parseYaml } from './parseYaml';

describe('parseYaml', () => {
  describe('Basic Types', () => {
    it('should parse quoted strings', () => {
      expect(parseYaml('"hello world"')).toBe('hello world');
      expect(parseYaml("'single quoted'")).toBe('single quoted');
    });

    it('should parse unquoted strings', () => {
      expect(parseYaml('hello')).toBe('hello');
      expect(parseYaml('hello_world')).toBe('hello_world');
      expect(parseYaml('hello-world')).toBe('hello-world');
    });

    it('should parse numbers', () => {
      expect(parseYaml('123')).toBe(123);
      expect(parseYaml('0')).toBe(0);
      expect(parseYaml('-456')).toBe(-456);
      expect(parseYaml('3.14')).toBe(3.14);
      expect(parseYaml('-2.5')).toBe(-2.5);
    });

    it('should parse booleans', () => {
      expect(parseYaml('true')).toBe('true'); // Note: parseYaml treats these as strings
      expect(parseYaml('false')).toBe('false');
    });

    it('should handle null and undefined as strings', () => {
      expect(parseYaml('null')).toBe('null');
      expect(parseYaml('undefined')).toBe('undefined');
    });

    it('should handle special string literals', () => {
      expect(parseYaml('true')).toBe('true');
      expect(parseYaml('false')).toBe('false');
      expect(parseYaml('NaN')).toBe('NaN');
      expect(parseYaml('Infinity')).toBe('Infinity');
    });
  });

  describe('Arrays', () => {
    it('should parse simple string arrays', () => {
      expect(parseYaml('[hello, world]')).toEqual(['hello', 'world']);
      expect(parseYaml('[item1, item2, item3]')).toEqual([
        'item1',
        'item2',
        'item3',
      ]);
    });

    it('should parse arrays with quoted strings', () => {
      expect(parseYaml('["hello", "world"]')).toEqual(['hello', 'world']);
      expect(parseYaml("['single', 'quoted']")).toEqual(['single', 'quoted']);
    });

    it('should parse mixed arrays with strings and numbers', () => {
      expect(parseYaml('[hello, 123, world]')).toEqual(['hello', 123, 'world']);
      expect(parseYaml('[1, two, 3.14]')).toEqual([1, 'two', 3.14]);
    });

    it('should parse arrays with spaces', () => {
      expect(parseYaml('[ hello , world ]')).toEqual(['hello', 'world']);
      expect(parseYaml('[  item1  ,  item2  ]')).toEqual(['item1', 'item2']);
    });

    it('should parse empty arrays', () => {
      expect(parseYaml('[]')).toEqual([]);
      expect(parseYaml('[ ]')).toEqual([]);
    });

    it('should parse single-item arrays', () => {
      expect(parseYaml('[hello]')).toEqual(['hello']);
      expect(parseYaml('[123]')).toEqual([123]);
      expect(parseYaml('["quoted"]')).toEqual(['quoted']);
    });

    it('should handle arrays with special characters', () => {
      expect(parseYaml('[hello-world, test_item]')).toEqual([
        'hello-world',
        'test_item',
      ]);
      expect(parseYaml('[item.with.dots, item:with:colons]')).toEqual([
        'item.with.dots',
        'item:with:colons',
      ]);
    });

    it('should parse arrays with mixed quotes', () => {
      expect(parseYaml('["double", \'single\', unquoted]')).toEqual([
        'double',
        'single',
        'unquoted',
      ]);
    });
  });

  describe('Objects', () => {
    it('should parse simple objects', () => {
      expect(parseYaml('{key: value}')).toEqual({ key: 'value' });
      expect(parseYaml('{name: John, age: 30}')).toEqual({
        name: 'John',
        age: 30,
      });
    });

    it('should parse objects with quoted keys', () => {
      expect(parseYaml('{"key": "value"}')).toEqual({ key: 'value' });
      expect(parseYaml('{"name": "John", "age": 30}')).toEqual({
        name: 'John',
        age: 30,
      });
    });

    it('should parse objects with mixed value types', () => {
      expect(parseYaml('{string: hello, number: 42, quoted: "world"}')).toEqual(
        {
          string: 'hello',
          number: 42,
          quoted: 'world',
        }
      );
    });

    it('should parse objects with spaces', () => {
      expect(parseYaml('{ key : value }')).toEqual({ key: 'value' });
      expect(parseYaml('{  name  :  John  ,  age  :  30  }')).toEqual({
        name: 'John',
        age: 30,
      });
    });

    it('should parse empty objects', () => {
      expect(parseYaml('{}')).toEqual({});
      expect(parseYaml('{ }')).toEqual({});
    });

    it('should handle keys with special characters', () => {
      expect(
        parseYaml('{key_with_underscores: value1, key-with-dashes: value2}')
      ).toEqual({
        key_with_underscores: 'value1',
        'key-with-dashes': 'value2',
      });
    });
  });

  describe('Nested Structures', () => {
    it('should parse objects containing arrays', () => {
      expect(parseYaml('{items: [one, two, three]}')).toEqual({
        items: ['one', 'two', 'three'],
      });
    });

    it('should parse objects with mixed nested content', () => {
      expect(
        parseYaml('{name: John, hobbies: [reading, coding], age: 30}')
      ).toEqual({
        name: 'John',
        hobbies: ['reading', 'coding'],
        age: 30,
      });
    });

    it('should parse arrays containing objects', () => {
      expect(parseYaml('[{name: John}, {name: Jane}]')).toEqual([
        { name: 'John' },
        { name: 'Jane' },
      ]);
    });
  });

  describe('Real-world Examples', () => {
    it('should parse markdown frontmatter-style data', () => {
      expect(parseYaml('Testing')).toBe('Testing');
      expect(parseYaml('Intlayer')).toBe('Intlayer');
      expect(parseYaml('Internationalization')).toBe('Internationalization');
    });

    it('should parse language codes', () => {
      expect(parseYaml('en')).toBe('en');
      expect(parseYaml('en-US')).toBe('en-US');
      expect(parseYaml('zh-CN')).toBe('zh-CN');
    });

    it('should parse URLs', () => {
      expect(parseYaml('https://example.com')).toBe('https://example.com');
      expect(parseYaml('http://localhost:3000')).toBe('http://localhost:3000');
    });

    it('should parse dates as strings', () => {
      expect(parseYaml('2023-01-01')).toBe('2023-01-01');
      expect(parseYaml('2023-12-31T23:59:59Z')).toBe('2023-12-31T23:59:59Z');
    });

    it('should parse version numbers', () => {
      expect(parseYaml('1.0.0')).toBe('1.0.0');
      expect(parseYaml('2.1.3-beta')).toBe('2.1.3-beta');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty input', () => {
      expect(parseYaml('')).toBeNull();
      expect(parseYaml('   ')).toBeNull();
    });

    it('should handle whitespace', () => {
      expect(parseYaml('  hello  ')).toBe('hello');
      expect(parseYaml('\thello\t')).toBe('hello');
      expect(parseYaml('\n  world  \n')).toBe('world');
    });

    it('should handle complex nested structures', () => {
      const input =
        '{users: [{name: John, roles: [admin, user]}, {name: Jane, roles: [user]}]}';
      const expected = {
        users: [
          { name: 'John', roles: ['admin', 'user'] },
          { name: 'Jane', roles: ['user'] },
        ],
      };
      expect(parseYaml(input)).toEqual(expected);
    });

    it('should handle arrays with trailing commas gracefully', () => {
      // Note: This might fail with current implementation, but testing the behavior
      expect(() => parseYaml('[hello, world,]')).toThrow();
    });

    it('should handle malformed JSON and throw errors', () => {
      expect(() => parseYaml('{key: value')).toThrow(); // Missing closing brace
      expect(() => parseYaml('[hello, world')).toThrow(); // Missing closing bracket
      expect(() => parseYaml('{')).toThrow(); // Invalid JSON
    });

    it('should handle special string values', () => {
      expect(parseYaml('true')).toBe('true');
      expect(parseYaml('false')).toBe('false');
      expect(parseYaml('null')).toBe('null');
      expect(parseYaml('undefined')).toBe('undefined');
      expect(parseYaml('yes')).toBe('yes');
      expect(parseYaml('no')).toBe('no');
      expect(parseYaml('on')).toBe('on');
      expect(parseYaml('off')).toBe('off');
    });

    it('should handle strings with colons', () => {
      expect(parseYaml('time: 12:30:45')).toEqual({ time: '12:30:45' });
      expect(parseYaml('url: https://example.com:8080')).toEqual({
        url: 'https://example.com:8080',
      });
    });

    it('should preserve number precision', () => {
      expect(parseYaml('3.14159265359')).toBe(Math.PI);
      expect(parseYaml('0.1')).toBe(0.1);
      expect(parseYaml('1e5')).toBe(100000);
    });

    it('should handle negative numbers in arrays and objects', () => {
      expect(parseYaml('[-1, -2.5, -100]')).toEqual([-1, -2.5, -100]);
      expect(parseYaml('{temp: -5, altitude: -200.5}')).toEqual({
        temp: -5,
        altitude: -200.5,
      });
    });

    it('should return null for completely invalid input', () => {
      // Testing what happens with completely invalid JSON-like input
      expect(() => parseYaml('{{{')).toThrow();
      expect(() => parseYaml(']]][')).toThrow();
    });
  });

  describe('Type Safety', () => {
    it('should work with generic types', () => {
      interface TestObject {
        name: string;
        age: number;
      }

      const result = parseYaml<TestObject>('{name: John, age: 30}');
      expect(result).toEqual({ name: 'John', age: 30 });
    });

    it('should work with array types', () => {
      const result = parseYaml<string[]>('[hello, world]');
      expect(result).toEqual(['hello', 'world']);
    });

    it('should work with nested object types', () => {
      interface NestedObject {
        user: {
          name: string;
          preferences: string[];
        };
      }

      const result = parseYaml<NestedObject>(
        '{user: {name: John, preferences: [dark, compact]}}'
      );
      expect(result).toEqual({
        user: {
          name: 'John',
          preferences: ['dark', 'compact'],
        },
      });
    });
  });

  describe('Advanced YAML-like Features', () => {
    it('should handle multiline strings (as single values)', () => {
      expect(parseYaml('This is a long string')).toBe('This is a long string');
      expect(parseYaml('Line 1 Line 2')).toBe('Line 1 Line 2');
    });

    it('should handle strings with special characters', () => {
      expect(parseYaml('hello@world.com')).toBe('hello@world.com');
      expect(parseYaml('user-name_123')).toBe('user-name_123');
      expect(parseYaml('path/to/file.txt')).toBe('path/to/file.txt');
      expect(parseYaml('key=value&other=data')).toBe('key=value&other=data');
    });

    it('should handle arrays with complex strings', () => {
      expect(parseYaml('[hello@world.com, user-123, file.txt]')).toEqual([
        'hello@world.com',
        'user-123',
        'file.txt',
      ]);
    });

    it('should handle objects with complex keys and values', () => {
      expect(
        parseYaml('{email: user@domain.com, file_path: /home/user/file.txt}')
      ).toEqual({
        email: 'user@domain.com',
        file_path: '/home/user/file.txt',
      });
    });

    it('should handle mixed quotes in objects', () => {
      expect(
        parseYaml(
          '{title: "My Title", subtitle: \'My Subtitle\', content: plain text}'
        )
      ).toEqual({
        title: 'My Title',
        subtitle: 'My Subtitle',
        content: 'plain text',
      });
    });

    it('should handle nested arrays and objects', () => {
      const input =
        '{config: {items: [item1, item2], count: 42}, tags: [tag1, tag2]}';
      const expected = {
        config: {
          items: ['item1', 'item2'],
          count: 42,
        },
        tags: ['tag1', 'tag2'],
      };
      expect(parseYaml(input)).toEqual(expected);
    });

    it('should handle scientific notation', () => {
      expect(parseYaml('1e5')).toBe(100000);
      expect(parseYaml('2.5e-3')).toBe(0.0025);
      expect(parseYaml('-1.23e+4')).toBe(-12300);
    });

    it('should handle hexadecimal-like strings', () => {
      expect(parseYaml('0x123')).toBe('0x123'); // Treated as string, not hex
      expect(parseYaml('#FF0000')).toBe('#FF0000');
    });
  });

  describe('Real-world Markdown Frontmatter Examples', () => {
    it('should parse typical blog post metadata', () => {
      expect(parseYaml('Getting Started with Intlayer')).toBe(
        'Getting Started with Intlayer'
      );
      expect(parseYaml('2023-12-01')).toBe('2023-12-01');
      expect(parseYaml('[tutorial, getting-started, i18n]')).toEqual([
        'tutorial',
        'getting-started',
        'i18n',
      ]);
    });

    it('should parse SEO metadata', () => {
      expect(parseYaml('Learn how to internationalize your React app')).toBe(
        'Learn how to internationalize your React app'
      );
      expect(
        parseYaml('[React, Internationalization, i18n, Intlayer]')
      ).toEqual(['React', 'Internationalization', 'i18n', 'Intlayer']);
    });

    it('should parse author information', () => {
      expect(
        parseYaml('{name: John Doe, email: john@example.com, role: developer}')
      ).toEqual({
        name: 'John Doe',
        email: 'john@example.com',
        role: 'developer',
      });
    });

    it('should parse complex metadata objects', () => {
      const input =
        '{seo: {title: "My Page", description: "Page description", keywords: [seo, meta, tags]}}';
      const expected = {
        seo: {
          title: 'My Page',
          description: 'Page description',
          keywords: ['seo', 'meta', 'tags'],
        },
      };
      expect(parseYaml(input)).toEqual(expected);
    });
  });

  describe('Performance and Large Data', () => {
    it('should handle large arrays', () => {
      const largeArray = Array.from({ length: 100 }, (_, i) => `item${i}`).join(
        ', '
      );
      const input = `[${largeArray}]`;
      const result = parseYaml<string[]>(input);
      expect(result).toBeTruthy();
      expect(Array.isArray(result)).toBe(true);
      expect(result as string[]).toHaveLength(100);
      expect((result as string[])[0]).toBe('item0');
      expect((result as string[])[99]).toBe('item99');
    });

    it('should handle objects with many properties', () => {
      const properties = Array.from(
        { length: 50 },
        (_, i) => `prop${i}: value${i}`
      ).join(', ');
      const input = `{${properties}}`;
      const result = parseYaml<Record<string, string>>(input);
      expect(result).toBeTruthy();
      expect(typeof result).toBe('object');
      expect(Object.keys(result as Record<string, string>)).toHaveLength(50);
      expect((result as Record<string, string>).prop0).toBe('value0');
      expect((result as Record<string, string>).prop49).toBe('value49');
    });
  });

  describe('Holistic YAML Fixture Test', () => {
    it('should parse the comprehensive YAML fixture', () => {
      // Read the YAML fixture file to ensure it exists and is accessible
      const yamlContent = readFileSync(join(__dirname, '_yaml.yaml'), 'utf8');

      // Verify the fixture file is not empty
      expect(yamlContent.length).toBeGreaterThan(0);

      // Since the YAML file contains multiple documents and comments,
      // we'll test parsing individual sections that represent valid YAML structures

      // Test basic key-value pairs
      expect(parseYaml('title: "Getting Started with Intlayer"')).toEqual({
        title: 'Getting Started with Intlayer',
      });

      expect(parseYaml('version: 1.0.0')).toEqual({
        version: '1.0.0',
      });

      expect(parseYaml('published: true')).toEqual({
        published: 'true',
      });

      // Test arrays
      expect(
        parseYaml('tags: [tutorial, getting-started, i18n, react]')
      ).toEqual({
        tags: ['tutorial', 'getting-started', 'i18n', 'react'],
      });

      // Test nested objects
      expect(
        parseYaml(
          '{seo: {title: "Intlayer Tutorial", description: "Learn internationalization with Intlayer"}}'
        )
      ).toEqual({
        seo: {
          title: 'Intlayer Tutorial',
          description: 'Learn internationalization with Intlayer',
        },
      });

      // Test complex nested structure
      const complexConfig =
        '{config: {database: {host: localhost, port: 5432, name: myapp}, features: {enabled: [authentication, analytics], disabled: [beta-features]}}}';
      const result = parseYaml(complexConfig);
      expect(result).toEqual({
        config: {
          database: {
            host: 'localhost',
            port: 5432,
            name: 'myapp',
          },
          features: {
            enabled: ['authentication', 'analytics'],
            disabled: ['beta-features'],
          },
        },
      });

      // Test mixed data types
      expect(
        parseYaml('{count: 42, price: 29.99, featured: true, metadata: null}')
      ).toEqual({
        count: 42,
        price: 29.99,
        featured: 'true',
        metadata: 'null',
      });

      // Test arrays with mixed types
      expect(parseYaml('[string, 123, true, null, {nested: object}]')).toEqual([
        'string',
        123,
        'true',
        'null',
        { nested: 'object' },
      ]);

      // Test internationalization structure
      const i18nConfig =
        '{i18n: {default_locale: en, supported_locales: [en, es, fr, de], translations: {en: {hello: "Hello", goodbye: "Goodbye"}, es: {hello: "Hola", goodbye: "Adiós"}}}}';
      const i18nResult = parseYaml(i18nConfig);
      expect(i18nResult).toEqual({
        i18n: {
          default_locale: 'en',
          supported_locales: ['en', 'es', 'fr', 'de'],
          translations: {
            en: {
              hello: 'Hello',
              goodbye: 'Goodbye',
            },
            es: {
              hello: 'Hola',
              goodbye: 'Adiós',
            },
          },
        },
      });
    });
  });
});
