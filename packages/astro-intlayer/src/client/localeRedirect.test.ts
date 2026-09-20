// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest';
import { getStoredLocaleRedirect } from './localeRedirect';

const mockStoredLocale = vi.hoisted(() =>
  vi.fn((): string | undefined => undefined)
);

vi.mock('@intlayer/core/utils', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@intlayer/core/utils')>()),
  getLocaleFromStorageClient: () => mockStoredLocale(),
}));

const url = (path: string) => new URL(`http://localhost:4321${path}`);

describe('getStoredLocaleRedirect', () => {
  afterEach(() => {
    delete process.env.INTLAYER_ROUTING_ENABLE_PROXY;
  });

  it('stays put when nothing is stored', () => {
    expect(getStoredLocaleRedirect(url('/'), false)).toBeUndefined();
  });

  it('stays put when the stored locale is the default one', () => {
    mockStoredLocale.mockReturnValue('en');

    expect(getStoredLocaleRedirect(url('/about'), false)).toBeUndefined();
  });

  it('sends an unlocalized page to the stored locale, keeping search and hash', () => {
    mockStoredLocale.mockReturnValue('fr');

    expect(getStoredLocaleRedirect(url('/'), false)).toBe('/fr');
    expect(getStoredLocaleRedirect(url('/about?tab=1#team'), false)).toBe(
      '/fr/about?tab=1#team'
    );
  });

  it('lets the URL win over the stored locale', () => {
    mockStoredLocale.mockReturnValue('fr');

    expect(getStoredLocaleRedirect(url('/en/about'), false)).toBeUndefined();
    expect(getStoredLocaleRedirect(url('/fr/about'), false)).toBeUndefined();
  });

  it('ignores the stored locale on a dev server in auto mode', () => {
    mockStoredLocale.mockReturnValue('fr');

    expect(getStoredLocaleRedirect(url('/'), true)).toBeUndefined();
  });

  it('honours the stored locale on a dev server when the proxy is forced', () => {
    process.env.INTLAYER_ROUTING_ENABLE_PROXY = 'true';
    mockStoredLocale.mockReturnValue('fr');

    expect(getStoredLocaleRedirect(url('/'), true)).toBe('/fr');
  });

  it('does nothing when the proxy is disabled', () => {
    process.env.INTLAYER_ROUTING_ENABLE_PROXY = 'false';
    mockStoredLocale.mockReturnValue('fr');

    expect(getStoredLocaleRedirect(url('/'), false)).toBeUndefined();
  });
});
