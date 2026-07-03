import { describe, expect, it } from 'vitest';
import {
  assembleJSON,
  chunkJSON,
  reconstructFromSingleChunk,
} from './chunkJSON';

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
      expect(() => chunkJSON(data, 100)).toThrow(
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

  describe('blog metadata array case', () => {
    it('should handle large blog metadata array with many entries', () => {
      // Create a realistic blog metadata structure similar to user's case
      const blogEntries = Array.from({ length: 22 }, (_, i) => ({
        createdAt: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
        updatedAt: '2025-06-29',
        title: `Blog Post ${i + 1}: ${'A'.repeat(50)}`,
        description: `This is a detailed description for blog post ${i + 1}. ${'B'.repeat(100)}`,
        keywords: [
          'Intlayer',
          'Internationalization',
          'Blog',
          'Next.js',
          'JavaScript',
          'React',
          `Topic${i}`,
        ],
        slugs: ['blog', `post-${i + 1}`, `category-${i % 5}`],
        docKey: `./blog/en/post-${i + 1}.md`,
        githubUrl: `https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/post-${i + 1}.md`,
        relativeUrl: `/blog/post-${i + 1}`,
        url: `https://intlayer.org/blog/post-${i + 1}`,
      }));

      // This should split into 2 chunks based on maxChars
      const chunks = chunkJSON(blogEntries, 16000);

      expect(chunks.length).toBeGreaterThan(0);
      expect(chunks.length).toBeLessThanOrEqual(3);

      // Verify all chunks have consistent metadata
      chunks.forEach((chunk, index) => {
        expect(chunk.index).toBe(index);
        expect(chunk.total).toBe(chunks.length);
        expect(chunk.schemaVersion).toBe(1);
        expect(chunk.rootType).toBe('array');
      });

      // Reassemble and verify
      const reassembled = assembleJSON(chunks);
      expect(reassembled).toEqual(blogEntries);
    });

    it('should handle the exact structure from user logs', () => {
      const data = [
        {
          createdAt: '2024-24-12',
          updatedAt: '2025-06-29',
          title: 'Blog',
          description:
            'Discover all topics related to Intlayer, internationalization and other',
          keywords: [
            'Intlayer',
            'Internationalization',
            'Blog',
            'Next.js',
            'JavaScript',
            'React',
          ],
          slugs: ['blog', 'search'],
          docKey: './blog/en/index.md',
          githubUrl:
            'https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/index.md',
          relativeUrl: '/blog/search',
          url: 'https://intlayer.org/blog/search',
        },
        {
          createdAt: '2024-12-24',
          updatedAt: '2025-06-29',
          title: 'SEO and Internationalization',
          description:
            'Discover how to optimize your multilingual website for search engines and improve your SEO.',
          keywords: [
            'SEO',
            'Intlayer',
            'Internationalization',
            'Blog',
            'Next.js',
            'JavaScript',
            'React',
          ],
          slugs: ['blog', 'SEO-and-i18n'],
          docKey: './blog/en/internationalization_and_SEO.md',
          githubUrl:
            'https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/internationalization_and_SEO.md',
          relativeUrl: '/blog/SEO-and-i18n',
          url: 'https://intlayer.org/blog/SEO-and-i18n',
        },
        {
          createdAt: '2024-12-24',
          updatedAt: '2025-06-29',
          title: 'Intlayer and i18next',
          description:
            'Integrate Intlayer with i18next for optimal internationalisation. Compare the two frameworks and learn how to configure them together.',
          keywords: [
            'Intlayer',
            'i18next',
            'Internationalisation',
            'i18n',
            'Localisation',
            'Translation',
            'React',
            'Next.js',
            'JavaScript',
            'TypeScript',
          ],
          slugs: ['blog', 'intlayer-with-i18next'],
          docKey: './blog/en/intlayer_with_i18next.md',
          githubUrl:
            'https://github.com/aymericzip/intlayer/blob/main/docs/blog/en/intlayer_with_i18next.md',
          relativeUrl: '/blog/intlayer-with-i18next',
          url: 'https://intlayer.org/blog/intlayer-with-i18next',
        },
      ];

      const chunks = chunkJSON(data, 2000);

      // Verify chunks are properly formed
      chunks.forEach((chunk, index) => {
        expect(chunk.index).toBe(index);
        expect(chunk.total).toBe(chunks.length);
      });

      const reassembled = assembleJSON(chunks);
      expect(reassembled).toEqual(data);
    });

    it('should handle array with very large string fields requiring splitting', () => {
      const data = [
        {
          id: 1,
          content: 'A'.repeat(15000),
          metadata: { title: 'First' },
        },
        {
          id: 2,
          content: 'B'.repeat(15000),
          metadata: { title: 'Second' },
        },
      ];

      const chunks = chunkJSON(data, 8000);
      expect(chunks.length).toBeGreaterThan(1);

      // Verify chunk consistency
      const firstChunk = chunks[0];
      chunks.forEach((chunk) => {
        expect(chunk.total).toBe(chunks.length);
        expect(chunk.checksum).toBe(firstChunk.checksum);
        expect(chunk.rootType).toBe('array');
      });

      const reassembled = assembleJSON(chunks);
      expect(reassembled).toEqual(data);
    });
  });

  describe('reconstructFromSingleChunk', () => {
    it('should reconstruct partial content from a single chunk', () => {
      const data = {
        title: 'Test',
        items: [1, 2, 3],
        nested: { value: 'test' },
      };

      const chunks = chunkJSON(data, 1000);

      // Even if there's only one chunk, test that we can reconstruct it individually
      const reconstructed = reconstructFromSingleChunk(chunks[0]);
      expect(reconstructed).toEqual(data);
    });

    it('should reconstruct partial content from first chunk of multi-chunk data', () => {
      const data = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        description: `Description ${i}`,
      }));

      const chunks = chunkJSON(data, 2000);
      expect(chunks.length).toBeGreaterThan(1);

      // Each chunk should reconstruct to a partial array
      for (const chunk of chunks) {
        const partial = reconstructFromSingleChunk(chunk);
        expect(Array.isArray(partial)).toBe(true);
        // The partial array should have some items (not necessarily all)
        expect((partial as any[]).length).toBeGreaterThan(0);
      }
    });

    it('should handle single chunk with split string', () => {
      const data = {
        content: 'A'.repeat(10000),
        other: 'small',
      };

      const chunks = chunkJSON(data, 5000);
      expect(chunks.length).toBeGreaterThan(1);

      // Reconstruct just the first chunk
      const partial = reconstructFromSingleChunk(chunks[0]);
      expect(partial).toHaveProperty('content');

      // Note: if the content string is split across multiple chunks,
      // reconstructFromSingleChunk will leave it as a split-node object
      // with __splittedType, __total, and partial parts
      const content = (partial as any).content;
      if (typeof content === 'object' && content.__splittedType === 'string') {
        // Split string - this is expected for incomplete chunks
        expect(content).toHaveProperty('__splittedType');
        expect(content).toHaveProperty('__total');
      } else {
        // If all parts are in this chunk, it will be reconstructed
        expect(typeof content).toBe('string');
      }
    });

    it('should work with blog metadata structure', () => {
      const blogEntries = Array.from({ length: 22 }, (_, i) => ({
        createdAt: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
        updatedAt: '2025-06-29',
        title: `Blog Post ${i + 1}`,
        description: `Description for post ${i + 1}`,
        keywords: ['Intlayer', 'Blog', `Topic${i}`],
        slugs: ['blog', `post-${i + 1}`],
      }));

      const chunks = chunkJSON(blogEntries, 16000);

      // Should be able to reconstruct each chunk individually
      for (const chunk of chunks) {
        const partial = reconstructFromSingleChunk(chunk);
        expect(Array.isArray(partial)).toBe(true);
        expect((partial as any[]).length).toBeGreaterThan(0);
      }

      // Full assembly should still work
      const fullReassembly = assembleJSON(chunks);
      expect(fullReassembly).toEqual(blogEntries);
    });
  });
});
