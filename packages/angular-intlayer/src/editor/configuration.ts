import { DestroyRef, inject, signal } from '@angular/core';
import type { IntlayerConfig } from '@intlayer/types/config';
import { getEditorStateManager } from './installIntlayerEditor';

export const useConfiguration = () => {
  const manager = getEditorStateManager();
  const config = signal<IntlayerConfig | undefined>(
    manager?.configuration.value
  );

  if (manager) {
    const handler = (e: Event) =>
      config.set((e as CustomEvent<IntlayerConfig>).detail);
    manager.configuration.addEventListener('change', handler);

    try {
      const destroyRef = inject(DestroyRef, { optional: true });
      destroyRef?.onDestroy(() =>
        manager.configuration.removeEventListener('change', handler)
      );
    } catch {}
  }

  return config.asReadonly();
};
