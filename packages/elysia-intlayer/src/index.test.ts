import { resolveInterpreterLocale } from '@intlayer/core/interpreter';
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
  .get('/ambient', async ({ request }) => {
    // Lets a later request start before this one reads its locale
    await new Promise((resolve) =>
      setTimeout(resolve, Number(request.headers.get('x-delay') ?? 0))
    );

    return { locale: resolveInterpreterLocale() };
  })
  .get('/throwing', () => {
    throw new Error('Route failure');
  });

const appWithLifecycleHooks = new Elysia()
  .use(intlayer())
  .onError(() => ({ message: t(greeting) }))
  .mapResponse(({ responseValue }) =>
    responseValue === 'mapped' ? new Response(t(greeting)) : undefined
  )
  .get('/throwing', () => {
    throw new Error('Route failure');
  })
  .get('/mapped', () => 'mapped');

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

  it('resolves a bare dictionary read to each concurrent request locale', async () => {
    const readAmbientLocale = async (headers: Record<string, string>) => {
      const response = await app.handle(
        new Request('http://localhost/ambient', { headers })
      );

      return ((await response.json()) as { locale: string }).locale;
    };

    const [slowFrench, fastEnglish] = await Promise.all([
      readAmbientLocale({ cookie: 'INTLAYER_LOCALE=fr', 'x-delay': '30' }),
      readAmbientLocale({ cookie: 'INTLAYER_LOCALE=en', 'x-delay': '0' }),
    ]);

    expect(slowFrench).toBe('fr');
    expect(fastEnglish).toBe('en');
    expect(resolveInterpreterLocale()).toBe('en');
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

  it('exposes the request locale to app-level `onError` hooks', async () => {
    const response = await appWithLifecycleHooks.handle(
      new Request('http://localhost/throwing', {
        headers: { cookie: 'INTLAYER_LOCALE=fr' },
      })
    );

    expect(await response.json()).toEqual({ message: 'Bonjour' });
  });

  it('exposes the request locale to app-level `mapResponse` hooks', async () => {
    const response = await appWithLifecycleHooks.handle(
      new Request('http://localhost/mapped', {
        headers: { cookie: 'INTLAYER_LOCALE=fr' },
      })
    );

    expect(await response.text()).toBe('Bonjour');
  });

  it('never exposes the request locale to the caller of `app.handle`', async () => {
    const pendingResponse = app.handle(
      new Request('http://localhost/', {
        headers: { cookie: 'INTLAYER_LOCALE=fr' },
      })
    );

    // Synchronously after the call, then once the response is ready
    expect(t(greeting)).toBe('Hello');
    await pendingResponse;
    expect(t(greeting)).toBe('Hello');
  });
});
