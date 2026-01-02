import { describe, expect, it } from 'vitest';
import { checkConfigConsistency } from './checkConfigConsistency';

describe('checkConfigConsistency', () => {
  describe('should pass when configurations match', () => {
    it('should pass for identical flat objects', () => {
      const subset = { a: 1, b: 'test', c: true };
      const superset = { a: 1, b: 'test', c: true };

      expect(() => checkConfigConsistency(subset, superset)).not.toThrow();
    });

    it('should pass when subset is a subset of superset', () => {
      const subset = { a: 1, b: 'test' };
      const superset = { a: 1, b: 'test', c: true, d: 'extra' };

      expect(() => checkConfigConsistency(subset, superset)).not.toThrow();
    });

    it('should pass for nested objects with matching values', () => {
      const subset = {
        editor: {
          clientId: '123',
          clientSecret: 'secret',
        },
      };
      const superset = {
        editor: {
          clientId: '123',
          clientSecret: 'secret',
        },
        other: 'value',
      };

      expect(() => checkConfigConsistency(subset, superset)).not.toThrow();
    });

    it('should pass for deeply nested objects', () => {
      const subset = {
        level1: {
          level2: {
            level3: {
              value: 'test',
            },
          },
        },
      };
      const superset = {
        level1: {
          level2: {
            level3: {
              value: 'test',
            },
          },
        },
        extra: 'data',
      };

      expect(() => checkConfigConsistency(subset, superset)).not.toThrow();
    });

    it('should pass for null values', () => {
      const subset = { a: null, b: 'test' };
      const superset = { a: null, b: 'test', c: true };

      expect(() => checkConfigConsistency(subset, superset)).not.toThrow();
    });

    it('should pass for undefined values', () => {
      const subset = { a: undefined, b: 'test' };
      const superset = { a: undefined, b: 'test', c: true };

      expect(() => checkConfigConsistency(subset, superset)).not.toThrow();
    });

    it('should pass for boolean values', () => {
      const subset = { enabled: true, disabled: false };
      const superset = { enabled: true, disabled: false, extra: 'value' };

      expect(() => checkConfigConsistency(subset, superset)).not.toThrow();
    });

    it('should pass for number values', () => {
      const subset = { count: 42, price: 99.99 };
      const superset = { count: 42, price: 99.99, extra: 'value' };

      expect(() => checkConfigConsistency(subset, superset)).not.toThrow();
    });

    it('should pass for empty objects', () => {
      const subset = {};
      const superset = { a: 1, b: 2 };

      expect(() => checkConfigConsistency(subset, superset)).not.toThrow();
    });
  });

  describe('should throw when configurations do not match', () => {
    it('should throw for mismatched primitive values', () => {
      const subset = { a: 1 };
      const superset = { a: 2 };

      expect(() => checkConfigConsistency(subset, superset)).toThrow(
        'Configuration mismatch at key "a"'
      );
    });

    it('should throw for mismatched string values', () => {
      const subset = { name: 'test' };
      const superset = { name: 'different' };

      expect(() => checkConfigConsistency(subset, superset)).toThrow(
        'Configuration mismatch at key "name"'
      );
    });

    it('should throw for mismatched boolean values', () => {
      const subset = { enabled: true };
      const superset = { enabled: false };

      expect(() => checkConfigConsistency(subset, superset)).toThrow(
        'Configuration mismatch at key "enabled"'
      );
    });

    it('should throw for mismatched nested object values', () => {
      const subset = {
        editor: {
          clientId: '123',
        },
      };
      const superset = {
        editor: {
          clientId: '456',
        },
      };

      expect(() => checkConfigConsistency(subset, superset)).toThrow(
        'Configuration mismatch at key "clientId"'
      );
    });

    it('should throw for deeply nested mismatches', () => {
      const subset = {
        level1: {
          level2: {
            level3: {
              value: 'old',
            },
          },
        },
      };
      const superset = {
        level1: {
          level2: {
            level3: {
              value: 'new',
            },
          },
        },
      };

      expect(() => checkConfigConsistency(subset, superset)).toThrow(
        'Configuration mismatch at key "value"'
      );
    });

    it('should throw for null vs undefined mismatch', () => {
      const subset = { a: null };
      const superset = { a: undefined };

      expect(() => checkConfigConsistency(subset, superset)).toThrow(
        'Configuration mismatch at key "a"'
      );
    });

    it('should throw for type mismatches', () => {
      const subset = { value: '123' };
      const superset = { value: 123 };

      expect(() => checkConfigConsistency(subset, superset)).toThrow(
        'Configuration mismatch at key "value"'
      );
    });

    it('should throw for missing keys in superset', () => {
      const subset = { a: 1, b: 2 };
      const superset = { a: 1 };
      // Note: This will throw because subset has 'b' but superset doesn't
      // The function checks all keys in subset, so if 'b' is missing in superset,
      // superset['b'] will be undefined, which won't match subset['b'] = 2

      expect(() => checkConfigConsistency(subset, superset)).toThrow();
    });
  });

  describe('edge cases', () => {
    it('should handle arrays correctly (should not recurse into arrays)', () => {
      const subset = { items: [1, 2, 3] };
      const superset = { items: [1, 2, 3], extra: 'value' };

      // Arrays are compared directly, not recursively
      expect(() => checkConfigConsistency(subset, superset)).not.toThrow();
    });

    it('should throw for mismatched arrays', () => {
      const subset = { items: [1, 2, 3] };
      const superset = { items: [1, 2, 4] };

      expect(() => checkConfigConsistency(subset, superset)).toThrow(
        'Configuration mismatch at key "items"'
      );
    });

    it('should handle empty nested objects', () => {
      const subset = { nested: {} };
      const superset = { nested: {}, extra: 'value' };

      expect(() => checkConfigConsistency(subset, superset)).not.toThrow();
    });

    it('should handle complex real-world configuration scenario', () => {
      const subset = {
        editor: {
          clientId: 'abc123',
          clientSecret: 'secret123',
        },
        locales: ['en', 'fr'],
        middleware: {
          enabled: true,
        },
      };
      const superset = {
        editor: {
          clientId: 'abc123',
          clientSecret: 'secret123',
        },
        locales: ['en', 'fr'],
        middleware: {
          enabled: true,
        },
        ai: {
          apiKey: 'key123',
        },
      };

      expect(() => checkConfigConsistency(subset, superset)).not.toThrow();
    });

    it('should throw for real-world configuration mismatch', () => {
      const subset = {
        editor: {
          clientId: 'abc123',
          clientSecret: 'secret123',
        },
      };
      const superset = {
        editor: {
          clientId: 'different-id',
          clientSecret: 'secret123',
        },
      };

      expect(() => checkConfigConsistency(subset, superset)).toThrow(
        'Configuration mismatch at key "clientId"'
      );
    });
  });
});
