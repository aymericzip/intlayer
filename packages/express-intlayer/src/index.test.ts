import { resolveInterpreterLocale } from '@intlayer/core/interpreter';
import type { NextFunction, Request, Response } from 'express';
import { describe, expect, it } from 'vitest';
import { intlayer } from './index';

/**
 * Runs the middleware for a request carrying `cookies`, then reads the bare
 * interpreter locale after `delay` milliseconds, from within the request scope.
 */
const readAmbientLocale = (
  cookies: Record<string, string>,
  delay: number
): Promise<string> =>
  new Promise((resolve, reject) => {
    const request = { cookies, headers: {} } as unknown as Request;
    const response = { locals: {} } as unknown as Response;

    const next: NextFunction = () => {
      setTimeout(() => resolve(resolveInterpreterLocale()), delay);
    };

    Promise.resolve(intlayer()(request, response, next)).catch(reject);
  });

describe('express-intlayer', () => {
  it('resolves a bare dictionary read to each concurrent request locale', async () => {
    const [slowFrench, fastEnglish] = await Promise.all([
      readAmbientLocale({ INTLAYER_LOCALE: 'fr' }, 30),
      readAmbientLocale({ INTLAYER_LOCALE: 'en' }, 0),
    ]);

    expect(slowFrench).toBe('fr');
    expect(fastEnglish).toBe('en');
  });

  it('falls back to the default locale outside of a request', async () => {
    await readAmbientLocale({ INTLAYER_LOCALE: 'fr' }, 0);

    expect(resolveInterpreterLocale()).toBe('en');
  });
});
