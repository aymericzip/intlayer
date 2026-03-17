import { DestroyRef, inject, signal } from '@angular/core';
import type { FileContent } from '@intlayer/editor';
import type { KeyPath } from '@intlayer/types/keyPath';
import { getEditorStateManager } from './installIntlayerEditor';

export type { FileContent };

export const useFocusDictionary = () => {
  const manager = getEditorStateManager();
  const focusedContent = signal<FileContent | null>(
    manager?.focusedContent.value ?? null
  );

  if (manager) {
    const handler = (e: Event) =>
      focusedContent.set((e as CustomEvent<FileContent | null>).detail);
    manager.focusedContent.addEventListener('change', handler);

    try {
      const destroyRef = inject(DestroyRef, { optional: true });
      destroyRef?.onDestroy(() =>
        manager.focusedContent.removeEventListener('change', handler)
      );
    } catch {}
  }

  return {
    focusedContent: focusedContent.asReadonly(),
    setFocusedContent: (value: FileContent | null) =>
      manager?.focusedContent.set(value),
    setFocusedContentKeyPath: (keyPath: KeyPath[]) =>
      manager?.setFocusedContentKeyPath(keyPath),
  };
};
