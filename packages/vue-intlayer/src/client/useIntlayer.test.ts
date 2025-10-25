import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp, defineComponent, nextTick, type Ref, ref } from 'vue';

// Mock getIntlayer used inside the composable under test
vi.mock('../getIntlayer', () => ({
  getIntlayer: vi.fn(),
}));

import { getIntlayer } from '../getIntlayer';
import { INTLAYER_SYMBOL, type IntlayerProvider } from './installIntlayer';
import { isUpdatableNode, useIntlayer } from './useIntlayer';

const getIntlayerMock = getIntlayer as unknown as ReturnType<typeof vi.fn> & {
  mockImplementation: typeof vi.fn.prototype.mockImplementation;
  mockClear: typeof vi.fn.prototype.mockClear;
};

describe('useIntlayer', () => {
  beforeEach(() => {
    getIntlayerMock.mockClear();
    getIntlayerMock.mockImplementation((key: any, locale: any) => ({
      foo: `${String(key)}:${String(locale)}`,
    }));
  });

  it('throws if used without provider', () => {
    const Comp = defineComponent({
      setup() {
        // key can be any string at runtime
        useIntlayer(ref('k1') as any);
        return {};
      },
      template: '<div />',
    });

    const app = createApp(Comp);
    const el = document.createElement('div');

    expect(() => app.mount(el)).toThrow(
      'useIntlayer must be used under <IntlayerProvider>'
    );
  });

  it('uses provider locale and updates when key or locale change', async () => {
    const keyRef = ref('k1') as Ref<any>;
    const provider: IntlayerProvider = {
      locale: ref('en' as any) as any,
      setLocale: (l) => {
        (provider.locale as any).value = l as any;
      },
    };

    const vm = (() => {
      const Comp = defineComponent({
        setup() {
          const res = useIntlayer(keyRef);
          return { foo: res.foo };
        },
        template: '<div />',
      });

      const app = createApp(Comp);
      app.provide(INTLAYER_SYMBOL, provider);
      const el = document.createElement('div');
      return app.mount(el) as any;
    })();

    await nextTick();
    expect(vm.foo).toBe('k1:en');
    expect(getIntlayerMock).toHaveBeenCalledWith('k1', 'en');

    provider.setLocale('fr' as any);
    await nextTick();
    expect(vm.foo).toBe('k1:fr');
    expect(getIntlayerMock).toHaveBeenCalledWith('k1', 'fr');

    keyRef.value = 'k2' as any;
    await nextTick();
    expect(vm.foo).toBe('k2:fr');
    expect(getIntlayerMock).toHaveBeenCalledWith('k2', 'fr');
  });

  it('prefers explicit locale param and reacts to its changes', async () => {
    const keyRef = ref('k1') as Ref<any>;
    const explicitLocale = ref('de') as Ref<any>;
    const provider: IntlayerProvider = {
      locale: ref('en' as any) as any,
      setLocale: (l) => {
        (provider.locale as any).value = l as any;
      },
    };

    const vm = (() => {
      const Comp = defineComponent({
        setup() {
          const res = useIntlayer(keyRef, explicitLocale);
          return { foo: res.foo };
        },
        template: '<div />',
      });

      const app = createApp(Comp);
      app.provide(INTLAYER_SYMBOL, provider);
      const el = document.createElement('div');
      return app.mount(el) as any;
    })();

    await nextTick();
    expect(vm.foo).toBe('k1:de');
    expect(getIntlayerMock).toHaveBeenCalledWith('k1', 'de');

    // Changing provider locale should not affect when explicit locale is provided
    provider.setLocale('fr' as any);
    await nextTick();
    expect(vm.foo).toBe('k1:de');

    // Changing explicit locale should update
    explicitLocale.value = 'es' as any;
    await nextTick();
    expect(vm.foo).toBe('k1:es');
    expect(getIntlayerMock).toHaveBeenCalledWith('k1', 'es');
  });
});

describe('isUpdatableNode', () => {
  it('returns true for object with __update function', () => {
    const obj = { __update: () => {} };
    expect(isUpdatableNode(obj)).toBe(true);
  });

  it('returns false for non-object or missing __update', () => {
    expect(isUpdatableNode(null)).toBe(false);
    expect(isUpdatableNode(undefined)).toBe(false);
    expect(isUpdatableNode(123)).toBe(false);
    expect(isUpdatableNode('x')).toBe(false);
    expect(isUpdatableNode({})).toBe(false);
  });
});
