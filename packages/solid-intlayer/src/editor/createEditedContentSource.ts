import { isEnabled } from '@intlayer/editor/isEnabled';
import type { KeyPath } from '@intlayer/types/keyPath';
import { type Accessor, createSignal } from 'solid-js';
import { createWatchEffect } from '../solidCompat';

/**
 * Tracks the source string edited in the visual editor for a markdown / html
 * node. The accessor returns `undefined` when the node is not edited (or the
 * editor is off).
 */
export const createEditedContentSource = (
  dictionaryKey: Accessor<string | undefined>,
  keyPath: Accessor<KeyPath[] | undefined>
): Accessor<string | undefined> => {
  const [editedSource, setEditedSource] = createSignal<string | undefined>();

  if (process.env.INTLAYER_EDITOR_ENABLED === 'false' || !isEnabled) {
    return editedSource;
  }

  createWatchEffect(
    () => ({
      currentDictionaryKey: dictionaryKey(),
      keyPathJson: JSON.stringify(keyPath() ?? []),
    }),
    ({ currentDictionaryKey, keyPathJson }) => {
      if (!currentDictionaryKey) return;

      let isStopped = false;
      let unsubscribe: (() => void) | null = null;

      import('@intlayer/editor')
        .then(({ subscribeToEditedContentSource }) => {
          if (isStopped) return;

          unsubscribe = subscribeToEditedContentSource(
            currentDictionaryKey,
            JSON.parse(keyPathJson) as KeyPath[],
            (source) => setEditedSource(() => source)
          );
        })
        .catch(() => {});

      return () => {
        isStopped = true;
        unsubscribe?.();
      };
    }
  );

  return editedSource;
};
