'use server';

import { cookies, headers } from 'next/headers';
import { defaultLocale, type Locale, locales } from '@/i18n.config';

const KNOWN_LOCALES = new Set(locales as readonly string[]);

const normalize = (value: string | undefined): Locale | undefined => {
  if (!value) return undefined;
  const base = value.toLowerCase().split('-')[0];
  return KNOWN_LOCALES.has(base) ? (base as Locale) : undefined;
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieLocale = normalize((await cookies()).get('NEXT_LOCALE')?.value);
  if (cookieLocale) return cookieLocale;

  const acceptLanguage = (await headers()).get('accept-language');
  const headerLocale = normalize(acceptLanguage ?? undefined);
  return headerLocale ?? defaultLocale;
}

export async function stuffFromServer(formData: FormData) {
  const locale = await getCurrentLocale();
  // Use the locale for localized side effects (emails, CRM, etc.)
  console.log(`Stuff from server with locale ${locale}`);
}
