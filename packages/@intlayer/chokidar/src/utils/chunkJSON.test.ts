import { describe, expect, it } from 'vitest';
import { assembleJSON, chunkJSON } from './chunkJSON';

describe('chunkJSON', () => {
  describe('basic functionality', () => {
    it('should chunk and reassemble a simple object', () => {
      const data = {
        title: 'Test Document',
        content: 'This is a test document',
        items: [1, 2, 3, 4, 5],
      };

      const chunks = chunkJSON(data, 1000);
      const reassembled = assembleJSON(chunks);

      expect(reassembled).toEqual(data);
      expect(chunks.length).toBeGreaterThan(0);
      expect(chunks[0].schemaVersion).toBe(1);
      expect(chunks[0].rootType).toBe('object');
    });

    it('should chunk and reassemble a simple array', () => {
      const data = [1, 2, 3, 'hello', 'world', { nested: 'object' }];

      const chunks = chunkJSON(data, 1000);
      const reassembled = assembleJSON(chunks);

      expect(reassembled).toEqual(data);
      expect(chunks[0].rootType).toBe('array');
    });

    it('should handle nested objects and arrays', () => {
      const data = {
        users: [
          { id: 1, name: 'Alice', profile: { age: 30, city: 'New York' } },
          { id: 2, name: 'Bob', profile: { age: 25, city: 'London' } },
        ],
        metadata: {
          total: 2,
          lastUpdated: '2024-01-01',
        },
      };

      const chunks = chunkJSON(data, 1000);
      const reassembled = assembleJSON(chunks);

      expect(reassembled).toEqual(data);
    });
  });

  describe('large string handling', () => {
    it('should split large strings across multiple chunks', () => {
      const largeString = 'A'.repeat(5000);
      const data = {
        content: largeString,
        other: 'small',
      };

      const chunks = chunkJSON(data, 1000);
      const reassembled = assembleJSON(chunks);

      expect(reassembled).toEqual(data);
      expect(chunks.length).toBeGreaterThan(1);
    });

    it('should handle multiple large strings', () => {
      const data = {
        text1: 'B'.repeat(3000),
        text2: 'C'.repeat(2000),
        normal: 'regular text',
      };

      const chunks = chunkJSON(data, 1000);
      const reassembled = assembleJSON(chunks);

      expect(reassembled).toEqual(data);
    });

    it('should handle Unicode characters correctly in large strings', () => {
      const unicodeString = '🚀'.repeat(1000) + '🌟'.repeat(1000);
      const data = {
        emojis: unicodeString,
        normal: 'text',
      };

      const chunks = chunkJSON(data, 1000);
      const reassembled = assembleJSON(chunks);

      expect(reassembled).toEqual(data);
    });
  });

  describe('edge cases', () => {
    it('should handle empty object', () => {
      const data = {};
      const chunks = chunkJSON(data, 1000);
      const reassembled = assembleJSON(chunks);

      expect(reassembled).toEqual(data);
    });

    it('should handle empty array', () => {
      const data: any[] = [];
      const chunks = chunkJSON(data, 1000);
      const reassembled = assembleJSON(chunks);

      expect(reassembled).toEqual(data);
    });

    it('should handle null values', () => {
      const data = {
        nullValue: null,
        emptyString: '',
        zero: 0,
        falseValue: false,
      };

      const chunks = chunkJSON(data, 1000);
      const reassembled = assembleJSON(chunks);

      expect(reassembled).toEqual(data);
    });

    it('should handle deeply nested structures', () => {
      const data = {
        level1: {
          level2: {
            level3: {
              level4: {
                level5: {
                  value: 'deep',
                  array: [1, 2, { nested: 'object' }],
                },
              },
            },
          },
        },
      };

      const chunks = chunkJSON(data, 1000);
      const reassembled = assembleJSON(chunks);

      expect(reassembled).toEqual(data);
    });
  });

  describe('error handling', () => {
    it('should throw error for non-object/array root', () => {
      expect(() => chunkJSON('string' as any, 1000)).toThrow(
        'Root must be an object or array.'
      );
      expect(() => chunkJSON(123 as any, 1000)).toThrow(
        'Root must be an object or array.'
      );
      expect(() => chunkJSON(null as any, 1000)).toThrow(
        'Root must be an object or array.'
      );
    });

    it('should throw error for maxChars too small', () => {
      const data = { test: 'value' };
      expect(() => chunkJSON(data, 10)).toThrow(
        'maxChars is too small. Use at least 500 characters.'
      );
    });

    it('should throw error for circular references', () => {
      const data: any = { name: 'test' };
      data.self = data;

      expect(() => chunkJSON(data, 1000)).toThrow(
        'Cannot serialize circular structures to JSON.'
      );
    });

    it('should NOT throw when a single string exceeds maxChars; it splits instead', () => {
      const hugeString = 'A'.repeat(10000);
      const data = { content: hugeString };

      const chunks = chunkJSON(data, 500);
      const reassembled = assembleJSON(chunks);
      expect(reassembled).toEqual(data);
    });
  });

  describe('assembleJSON error handling', () => {
    it('should throw error for empty chunks array', () => {
      expect(() => assembleJSON([])).toThrow('No chunks provided.');
    });

    it('should throw error for mismatched checksums', () => {
      const data1 = { test: 'value1' };
      const data2 = { test: 'value2' };
      const chunks1 = chunkJSON(data1, 1000);
      const chunks2 = chunkJSON(data2, 1000);

      // Mix chunks from different sources
      const mixedChunks = [chunks1[0], chunks2[0]];

      expect(() => assembleJSON(mixedChunks)).toThrow(
        'Chunks checksum mismatch (different source objects?).'
      );
    });

    it('should throw error for non-contiguous indices', () => {
      const data = { long: 'A'.repeat(20000), other: 'B'.repeat(20000) };

      const chunks = chunkJSON(data, 600);

      // Force a gap in indices
      if (chunks.length >= 2) {
        chunks[1].index = chunks[0].index + 2; // create a gap
        // keep totals consistent with array length so index check triggers first
        for (const c of chunks) c.total = chunks.length;
      }

      expect(() => assembleJSON(chunks)).toThrow(
        'Chunk indices are not contiguous or sorted.'
      );
    });

    it('should throw error for mismatched total counts', () => {
      const data = { test: 'value' };
      const chunks = chunkJSON(data, 1000);

      // Modify total count
      chunks[0].total = 5;

      expect(() => assembleJSON(chunks)).toThrow(
        'Chunk total does not match provided count.'
      );
    });

    it('should throw error for mismatched root types', () => {
      const objData = { test: 'value' };
      const arrData = ['value'];
      const objChunks = chunkJSON(objData, 1000);
      const arrChunks = chunkJSON(arrData, 1000);

      // Mix object and array chunks with aligned checksum to ensure rootType is checked first
      // Align checksum by copying checksum from obj to arr's first chunk
      arrChunks[0].checksum = objChunks[0].checksum;
      const mixedChunks = [objChunks[0], arrChunks[0]];

      expect(() => assembleJSON(mixedChunks)).toThrow(
        'Chunks rootType mismatch.'
      );
    });

    it('should throw error for missing string parts', () => {
      const data = { content: 'A'.repeat(2000) };
      const chunks = chunkJSON(data, 1000);

      // Remove one chunk to simulate missing parts
      const incompleteChunks = chunks.slice(0, -1);

      // Keep chunk totals aligned so missing parts error is surfaced
      for (const c of incompleteChunks) c.total = incompleteChunks.length;

      expect(() => assembleJSON(incompleteChunks)).toThrow(
        'Missing string parts for a path; incomplete chunk set.'
      );
    });
  });

  describe('chunk validation', () => {
    it('should have consistent schema version across chunks', () => {
      const data = { test: 'value' };
      const chunks = chunkJSON(data, 1000);

      chunks.forEach((chunk) => {
        expect(chunk.schemaVersion).toBe(1);
      });
    });

    it('should have correct index and total values', () => {
      const data = { test: 'value' };
      const chunks = chunkJSON(data, 1000);

      chunks.forEach((chunk, index) => {
        expect(chunk.index).toBe(index);
        expect(chunk.total).toBe(chunks.length);
      });
    });

    it('should have consistent checksum across chunks', () => {
      const data = { test: 'value' };
      const chunks = chunkJSON(data, 1000);

      const firstChecksum = chunks[0].checksum;
      chunks.forEach((chunk) => {
        expect(chunk.checksum).toBe(firstChecksum);
      });
    });

    it('should have consistent root type across chunks', () => {
      const data = { test: 'value' };
      const chunks = chunkJSON(data, 1000);

      const firstRootType = chunks[0].rootType;
      chunks.forEach((chunk) => {
        expect(chunk.rootType).toBe(firstRootType);
      });
    });
  });

  describe('performance and large datasets', () => {
    it('should handle large arrays', () => {
      const data = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        description: `Description for item ${i}`,
      }));

      const chunks = chunkJSON(data, 2000);
      const reassembled = assembleJSON(chunks);

      expect(reassembled).toEqual(data);
      expect(chunks.length).toBeGreaterThan(1);
    });

    it('should handle objects with many properties', () => {
      const data: Record<string, any> = {};
      for (let i = 0; i < 100; i++) {
        data[`property${i}`] = `value${i}`;
      }

      const chunks = chunkJSON(data, 2000);
      const reassembled = assembleJSON(chunks);

      expect(reassembled).toEqual(data);
    });
  });

  describe('string splitting edge cases', () => {
    it('should handle strings with surrogate pairs', () => {
      const data = {
        text: 'Hello 🌍 World 🚀 Test',
        normal: 'regular',
      };

      const chunks = chunkJSON(data, 1000);
      const reassembled = assembleJSON(chunks);

      expect(reassembled).toEqual(data);
    });

    it('should handle very long strings with mixed content', () => {
      const longText = 'A'.repeat(1000) + '🌍'.repeat(100) + 'B'.repeat(1000);
      const data = {
        content: longText,
        other: 'test',
      };

      const chunks = chunkJSON(data, 1000);
      const reassembled = assembleJSON(chunks);

      expect(reassembled).toEqual(data);
    });
  });

  describe('split-node scenarios', () => {
    it('should split and reassemble a very long string property using sentinel parts', () => {
      const data = { file: 'X'.repeat(20000) };
      const chunks = chunkJSON(data, 800);
      const reassembled = assembleJSON(chunks);
      expect(reassembled).toEqual(data);
    });

    it('should split long strings within arrays and reassemble', () => {
      const data = {
        list: ['short', 'Y'.repeat(6000), 'also short', 'Z'.repeat(3500)],
      };
      const chunks = chunkJSON(data, 700);
      const reassembled = assembleJSON(chunks);
      expect(reassembled).toEqual(data);
    });
  });
});
