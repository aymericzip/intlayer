import { describe, expect, it } from 'vitest';
import { extractJson } from './extractJSON';

describe('extractJson', () => {
  describe('JSON wrapped in markdown code blocks', () => {
    it('should extract JSON from markdown code block with json tag', () => {
      const input = `\`\`\`json
{
  "title": "Test content declarations",
  "description": "A comprehensive test dictionary that demonstrates the use of various content declaration types such as translations, enumerations, conditions, insertions, nested structures, markdown, and file references. Useful for integration testing and component validation.",
  "tags": ["test tag"]
}
\`\`\``;

      const result = extractJson(input);

      expect(result).toEqual({
        title: 'Test content declarations',
        description:
          'A comprehensive test dictionary that demonstrates the use of various content declaration types such as translations, enumerations, conditions, insertions, nested structures, markdown, and file references. Useful for integration testing and component validation.',
        tags: ['test tag'],
      });
    });

    it('should extract JSON from markdown code block without language tag', () => {
      const input = `\`\`\`
{
  "key": "value",
  "number": 42
}
\`\`\``;

      const result = extractJson(input);

      expect(result).toEqual({
        key: 'value',
        number: 42,
      });
    });

    it('should extract JSON from text with markdown formatting', () => {
      const input = `Here is your JSON response:
\`\`\`json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Test"
  }
}
\`\`\`
Hope this helps!`;

      const result = extractJson(input);

      expect(result).toEqual({
        status: 'success',
        data: {
          id: 1,
          name: 'Test',
        },
      });
    });
  });

  describe('Array extraction', () => {
    it('should extract a simple array', () => {
      const input = '["item1", "item2", "item3"]';

      const result = extractJson<string[]>(input);

      expect(result).toEqual(['item1', 'item2', 'item3']);
    });

    it('should extract an array of objects', () => {
      const input = `[
  {"id": 1, "name": "First"},
  {"id": 2, "name": "Second"}
]`;

      const result = extractJson(input);

      expect(result).toEqual([
        { id: 1, name: 'First' },
        { id: 2, name: 'Second' },
      ]);
    });

    it('should extract array from markdown code block', () => {
      const input = `\`\`\`json
[
  "test tag",
  "another tag",
  "third tag"
]
\`\`\``;

      const result = extractJson<string[]>(input);

      expect(result).toEqual(['test tag', 'another tag', 'third tag']);
    });

    it('should extract array with nested objects and arrays', () => {
      const input = `[
  {
    "name": "Parent",
    "children": [
      {"name": "Child1"},
      {"name": "Child2"}
    ]
  }
]`;

      const result = extractJson(input);

      expect(result).toEqual([
        {
          name: 'Parent',
          children: [{ name: 'Child1' }, { name: 'Child2' }],
        },
      ]);
    });
  });

  describe('Plain JSON objects', () => {
    it('should extract a simple object', () => {
      const input = '{"key": "value"}';

      const result = extractJson(input);

      expect(result).toEqual({ key: 'value' });
    });

    it('should extract a nested object', () => {
      const input = `{
  "level1": {
    "level2": {
      "level3": {
        "value": "deep"
      }
    }
  }
}`;

      const result = extractJson(input);

      expect(result).toEqual({
        level1: {
          level2: {
            level3: {
              value: 'deep',
            },
          },
        },
      });
    });

    it('should handle various JSON data types', () => {
      const input = `{
  "string": "text",
  "number": 123,
  "float": 45.67,
  "boolean": true,
  "null": null,
  "array": [1, 2, 3],
  "object": {"nested": "value"}
}`;

      const result = extractJson(input);

      expect(result).toEqual({
        string: 'text',
        number: 123,
        float: 45.67,
        boolean: true,
        null: null,
        array: [1, 2, 3],
        object: { nested: 'value' },
      });
    });
  });

  describe('JSON with surrounding text', () => {
    it('should extract JSON from text with prefix', () => {
      const input = 'Here is your data: {"result": "success"}';

      const result = extractJson(input);

      expect(result).toEqual({ result: 'success' });
    });

    it('should extract JSON from text with suffix', () => {
      const input = '{"result": "success"} - This was the response';

      const result = extractJson(input);

      expect(result).toEqual({ result: 'success' });
    });

    it('should extract JSON from text with both prefix and suffix', () => {
      const input =
        'Response received: {"status": 200, "message": "OK"} from server';

      const result = extractJson(input);

      expect(result).toEqual({ status: 200, message: 'OK' });
    });

    it('should extract first JSON when multiple JSON blocks exist', () => {
      const input = '{"first": true} some text {"second": true}';

      const result = extractJson(input);

      expect(result).toEqual({ first: true });
    });
  });

  describe('Complex LLM responses', () => {
    it('should handle LLM response with explanation', () => {
      const input = `I've analyzed the content and here's my audit result:

\`\`\`json
{
  "title": "Updated Title",
  "description": "This is a better description that follows best practices.",
  "tags": ["seo", "content", "metadata"]
}
\`\`\`

The title has been optimized for SEO and the description is now more descriptive.`;

      const result = extractJson(input);

      expect(result).toEqual({
        title: 'Updated Title',
        description:
          'This is a better description that follows best practices.',
        tags: ['seo', 'content', 'metadata'],
      });
    });

    it('should handle JSON with escaped characters', () => {
      const input = `{
  "text": "Line 1\\nLine 2\\tTabbed",
  "quote": "He said \\"Hello\\"",
  "path": "C:\\\\Users\\\\file.txt"
}`;

      const result = extractJson(input);

      expect(result).toEqual({
        text: 'Line 1\nLine 2\tTabbed',
        quote: 'He said "Hello"',
        path: 'C:\\Users\\file.txt',
      });
    });

    it('should handle JSON with special characters in strings', () => {
      const input = `{
  "brackets": "This has { and } and [ and ] inside",
  "symbols": "Special: @#$%^&*()",
  "unicode": "Unicode: \\u0048\\u0065\\u006C\\u006C\\u006F"
}`;

      const result = extractJson(input);

      expect(result).toEqual({
        brackets: 'This has { and } and [ and ] inside',
        symbols: 'Special: @#$%^&*()',
        unicode: 'Unicode: Hello',
      });
    });
  });

  describe('Error cases', () => {
    it('should throw error when no JSON start character found', () => {
      const input = 'This is just plain text without JSON';

      expect(() => extractJson(input)).toThrow(
        'No JSON start character ({ or [) found.'
      );
    });

    it('should throw error when JSON is incomplete (missing closing bracket)', () => {
      const input = '{"key": "value", "nested": {"incomplete": true}';

      expect(() => extractJson(input)).toThrow(
        'Reached end of input without closing JSON bracket.'
      );
    });

    it('should throw error when JSON is malformed', () => {
      const input = '{"key": "value",}'; // trailing comma

      expect(() => extractJson(input)).toThrow('Failed to parse JSON');
    });

    it('should throw error for empty string', () => {
      const input = '';

      expect(() => extractJson(input)).toThrow(
        'No JSON start character ({ or [) found.'
      );
    });

    it('should throw error when only opening bracket exists', () => {
      const input = '{';

      expect(() => extractJson(input)).toThrow(
        'Reached end of input without closing JSON bracket.'
      );
    });

    it('should throw error when brackets are mismatched', () => {
      const input = '{"array": [1, 2, 3}'; // ] missing, } present instead

      expect(() => extractJson(input)).toThrow('Failed to parse JSON');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty object', () => {
      const input = '{}';

      const result = extractJson(input);

      expect(result).toEqual({});
    });

    it('should handle empty array', () => {
      const input = '[]';

      const result = extractJson(input);

      expect(result).toEqual([]);
    });

    it('should handle JSON with whitespace', () => {
      const input = '   \n\t  {"key": "value"}  \n  ';

      const result = extractJson(input);

      expect(result).toEqual({ key: 'value' });
    });

    it('should handle deeply nested structures', () => {
      const input = `{
  "a": {
    "b": {
      "c": {
        "d": {
          "e": {
            "f": "deeply nested"
          }
        }
      }
    }
  }
}`;

      const result = extractJson(input);

      expect(result).toEqual({
        a: {
          b: {
            c: {
              d: {
                e: {
                  f: 'deeply nested',
                },
              },
            },
          },
        },
      });
    });

    it('should handle array of mixed types', () => {
      const input = '[1, "string", true, null, {"object": "value"}, [1, 2, 3]]';

      const result = extractJson(input);

      expect(result).toEqual([
        1,
        'string',
        true,
        null,
        { object: 'value' },
        [1, 2, 3],
      ]);
    });
  });

  describe('Type safety', () => {
    it('should work with generic type parameter', () => {
      interface User {
        id: number;
        name: string;
      }

      const input = '{"id": 1, "name": "John"}';

      const result = extractJson<User>(input);

      expect(result).toEqual({ id: 1, name: 'John' });
      expect(result.id).toBe(1);
      expect(result.name).toBe('John');
    });

    it('should work with array type parameter', () => {
      const input = '["a", "b", "c"]';

      const result = extractJson<string[]>(input);

      expect(result).toEqual(['a', 'b', 'c']);
      expect(Array.isArray(result)).toBe(true);
    });
  });
});
