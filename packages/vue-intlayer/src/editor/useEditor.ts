import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Locale } from '@intlayer/types/allLocales';
import {
  type App,
  inject,
  onMounted,
  onUnmounted,
  type Ref,
  watchEffect,
} from 'vue';
import {
  INTLAYER_SYMBOL,
  type IntlayerProvider,
} from '../client/installIntlayer';

/**
 * Starts the editor client and syncs the given locale ref into it.
 * Returns a cleanup function that stops the locale watcher and the client.
 */
const startEditor = (locale: Ref<Locale> | undefined): (() => void) => {
  let stopLocaleWatch: (() => void) | null = null;
  let stopped = false;

  import('@intlayer/editor').then(({ initEditorClient }) => {
    if (stopped) return;
    const manager = initEditorClient();

    if (locale) {
      stopLocaleWatch = watchEffect(() => {
        const l = locale.value;
        if (l) manager.currentLocale.set(l as Locale);
      });
    }
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
 * Initialises the Intlayer editor client singleton when the editor is enabled.
 * Syncs the current locale from the Intlayer context into the editor manager so
 * the editor always knows which locale the app is displaying.
 *
 * @param app - When provided, hooks into the root component lifecycle via
 *   `app.mixin` (use from `installIntlayer`). When omitted, uses Vue composable
 *   lifecycle hooks (use from a component's `setup`).
 */
export const useEditor = (app?: App): void => {
  if (!isEnabled) return;

  if (app) {
    let stopEditor: (() => void) | null = null;

    app.mixin({
      inject: { _intlayerClient: { from: INTLAYER_SYMBOL, default: null } },
      mounted() {
        if ((this as any).$parent !== null) return;
        const client = (this as any)._intlayerClient as IntlayerProvider | null;
        stopEditor = startEditor(client?.locale);
      },
      unmounted() {
        if ((this as any).$parent !== null) return;
        stopEditor?.();
      },
    });

    return;
  }

  const intlayer = inject<IntlayerProvider>(INTLAYER_SYMBOL);
  let stopEditor: (() => void) | null = null;

  onMounted(() => {
    stopEditor = startEditor(intlayer?.locale);
  });

  onUnmounted(() => {
    stopEditor?.();
  });
};
