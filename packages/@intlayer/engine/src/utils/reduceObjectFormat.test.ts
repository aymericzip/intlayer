import { describe, expect, it } from 'vitest';
import { reduceObjectFormat } from './reduceObjectFormat';

describe('reduceObjectFormat', () => {
  it('reduces flat object by format keys', () => {
    const source = { test1: 'test1', test2: 'test2' };
    const format = { test1: 'any' };
    expect(reduceObjectFormat(source, format)).toEqual({ test1: 'test1' });
  });

  it('handles missing keys in source as undefined', () => {
    const source = { test1: 'test1' } as const;
    const format = { test1: 'a', test2: 'b' } as const;
    expect(reduceObjectFormat(source, format)).toEqual({
      test1: 'test1',
      test2: undefined,
    });
  });

  it('reduces nested objects', () => {
    const source = { a: { x: 1, y: 2 }, b: 9 };
    const format = { a: { x: 0 } };
    expect(reduceObjectFormat(source, format)).toEqual({ a: { x: 1 } });
  });

  it('reduces arrays by index with the provided format array', () => {
    const source = {
      list: [
        { id: 1, name: 'A' },
        { id: 2, name: 'B', extra: true },
      ],
    };
    const format = { list: [{ id: 0 }, { id: 0 }] };
    expect(reduceObjectFormat(source, format)).toEqual({
      list: [{ id: 1 }, { id: 2 }],
    });
  });

  it('supports nested arrays and objects', () => {
    const source = { items: [{ meta: { x: 10, y: 20 }, skip: true }] };
    const format = { items: [{ meta: { y: 0 } }] };
    expect(reduceObjectFormat(source, format)).toEqual({
      items: [{ meta: { y: 20 } }],
    });
  });

  it('handles primitive format - returns source primitive', () => {
    expect(reduceObjectFormat('hello', 'fmt')).toEqual('hello');
    expect(reduceObjectFormat(123, 0)).toEqual(123);
    expect(reduceObjectFormat(null, null)).toEqual(null);
    expect(reduceObjectFormat(undefined, undefined)).toEqual(undefined);
  });

  it('handles non-object source when format is object by returning keys with undefined', () => {
    const source = 'not-an-object';
    const format = { a: 0, b: { c: 0 } };
    expect(reduceObjectFormat(source as unknown as object, format)).toEqual({
      a: undefined,
      b: { c: undefined },
    });
  });
});
