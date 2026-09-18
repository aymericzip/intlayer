import { getDictionaries } from '@intlayer/dictionaries-entry';
import {
  type PluginDescriptor,
  type SetupFunction,
  setupDevtoolsPlugin,
} from '@vue/devtools-api';
import type { App } from 'vue';
import { formatDictionaryForInspector } from './formatDictionaryForInspector';

export const INTLAYER_DEVTOOLS_PLUGIN_ID = 'intlayer';
export const INTLAYER_DICTIONARIES_INSPECTOR_ID =
  'intlayer-dictionaries-inspector';

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
 * Register the Intlayer plugin in Vue Devtools with a read-only inspector
 * listing the loaded dictionaries and their translations.
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
      });

      api.on.getInspectorTree((payload) => {
        if (payload.inspectorId !== INTLAYER_DICTIONARIES_INSPECTOR_ID) return;

        const dictionaries = getDictionaries();
        const dictionaryKeys = Object.keys(dictionaries);

        payload.rootNodes =
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
      });

      api.on.getInspectorState((payload) => {
        if (payload.inspectorId !== INTLAYER_DICTIONARIES_INSPECTOR_ID) return;

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
