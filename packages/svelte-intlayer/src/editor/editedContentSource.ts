import { isEnabled } from '@intlayer/editor/isEnabled';
import type { KeyPath } from '@intlayer/types/keyPath';
import { type Readable, readable } from 'svelte/store';

/**
 * Store of the source string edited in the visual editor for a markdown / html
 * node. Holds `undefined` when the node is not edited (or the editor is off).
 */
export const getEditedContentSource = (
  dictionaryKey: string | undefined,
  keyPath: KeyPath[] | undefined
): Readable<string | undefined> =>
  readable<string | undefined>(undefined, (set) => {
    if (process.env.INTLAYER_EDITOR_ENABLED === 'false' || !isEnabled) return;
    if (!dictionaryKey) return;

    let isStopped = false;
    let unsubscribe: (() => void) | null = null;

    import('@intlayer/editor')
      .then(({ subscribeToEditedContentSource }) => {
        if (isStopped) return;

        unsubscribe = subscribeToEditedContentSource(
          dictionaryKey,
          keyPath ?? [],
          set
        );
      })
      .catch(() => {});

    return () => {
      isStopped = true;
      unsubscribe?.();
    };
  });
