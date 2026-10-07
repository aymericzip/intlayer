'use client';

import { getContentNodeByKeyPath } from '@intlayer/core/dictionaryManipulator';
import { useEditedContent } from '@intlayer/editor-react';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import { useCallback } from 'react';
import { type ChildNodeKey, reorderChildNodes } from './reorderChildNodes';

/**
 * Moves a field among its siblings in the edited content of `dictionary`
 * (grid rows, tree nodes, structure keys).
 */
export const useFieldReorder = (dictionary: Dictionary) => {
  const { editedContent, addEditedContent } = useEditedContent();
  const localId = dictionary.localId as LocalDictionaryId;

  const moveField = useCallback(
    (
      parentKeyPath: KeyPath[],
      sourceKey: ChildNodeKey,
      targetKey: ChildNodeKey
    ) => {
      const content = editedContent?.[localId]?.content ?? dictionary.content;
      const parentNode =
        parentKeyPath.length === 0
          ? content
          : getContentNodeByKeyPath(content, parentKeyPath);

      if (!parentNode || typeof parentNode !== 'object') return;

      addEditedContent(
        localId,
        reorderChildNodes(parentNode, sourceKey, targetKey),
        parentKeyPath
      );
    },
    [editedContent, localId, dictionary.content, addEditedContent]
  );

  return { moveField };
};
