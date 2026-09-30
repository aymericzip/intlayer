import { internationalization } from '@intlayer/config/built';
import { getDictionaries } from '@intlayer/dictionaries-entry';
import type { Dictionary } from '@intlayer/types/dictionary';
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
import {
  applyDictionaryEdit,
  getEditability,
  parseEditPath,
} from './editDictionaryContent';
import {
  createEditorServerSession,
  type UnmergedDictionaries,
} from './editorServer';
import { formatDictionaryForInspector } from './formatDictionaryForInspector';

export const INTLAYER_DEVTOOLS_PLUGIN_ID = 'intlayer';
export const INTLAYER_DICTIONARIES_INSPECTOR_ID =
  'intlayer-dictionaries-inspector';
export const EDITOR_OFFLINE_NODE_ID = 'intlayer-editor-offline';

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
 * Find the unmerged declaration matching a devtools node id. The node id is
 * the declaration `localId`, falling back to the dictionary key for
 * declarations that do not carry one.
 */
const findDeclarationByNodeId = (
  unmergedDictionaries: UnmergedDictionaries,
  nodeId: string
): Dictionary | undefined => {
  for (const [dictionaryKey, declarations] of Object.entries(
    unmergedDictionaries
  )) {
    const declaration = declarations.find(
      (declaration) => (declaration.localId ?? dictionaryKey) === nodeId
    );

    if (declaration) return declaration;
  }

  return undefined;
};

/**
 * Suffix distinguishing the declarations of a same dictionary key: the
 * declaration locale for per-locale content files, else the file name.
 */
const getDeclarationSuffix = (declaration: Dictionary): string =>
  declaration.locale ?? declaration.filePath?.split('/').pop() ?? 'declaration';

/**
 * Register the Intlayer plugin in Vue Devtools with an inspector listing
 * the loaded dictionaries and their translations, plus a "Locales" group
 * node allowing to switch the current locale of the app.
 *
 * When the Intlayer editor server is running (`npx intlayer editor start`),
 * the inspector lists the unmerged dictionary declarations fetched from it
 * and plain-text values become editable: edits are written back to the source
 * content files through the editor server. Without the server, the inspector
 * falls back to a read-only view of the loaded (merged) dictionaries.
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
      const editorServer = createEditorServerSession();

      // Probe the editor server once at startup; when it answers, refresh the
      // tree so the editable declarations replace the read-only nodes.
      void editorServer.fetchUnmergedDictionaries().then((unmerged) => {
        if (unmerged) {
          api.sendInspectorTree(INTLAYER_DICTIONARIES_INSPECTOR_ID);
        }
      });

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

      api.on.getInspectorTree(async (payload) => {
        if (payload.inspectorId !== INTLAYER_DICTIONARIES_INSPECTOR_ID) return;

        const currentLocale =
          createIntlayerClient().locale.value ?? defaultLocale;
        const unmergedDictionaries =
          await editorServer.fetchUnmergedDictionaries();

        if (unmergedDictionaries) {
          const declarationNodes = Object.entries(unmergedDictionaries).flatMap(
            ([dictionaryKey, declarations]) =>
              declarations.map((declaration) => ({
                id: declaration.localId ?? dictionaryKey,
                label:
                  declarations.length > 1
                    ? `${dictionaryKey} (${getDeclarationSuffix(declaration)})`
                    : dictionaryKey,
                tags: [
                  {
                    label: 'editable',
                    textColor: 0xffffff,
                    backgroundColor: 0x42b883,
                  },
                ],
              }))
          );

          payload.rootNodes = [
            ...declarationNodes,
            buildLocalesInspectorNode(currentLocale),
          ];
          return;
        }

        const dictionaries = getDictionaries();
        const dictionaryKeys = Object.keys(dictionaries);

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
          {
            id: EDITOR_OFFLINE_NODE_ID,
            label: 'Enable live editing (editor server)',
          },
          buildLocalesInspectorNode(currentLocale),
        ];
      });

      api.on.getInspectorState(async (payload) => {
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

        if (payload.nodeId === EDITOR_OFFLINE_NODE_ID) {
          payload.state = {
            'Live editing': [
              {
                key: 'status',
                value: 'Intlayer editor server not detected',
                editable: false,
              },
              {
                key: 'enable it',
                value:
                  'Set `editor.enabled: true` in intlayer.config, run ' +
                  '`npx intlayer editor start`, then reopen this panel',
                editable: false,
              },
              {
                key: 'edits',
                value: 'Edits are written back to your .content source files',
                editable: false,
              },
            ],
          };
          return;
        }

        const unmergedDictionaries =
          await editorServer.fetchUnmergedDictionaries();
        const declaration = unmergedDictionaries
          ? findDeclarationByNodeId(unmergedDictionaries, payload.nodeId)
          : undefined;

        if (declaration) {
          const translations = formatDictionaryForInspector(declaration);

          payload.state = {
            Translations: Object.entries(translations).map(([path, value]) => ({
              key: path,
              value,
              editable: getEditability(declaration, path) !== null,
            })),
            Metadata: [
              { key: 'key', value: declaration.key, editable: false },
              {
                key: 'title',
                value: declaration.title ?? '',
                editable: false,
              },
              {
                key: 'description',
                value: declaration.description ?? '',
                editable: false,
              },
              {
                key: 'file',
                value: declaration.filePath ?? '',
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

      // Serialize edits: each edit writes the whole declaration back, so a
      // second edit must build on the outcome of the first (the session
      // shadows the written declaration until the server catches up).
      let editQueue: Promise<void> = Promise.resolve();

      api.on.editInspectorState((payload) => {
        if (payload.inspectorId !== INTLAYER_DICTIONARIES_INSPECTOR_ID) return;
        if (payload.state.remove) return;

        const edit = parseEditPath(payload.path);
        const newValue: unknown = payload.state.value;

        if (!edit || typeof newValue !== 'string') return;

        // A task throwing outside the guarded write (e.g. an unexpected
        // non-cloneable content value) must not poison the queue: later
        // edits still run.
        editQueue = editQueue
          .catch(() => {})
          .then(async () => {
            const unmergedDictionaries =
              await editorServer.fetchUnmergedDictionaries();

            if (!unmergedDictionaries) return;

            const declaration = findDeclarationByNodeId(
              unmergedDictionaries,
              payload.nodeId
            );

            if (!declaration) return;

            const updatedDictionary = applyDictionaryEdit(
              declaration,
              edit,
              newValue
            );

            if (!updatedDictionary) return;

            try {
              await editorServer.writeDictionary(updatedDictionary);
            } catch (error) {
              console.error(
                '[intlayer] Failed to save the dictionary through the editor ' +
                  'server:',
                error
              );
            } finally {
              api.sendInspectorState(INTLAYER_DICTIONARIES_INSPECTOR_ID);
            }
          });

        return editQueue;
      });
    }
  );
};
