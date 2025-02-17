import type { StrictMode } from '../types/config';
import { Locales } from '../types/locales';

export const LOCALES: Locales[] = [Locales.ENGLISH];

export const REQUIRED_LOCALES: Locales[] = [];

export const DEFAULT_LOCALE: Locales = Locales.ENGLISH;

export const STRICT_MODE: StrictMode = 'inclusive';
