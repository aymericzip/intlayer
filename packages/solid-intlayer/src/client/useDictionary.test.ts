import { createRoot } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en'] },
}));

vi.mock('@intlayer/config/built', () => ({
  default: mockConfig,
  editor: mockConfig.editor,
  internationalization: mockConfig.internationalization,
}));

vi.mock('./useLocaleStorage', () => ({
  getLocaleInStorage: () => undefined,
  setLocaleInStorage: () => undefined,
}));

const dictionary = {
  key: 'shared-transform',
  content: { title: 'Title' },
};

describe('useDictionary transform scoping', () => {
  it('builds content per component, so no reader holds elements another owns', async () => {
    const { useDictionary } = await import('./useDictionary');

    /** Mounts a reader in its own root; returns the node and the disposer. */
    const mountReader = () =>
      createRoot((dispose) => {
        const content = useDictionary(dictionary as never, 'en' as never) as {
          title: unknown;
        };

        return { title: content.title, dispose };
      });

    const first = mountReader();
    const second = mountReader();

    // Each reader's content is built under its own owner.
    expect(second.title).not.toBe(first.title);

    first.dispose();
    second.dispose();
  });
});
