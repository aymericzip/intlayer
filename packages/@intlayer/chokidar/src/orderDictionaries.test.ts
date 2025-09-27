import type { Dictionary } from '@intlayer/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { orderDictionaries } from './orderDictionaries';

// Mock the configuration
vi.mock('@intlayer/config/built', () => ({
  default: {
    editor: {
      dictionaryPriorityStrategy: 'local_first',
    },
  },
}));

describe('orderDictionaries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createMockDictionary = (
    key: string,
    location?: 'locale' | 'distant',
    localId?: string
  ): Dictionary => ({
    key,
    location: location || 'locale',
    content: { title: 'Test' },
    localId,
  });

  it('should return empty array for empty input', () => {
    const result = orderDictionaries([]);
    expect(result).toEqual([]);
  });

  it('should return single dictionary unchanged', () => {
    const dictionary = createMockDictionary('test');
    const result = orderDictionaries([dictionary]);
    expect(result).toEqual([dictionary]);
  });

  it('should order local dictionaries first when strategy is local_first', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const local2 = createMockDictionary('test2', 'locale', 'local-2');
    const distant1 = createMockDictionary('test3', 'distant', 'distant-1');
    const distant2 = createMockDictionary('test4', 'distant', 'distant-2');

    const dictionaries = [distant1, local1, distant2, local2];
    const result = orderDictionaries(dictionaries);

    expect(result).toEqual([local1, local2, distant1, distant2]);
  });

  it('should order distant dictionaries first when strategy is distant_first', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const local2 = createMockDictionary('test2', 'locale', 'local-2');
    const distant1 = createMockDictionary('test3', 'distant', 'distant-1');
    const distant2 = createMockDictionary('test4', 'distant', 'distant-2');

    const dictionaries = [local1, distant1, local2, distant2];
    
    // Create a custom configuration for this test
    const customConfig = {
      editor: {
        dictionaryPriorityStrategy: 'distant_first' as const,
      },
      internationalization: {},
      middleware: {},
      content: {},
      log: {},
      build: {},
    } as any;
    
    const result = orderDictionaries(dictionaries, customConfig);

    expect(result).toEqual([distant1, distant2, local1, local2]);
  });

  it('should preserve relative order within local dictionaries', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const local2 = createMockDictionary('test2', 'locale', 'local-2');
    const local3 = createMockDictionary('test3', 'locale', 'local-3');
    const distant1 = createMockDictionary('test4', 'distant', 'distant-1');

    const dictionaries = [distant1, local3, local1, local2];
    const result = orderDictionaries(dictionaries);

    expect(result).toEqual([local3, local1, local2, distant1]);
  });

  it('should preserve relative order within distant dictionaries', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const distant1 = createMockDictionary('test2', 'distant', 'distant-1');
    const distant2 = createMockDictionary('test3', 'distant', 'distant-2');
    const distant3 = createMockDictionary('test4', 'distant', 'distant-3');

    const dictionaries = [local1, distant3, distant1, distant2];
    
    // Create a custom configuration for this test
    const customConfig = {
      editor: {
        dictionaryPriorityStrategy: 'distant_first' as const,
      },
      internationalization: {},
      middleware: {},
      content: {},
      log: {},
      build: {},
    } as any;
    
    const result = orderDictionaries(dictionaries, customConfig);

    expect(result).toEqual([distant3, distant1, distant2, local1]);
  });

  it('should handle only local dictionaries', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const local2 = createMockDictionary('test2', 'locale', 'local-2');
    const local3 = createMockDictionary('test3', 'locale', 'local-3');

    const dictionaries = [local3, local1, local2];
    const result = orderDictionaries(dictionaries);

    expect(result).toEqual([local3, local1, local2]);
  });

  it('should handle only distant dictionaries', () => {
    const distant1 = createMockDictionary('test1', 'distant', 'distant-1');
    const distant2 = createMockDictionary('test2', 'distant', 'distant-2');
    const distant3 = createMockDictionary('test3', 'distant', 'distant-3');

    const dictionaries = [distant3, distant1, distant2];
    const result = orderDictionaries(dictionaries);

    expect(result).toEqual([distant3, distant1, distant2]);
  });

  it('should handle dictionaries with undefined location as local', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const undefinedLocation = createMockDictionary(
      'test2',
      undefined,
      'local-2'
    );
    const distant1 = createMockDictionary('test3', 'distant', 'distant-1');

    const dictionaries = [distant1, undefinedLocation, local1];
    const result = orderDictionaries(dictionaries);

    expect(result).toEqual([undefinedLocation, local1, distant1]);
  });

  it('should handle mixed location types correctly with local_first strategy', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const undefinedLocation = createMockDictionary(
      'test2',
      undefined,
      'local-2'
    );
    const distant1 = createMockDictionary('test3', 'distant', 'distant-1');
    const local2 = createMockDictionary('test4', 'locale', 'local-3');

    const dictionaries = [distant1, undefinedLocation, local1, local2];
    const result = orderDictionaries(dictionaries);

    expect(result).toEqual([undefinedLocation, local1, local2, distant1]);
  });

  it('should handle mixed location types correctly with distant_first strategy', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const undefinedLocation = createMockDictionary(
      'test2',
      undefined,
      'local-2'
    );
    const distant1 = createMockDictionary('test3', 'distant', 'distant-1');
    const local2 = createMockDictionary('test4', 'locale', 'local-3');

    const dictionaries = [local1, undefinedLocation, distant1, local2];
    
    // Create a custom configuration for this test
    const customConfig = {
      editor: {
        dictionaryPriorityStrategy: 'distant_first' as const,
      },
      internationalization: {},
      middleware: {},
      content: {},
      log: {},
      build: {},
    } as any;
    
    const result = orderDictionaries(dictionaries, customConfig);

    expect(result).toEqual([distant1, local1, undefinedLocation, local2]);
  });

  it('should not mutate the original array', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const distant1 = createMockDictionary('test2', 'distant', 'distant-1');
    const originalDictionaries = [distant1, local1];

    const result = orderDictionaries(originalDictionaries);

    // Original array should remain unchanged
    expect(originalDictionaries).toEqual([distant1, local1]);
    // Result should be a new array
    expect(result).not.toBe(originalDictionaries);
    expect(result).toEqual([local1, distant1]);
  });

  it('should handle large arrays efficiently', () => {
    const dictionaries: Dictionary[] = [];

    // Create 100 local dictionaries
    for (let i = 0; i < 100; i++) {
      dictionaries.push(
        createMockDictionary(`local-${i}`, 'locale', `local-${i}`)
      );
    }

    // Create 50 distant dictionaries
    for (let i = 0; i < 50; i++) {
      dictionaries.push(
        createMockDictionary(`distant-${i}`, 'distant', `distant-${i}`)
      );
    }

    const result = orderDictionaries(dictionaries);

    expect(result).toHaveLength(150);

    // First 100 should be local
    for (let i = 0; i < 100; i++) {
      expect(result[i].location).not.toBe('distant');
    }

    // Last 50 should be distant
    for (let i = 100; i < 150; i++) {
      expect(result[i].location).toBe('distant');
    }
  });

  it('should place non-autoFilled before autoFilled (autoFilled have lower precedence)', () => {
    const baseLocal: Dictionary = {
      key: 'k',
      location: 'locale',
      content: {},
    };
    const autoFilledLocal: Dictionary = {
      key: 'k',
      location: 'locale',
      autoFilled: true,
      content: {},
    };
    const baseDistant: Dictionary = {
      key: 'k',
      location: 'distant',
      content: {},
    };
    const autoFilledDistant: Dictionary = {
      key: 'k',
      location: 'distant',
      autoFilled: true,
      content: {},
    };

    const ordered = orderDictionaries([
      autoFilledDistant,
      baseLocal,
      autoFilledLocal,
      baseDistant,
    ]);

    // All non-autoFilled should come first (order among them respects strategy/local_first default)
    expect(ordered.slice(0, 2).every((d) => !d.autoFilled)).toBe(true);
    expect(ordered.slice(2).every((d) => d.autoFilled)).toBe(true);
  });

  it('should order by higher priority first, then by strategy', () => {
    const lowPriorityLocal: Dictionary = {
      key: 'k',
      location: 'locale',
      priority: 1,
      content: {},
    };
    const highPriorityDistant: Dictionary = {
      key: 'k',
      location: 'distant',
      priority: 10,
      content: {},
    };
    const midPriorityLocal: Dictionary = {
      key: 'k',
      location: 'locale',
      priority: 5,
      content: {},
    };

    const ordered = orderDictionaries([
      lowPriorityLocal,
      highPriorityDistant,
      midPriorityLocal,
    ]);

    // Desc priority: 10, 5, 1 irrespective of location when priorities differ
    expect(ordered[0]).toBe(highPriorityDistant);
    expect(ordered[1]).toBe(midPriorityLocal);
    expect(ordered[2]).toBe(lowPriorityLocal);
  });

  it('should use distant_first to break ties after priority and autoFilled', () => {
    const localA: Dictionary = {
      key: 'k',
      location: 'locale',
      priority: 1,
      content: {},
    };
    const distantA: Dictionary = {
      key: 'k',
      location: 'distant',
      priority: 1,
      content: {},
    };

    const customConfig = {
      editor: {
        dictionaryPriorityStrategy: 'distant_first' as const,
      },
      internationalization: {},
      middleware: {},
      content: {},
      log: {},
      build: {},
    } as any;

    const ordered = orderDictionaries([localA, distantA], customConfig);

    expect(ordered[0]).toBe(distantA);
    expect(ordered[1]).toBe(localA);
  });
});
