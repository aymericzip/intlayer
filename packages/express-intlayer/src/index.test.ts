import { resolveInterpreterLocale } from '@intlayer/core/interpreter';
import type { NextFunction, Request, Response } from 'express';
import { describe, expect, it } from 'vitest';
import { intlayer, t } from './index';

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

  it('keeps the request locale for the standalone `t` across awaits', async () => {
    const translation = await new Promise<string>((resolve, reject) => {
      const request = {
        cookies: { INTLAYER_LOCALE: 'fr' },
        headers: {},
      } as unknown as Request;
      const response = { locals: {} } as unknown as Response;

      const next: NextFunction = async () => {
        await new Promise((resolveTimer) => setTimeout(resolveTimer, 5));
        await Promise.resolve();

        resolve(t({ en: 'Hello', fr: 'Bonjour' } as never));
      };

      Promise.resolve(intlayer()(request, response, next)).catch(reject);
    });

    expect(translation).toBe('Bonjour');
  });

  it('reads the locale cookie without `cookie-parser`', () => {
    const request = {
      headers: { cookie: 'theme=dark; INTLAYER_LOCALE=fr' },
    } as unknown as Request;
    const response = { locals: {} } as unknown as Response;

    intlayer()(request, response, () => {});

    expect(response.locals.locale).toBe('fr');
    expect(response.locals.t({ en: 'Hello', fr: 'Bonjour' })).toBe('Bonjour');
  });

  it('negotiates the locale from the `Accept-Language` header', () => {
    const request = {
      headers: { 'accept-language': 'fr-CA,fr;q=0.9,en;q=0.5' },
    } as unknown as Request;
    const response = { locals: {} } as unknown as Response;

    intlayer()(request, response, () => {});

    expect(response.locals.locale_storage).toBeUndefined();
    expect(response.locals.locale_detected).toBe('fr');
  });
});
