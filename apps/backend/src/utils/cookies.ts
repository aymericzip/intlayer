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
  // In production, use 'lax' SameSite policy which allows the cookie to be sent when users navigate to our site from external links
  // In development, use 'none' to allow cross-site cookie access which is needed for local development across different ports/domains
  sameSite: 'strict',
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
