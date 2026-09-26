import type { I18nOptions } from 'vue-i18n';
import type {
  ConfigLoader,
  I18nRoute,
  LocaleLoader,
  SetI18nParamsFunction,
} from '../types';

/**
 * Identity helper for `i18n.config.ts`. Kept for migration: message catalogs
 * move to intlayer dictionaries, so the returned config is never loaded.
 */
export const defineI18nConfig = <Config extends I18nOptions>(
  config: ConfigLoader<Config>
): ConfigLoader<Config> => config;

/** Identity helper for lazy locale files; intlayer bundles dictionaries. */
export const defineI18nLocale = <Messages = Record<string, unknown>>(
  loader: LocaleLoader<Messages>
): LocaleLoader<Messages> => loader;

/** Identity helper for locale detectors; intlayer's middleware detects. */
export const defineI18nLocaleDetector = <
  Detector extends (...args: never[]) => string,
>(
  detector: Detector
): Detector => detector;

/**
 * Page route options. Localized paths come from intlayer's
 * `routing.rewrite` rules, so this is a no-op kept for migration.
 */
export const defineI18nRoute = (_route: I18nRoute | false): void => {};

/** Dynamic route params per locale; unused with intlayer's routing. */
export const useSetI18nParams = (): SetI18nParamsFunction => () => {};

/** Preload hint for message keys; dictionaries are already bundled. */
export const useI18nPreloadKeys = (_keys: string[]): void => {};
