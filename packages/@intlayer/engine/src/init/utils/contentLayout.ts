import type { CompatSyncConfig } from './packageManager';

/**
 * How content declarations are organized in the project:
 * - `multilingual` — `./{fileName}.content.{ts,json}` next to the component,
 *   every locale in the same file.
 * - `per-locale` — `./{fileName}.{locale}.content.{ts,json}` next to the
 *   component, one file per locale.
 * - `centralized` — a single `/locales/{locale}.{json,po}` catalog per locale,
 *   synced through a sync plugin.
 * - `namespaces` — `/locales/{locale}/{namespace}.{json,po}` catalogs, synced
 *   through a sync plugin.
 */
export type ContentLayout =
  | 'multilingual'
  | 'per-locale'
  | 'centralized'
  | 'namespaces';

/** File format of the content declarations / catalogs. */
export type ContentFormat = 'ts' | 'json' | 'po';

/**
 * Message syntax of a JSON catalog (plurals, interpolation…), written to the
 * syncJSON `format` option. Ordered as offered, the first one being the default.
 */
export const CATALOG_MESSAGE_FORMATS = [
  'icu',
  'i18next',
  'vue-i18n',
  'intlayer',
] as const;

/** Message syntax of a JSON catalog. */
export type CatalogMessageFormat = (typeof CATALOG_MESSAGE_FORMATS)[number];

/** Formats accepted by each content layout, the first one being the default. */
export const CONTENT_FORMATS_BY_LAYOUT: Record<
  ContentLayout,
  readonly ContentFormat[]
> = {
  multilingual: ['ts', 'json'],
  'per-locale': ['ts', 'json'],
  centralized: ['json', 'po'],
  namespaces: ['json', 'po'],
};

/** Configuration changes implied by a content layout. */
export type ContentLayoutSetup = {
  /** `compiler.output` template, for layouts based on `.content` files. */
  compilerOutput?: string;
  /** Whether `dictionary.locale` must be set (per-locale declarations). */
  isPerLocale: boolean;
  /** Sync plugin to register, for layouts based on plain catalogs. */
  syncConfig?: CompatSyncConfig;
};

/**
 * Resolves the configuration changes for a content layout and format. A format
 * the layout does not accept falls back to the layout default. The message
 * format only applies to JSON catalogs (centralized / namespaces).
 */
export const getContentLayoutSetup = (
  layout: ContentLayout,
  format?: ContentFormat,
  messageFormat: CatalogMessageFormat = CATALOG_MESSAGE_FORMATS[0]
): ContentLayoutSetup => {
  const acceptedFormats = CONTENT_FORMATS_BY_LAYOUT[layout];
  const resolvedFormat =
    format && acceptedFormats.includes(format) ? format : acceptedFormats[0];

  switch (layout) {
    case 'multilingual':
      return {
        compilerOutput: `./{{fileName}}.content.${resolvedFormat}`,
        isPerLocale: false,
      };
    case 'per-locale':
      return {
        compilerOutput: `./{{fileName}}.{{locale}}.content.${resolvedFormat}`,
        isPerLocale: true,
      };
    case 'centralized':
      return {
        isPerLocale: false,
        syncConfig: {
          plugin: resolvedFormat === 'po' ? 'po' : 'json',
          format: messageFormat,
          sourceTemplate: `./locales/\${locale}.${resolvedFormat}`,
          // One file per locale whose first-level keys are namespaces.
          splitKeys: resolvedFormat !== 'po',
        },
      };
    case 'namespaces':
      return {
        isPerLocale: false,
        syncConfig: {
          plugin: resolvedFormat === 'po' ? 'po' : 'json',
          format: messageFormat,
          sourceTemplate: `./locales/\${locale}/\${key}.${resolvedFormat}`,
        },
      };
  }
};
