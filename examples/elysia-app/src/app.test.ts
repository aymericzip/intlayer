import { describe, expect, it } from 'bun:test';
import { t } from 'elysia-intlayer';
import { app } from './app';

const request = (path: string, headers: Record<string, string> = {}) =>
  app.handle(new Request(`http://localhost${path}`, { headers }));

const french = { cookie: 'INTLAYER_LOCALE=fr' };

describe('elysia-app', () => {
  it('translates with the standalone `t`', async () => {
    const response = await request('/', french);

    expect(await response.text()).toBe(
      'Exemple de contenu renvoyé en français'
    );
  });

  it('exposes the detected locale on the context', async () => {
    const response = await request('/context', {
      'accept-language': 'es-MX,es;q=0.9',
    });

    expect(await response.json()).toMatchObject({
      locale: 'es-MX',
      localeStorage: null,
      greeting: 'Hola (México)',
    });
  });

  it('keeps the request locale across awaits', async () => {
    const response = await request('/after-await', french);

    expect(await response.text()).toBe('Traduit après await');
  });

  it('isolates the locale of concurrent requests', async () => {
    const bodies = await Promise.all(
      [
        ['fr', 30],
        ['en', 0],
        ['es-ES', 15],
      ].map(async ([locale, delay]) => {
        const response = await request(`/after-await?delay=${delay}`, {
          'x-intlayer-locale': String(locale),
        });

        return response.text();
      })
    );

    expect(bodies).toEqual([
      'Traduit après await',
      'Translated after await',
      'Traducido después de await (España)',
    ]);
  });

  it('keeps the request locale for every chunk of a streamed response', async () => {
    const response = await request('/stream', french);

    expect(await response.text()).toBe('Morceau Morceau Morceau ');
  });

  it('reads dictionaries in the request locale', async () => {
    const byKey = await request('/getIntlayer', french);
    const byImport = await request('/getDictionary', french);

    expect(await byKey.text()).toBe(
      "Exemple de contenu d'erreur renvoyé en français"
    );
    expect(await byImport.text()).toBe(
      "Exemple de contenu d'erreur renvoyé en français"
    );
  });

  it('localizes messages rendered by an app-level error handler', async () => {
    const response = await request('/error', french);

    expect(response.status).toBe(500);
    expect(await response.json()).toMatchObject({
      message: "Une erreur s'est produite",
    });
  });

  it('falls back to the default locale outside of a request', () => {
    expect(
      t({ en: 'Hello', fr: 'Bonjour', 'es-ES': 'Hola', 'es-MX': 'Hola' })
    ).toBe('Hello');
  });
});
