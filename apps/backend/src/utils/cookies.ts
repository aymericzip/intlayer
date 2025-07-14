import type { CookieOptions } from 'express';

export const MAX_AGE = 3 * 24 * 60 * 60 * 1000; // 3 days

export enum Cookies {
  AUTH_SESSION_TOKEN = 'intlayer_auth',
  JWT_USER = 'intlayer_user',
  JWT_ORGANIZATION = 'intlayer_organization',
  JWT_PROJECT = 'intlayer_project',
  XSRF_TOKEN = 'XSRF-TOKEN',
}

export const getCookieOptions = (
  overwriteOption: Partial<CookieOptions> = {}
): CookieOptions => ({
  maxAge: MAX_AGE,
  path: '/',
  domain: `.${process.env.DOMAIN}`,
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Enable for HTTPS in production
  sameSite: 'none',
  priority: 'high',
  ...overwriteOption,
});

export const getClearCookieOptions = (
  overwriteOption: Partial<CookieOptions> = {}
): CookieOptions => ({
  ...getCookieOptions(),
  maxAge: 1,
  ...overwriteOption,
});
