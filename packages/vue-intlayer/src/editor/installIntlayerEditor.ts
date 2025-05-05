import configuration from '@intlayer/config/built';
import { App } from 'vue';
import { installChangedContent } from './changedContent';
import { installCommunicator } from './communicator';
import { installDictionariesRecord } from './dictionariesRecord';
import { installEditedContent } from './editedContent';
import { installEditorEnabled } from './editorEnabled';
import { installFocusDictionary } from './focusDictionary';

const { editor } = configuration;
const { applicationURL, editorURL, cmsURL } = editor ?? {};

const postMessage = (data: any) => {
  if (typeof window === 'undefined') return;

  const isInIframe = window.self !== window.top;

  if (!isInIframe) return;

  if (editor.applicationURL.length > 0) {
    window.postMessage(data, editor.applicationURL);
  }

  if (editor.editorURL.length > 0) {
    window.parent.postMessage(data, editor.editorURL);
  }

  if (editor.cmsURL.length > 0) {
    window.parent.postMessage(data, editor.cmsURL);
  }
};

/**
 * Vue-side replacement for the former <IntlayerEditorProvider> React component.
 *
 * Call **once** in the <script setup lang="ts"> of your root component (usually App.vue):
 *
 * ```vue
 * <script setup lang="ts">
 * import { useIntlayerProviders } from 'vue-intlayer';
 * useIntlayerProviders({ configuration, postMessage });
 * </script>
 * ```
 */
export const installIntlayerEditor = (app: App): void => {
  /* ---------------------------------------------------------------------
   * 1. Base providers – always on
   * -------------------------------------------------------------------*/

  installCommunicator(app, {
    postMessage,
    allowedOrigins: [applicationURL, editorURL, cmsURL] as string[],
  });
  installEditorEnabled(app);
  installChangedContent(app);
  installDictionariesRecord(app);
  installEditedContent(app);
  installFocusDictionary(app);
};
