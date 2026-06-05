import { createInstance } from 'i18next';

/**
 * Create an i18next-compatible instance for server-side use.
 *
 * Unlike the original next-i18next pattern this does NOT load external JSON
 * files. Translations are compiled into the bundle by Intlayer at build time
 * and resolved on demand via `@intlayer/core`.
 */
export async function initI18next(locale: string, _ns?: readonly string[]) {
  const i18n = createInstance({ lng: locale });
  await i18n.init({ lng: locale });
  return i18n;
}
