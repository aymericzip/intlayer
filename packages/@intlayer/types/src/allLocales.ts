/**
 * This file intentionally imports every locale constant and aggregates them
 * into a single ALL_LOCALES object. Importing this file will include all
 * locale strings in the bundle — use it only when you need the full list.
 *
 * For tree-shakeable individual locale constants, import directly from './locales'.
 */
import * as Locales from './locales';

/** Object containing all locale string values as properties, e.g. { ENGLISH: 'en', ... } */
export const ALL_LOCALES: typeof Locales = { ...Locales } as const;

/** Union of all locale string values, e.g. 'en' | 'en-US' | 'ar' | 'ar-AE' | ... */
export type Locale = (typeof Locales)[keyof typeof Locales];
