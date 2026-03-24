import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Locale } from '@intlayer/types/allLocales';
import type { ReactiveController, ReactiveControllerHost } from 'lit';
import { getIntlayerClient } from '../client/installIntlayer';

/**
 * Starts the editor client and syncs the current locale into it.
 * Returns a cleanup function.
 */
const startEditor = (locale: string): (() => void) => {
  let stopped = false;
  let stopLocaleWatch: (() => void) | null = null;

  import('@intlayer/editor').then(({ initEditorClient }) => {
    if (stopped) return;
    const manager = initEditorClient();

    const client = getIntlayerClient();
    manager.currentLocale.set(locale as Locale);

    stopLocaleWatch = client.subscribe((newLocale) => {
      manager.currentLocale.set(newLocale as Locale);
    });
  });

  return () => {
    stopped = true;
    stopLocaleWatch?.();
    import('@intlayer/editor').then(({ stopEditorClient }) => {
      stopEditorClient();
    });
  };
};

/**
 * ReactiveController that initialises the Intlayer visual editor when enabled.
 * Syncs the current locale into the editor manager so it always reflects the
 * locale the app is displaying.
 *
 * @internal
 */
class EditorController implements ReactiveController {
  private readonly host: ReactiveControllerHost;
  private _stopEditor: (() => void) | null = null;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  hostConnected(): void {
    const client = getIntlayerClient();
    this._stopEditor = startEditor(client.locale);
  }

  hostDisconnected(): void {
    this._stopEditor?.();
    this._stopEditor = null;
  }
}

/**
 * Initialises the Intlayer visual editor client on the given host element.
 *
 * Does nothing when `INTLAYER_EDITOR_ENABLED` is `"false"` or the editor
 * package reports that it is disabled.
 *
 * Call this once, typically from your root/shell element.
 *
 * @param host - The LitElement (or any ReactiveControllerHost).
 *
 * @example
 * ```ts
 * class AppShell extends LitElement {
 *   constructor() {
 *     super();
 *     useEditor(this);
 *   }
 * }
 * ```
 */
export const useEditor = (host: ReactiveControllerHost): void => {
  if (process.env.INTLAYER_EDITOR_ENABLED === 'false' || !isEnabled) return;
  new EditorController(host);
};
