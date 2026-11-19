import type { Dictionary } from '@intlayer/types/dictionary';
import { act, render } from '@testing-library/react';
import { type FC, Suspense } from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.hoisted(() => {
  process.env.INTLAYER_NODE_TYPE_MARKDOWN = 'false';
  process.env.INTLAYER_NODE_TYPE_HTML = 'false';
});

const mockConfig = vi.hoisted(() => ({
  editor: { enabled: false },
  analytics: { enabled: false },
  internationalization: { defaultLocale: 'en', locales: ['en', 'fr'] },
}));

vi.mock('./useLocaleStorage', () => ({
  localeInStorage: undefined,
  getLocaleInStorage: () => undefined,
  setLocaleInStorage: () => undefined,
}));

vi.mock('@intlayer/config/built', () => ({
  ...mockConfig,
  default: mockConfig,
}));

vi.mock('../editor', () => ({
  ContentSelector: ({ children }: { children: unknown }) => children,
}));

vi.mock('../editor/useEditedContentRenderer', () => ({
  EditedContentRenderer: ({ children }: { children: unknown }) => children,
}));

import { useDictionaryDynamic } from './useDictionaryDynamic';

type LocaleLoaders = Record<'en' | 'fr', () => Promise<Dictionary>>;

const createLoaders = (key: string): LocaleLoaders => {
  const createDictionary = (title: string) =>
    ({ key, content: { title } }) as unknown as Dictionary;

  return {
    en: vi.fn(async () => createDictionary(`${key}-en`)),
    fr: vi.fn(async () => createDictionary(`${key}-fr`)),
  };
};

const createReader =
  (key: string, loaders: LocaleLoaders): FC<{ locale: 'en' | 'fr' }> =>
  ({ locale }) => {
    const content = useDictionaryDynamic(
      loaders as never,
      key as never,
      locale as never
    ) as unknown as { title: string };

    return <span>{content.title}</span>;
  };

describe('warmDynamicLocale', () => {
  it('starts every rendered dictionary of a locale on its first miss', async () => {
    const firstLoaders = createLoaders('warm-first');
    const secondLoaders = createLoaders('warm-second');
    const FirstReader = createReader('warm-first', firstLoaders);
    const SecondReader = createReader('warm-second', secondLoaders);

    const Page: FC<{ locale: 'en' | 'fr' }> = ({ locale }) => (
      <Suspense fallback="loading">
        <FirstReader locale={locale} />
        <SecondReader locale={locale} />
      </Suspense>
    );

    const view = render(<Page locale="en" />);
    await act(async () => {});
    expect(view.container.textContent).toBe('warm-first-enwarm-second-en');

    // A renderer that stops at the first suspension never reaches the second
    // reader; the warm-up must have started its chunk anyway.
    const FirstOnly: FC = () => (
      <Suspense fallback="loading">
        <FirstReader locale="fr" />
      </Suspense>
    );
    render(<FirstOnly />);

    expect(firstLoaders.fr).toHaveBeenCalled();
    expect(secondLoaders.fr).toHaveBeenCalledTimes(1);

    view.rerender(<Page locale="fr" />);
    await act(async () => {});
    expect(view.container.textContent).toBe('warm-first-frwarm-second-fr');
  });
});
