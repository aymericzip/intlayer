import { DestroyRef, inject, signal } from '@angular/core';
import { getEditorStateManager } from './installIntlayerEditor';

export const useEditorEnabled = () => {
  const manager = getEditorStateManager();
  const enabled = signal<boolean>(manager?.editorEnabled.value ?? false);

  if (manager) {
    const handler = (e: Event) =>
      enabled.set((e as CustomEvent<boolean>).detail);
    manager.editorEnabled.addEventListener('change', handler);

    try {
      const destroyRef = inject(DestroyRef, { optional: true });
      destroyRef?.onDestroy(() =>
        manager.editorEnabled.removeEventListener('change', handler)
      );
    } catch {}
  }

  return { enabled: enabled.asReadonly() };
};
