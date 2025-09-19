import type { Dictionary } from '@intlayer/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mergeDictionaries } from './mergeDictionaries';

// Mock the configuration and logger
vi.mock('@intlayer/config', () => ({
  getAppLogger: vi.fn(() => vi.fn()),
}));

vi.mock('@intlayer/config/built', () => ({
  default: {
    editor: {
      dictionaryPriorityStrategy: 'locale_first',
    },
  },
}));

// Mock the core functions
vi.mock('@intlayer/core', () => ({
  getNodeType: vi.fn((content: any) => {
    if (typeof content === 'string') return 'text';
    if (typeof content === 'number') return 'number';
    if (typeof content === 'boolean') return 'boolean';
    if (Array.isArray(content)) return 'array';
    if (content && typeof content === 'object') {
      if (content.nodeType === 'translation') return 'translation';
      return 'object';
    }
    return 'unknown';
  }),
  getReplacedValuesContent: vi.fn((content: any) => content),
}));

describe('mergeDictionaries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should merge simple translation dictionaries correctly', () => {
    const dictionaries: Dictionary[] = [
      {
        key: 'test-key',
        content: {
          title: {
            nodeType: 'translation',
            translation: {
              en: 'Hello',
            },
          },
        },
      },
      {
        key: 'test-key',
        content: {
          title: {
            nodeType: 'translation',
            translation: {
              fr: 'Bonjour',
            },
          },
        },
      },
    ];

    const result = mergeDictionaries(dictionaries);

    expect(result.result.key).toBe('test-key');
    expect(result.result.content.title.translation).toEqual({
      en: 'Hello',
      fr: 'Bonjour',
    });
    expect(result.result.filePath).toBeUndefined();
    expect(result.mask).toBeDefined();
  });

  it('should merge nested translation objects correctly', () => {
    const dictionaries: Dictionary[] = [
      {
        key: 'nested-test',
        content: {
          section: {
            subsection: {
              nodeType: 'translation',
              translation: {
                en: 'English text',
              },
            },
          },
        },
      },
      {
        key: 'nested-test',
        content: {
          section: {
            subsection: {
              nodeType: 'translation',
              translation: {
                fr: 'French text',
              },
            },
          },
        },
      },
    ];

    const result = mergeDictionaries(dictionaries);

    expect(result.result.content.section.subsection.translation).toEqual({
      en: 'English text',
      fr: 'French text',
    });
  });

  it('should merge arrays', () => {
    const dictionaries: Dictionary[] = [
      {
        key: 'array-test',
        content: {
          items: ['test1', 'test2', 'test3', 'test4'],
        },
      },
      {
        key: 'array-test',
        content: {
          items: ['test1.1', 'test2.1', 'test3.1'],
        },
      },
    ];

    const result = mergeDictionaries(dictionaries);

    expect(result.result.content.items).toHaveLength(4);
    expect(result.result.content.items).toEqual([
      'test1.1',
      'test2.1',
      'test3.1',
      'test4',
    ]);
  });

  it('should merge arrays by index/position correctly', () => {
    const dictionaries: Dictionary[] = [
      {
        key: 'array-test',
        content: {
          items: [
            {
              nodeType: 'translation',
              translation: {
                en: 'Item 1 EN',
              },
            },
            {
              nodeType: 'translation',
              translation: {
                en: 'Item 2 EN',
              },
            },
          ],
        },
      },
      {
        key: 'array-test',
        content: {
          items: [
            {
              nodeType: 'translation',
              translation: {
                en: 'Item 1.1 EN',
                fr: 'Item 1 FR',
              },
            },
            {
              nodeType: 'translation',
              translation: {
                fr: 'Item 2 FR',
              },
            },
          ],
        },
      },
    ];

    const result = mergeDictionaries(dictionaries);

    expect(result.result.content.items).toHaveLength(2);
    expect(result.result.content.items[0].translation).toEqual({
      en: 'Item 1.1 EN',
      fr: 'Item 1 FR',
    });
    expect(result.result.content.items[1].translation).toEqual({
      en: 'Item 2 EN',
      fr: 'Item 2 FR',
    });
  });

  it('should handle arrays with different lengths by appending', () => {
    const dictionaries: Dictionary[] = [
      {
        key: 'array-length-test',
        content: {
          items: [
            {
              nodeType: 'translation',
              translation: {
                en: 'Item 1 EN',
              },
            },
          ],
        },
      },
      {
        key: 'array-length-test',
        content: {
          items: [
            {
              nodeType: 'translation',
              translation: {
                fr: 'Item 1 FR',
              },
            },
            {
              nodeType: 'translation',
              translation: {
                fr: 'Item 2 FR',
              },
            },
          ],
        },
      },
    ];

    const result = mergeDictionaries(dictionaries);

    expect(result.result.content.items).toHaveLength(2);
    expect(result.result.content.items[0].translation).toEqual({
      en: 'Item 1 EN',
      fr: 'Item 1 FR',
    });
    expect(result.result.content.items[1].translation).toEqual({
      fr: 'Item 2 FR',
    });
  });

  it('should handle mixed content types correctly', () => {
    const dictionaries: Dictionary[] = [
      {
        key: 'mixed-test',
        content: {
          stringValue: 'Hello',
          numberValue: 42,
          booleanValue: true,
          translationValue: {
            nodeType: 'translation',
            translation: {
              en: 'English',
            },
          },
        },
      },
      {
        key: 'mixed-test',
        content: {
          translationValue: {
            nodeType: 'translation',
            translation: {
              fr: 'French',
            },
          },
        },
      },
    ];

    const result = mergeDictionaries(dictionaries);

    expect(result.result.content.stringValue).toBe('Hello');
    expect(result.result.content.numberValue).toBe(42);
    expect(result.result.content.booleanValue).toBe(true);
    expect(result.result.content.translationValue.translation).toEqual({
      en: 'English',
      fr: 'French',
    });
  });

  it('should handle single dictionary', () => {
    const dictionaries: Dictionary[] = [
      {
        key: 'single-test',
        content: {
          title: 'Single item',
        },
      },
    ];

    const result = mergeDictionaries(dictionaries);

    expect(result.result.key).toBe('single-test');
    expect(result.result.content.title).toBe('Single item');
    expect(result.result.filePath).toBeUndefined();
  });

  it('should preserve non-translation content during merge', () => {
    const dictionaries: Dictionary[] = [
      {
        key: 'preserve-test',
        content: {
          metadata: {
            version: '1.0.0',
            author: 'Test Author',
          },
          title: {
            nodeType: 'translation',
            translation: {
              en: 'English Title',
            },
          },
        },
      },
      {
        key: 'preserve-test',
        content: {
          title: {
            nodeType: 'translation',
            translation: {
              fr: 'French Title',
            },
          },
        },
      },
    ];

    const result = mergeDictionaries(dictionaries);

    expect(result.result.content.metadata.version).toBe('1.0.0');
    expect(result.result.content.metadata.author).toBe('Test Author');
    expect(result.result.content.title.translation).toEqual({
      en: 'English Title',
      fr: 'French Title',
    });
  });

  it('should handle deeply nested arrays correctly', () => {
    const dictionaries: Dictionary[] = [
      {
        key: 'deep-array-test',
        content: {
          level1: {
            level2: {
              level3: [
                {
                  nodeType: 'translation',
                  translation: {
                    en: 'Deep item 1 EN',
                  },
                },
                {
                  nodeType: 'translation',
                  translation: {
                    en: 'Deep item 2 EN',
                  },
                },
              ],
            },
          },
        },
      },
      {
        key: 'deep-array-test',
        content: {
          level1: {
            level2: {
              level3: [
                {
                  nodeType: 'translation',
                  translation: {
                    fr: 'Deep item 1 FR',
                  },
                },
                {
                  nodeType: 'translation',
                  translation: {
                    fr: 'Deep item 2 FR',
                  },
                },
              ],
            },
          },
        },
      },
    ];

    const result = mergeDictionaries(dictionaries);

    expect(result.result.content.level1.level2.level3).toHaveLength(2);
    expect(result.result.content.level1.level2.level3[0].translation).toEqual({
      en: 'Deep item 1 EN',
      fr: 'Deep item 1 FR',
    });
    expect(result.result.content.level1.level2.level3[1].translation).toEqual({
      en: 'Deep item 2 EN',
      fr: 'Deep item 2 FR',
    });
  });

  it('should handle the complex example from the user correctly', () => {
    const dictionaries: Dictionary[] = [
      {
        key: 'onboard-page',
        content: {
          title: {
            nodeType: 'translation',
            translation: {
              en: 'Onboarding',
            },
          },
          test: {
            test2: {
              test3: {
                nodeType: 'translation',
                translation: {
                  en: 'Test 3 en',
                },
              },
            },
            test4: {
              nodeType: 'translation',
              translation: {
                en: 'Test 4 en',
              },
            },
            test6: [
              {
                nodeType: 'translation',
                translation: {
                  en: 'Test 6 en',
                },
              },
              {
                nodeType: 'translation',
                translation: {
                  en: 'Test 7 en',
                },
              },
            ],
          },
          test5: {
            nodeType: 'translation',
            translation: {
              en: 'Test 5 en',
            },
          },
          description: {
            nodeType: 'translation',
            translation: {
              en: 'Set up your Intlayer account by following the instructions.',
            },
          },
        },
      },
      {
        key: 'onboard-page',
        content: {
          title: {
            nodeType: 'translation',
            translation: {
              fr: 'Configurer votre compte',
            },
          },
          test: {
            test2: {
              test3: {
                nodeType: 'translation',
                translation: {
                  fr: 'Test 3 fr',
                },
              },
            },
            test4: {
              nodeType: 'translation',
              translation: {
                fr: 'Test 4 fr',
              },
            },
            test6: [
              {
                nodeType: 'translation',
                translation: {
                  fr: 'Test 6 fr',
                },
              },
              {
                nodeType: 'translation',
                translation: {
                  fr: 'Test 7 fr',
                },
              },
            ],
          },
          test5: {
            nodeType: 'translation',
            translation: {
              fr: 'Test 5 fr',
            },
          },
          description: {
            nodeType: 'translation',
            translation: {
              fr: 'Suivez les instructions pour configurer votre compte Intlayer.',
            },
          },
        },
      },
    ];

    const result = mergeDictionaries(dictionaries);

    // Test that arrays are merged by index/position
    expect(result.result.content.test.test6).toHaveLength(2);
    expect(result.result.content.test.test6[0].translation).toEqual({
      en: 'Test 6 en',
      fr: 'Test 6 fr',
    });
    expect(result.result.content.test.test6[1].translation).toEqual({
      en: 'Test 7 en',
      fr: 'Test 7 fr',
    });

    // Test that other translations are merged correctly
    expect(result.result.content.title.translation).toEqual({
      en: 'Onboarding',
      fr: 'Configurer votre compte',
    });
    expect(result.result.content.test.test2.test3.translation).toEqual({
      en: 'Test 3 en',
      fr: 'Test 3 fr',
    });
    expect(result.result.content.test.test4.translation).toEqual({
      en: 'Test 4 en',
      fr: 'Test 4 fr',
    });
    expect(result.result.content.test5.translation).toEqual({
      en: 'Test 5 en',
      fr: 'Test 5 fr',
    });
    expect(result.result.content.description.translation).toEqual({
      en: 'Set up your Intlayer account by following the instructions.',
      fr: 'Suivez les instructions pour configurer votre compte Intlayer.',
    });
  });

  it('should merge arrays by element key when available, otherwise by index', () => {
    const dictionaries: Dictionary[] = [
      {
        key: 'array-key-merge-test',
        content: {
          items: [
            {
              key: 'first',
              nodeType: 'translation',
              translation: {
                en: 'First EN',
              },
            },
            {
              key: 'second',
              nodeType: 'translation',
              translation: {
                en: 'Second EN',
              },
            },
            {
              nodeType: 'translation',
              translation: {
                en: 'Index EN',
              },
            },
          ],
        },
      },
      {
        key: 'array-key-merge-test',
        content: {
          items: [
            {
              key: 'second',
              nodeType: 'translation',
              translation: {
                fr: 'Second FR',
              },
            },
            {
              key: 'first',
              nodeType: 'translation',
              translation: {
                fr: 'First FR',
              },
            },
            {
              nodeType: 'translation',
              translation: {
                fr: 'Index FR',
              },
            },
            {
              key: 'third',
              nodeType: 'translation',
              translation: {
                fr: 'Third FR',
              },
            },
          ],
        },
      },
    ];

    const result = mergeDictionaries(dictionaries);

    expect(result.result.content.items).toHaveLength(4);
    // Keyed items matched regardless of their positions
    expect(result.result.content.items[0].translation).toEqual({
      en: 'First EN',
      fr: 'First FR',
    });
    expect(result.result.content.items[1].translation).toEqual({
      en: 'Second EN',
      fr: 'Second FR',
    });
    // Unkeyed item falls back to index-based merge
    expect(result.result.content.items[2].translation).toEqual({
      en: 'Index EN',
      fr: 'Index FR',
    });
    // Additional source-only keyed item is appended
    expect(result.result.content.items[3].translation).toEqual({
      fr: 'Third FR',
    });
  });

  it('should return both result and mask in the merged output', () => {
    const dictionaries: Dictionary[] = [
      {
        key: 'mask-test',
        localId: 'local-1',
        content: {
          title: {
            nodeType: 'translation',
            translation: {
              en: 'Title EN',
            },
          },
        },
      },
      {
        key: 'mask-test',
        localId: 'local-2',
        content: {
          title: {
            nodeType: 'translation',
            translation: {
              fr: 'Title FR',
            },
          },
        },
      },
    ];

    const result = mergeDictionaries(dictionaries);

    // Check that result has both result and mask properties
    expect(result).toHaveProperty('result');
    expect(result).toHaveProperty('mask');

    // Check result structure
    expect(result.result.key).toBe('mask-test');
    expect(result.result.content.title.translation).toEqual({
      en: 'Title EN',
      fr: 'Title FR',
    });
    expect(result.result.localIds).toEqual(['local-1', 'local-2']);
    expect(result.result.filePath).toBeUndefined();
    expect(result.result.localId).toBeUndefined();
    expect(result.result.id).toBeUndefined();

    // Check mask structure
    expect(result.mask.key).toBe('mask-test');
    expect(result.mask.localId).toBe('local-2'); // Mask gets merged with later dictionaries
    expect(result.mask.content).toBeDefined();
  });

  it('should deep-merge object properties inside array elements (keyed and by index)', () => {
    const dictionaries: Dictionary[] = [
      {
        key: 'array-object-merge',
        content: {
          items: [
            {
              key: 'a',
              title: {
                nodeType: 'translation',
                translation: {
                  en: 'Hello',
                },
              },
              meta: {
                leftOnly: true,
                conflict: 'left',
                nested: {
                  keep: 'left',
                },
              },
              list: [
                {
                  nodeType: 'translation',
                  translation: {
                    en: 'L1 EN',
                  },
                },
              ],
            },
            {
              // Unkeyed element merges by index
              title: {
                nodeType: 'translation',
                translation: {
                  en: 'Index EN',
                },
              },
              meta: {
                onlyLeftIndex: 1,
              },
            },
          ],
        },
      },
      {
        key: 'array-object-merge',
        content: {
          items: [
            {
              key: 'a',
              title: {
                nodeType: 'translation',
                translation: {
                  fr: 'Bonjour',
                },
              },
              meta: {
                rightOnly: 42,
                conflict: 'right',
                nested: {
                  add: 'right',
                },
              },
              list: [
                {
                  nodeType: 'translation',
                  translation: {
                    fr: 'L1 FR',
                  },
                },
                {
                  nodeType: 'translation',
                  translation: {
                    fr: 'L2 FR',
                  },
                },
              ],
            },
            {
              title: {
                nodeType: 'translation',
                translation: {
                  fr: 'Index FR',
                },
              },
              meta: {
                onlyRightIndex: true,
              },
            },
            {
              key: 'b',
              meta: {
                extra: 'from second',
              },
            },
          ],
        },
      },
    ];

    const result = mergeDictionaries(dictionaries);

    // Order should follow the first dictionary for matched items, with new keyed items appended
    expect(result.result.content.items).toHaveLength(3);

    // Keyed merge: deep-merge nested objects and arrays, later dictionary overrides conflicts
    const keyed = result.result.content.items[0];
    expect(keyed.title.translation).toEqual({ en: 'Hello', fr: 'Bonjour' });
    expect(keyed.meta).toEqual({
      leftOnly: true,
      rightOnly: 42,
      conflict: 'right',
      nested: { keep: 'left', add: 'right' },
    });
    expect(keyed.list).toHaveLength(2);
    expect(keyed.list[0].translation).toEqual({ en: 'L1 EN', fr: 'L1 FR' });
    expect(keyed.list[1].translation).toEqual({ fr: 'L2 FR' });

    // Index merge: unkeyed elements at same index are deep-merged
    const byIndex = result.result.content.items[1];
    expect(byIndex.title.translation).toEqual({
      en: 'Index EN',
      fr: 'Index FR',
    });
    expect(byIndex.meta).toEqual({ onlyLeftIndex: 1, onlyRightIndex: true });

    // Additional keyed element from second dictionary is appended
    const appended = result.result.content.items[2];
    expect(appended.meta).toEqual({ extra: 'from second' });
  });
});
