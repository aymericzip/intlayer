import Fastify, { type FastifyInstance } from 'fastify';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { csrfMiddleware } from './csrf.middleware';

const SESSION_COOKIE = 'intlayer.session_token=abc123';

/**
 * A bare Fastify instance carrying only the guard, so the test exercises the
 * real hook lifecycle — in particular that a rejected request short-circuits
 * before its handler runs.
 */
const buildApp = (): FastifyInstance => {
  const app = Fastify();
  app.addHook('onRequest', csrfMiddleware);

  app.post('/api/dictionary', async () => ({ reached: true }));
  app.get('/api/dictionary', async () => ({ reached: true }));
  app.post('/api/auth/sign-in/email', async () => ({ reached: true }));

  return app;
};

let app: FastifyInstance;
let savedAppUrl: string | undefined;

beforeEach(() => {
  savedAppUrl = process.env.APP_URL;
  process.env.APP_URL = 'https://app.intlayer.org';
  app = buildApp();
});

afterEach(async () => {
  await app.close();
  if (savedAppUrl === undefined) delete process.env.APP_URL;
  else process.env.APP_URL = savedAppUrl;
});

describe('csrfMiddleware', () => {
  it('blocks a forged write before the handler runs', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/dictionary',
      headers: { cookie: SESSION_COOKIE, origin: 'https://evil.com' },
    });

    expect(response.statusCode).toBe(403);
    expect(response.json()).toMatchObject({
      error: { code: 'CSRF_ORIGIN_REJECTED' },
    });
    expect(response.payload).not.toContain('reached');
  });

  it('lets the dashboard through', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/dictionary',
      headers: { cookie: SESSION_COOKIE, origin: 'https://app.intlayer.org' },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ reached: true });
  });

  it('lets a Bearer client through from any origin', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/dictionary',
      headers: {
        origin: 'https://a-customer-website.com',
        authorization: 'Bearer access-token',
      },
    });

    expect(response.statusCode).toBe(200);
  });

  it('lets reads through from any origin', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api/dictionary',
      headers: { cookie: SESSION_COOKIE, origin: 'https://evil.com' },
    });

    expect(response.statusCode).toBe(200);
  });

  it('leaves better-auth endpoints to better-auth own origin check', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/auth/sign-in/email?foo=1',
      headers: { cookie: SESSION_COOKIE, origin: 'https://evil.com' },
    });

    expect(response.statusCode).toBe(200);
  });
});
