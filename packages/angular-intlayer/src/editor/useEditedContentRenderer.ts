import {
  computed,
  Injectable,
  InjectionToken,
  inject,
  type Signal,
} from '@angular/core';
import type { KeyPath } from '@intlayer/core';

export interface EditedContentActions {
  getEditedContentValue(dictionaryKey: string, keyPath: KeyPath[]): unknown;
}

export const EDITED_CONTENT_ACTIONS_TOKEN =
  new InjectionToken<EditedContentActions | null>('editedContentActions');

@Injectable({
  providedIn: 'root',
})
export class EditedContentRendererService {
  /**
   * Mirrors the React hook one-for-one.
   */
  useEditedContentRenderer(
    dictionaryKey: string,
    keyPath: KeyPath[],
    fallback: unknown
  ): Signal<unknown> {
    const editedContentContext = inject(EDITED_CONTENT_ACTIONS_TOKEN, {
      optional: true,
    });

    return computed(() => {
      const edited = editedContentContext?.getEditedContentValue(
        dictionaryKey,
        keyPath
      ) as string | undefined;

      return edited ?? fallback;
    });
  }
}

/**
 * Standalone function that can be used like the Vue composable
 */
export const useEditedContentRenderer = (
  dictionaryKey: string,
  keyPath: KeyPath[],
  fallback: unknown
): Signal<unknown> => {
  const service = inject(EditedContentRendererService);
  return service.useEditedContentRenderer(dictionaryKey, keyPath, fallback);
};
