import { describe, expect, it } from 'vitest';
import { verifyIdenticObjectFormat } from './verifyIdenticObjectFormat';

describe('verifyIdenticObjectFormat', () => {
  describe('Primitive types', () => {
    it('should pass for identical string types', () => {
      expect(verifyIdenticObjectFormat('Hello', 'Bonjour')).toBe(true);
    });

    it('should pass for identical number types', () => {
      expect(verifyIdenticObjectFormat(42, 100)).toBe(true);
    });

    it('should pass for identical boolean types', () => {
      expect(verifyIdenticObjectFormat(true, false)).toBe(true);
    });

    it('should pass for null values', () => {
      expect(verifyIdenticObjectFormat(null, null)).toBe(true);
    });

    it('should pass for undefined values', () => {
      expect(verifyIdenticObjectFormat(undefined, undefined)).toBe(true);
    });

    it('should throw error for type mismatch: string vs number', () => {
      expect(() => verifyIdenticObjectFormat('Hello', 42)).toThrow(
        'Type mismatch at root: expected number, got string'
      );
    });

    it('should throw error for type mismatch: number vs boolean', () => {
      expect(() => verifyIdenticObjectFormat(42, true)).toThrow(
        'Type mismatch at root: expected boolean, got number'
      );
    });

    it('should throw error for null vs undefined', () => {
      expect(() => verifyIdenticObjectFormat(null, undefined)).toThrow(
        'Type mismatch at root: expected undefined, got null'
      );
    });

    it('should throw error for null vs string', () => {
      expect(() => verifyIdenticObjectFormat('test', null)).toThrow(
        'Type mismatch at root: expected null, got string'
      );
    });
  });

  describe('Arrays', () => {
    it('should pass for arrays with same length and types', () => {
      expect(
        verifyIdenticObjectFormat(['Hello', 'World'], ['Bonjour', 'Monde'])
      ).toBe(true);
    });

    it('should pass for arrays with numbers', () => {
      expect(verifyIdenticObjectFormat([1, 2, 3], [100, 200, 300])).toBe(true);
    });

    it('should pass for empty arrays', () => {
      expect(verifyIdenticObjectFormat([], [])).toBe(true);
    });

    it('should pass for nested arrays with same structure', () => {
      expect(
        verifyIdenticObjectFormat(
          [
            [1, 2],
            [3, 4],
          ],
          [
            [5, 6],
            [7, 8],
          ]
        )
      ).toBe(true);
    });

    it('should throw error for arrays with different lengths', () => {
      expect(() =>
        verifyIdenticObjectFormat(['Hello', 'World'], ['Bonjour'])
      ).toThrow('Array length mismatch at root: expected 1 elements, got 2');
    });

    it('should throw error for array vs non-array', () => {
      expect(() => verifyIdenticObjectFormat(['Hello'], 'Bonjour')).toThrow(
        'Type mismatch at root: expected string, got array'
      );
    });

    it('should throw error for array elements with different types', () => {
      expect(() =>
        verifyIdenticObjectFormat(['Hello', 42], ['Bonjour', 'Monde'])
      ).toThrow('Type mismatch at root[1]: expected string, got number');
    });

    it('should throw error for nested arrays with different lengths', () => {
      expect(() =>
        verifyIdenticObjectFormat(
          [
            [1, 2],
            [3, 4, 5],
          ],
          [
            [5, 6],
            [7, 8],
          ]
        )
      ).toThrow('Array length mismatch at root[1]: expected 2 elements, got 3');
    });
  });

  describe('Objects', () => {
    it('should pass for objects with same keys and types', () => {
      expect(
        verifyIdenticObjectFormat(
          { name: 'John', age: 30 },
          { name: 'Jean', age: 25 }
        )
      ).toBe(true);
    });

    it('should pass for empty objects', () => {
      expect(verifyIdenticObjectFormat({}, {})).toBe(true);
    });

    it('should pass for nested objects with same structure', () => {
      expect(
        verifyIdenticObjectFormat(
          {
            user: { name: 'John', age: 30 },
            country: 'USA',
          },
          {
            user: { name: 'Jean', age: 25 },
            country: 'France',
          }
        )
      ).toBe(true);
    });

    it('should throw error for objects with different number of keys', () => {
      expect(() =>
        verifyIdenticObjectFormat({ name: 'John', age: 30 }, { name: 'Jean' })
      ).toThrow('Object keys count mismatch at root: expected 1 keys, got 2');
    });

    it('should throw error for objects with different keys', () => {
      expect(() =>
        verifyIdenticObjectFormat({ name: 'John' }, { nom: 'Jean' })
      ).toThrow(
        'Object keys mismatch at root: expected key "nom" at position 0, got "name"'
      );
    });

    it('should throw error for objects with keys in different order', () => {
      expect(() =>
        verifyIdenticObjectFormat(
          { name: 'John', age: 30 },
          { age: 25, name: 'Jean' }
        )
      ).toThrow(
        'Object keys mismatch at root: expected key "age" at position 0, got "name"'
      );
    });

    it('should throw error for object properties with different types', () => {
      expect(() =>
        verifyIdenticObjectFormat(
          { name: 'John', age: 30 },
          { name: 'Jean', age: '25' }
        )
      ).toThrow('Type mismatch at root.age: expected string, got number');
    });

    it('should throw error for nested object structure mismatch', () => {
      expect(() =>
        verifyIdenticObjectFormat(
          { user: { name: 'John', age: 30 } },
          { user: { name: 'Jean' } }
        )
      ).toThrow(
        'Object keys count mismatch at root.user: expected 1 keys, got 2'
      );
    });
  });

  describe('Complex nested structures', () => {
    it('should pass for complex nested structure with arrays and objects', () => {
      expect(
        verifyIdenticObjectFormat(
          {
            title: 'Welcome',
            items: [
              { id: 1, text: 'First' },
              { id: 2, text: 'Second' },
            ],
            metadata: {
              author: 'John',
              tags: ['tag1', 'tag2'],
            },
          },
          {
            title: 'Bienvenue',
            items: [
              { id: 10, text: 'Premier' },
              { id: 20, text: 'Deuxième' },
            ],
            metadata: {
              author: 'Jean',
              tags: ['étiquette1', 'étiquette2'],
            },
          }
        )
      ).toBe(true);
    });

    it('should throw error for complex structure with array length mismatch', () => {
      expect(() =>
        verifyIdenticObjectFormat(
          {
            items: [
              { id: 1, text: 'First' },
              { id: 2, text: 'Second' },
            ],
          },
          {
            items: [{ id: 10, text: 'Premier' }],
          }
        )
      ).toThrow(
        'Array length mismatch at root.items: expected 1 elements, got 2'
      );
    });

    it('should throw error for complex structure with nested object key mismatch', () => {
      expect(() =>
        verifyIdenticObjectFormat(
          {
            items: [{ id: 1, text: 'First' }],
          },
          {
            items: [{ id: 10, label: 'Premier' }],
          }
        )
      ).toThrow(
        'Object keys mismatch at root.items[0]: expected key "label" at position 1, got "text"'
      );
    });

    it('should pass for deeply nested structures', () => {
      expect(
        verifyIdenticObjectFormat(
          {
            level1: {
              level2: {
                level3: {
                  level4: ['value'],
                },
              },
            },
          },
          {
            level1: {
              level2: {
                level3: {
                  level4: ['valeur'],
                },
              },
            },
          }
        )
      ).toBe(true);
    });

    it('should throw error with correct path for deeply nested mismatch', () => {
      expect(() =>
        verifyIdenticObjectFormat(
          {
            level1: {
              level2: {
                level3: {
                  level4: ['value'],
                },
              },
            },
          },
          {
            level1: {
              level2: {
                level3: {
                  level4: [123],
                },
              },
            },
          }
        )
      ).toThrow(
        'Type mismatch at root.level1.level2.level3.level4[0]: expected number, got string'
      );
    });
  });

  describe('Mixed types', () => {
    it('should pass for objects containing mixed primitive types', () => {
      expect(
        verifyIdenticObjectFormat(
          {
            str: 'hello',
            num: 42,
            bool: true,
            nul: null,
          },
          {
            str: 'bonjour',
            num: 100,
            bool: false,
            nul: null,
          }
        )
      ).toBe(true);
    });

    it('should pass for arrays containing mixed types', () => {
      expect(
        verifyIdenticObjectFormat(
          ['hello', 42, true, null],
          ['bonjour', 100, false, null]
        )
      ).toBe(true);
    });

    it('should throw error for mixed types in wrong order', () => {
      expect(() =>
        verifyIdenticObjectFormat(['hello', 42], [100, 'bonjour'])
      ).toThrow('Type mismatch at root[0]: expected number, got string');
    });
  });

  describe('Edge cases', () => {
    it('should handle objects with numeric keys', () => {
      expect(
        verifyIdenticObjectFormat(
          { '0': 'first', '1': 'second' },
          { '0': 'premier', '1': 'deuxième' }
        )
      ).toBe(true);
    });

    it('should handle arrays of objects with different values but same structure', () => {
      expect(
        verifyIdenticObjectFormat(
          [
            { id: 1, name: 'A', active: true },
            { id: 2, name: 'B', active: false },
            { id: 3, name: 'C', active: true },
          ],
          [
            { id: 100, name: 'X', active: false },
            { id: 200, name: 'Y', active: true },
            { id: 300, name: 'Z', active: false },
          ]
        )
      ).toBe(true);
    });

    it('should handle objects with special characters in keys', () => {
      expect(
        verifyIdenticObjectFormat(
          { 'key-with-dash': 'value', 'key.with.dot': 'value2' },
          { 'key-with-dash': 'valeur', 'key.with.dot': 'valeur2' }
        )
      ).toBe(true);
    });
  });
});
