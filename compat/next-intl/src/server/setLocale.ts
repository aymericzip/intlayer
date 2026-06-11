import { setLocaleInStorageServer } from '@intlayer/core/utils';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import { cookies } from 'next/headers.js';

/**
 * Drop-in replacement for next-intl's `setLocale()` server action.
 *
 * Writes the locale to whichever cookie(s) the active `routing.storage`
 * configuration specifies. When `createNextIntlPlugin` is used (the default),
 * this is `NEXT_LOCALE`; when the user has configured a custom storage in
 * `intlayer.config.ts`, that name is used instead.
 *
 * Must be called inside a Server Action.
 *
 * @example
 * ```ts
 * 'use server';
 * await setLocale('fr');
 * ```
 */
export const setLocale = async (locale: string): Promise<void> => {
  const cookieStore = await cookies();

  setLocaleInStorageServer(locale as LocalesValues, {
    setCookieStore: (name, value, attributes) => {
      cookieStore.set(name, value, {
        ...(attributes ?? {}),
        path: attributes?.path ?? '/',
        sameSite: (attributes?.sameSite as 'lax') ?? 'lax',
        httpOnly: attributes?.httpOnly ?? false,
        secure: attributes?.secure ?? process.env.NODE_ENV === 'production',
      });
    },
  });
};
