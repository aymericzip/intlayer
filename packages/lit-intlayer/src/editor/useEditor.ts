import type { EditorStateManager } from '@intlayer/editor';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Locale } from '@intlayer/types/allLocales';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { getIntlayerClient } from '../client/installIntlayer';

const TREE_SHAKE_EDITOR = process.env['INTLAYER_EDITOR_ENABLED'] === 'false';

/**
 * ReactiveController that initialises the Intlayer visual editor when enabled.
 * Syncs the current locale into the editor manager so it always reflects the
 * locale the app is displaying.
 *
 * @internal
 */
class EditorController implements ReactiveController {
  private readonly host: ReactiveControllerHost;
  private _stopped = false;
  private _unsubscribeLocale: (() => void) | null = null;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  hostConnected(): void {
    this._stopped = false;
    if (TREE_SHAKE_EDITOR || !isEnabled) return;

    import('@intlayer/editor').then(({ initEditorClient }) => {
      if (this._stopped) return;
      const manager: EditorStateManager = initEditorClient();
      const client = getIntlayerClient();

      manager.currentLocale.set(client.locale as Locale);

      this._unsubscribeLocale = client.subscribe((newLocale) => {
        manager.currentLocale.set(newLocale as Locale);
      });
    });
  }

  hostDisconnected(): void {
    this._stopped = true;
    this._unsubscribeLocale?.();
    this._unsubscribeLocale = null;

    import('@intlayer/editor').then(({ stopEditorClient }) => {
      stopEditorClient();
    });
  }
}

/**
 * Initialises the Intlayer visual editor client.
 *
 * Does nothing when `INTLAYER_EDITOR_ENABLED` is `"false"` or the editor
 * package reports that it is disabled.
 *
 * **Without a host** — starts the editor globally (not tied to any element
 * lifecycle). Returns a cleanup function. Called automatically by
 * `installIntlayer`; you only need this when you want to manage cleanup
 * manually.
 *
 * **With a host** — attaches an `EditorController` to the given
 * `ReactiveControllerHost` so the editor lifecycle follows the element's
 * connected/disconnected callbacks.
 *
 * @param host - Optional LitElement (or any ReactiveControllerHost).
 *
 * @example
 * ```ts
 * // Global (called automatically by installIntlayer)
 * const stopEditor = useEditor();
 *
 * // Element-scoped
 * class AppShell extends LitElement {
 *   constructor() {
 *     super();
 *     useEditor(this);
 *   }
 * }
 * ```
 */
export function useEditor(): () => void;
export function useEditor(host: ReactiveControllerHost): void;
export function useEditor(host?: ReactiveControllerHost): void | (() => void) {
  if (TREE_SHAKE_EDITOR || !isEnabled) {
    return host ? undefined : () => {};
  }

  if (!host) {
    let stopped = false;
    let unsubscribeLocale: (() => void) | null = null;

    import('@intlayer/editor').then(({ initEditorClient }) => {
      if (stopped) return;
      const manager: EditorStateManager = initEditorClient();
      const client = getIntlayerClient();

      manager.currentLocale.set(client.locale as Locale);

      unsubscribeLocale = client.subscribe((newLocale) => {
        manager.currentLocale.set(newLocale as Locale);
      });
    });

    return () => {
      stopped = true;
      unsubscribeLocale?.();
      import('@intlayer/editor').then(({ stopEditorClient }) => {
        stopEditorClient();
      });
    };
  }

  new EditorController(host);
}
