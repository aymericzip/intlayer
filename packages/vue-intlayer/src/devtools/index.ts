import { internationalization } from '@intlayer/config/built';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import {
  type PluginDescriptor,
  type SetupFunction,
  setupDevtoolsPlugin,
} from '@vue/devtools-api';
import { type App, watch } from 'vue';
import { createIntlayerClient } from '../client/installIntlayer';
import { setLocaleInStorage } from '../client/useLocaleStorage';
import {
  buildLocalesInspectorNode,
  getLocaleFromNodeId,
  isLocaleNodeId,
  LOCALES_GROUP_NODE_ID,
} from './buildLocalesInspectorNode';
import { formatDictionaryForInspector } from './formatDictionaryForInspector';

export const INTLAYER_DEVTOOLS_PLUGIN_ID = 'intlayer';
export const INTLAYER_DICTIONARIES_INSPECTOR_ID =
  'intlayer-dictionaries-inspector';

const { defaultLocale, locales: availableLocales } = internationalization ?? {};

/**
 * `setupDevtoolsPlugin` narrows its descriptor through a recursive mapped
 * type that walks `app: App` down to DOM `Element`, whose self-referencing
 * aria properties make TypeScript 7 report a circular reference (TS2615).
 * Re-typing the function with the plain descriptor type skips that walk.
 */
const registerDevtoolsPlugin: (
  pluginDescriptor: PluginDescriptor,
  setupFunction: SetupFunction
) => void = setupDevtoolsPlugin;

/**
 * Register the Intlayer plugin in Vue Devtools with an inspector listing
 * the loaded dictionaries and their translations, plus a "Locales" group
 * node allowing to switch the current locale of the app.
 *
 * Lazy-loaded by `installIntlayer`; safe to call only in a browser
 * environment where the devtools hook may exist — `setupDevtoolsPlugin`
 * no-ops when Vue Devtools is not installed.
 */
export const enableIntlayerDevtools = (app: App): void => {
  registerDevtoolsPlugin(
    {
      id: INTLAYER_DEVTOOLS_PLUGIN_ID,
      label: 'Intlayer',
      packageName: 'vue-intlayer',
      homepage: 'https://intlayer.org',
      componentStateTypes: [INTLAYER_DEVTOOLS_PLUGIN_ID],
      app,
    },
    (api) => {
      api.addInspector({
        id: INTLAYER_DICTIONARIES_INSPECTOR_ID,
        label: 'Intlayer',
        icon: 'language',
        treeFilterPlaceholder: 'Search dictionaries',
        nodeActions: [
          {
            icon: 'check',
            tooltip: 'Set as current locale',
            action: (nodeId) => {
              if (!isLocaleNodeId(nodeId)) return;

              const locale = getLocaleFromNodeId(nodeId);

              if (!availableLocales?.map(String).includes(locale)) {
                console.error(`Locale ${locale} is not available`);
                return;
              }

              const client = createIntlayerClient();

              client.setLocale(locale as LocalesValues);
              setLocaleInStorage(
                locale as LocalesValues,
                client.isCookieEnabled ?? true
              );

              api.sendInspectorTree(INTLAYER_DICTIONARIES_INSPECTOR_ID);
              api.sendInspectorState(INTLAYER_DICTIONARIES_INSPECTOR_ID);
            },
          },
        ],
      });

      // Keep the inspector in sync when the locale changes from outside the
      // panel (app-side selector, locale-prefixed routing, …)
      watch(
        () => createIntlayerClient().locale.value,
        () => {
          api.sendInspectorTree(INTLAYER_DICTIONARIES_INSPECTOR_ID);
          api.sendInspectorState(INTLAYER_DICTIONARIES_INSPECTOR_ID);
        }
      );

      api.on.getInspectorTree((payload) => {
        if (payload.inspectorId !== INTLAYER_DICTIONARIES_INSPECTOR_ID) return;

        const dictionaries = getDictionaries();
        const dictionaryKeys = Object.keys(dictionaries);
        const currentLocale =
          createIntlayerClient().locale.value ?? defaultLocale;

        const dictionaryNodes =
          dictionaryKeys.length === 0
            ? [
                {
                  id: 'intlayer-no-dictionaries',
                  label:
                    'No dictionaries loaded. Add an Intlayer build plugin ' +
                    '(e.g. vite-intlayer) to generate them.',
                },
              ]
            : dictionaryKeys.map((dictionaryKey) => ({
                id: dictionaryKey,
                label: dictionaryKey,
              }));

        payload.rootNodes = [
          ...dictionaryNodes,
          buildLocalesInspectorNode(currentLocale),
        ];
      });

      api.on.getInspectorState((payload) => {
        if (payload.inspectorId !== INTLAYER_DICTIONARIES_INSPECTOR_ID) return;

        const currentLocale =
          createIntlayerClient().locale.value ?? defaultLocale;

        if (payload.nodeId === LOCALES_GROUP_NODE_ID) {
          payload.state = {
            Locales: (availableLocales ?? []).map((locale) => ({
              key: locale,
              value: locale === currentLocale ? 'current' : '',
              editable: false,
            })),
          };
          return;
        }

        if (isLocaleNodeId(payload.nodeId)) {
          const locale = getLocaleFromNodeId(payload.nodeId);

          payload.state = {
            Locale: [
              { key: 'locale', value: locale, editable: false },
              {
                key: 'current',
                value: locale === currentLocale,
                editable: false,
              },
            ],
          };
          return;
        }

        const dictionary = getDictionaries()[payload.nodeId];

        if (!dictionary) {
          payload.state = {};
          return;
        }

        const translations = formatDictionaryForInspector(dictionary);

        payload.state = {
          Translations: Object.entries(translations).map(([path, value]) => ({
            key: path,
            value,
            editable: false,
          })),
          Metadata: [
            { key: 'key', value: dictionary.key, editable: false },
            { key: 'title', value: dictionary.title ?? '', editable: false },
            {
              key: 'description',
              value: dictionary.description ?? '',
              editable: false,
            },
          ],
        };
      });
    }
  );
};
