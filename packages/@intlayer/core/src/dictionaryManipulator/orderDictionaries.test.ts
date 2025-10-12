import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Dictionary } from '../types/dictionary';
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
    location?: 'locale' | 'remote',
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
    const remote1 = createMockDictionary('test3', 'remote', 'remote-1');
    const remote2 = createMockDictionary('test4', 'remote', 'remote-2');

    const dictionaries = [remote1, local1, remote2, local2];
    const result = orderDictionaries(dictionaries);

    expect(result).toEqual([local1, local2, remote1, remote2]);
  });

  it('should order remote dictionaries first when strategy is remote_first', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const local2 = createMockDictionary('test2', 'locale', 'local-2');
    const remote1 = createMockDictionary('test3', 'remote', 'remote-1');
    const remote2 = createMockDictionary('test4', 'remote', 'remote-2');

    const dictionaries = [local1, remote1, local2, remote2];

    // Create a custom configuration for this test
    const customConfig = {
      editor: {
        dictionaryPriorityStrategy: 'remote_first' as const,
      },
      internationalization: {},
      middleware: {},
      content: {},
      log: {},
      build: {},
    } as any;

    const result = orderDictionaries(dictionaries, customConfig);

    expect(result).toEqual([remote1, remote2, local1, local2]);
  });

  it('should preserve relative order within local dictionaries', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const local2 = createMockDictionary('test2', 'locale', 'local-2');
    const local3 = createMockDictionary('test3', 'locale', 'local-3');
    const remote1 = createMockDictionary('test4', 'remote', 'remote-1');

    const dictionaries = [remote1, local3, local1, local2];
    const result = orderDictionaries(dictionaries);

    expect(result).toEqual([local3, local1, local2, remote1]);
  });

  it('should preserve relative order within remote dictionaries', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const remote1 = createMockDictionary('test2', 'remote', 'remote-1');
    const remote2 = createMockDictionary('test3', 'remote', 'remote-2');
    const remote3 = createMockDictionary('test4', 'remote', 'remote-3');

    const dictionaries = [local1, remote3, remote1, remote2];

    // Create a custom configuration for this test
    const customConfig = {
      editor: {
        dictionaryPriorityStrategy: 'remote_first' as const,
      },
      internationalization: {},
      middleware: {},
      content: {},
      log: {},
      build: {},
    } as any;

    const result = orderDictionaries(dictionaries, customConfig);

    expect(result).toEqual([remote3, remote1, remote2, local1]);
  });

  it('should handle only local dictionaries', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const local2 = createMockDictionary('test2', 'locale', 'local-2');
    const local3 = createMockDictionary('test3', 'locale', 'local-3');

    const dictionaries = [local3, local1, local2];
    const result = orderDictionaries(dictionaries);

    expect(result).toEqual([local3, local1, local2]);
  });

  it('should handle only remote dictionaries', () => {
    const remote1 = createMockDictionary('test1', 'remote', 'remote-1');
    const remote2 = createMockDictionary('test2', 'remote', 'remote-2');
    const remote3 = createMockDictionary('test3', 'remote', 'remote-3');

    const dictionaries = [remote3, remote1, remote2];
    const result = orderDictionaries(dictionaries);

    expect(result).toEqual([remote3, remote1, remote2]);
  });

  it('should handle dictionaries with undefined location as local', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const undefinedLocation = createMockDictionary(
      'test2',
      undefined,
      'local-2'
    );
    const remote1 = createMockDictionary('test3', 'remote', 'remote-1');

    const dictionaries = [remote1, undefinedLocation, local1];
    const result = orderDictionaries(dictionaries);

    expect(result).toEqual([undefinedLocation, local1, remote1]);
  });

  it('should handle mixed location types correctly with local_first strategy', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const undefinedLocation = createMockDictionary(
      'test2',
      undefined,
      'local-2'
    );
    const remote1 = createMockDictionary('test3', 'remote', 'remote-1');
    const local2 = createMockDictionary('test4', 'locale', 'local-3');

    const dictionaries = [remote1, undefinedLocation, local1, local2];
    const result = orderDictionaries(dictionaries);

    expect(result).toEqual([undefinedLocation, local1, local2, remote1]);
  });

  it('should handle mixed location types correctly with remote_first strategy', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const undefinedLocation = createMockDictionary(
      'test2',
      undefined,
      'local-2'
    );
    const remote1 = createMockDictionary('test3', 'remote', 'remote-1');
    const local2 = createMockDictionary('test4', 'locale', 'local-3');

    const dictionaries = [local1, undefinedLocation, remote1, local2];

    // Create a custom configuration for this test
    const customConfig = {
      editor: {
        dictionaryPriorityStrategy: 'remote_first' as const,
      },
      internationalization: {},
      middleware: {},
      content: {},
      log: {},
      build: {},
    } as any;

    const result = orderDictionaries(dictionaries, customConfig);

    expect(result).toEqual([remote1, local1, undefinedLocation, local2]);
  });

  it('should not mutate the original array', () => {
    const local1 = createMockDictionary('test1', 'locale', 'local-1');
    const remote1 = createMockDictionary('test2', 'remote', 'remote-1');
    const originalDictionaries = [remote1, local1];

    const result = orderDictionaries(originalDictionaries);

    // Original array should remain unchanged
    expect(originalDictionaries).toEqual([remote1, local1]);
    // Result should be a new array
    expect(result).not.toBe(originalDictionaries);
    expect(result).toEqual([local1, remote1]);
  });

  it('should handle large arrays efficiently', () => {
    const dictionaries: Dictionary[] = [];

    // Create 100 local dictionaries
    for (let i = 0; i < 100; i++) {
      dictionaries.push(
        createMockDictionary(`local-${i}`, 'locale', `local-${i}`)
      );
    }

    // Create 50 remote dictionaries
    for (let i = 0; i < 50; i++) {
      dictionaries.push(
        createMockDictionary(`remote-${i}`, 'remote', `remote-${i}`)
      );
    }

    const result = orderDictionaries(dictionaries);

    expect(result).toHaveLength(150);

    // First 100 should be local
    for (let i = 0; i < 100; i++) {
      expect(result[i].location).not.toBe('remote');
    }

    // Last 50 should be remote
    for (let i = 100; i < 150; i++) {
      expect(result[i].location).toBe('remote');
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
      location: 'remote',
      content: {},
    };
    const autoFilledDistant: Dictionary = {
      key: 'k',
      location: 'remote',
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
      location: 'remote',
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

  it('should use remote_first to break ties after priority and autoFilled', () => {
    const localA: Dictionary = {
      key: 'k',
      location: 'locale',
      priority: 1,
      content: {},
    };
    const remoteA: Dictionary = {
      key: 'k',
      location: 'remote',
      priority: 1,
      content: {},
    };

    const customConfig = {
      editor: {
        dictionaryPriorityStrategy: 'remote_first' as const,
      },
      internationalization: {},
      middleware: {},
      content: {},
      log: {},
      build: {},
    } as any;

    const ordered = orderDictionaries([localA, remoteA], customConfig);

    expect(ordered[0]).toBe(remoteA);
    expect(ordered[1]).toBe(localA);
  });
});
