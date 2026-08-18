import { describe, expect, it, vi } from 'vitest';
import { createApp, toDisplayString, toRaw } from 'vue';
import { useDictionary } from './useDictionary';

vi.mock('../getDictionary', () => ({
  getDictionary: vi.fn(() => ({
    title: 'Hello World',
    // Simulates a plain callable content node (enumeration/condition/
    // gender/insertion accessors compile down to plain functions, not
    // IntlayerNode objects).
    quantity: (count: number) => (count > 1 ? 'many' : 'one'),
    items: ['a', 'b'],
    nested: { level1: { level2: 'deep' } },
  })),
}));

/**
 * `useDictionary` calls `inject()`, which requires an active component/app
 * context. `app.runWithContext` provides that without mounting a full
 * component tree.
 */
const withAppContext = <T>(fn: () => T): T => {
  const app = createApp({});
  return app.runWithContext(fn);
};

const getContent = () =>
  withAppContext(() => useDictionary({ key: 'benchmark' } as any)) as any;

describe('useDictionary', () => {
  it('keeps plain function content callable', () => {
    const content = getContent();

    expect(typeof content.quantity).toBe('function');
    expect(content.quantity(1)).toBe('one');
    expect(content.quantity(5)).toBe('many');
  });

  it('renders an array field as text instead of throwing', () => {
    const content = getContent();

    // Vue's `toDisplayString` falls back to `String(value)` for the content
    // proxy, so `Symbol.toPrimitive` has to yield a primitive.
    expect(toDisplayString(content.items)).toBe('a,b');
  });

  it('renders an object field as text instead of throwing', () => {
    const content = getContent();

    expect(() => toDisplayString(content.nested)).not.toThrow();
  });

  it('renders a string field as its value', () => {
    const content = getContent();

    expect(toDisplayString(content.title)).toBe('Hello World');
    expect(toDisplayString(content.nested.level1.level2)).toBe('deep');
  });

  it('coerces an object-like content node in string contexts', () => {
    const content = getContent();

    expect(`${content.items}`).toBe('a,b');
  });

  it('does not answer Vue internal lookups with a nested proxy', () => {
    const content = getContent();

    // `toRaw` follows `__v_raw` until it is falsy — a proxy there loops.
    expect(content.__v_raw).toBeUndefined();
    expect(content.__v_isReactive).toBeUndefined();
    expect(toRaw(content)).toBe(content);
  });

  it('stays awaitable (no thenable trap)', async () => {
    const content = getContent();

    await expect(Promise.resolve(content)).resolves.toBe(content);
  });
});
