import { COOKIE_NAME } from '@intlayer/config/defaultValues';

/**
 * Drop-in replacement for next-intl's `setLocale()` server action.
 *
 * Writes the locale to the `INTLAYER_LOCALE` cookie so the next request
 * picks it up. Must be called inside a Server Action.
 *
 * @example
 * ```ts
 * 'use server';
 * await setLocale('fr');
 * ```
 */
export const setLocale = async (locale: string): Promise<void> => {
  const { cookies } = await import('next/headers.js');
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale, {
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
  });
};
