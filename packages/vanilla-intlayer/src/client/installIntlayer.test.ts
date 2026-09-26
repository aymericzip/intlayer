// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';

vi.mock('@intlayer/config/built', () => {
  const config = {
    internationalization: { locales: ['en', 'fr'], defaultLocale: 'en' },
    routing: {
      storage: {
        cookies: [{ name: 'INTLAYER_LOCALE', attributes: {} }],
        localStorage: [],
        sessionStorage: [],
      },
    },
    editor: { enabled: false },
  };
  return { ...config, default: config };
});

import { IntlayerClient } from './installIntlayer';

describe('IntlayerClient initial locale', () => {
  it('starts from the stored locale when none is passed', () => {
    // biome-ignore lint/suspicious/noDocumentCookie: seeds the stored locale
    document.cookie = 'INTLAYER_LOCALE=fr';

    expect(new IntlayerClient().locale).toBe('fr');
    expect(new IntlayerClient('en').locale).toBe('en');
  });
});
