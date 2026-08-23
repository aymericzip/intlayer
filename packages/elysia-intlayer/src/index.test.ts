import { Elysia } from 'elysia';
import { describe, expect, it } from 'vitest';
import { intlayer, t } from './index';

const greeting = {
  en: 'Hello',
  fr: 'Bonjour',
} as const;

const app = new Elysia()
  .use(intlayer())
  .get('/', ({ intlayer }) => ({
    locale: intlayer.locale,
    localeStorage: intlayer.locale_storage ?? null,
    localeDetected: intlayer.locale_detected,
    contextTranslation: intlayer.t(greeting),
    globalTranslation: t(greeting),
  }))
  .get('/throwing', () => {
    throw new Error('Route failure');
  });

const request = async (headers: Record<string, string>) => {
  const response = await app.handle(
    new Request('http://localhost/', { headers })
  );

  return response.json() as Promise<{
    locale: string;
    localeStorage: string | null;
    localeDetected: string;
    contextTranslation: string;
    globalTranslation: string;
  }>;
};

describe('elysia-intlayer', () => {
  it('detects the locale from the `Accept-Language` header', async () => {
    const result = await request({ 'accept-language': 'fr-FR,fr;q=0.9' });

    expect(result.localeDetected).toBe('fr');
    expect(result.locale).toBe('fr');
    expect(result.localeStorage).toBeNull();
    expect(result.contextTranslation).toBe('Bonjour');
  });

  it('gives precedence to the locale stored in the cookie', async () => {
    const result = await request({
      'accept-language': 'en-US,en;q=0.9',
      cookie: 'INTLAYER_LOCALE=fr',
    });

    expect(result.localeDetected).toBe('en');
    expect(result.localeStorage).toBe('fr');
    expect(result.locale).toBe('fr');
    expect(result.contextTranslation).toBe('Bonjour');
  });

  it('gives precedence to the locale stored in the header', async () => {
    const result = await request({
      'accept-language': 'en-US,en;q=0.9',
      'x-intlayer-locale': 'fr',
    });

    expect(result.localeStorage).toBe('fr');
    expect(result.locale).toBe('fr');
  });

  it('exposes the request locale to the standalone `t` export', async () => {
    const result = await request({ 'accept-language': 'fr-FR,fr;q=0.9' });

    expect(result.globalTranslation).toBe('Bonjour');
  });

  it('falls back to the default locale outside of a request', async () => {
    await request({ 'accept-language': 'fr-FR,fr;q=0.9' });

    expect(t(greeting)).toBe('Hello');
  });

  it('releases the request context when the route throws', async () => {
    const response = await app.handle(
      new Request('http://localhost/throwing', {
        headers: { 'accept-language': 'fr-FR,fr;q=0.9' },
      })
    );

    expect(response.status).toBe(500);
    expect(t(greeting)).toBe('Hello');
  });
});
