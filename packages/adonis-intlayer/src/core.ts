import type { HttpContext } from '@adonisjs/core/http';
import { getConfiguration } from '@intlayer/config/node';
import { getTranslation } from '@intlayer/core/interpreter';
import { getLocaleFromStorageServer } from '@intlayer/core/utils';
import type { Locale } from '@intlayer/types/allLocales';
import type { StrictModeLocaleMap } from '@intlayer/types/module_augmentation';
import { createNamespace } from 'cls-hooked';

export const configuration = getConfiguration();
export const { internationalization } = configuration;

export const appNamespace = createNamespace('app');

/**
 * Retrieves the locale from storage (cookies, headers).
 */
export const getStorageLocale = (ctx: HttpContext): Locale | undefined =>
  getLocaleFromStorageServer({
    getCookie: (name: string) => ctx.request.cookie(name),
    getHeader: (name: string) => ctx.request.header(name),
  });

/**
 * Translation function for context
 */
export const translateFunction =
  (ctx: HttpContext) =>
  <T extends string>(
    content: StrictModeLocaleMap<T> | string,
    locale?: Locale
  ): T => {
    const { locale: currentLocale, defaultLocale } = ctx as unknown as {
      locale: Locale;
      defaultLocale: Locale;
    };

    const targetLocale = locale ?? currentLocale;

    if (typeof content === 'undefined') {
      return '' as unknown as T;
    }

    if (typeof content === 'string') {
      return content as unknown as T;
    }

    if (
      typeof content?.[
        targetLocale as unknown as keyof StrictModeLocaleMap<T>
      ] === 'undefined'
    ) {
      if (
        typeof content?.[
          defaultLocale as unknown as keyof StrictModeLocaleMap<T>
        ] === 'undefined'
      ) {
        return content as unknown as T;
      } else {
        return getTranslation(content, defaultLocale);
      }
    }

    return getTranslation(content, targetLocale);
  };
