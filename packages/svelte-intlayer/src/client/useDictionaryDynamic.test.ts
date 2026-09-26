import { get } from 'svelte/store';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@intlayer/config/built', () => {
  const internationalization = { defaultLocale: 'en', locales: ['en', 'fr'] };
  return { internationalization, default: { internationalization } };
});

vi.mock('./intlayerContext', () => ({
  getIntlayerContext: () => undefined,
}));

// Interpretation is covered elsewhere: expose the raw content.
vi.mock('../getDictionary', () => ({
  getDictionary: (dictionary: { content: unknown }) => dictionary.content,
}));

import { intlayerStore } from './intlayerStore';
import { useDictionaryDynamic } from './useDictionaryDynamic';

type MessageDictionary = { key: 'message'; content: { title: string } };

/** Loader map whose chunks resolve only when the test says so. */
const createDeferredLoaders = () => {
  const resolvers = new Map<string, (dictionary: MessageDictionary) => void>();
  const createLoader = (locale: string) => () =>
    new Promise<MessageDictionary>((resolve) => {
      resolvers.set(locale, resolve);
    });

  return {
    loaders: { en: createLoader('en'), fr: createLoader('fr') },
    resolve: (locale: string, title: string) =>
      resolvers.get(locale)?.({ key: 'message', content: { title } }),
  };
};

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('useDictionaryDynamic', () => {
  afterEach(() => {
    intlayerStore.reset();
  });

  it('keeps the resolved content, flagged as loading, while the next locale loads', async () => {
    const { loaders, resolve } = createDeferredLoaders();
    const content = useDictionaryDynamic(loaders as never, 'message' as never);
    const unsubscribe = content.subscribe(() => {});

    expect(get(content).isLoading).toBe(true);

    resolve('en', 'Hello');
    await flushPromises();

    expect(get(content)).toMatchObject({ title: 'Hello', isLoading: false });

    intlayerStore.setLocale('fr');

    expect(get(content)).toMatchObject({ title: 'Hello', isLoading: true });

    resolve('fr', 'Bonjour');
    await flushPromises();

    expect(get(content)).toMatchObject({ title: 'Bonjour', isLoading: false });

    unsubscribe();
  });
});
