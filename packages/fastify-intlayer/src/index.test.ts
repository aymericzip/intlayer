import Fastify from 'fastify';
import { describe, expect, it, vi } from 'vitest';
import { intlayer, t } from './index';

vi.mock('@intlayer/config/built', async (importOriginal) => {
  const builtConfiguration =
    await importOriginal<typeof import('@intlayer/config/built')>();

  return {
    ...builtConfiguration,
    internationalization: {
      ...builtConfiguration.internationalization,
      locales: ['en', 'fr'],
    },
  };
});

const waitForNextTimer = () =>
  new Promise<void>((resolve) => setTimeout(resolve, 5));

const buildServer = async () => {
  const server = Fastify();

  await server.register(intlayer);

  server.get('/translate-after-await', async () => {
    await waitForNextTimer();

    return t({ en: 'English', fr: 'Français' } as never);
  });

  server.get('/locale', async (request) => request.intlayer.locale);

  server.setErrorHandler((_error, _request, reply) => {
    reply
      .status(400)
      .send(t({ en: 'Invalid request', fr: 'Requête invalide' } as never));
  });

  server.post(
    '/validated',
    {
      schema: {
        body: {
          type: 'object',
          required: ['name'],
          properties: { name: { type: 'string' } },
        },
      },
    },
    async () => 'ok'
  );

  return server;
};

describe('fastify-intlayer', () => {
  it('keeps the request locale across awaits in the handler', async () => {
    const server = await buildServer();

    const response = await server.inject({
      url: '/translate-after-await',
      headers: { 'x-intlayer-locale': 'fr' },
    });

    expect(response.body).toBe('Français');
  });

  it('isolates the locale of concurrent requests', async () => {
    const server = await buildServer();

    const responses = await Promise.all(
      ['fr', 'en', 'fr'].map((locale) =>
        server.inject({
          url: '/translate-after-await',
          headers: { 'x-intlayer-locale': locale },
        })
      )
    );

    expect(responses.map((response) => response.body)).toEqual([
      'Français',
      'English',
      'Français',
    ]);
  });

  it('localizes errors raised before the handler, such as validation errors', async () => {
    const server = await buildServer();

    const response = await server.inject({
      method: 'POST',
      url: '/validated',
      headers: { 'x-intlayer-locale': 'fr' },
      payload: {},
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('Requête invalide');
  });

  it('reads the locale cookie without `@fastify/cookie`', async () => {
    const server = await buildServer();

    const response = await server.inject({
      url: '/locale',
      headers: { cookie: 'theme=dark; INTLAYER_LOCALE=fr' },
    });

    expect(response.body).toBe('fr');
  });

  it('negotiates the locale from the `Accept-Language` header', async () => {
    const server = await buildServer();

    const response = await server.inject({
      url: '/locale',
      headers: { 'accept-language': 'fr-CA,fr;q=0.9,en;q=0.5' },
    });

    expect(response.body).toBe('fr');
  });

  it('falls back to the default locale outside of a request', () => {
    expect(t({ en: 'English', fr: 'Français' } as never)).toBe('English');
  });
});
