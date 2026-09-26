import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { Suspense } from 'solid-js';
import { render } from 'solid-js/web';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@intlayer/config/built', () => {
  const internationalization = { defaultLocale: 'en', locales: ['en', 'fr'] };
  return { internationalization, default: { internationalization } };
});

vi.mock('./useLocaleStorage', () => ({
  getLocaleInStorage: () => undefined,
  setLocaleInStorage: () => undefined,
}));

import {
  IntlayerProviderContent,
  useIntlayerContext,
} from './IntlayerProvider';
import { useLoadDynamic } from './useLoadDynamic';

describe('useLoadDynamic integration', () => {
  let dispose: VoidFunction | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    document.body.innerHTML = '';
  });

  it('uses real createResource with Suspense and forwards the resolved value', async () => {
    let resolveLoader:
      | ((value: { message: { value: string } }) => void)
      | undefined;
    const loader = vi.fn(
      () =>
        new Promise<{ message: { value: string } }>((resolve) => {
          resolveLoader = resolve;
        })
    );
    const App = () => {
      const content = useLoadDynamic('integration.en', loader);

      return (
        <Suspense fallback={<span id="fallback">Loading</span>}>
          <span id="message">{content.message.value}</span>
        </Suspense>
      );
    };
    const root = document.createElement('div');
    document.body.append(root);

    dispose = render(() => <App />, root);

    expect(loader).toHaveBeenCalledTimes(1);
    expect(root.querySelector('#fallback')?.textContent).toBe('Loading');

    resolveLoader?.({ message: { value: 'Loaded' } });

    await vi.waitFor(() => {
      expect(root.querySelector('#message')?.textContent).toBe('Loaded');
    });
    expect(root.querySelector('#fallback')).toBeNull();
  });

  it('keeps the settled content when the provider switches locale', async () => {
    const resolvers = new Map<
      string,
      (value: { message: { value: string } }) => void
    >();
    const loader = vi.fn(
      (source: string) =>
        new Promise<{ message: { value: string } }>((resolve) => {
          resolvers.set(source, resolve);
        })
    );
    let setLocale: ((locale: LocalesValues) => void) | undefined;
    const Message = () => {
      const context = useIntlayerContext();
      const content = useLoadDynamic(
        () => `switch.${context.locale()}`,
        loader
      );
      setLocale = context.setLocale;

      return <span id="message">{content.message.value}</span>;
    };
    const root = document.createElement('div');
    document.body.append(root);

    dispose = render(
      () => (
        <IntlayerProviderContent locale="en">
          <Suspense fallback={<span id="fallback">Loading</span>}>
            <Message />
          </Suspense>
        </IntlayerProviderContent>
      ),
      root
    );

    resolvers.get('switch.en')?.({ message: { value: 'Hello' } });

    await vi.waitFor(() => {
      expect(root.querySelector('#message')?.textContent).toBe('Hello');
    });

    setLocale?.('fr');

    await vi.waitFor(() => {
      expect(loader).toHaveBeenCalledTimes(2);
    });
    expect(root.querySelector('#fallback')).toBeNull();
    expect(root.querySelector('#message')?.textContent).toBe('Hello');

    resolvers.get('switch.fr')?.({ message: { value: 'Bonjour' } });

    await vi.waitFor(() => {
      expect(root.querySelector('#message')?.textContent).toBe('Bonjour');
    });
  });
});
