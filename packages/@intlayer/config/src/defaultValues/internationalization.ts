import type { Locale } from '@intlayer/types/allLocales';
import type { StrictMode } from '@intlayer/types/config';
import { ENGLISH } from '@intlayer/types/locales';

export const LOCALES: Locale[] = [ENGLISH];

export const REQUIRED_LOCALES: Locale[] = [];

export const DEFAULT_LOCALE: Locale = ENGLISH;

export const STRICT_MODE: StrictMode = 'inclusive';
