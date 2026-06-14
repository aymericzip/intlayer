import type { Dictionary } from '@intlayer/types/dictionary';
import { For, Suspense } from 'solid-js';
import { render } from 'solid-js/web';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@intlayer/config/built', () => ({
  internationalization: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es'],
  },
  editor: { enabled: false },
  routing: { storage: { cookies: [], localStorage: [], sessionStorage: [] } },
}));

const heroDefault: Dictionary = {
  key: 'hero',
  variant: 'default',
  content: { headline: 'Welcome' },
};
const heroPromo: Dictionary = {
  key: 'hero',
  variant: 'promo',
  content: { headline: 'Up to 50% off' },
};

describe('useDictionaryDynamic integration (qualified)', () => {
  let dispose: VoidFunction | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    document.body.innerHTML = '';
  });

  it('resolves a qualified variant, loading only the targeted chunk', async () => {
    const { useDictionaryDynamic } = await import('./useDictionaryDynamic');

    const defaultLoader = vi.fn(() => Promise.resolve(heroDefault));
    const promoLoader = vi.fn(() => Promise.resolve(heroPromo));
    const loaderMap = {
      __intlayerQualifierTypes: ['variant'],
      en: { default: defaultLoader, promo: promoLoader },
    } as any;

    const App = () => {
      const hero = useDictionaryDynamic(loaderMap, 'hero', {
        variant: 'promo',
        locale: 'en',
      }) as any;

      return (
        <Suspense fallback={<span id="fallback">Loading</span>}>
          <span id="headline">{hero.headline.value}</span>
        </Suspense>
      );
    };

    const root = document.createElement('div');
    document.body.append(root);

    dispose = render(() => <App />, root);

    await vi.waitFor(() => {
      expect(root.querySelector('#headline')?.textContent).toBe(
        'Up to 50% off'
      );
    });

    // Only the targeted variant chunk is loaded.
    expect(promoLoader).toHaveBeenCalledTimes(1);
    expect(defaultLoader).not.toHaveBeenCalled();
  });

  it('resolves an open collection as a real array (renders through <For>)', async () => {
    const { useDictionaryDynamic } = await import('./useDictionaryDynamic');

    const faq1: Dictionary = { key: 'faq', item: 1, content: { q: 'First' } };
    const faq2: Dictionary = { key: 'faq', item: 2, content: { q: 'Second' } };
    const loaderMap = {
      __intlayerQualifierTypes: ['item'],
      en: {
        '1': vi.fn(() => Promise.resolve(faq1)),
        '2': vi.fn(() => Promise.resolve(faq2)),
      },
    } as any;

    const App = () => {
      const faqs = useDictionaryDynamic(loaderMap, 'faq', 'en') as any;

      return (
        <Suspense fallback={<span id="fallback">Loading</span>}>
          <ul>
            <For each={faqs}>{(entry: any) => <li>{entry.q.value}</li>}</For>
          </ul>
        </Suspense>
      );
    };

    const root = document.createElement('div');
    document.body.append(root);

    dispose = render(() => <App />, root);

    await vi.waitFor(() => {
      expect(root.querySelectorAll('li').length).toBe(2);
    });
    expect([...root.querySelectorAll('li')].map((l) => l.textContent)).toEqual([
      'First',
      'Second',
    ]);
  });
});
