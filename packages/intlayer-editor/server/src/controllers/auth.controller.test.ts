// @vitest-environment node
import Fastify from 'fastify';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@services/editorAuth.service', () => ({}));
vi.mock('@intlayer/config/node', () => ({ getConfiguration: () => ({}) }));

const { assertSameOrigin } = await import('./auth.controller');

const createApp = () => {
  const app = Fastify();
  app.addHook('onRequest', assertSameOrigin);
  app.get('/', async () => 'ok');
  return app;
};

describe('assertSameOrigin', () => {
  it('accepts same-origin requests', async () => {
    const response = await createApp().inject({
      url: '/',
      headers: { host: 'localhost:8000', 'sec-fetch-site': 'same-origin' },
    });

    expect(response.statusCode).toBe(200);
  });

  it('accepts requests without browser headers', async () => {
    const response = await createApp().inject({ url: '/' });

    expect(response.statusCode).toBe(200);
  });

  it('rejects cross-site fetches', async () => {
    const response = await createApp().inject({
      url: '/',
      headers: { host: 'localhost:8000', 'sec-fetch-site': 'cross-site' },
    });

    expect(response.statusCode).toBe(403);
  });

  it('rejects a foreign or opaque origin', async () => {
    const foreignResponse = await createApp().inject({
      url: '/',
      headers: { host: 'localhost:8000', origin: 'https://evil.example' },
    });
    const opaqueResponse = await createApp().inject({
      url: '/',
      headers: { host: 'localhost:8000', origin: 'null' },
    });

    expect(foreignResponse.statusCode).toBe(403);
    expect(opaqueResponse.statusCode).toBe(403);
  });
});
