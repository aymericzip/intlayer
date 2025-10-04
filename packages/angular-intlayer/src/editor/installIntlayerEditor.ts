import type { Injector } from '@angular/core';
import configuration from '@intlayer/config/built';
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
 * Angular-side replacement for the former <IntlayerEditorProvider> React component.
 *
 * Call **once** in your Angular application's bootstrap function or main module:
 *
 * ```typescript
 * import { bootstrapApplication } from '@angular/platform-browser';
 * import { AppComponent } from './app/app.component';
 * import { installIntlayerEditor } from 'angular-intlayer';
 *
 * bootstrapApplication(AppComponent).then(appRef => {
 *   installIntlayerEditor(appRef.injector);
 * });
 * ```
 */
export const installIntlayerEditor = (injector: Injector): void => {
  /* ---------------------------------------------------------------------
   * 1. Base providers – always on
   * -------------------------------------------------------------------*/

  installCommunicator(injector, {
    postMessage,
    allowedOrigins: [applicationURL, editorURL, cmsURL] as string[],
  });
  installEditorEnabled(injector);
  installDictionariesRecord(injector);
  installEditedContent(injector);
  installFocusDictionary(injector);
};
