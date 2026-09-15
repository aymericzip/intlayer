import { internationalization } from '@intlayer/config/built';
import type { Locale } from '@intlayer/types/allLocales';
import type { CustomInspectorNode } from '@vue/devtools-api';

export const LOCALES_GROUP_NODE_ID = 'intlayer-locales';
export const LOCALE_NODE_ID_PREFIX = 'locale:';

const { locales: availableLocales } = internationalization ?? {};

export const isLocaleNodeId = (nodeId: string): boolean =>
  nodeId.startsWith(LOCALE_NODE_ID_PREFIX);

export const getLocaleFromNodeId = (nodeId: string): string =>
  nodeId.slice(LOCALE_NODE_ID_PREFIX.length);

/**
 * Build the "Locales" group node of the devtools inspector: one child node
 * per available locale, the current one highlighted with a tag.
 *
 * The current locale is listed first: moving it changes the node order, so
 * devtools frontends reliably re-render the row that gains/loses the tag.
 */
export const buildLocalesInspectorNode = (
  currentLocale?: Locale
): CustomInspectorNode => {
  const locales = availableLocales ?? [];
  const sortedLocales =
    currentLocale && locales.includes(currentLocale)
      ? [currentLocale, ...locales.filter((locale) => locale !== currentLocale)]
      : locales;

  return {
    id: LOCALES_GROUP_NODE_ID,
    label: 'Locales',
    children: sortedLocales.map((locale) => ({
      id: `${LOCALE_NODE_ID_PREFIX}${locale}`,
      label: locale,
      tags:
        locale === currentLocale
          ? [
              {
                label: 'current',
                textColor: 0xffffff,
                backgroundColor: 0x42b883,
              },
            ]
          : [],
    })),
  };
};
