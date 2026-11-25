// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';

vi.mock('@intlayer/config/built', () => {
  const config = {
    internationalization: { locales: ['en', 'fr'], defaultLocale: 'en' },
    routing: {
      storage: { cookies: [], localStorage: [], sessionStorage: [] },
    },
    editor: { enabled: false },
  };
  return { ...config, default: config };
});

// Interpretation is covered elsewhere: expose the raw content.
vi.mock('../getDictionary', () => ({
  getDictionary: (dictionary: { content: unknown }) => dictionary.content,
}));

import { getIntlayerClient } from './installIntlayer';
import { useDictionaryDynamic } from './useDictionaryDynamic';

/** A fresh plain loader map, so every test starts with an empty cache. */
const createLoaders = () => ({
  en: () => Promise.resolve({ key: 'message', content: { title: 'Hello' } }),
  fr: () => Promise.resolve({ key: 'message', content: { title: 'Bonjour' } }),
});

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

/** First call starts the load; the second returns the loaded content. */
const readLoaded = async (
  loaders: ReturnType<typeof createLoaders>,
  locale?: 'en' | 'fr'
) => {
  useDictionaryDynamic(loaders as never, 'message' as never, locale as never);
  await flushPromises();

  const received: unknown[] = [];
  const content = useDictionaryDynamic(
    loaders as never,
    'message' as never,
    locale as never
  ).onChange((nextContent) => received.push(nextContent));

  return { content, received };
};

describe('useDictionaryDynamic', () => {
  it('follows setLocale once the first locale has loaded', async () => {
    const client = getIntlayerClient();
    client.setLocale('en');

    const { content, received } = await readLoaded(createLoaders());

    expect(content).toMatchObject({ title: 'Hello' });

    client.setLocale('fr');
    await flushPromises();

    expect(received.at(-1)).toMatchObject({ title: 'Bonjour' });
  });

  it('keeps a locale pinned at the call site across setLocale', async () => {
    const client = getIntlayerClient();
    client.setLocale('en');

    const { received } = await readLoaded(createLoaders(), 'en');

    client.setLocale('fr');
    await flushPromises();

    expect(received.at(-1)).toMatchObject({ title: 'Hello' });
  });
});
