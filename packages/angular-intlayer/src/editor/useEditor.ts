import {
  DestroyRef,
  effect,
  Injector,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { Locale } from '@intlayer/types/allLocales';
import { INTLAYER_TOKEN, type IntlayerProvider } from '../client';

export const useEditor = () => {
  if (process.env.INTLAYER_EDITOR_ENABLED === 'false' || !isEnabled) return;

  const destroyRef = inject(DestroyRef, { optional: true });
  const client = inject<IntlayerProvider>(INTLAYER_TOKEN, {
    optional: true,
  } as any);
  const injector = inject(Injector);

  import('@intlayer/editor').then(({ initEditorClient }) => {
    const manager = initEditorClient();

    if (client) {
      const effectRef = runInInjectionContext(injector, () =>
        effect(() => {
          const locale = client.locale();
          if (locale) manager.currentLocale.set(locale as Locale);
        })
      );
      destroyRef?.onDestroy(() => effectRef.destroy());
    }
  });

  destroyRef?.onDestroy(() => {
    import('@intlayer/editor').then(({ stopEditorClient }) => {
      stopEditorClient();
    });
  });
};
