import type { KeyPath } from '@intlayer/core';
import { type ComputedRef, computed, inject } from 'vue';
import { createSharedComposable } from './createSharedComposable';

export interface EditedContentActions {
  getEditedContentValue(dictionaryKey: string, keyPath: KeyPath[]): unknown;
}

/**
 * Mirrors the React hook one-for-one.
 */
export const useEditedContentRenderer = createSharedComposable(
  (
    dictionaryKey: string,
    keyPath: KeyPath[],
    fallback: unknown
  ): ComputedRef<unknown> => {
    const editedContentContext = inject<EditedContentActions | null>(
      'editedContentActions',
      null
    );

    return computed(() => {
      const edited = editedContentContext?.getEditedContentValue(
        dictionaryKey,
        keyPath
      ) as string | undefined;

      return edited ?? fallback;
    });
  }
);
