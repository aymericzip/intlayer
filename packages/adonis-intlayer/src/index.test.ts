import { IncomingMessage } from 'node:http';
import { Socket } from 'node:net';
import {
  HttpContextFactory,
  RequestFactory,
} from '@adonisjs/core/factories/http';
import * as Locales from '@intlayer/types/locales';
import { describe, expect, it, vi } from 'vitest';

// Mock heavy deps before any imports that transitively load them.
const mockConfig = vi.hoisted(() => ({
  internationalization: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
  editor: { enabled: false },
}));

vi.mock('@intlayer/config/node', () => ({
  getConfiguration: vi.fn(() => mockConfig),
}));

vi.mock('@intlayer/config/built', async (importOriginal) => {
  const builtConfiguration =
    await importOriginal<typeof import('@intlayer/config/built')>();

  return {
    ...builtConfiguration,
    default: mockConfig,
    internationalization: {
      ...builtConfiguration.internationalization,
      ...mockConfig.internationalization,
    },
  };
});

vi.mock('@intlayer/engine/build', () => ({
  prepareIntlayerServer: vi.fn(),
}));

import type { HttpContext } from '@adonisjs/core/http';
import { getLocale, IntlayerMiddleware, t } from './index';

/**
 * Runs the middleware for a request whose `INTLAYER_LOCALE` cookie is `locale`,
 * then translates after `delay` milliseconds from within the request scope.
 */
const translateInRequest = async (locale: string, delay: number) => {
  const context = {
    request: {
      cookie: (name: string) =>
        name === 'INTLAYER_LOCALE' ? locale : undefined,
      header: () => undefined,
      headers: () => ({}),
    },
  } as unknown as HttpContext;

  let translation = '';

  await new IntlayerMiddleware().handle(context, async () => {
    await new Promise((resolve) => setTimeout(resolve, delay));
    await Promise.resolve();

    translation = `${t({ en: 'Hello', fr: 'Bonjour' })}:${getLocale()}`;
  });

  return translation;
};

describe('adonis-intlayer', () => {
  describe('t', () => {
    it('should return the translation for the default locale when context is not initialized', () => {
      const translations = {
        en: 'Hello',
        fr: 'Bonjour',
      };

      // Should fallback to default locale (English)
      expect(t(translations)).toBe('Hello');
    });

    it('should return the translation for a specific locale when passed as argument', () => {
      const translations = {
        en: 'Hello',
        fr: 'Bonjour',
      };

      expect(t(translations, Locales.FRENCH)).toBe('Bonjour');
    });
  });

  describe('getLocale', () => {
    it('should return the default locale when context is not initialized', () => {
      expect(getLocale()).toBe(Locales.ENGLISH);
    });

    it('should return the locale passed as argument when context is not initialized', () => {
      expect(getLocale(Locales.FRENCH)).toBe(Locales.FRENCH);
    });
  });

  describe('IntlayerMiddleware', () => {
    it('keeps the request locale for the standalone helpers across awaits', async () => {
      expect(await translateInRequest('fr', 5)).toBe('Bonjour:fr');
    });

    it('isolates the locale of concurrent requests', async () => {
      const translations = await Promise.all([
        translateInRequest('fr', 30),
        translateInRequest('en', 0),
      ]);

      expect(translations).toEqual(['Bonjour:fr', 'Hello:en']);
    });
  });

  describe('IntlayerMiddleware with a real AdonisJS request', () => {
    const createContext = (headers: Record<string, string>) => {
      const incomingMessage = new IncomingMessage(new Socket());
      Object.assign(incomingMessage.headers, headers);

      const request = new RequestFactory()
        .merge({ req: incomingMessage })
        .create();

      return new HttpContextFactory().merge({ request }).create();
    };

    const readLocale = async (headers: Record<string, string>) => {
      let locale = '';

      await new IntlayerMiddleware().handle(createContext(headers), () => {
        locale = getLocale();
      });

      return locale;
    };

    it('reads the plain locale cookie set by the Intlayer client', async () => {
      expect(await readLocale({ cookie: 'INTLAYER_LOCALE=fr' })).toBe('fr');
    });

    it('negotiates the locale from the `Accept-Language` header', async () => {
      expect(
        await readLocale({ 'accept-language': 'fr-CA,fr;q=0.9,en;q=0.5' })
      ).toBe('fr');
    });
  });
});
