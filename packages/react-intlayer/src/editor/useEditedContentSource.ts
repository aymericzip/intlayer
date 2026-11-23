'use client';

import { isEnabled } from '@intlayer/editor/isEnabled';
import type { KeyPath } from '@intlayer/types/keyPath';
import { useEffect, useState } from 'react';

/**
 * Returns the source string edited in the visual editor for a markdown / html
 * node, or `undefined` when the node is not edited (or the editor is off).
 */
export const useEditedContentSource = (
  dictionaryKey: string | undefined,
  keyPath: KeyPath[] | undefined
): string | undefined => {
  const [editedSource, setEditedSource] = useState<string | undefined>();
  const keyPathJson = JSON.stringify(keyPath ?? []);

  useEffect(() => {
    if (process.env.INTLAYER_EDITOR_ENABLED === 'false' || !isEnabled) return;
    if (!dictionaryKey) return;

    let isStopped = false;
    let unsubscribe: (() => void) | null = null;

    import('@intlayer/editor')
      .then(({ subscribeToEditedContentSource }) => {
        if (isStopped) return;

        unsubscribe = subscribeToEditedContentSource(
          dictionaryKey,
          JSON.parse(keyPathJson) as KeyPath[],
          setEditedSource
        );
      })
      .catch(() => {});

    return () => {
      isStopped = true;
      unsubscribe?.();
    };
  }, [dictionaryKey, keyPathJson]);

  return editedSource;
};
