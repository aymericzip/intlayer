import { Hono } from 'hono';
import { describe, expect, it } from 'vitest';
import { intlayer, t } from './index';

const greeting = { en: 'Hello', fr: 'Bonjour' } as never;

const app = new Hono()
  .use('*', intlayer())
  .get('/after-await', async (context) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Number(context.req.query('delay') ?? 5))
    );
    await Promise.resolve();

    return context.text(t(greeting));
  })
  .get('/throwing', () => {
    throw new Error('Route failure');
  });

const request = async (path: string, locale: string) => {
  const response = await app.request(path, {
    headers: { cookie: `INTLAYER_LOCALE=${locale}` },
  });

  return response.text();
};

describe('hono-intlayer', () => {
  it('keeps the request locale for the standalone `t` across awaits', async () => {
    expect(await request('/after-await', 'fr')).toBe('Bonjour');
  });

  it('isolates the locale of concurrent requests', async () => {
    const translations = await Promise.all([
      request('/after-await?delay=30', 'fr'),
      request('/after-await?delay=0', 'en'),
    ]);

    expect(translations).toEqual(['Bonjour', 'Hello']);
  });

  it('settles the request when the route throws', async () => {
    const response = await app.request('/throwing', {
      headers: { cookie: 'INTLAYER_LOCALE=fr' },
    });

    expect(response.status).toBe(500);
  });

  it('falls back to the default locale outside of a request', () => {
    expect(t(greeting)).toBe('Hello');
  });
});
