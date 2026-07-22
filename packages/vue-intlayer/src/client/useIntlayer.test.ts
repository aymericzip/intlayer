import { describe, expect, it, vi } from 'vitest';
import { createApp } from 'vue';
import { useIntlayer } from './useIntlayer';

vi.mock('../getIntlayer', () => ({
  getIntlayer: vi.fn(() => ({
    title: 'Hello World',
    // Simulates a plain callable content node (enumeration/condition/
    // gender/insertion accessors compile down to plain functions, not
    // IntlayerNode objects).
    quantity: (count: number) => (count > 1 ? 'many' : 'one'),
    items: [{ name: 'a' }, { name: 'b' }],
  })),
}));

/**
 * `useIntlayer` calls `inject()`, which requires an active component/app
 * context. `app.runWithContext` provides that without mounting a full
 * component tree.
 */
const withAppContext = <T>(fn: () => T): T => {
  const app = createApp({});
  return app.runWithContext(fn);
};

describe('useIntlayer', () => {
  it('keeps plain function content callable', () => {
    const content = withAppContext(() => useIntlayer('benchmark' as any));

    expect(typeof content.quantity).toBe('function');
    expect(content.quantity(1)).toBe('one');
    expect(content.quantity(5)).toBe('many');
  });

  it('keeps native array methods bound to their receiver', () => {
    const content = withAppContext(() => useIntlayer('benchmark' as any));

    expect(content.items.map((o: any) => o.name)).toEqual(['a', 'b']);
  });
});
