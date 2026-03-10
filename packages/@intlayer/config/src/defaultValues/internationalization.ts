import type { StrictMode } from '@intlayer/types/config';
import type { Locale } from '@intlayer/types/allLocales';

import * as Locales from '@intlayer/types/locales';

export const LOCALES: Locale[] = [Locales.ENGLISH];

export const REQUIRED_LOCALES: Locale[] = [];

export const DEFAULT_LOCALE: Locale = Locales.ENGLISH;

export const STRICT_MODE: StrictMode = 'inclusive';
