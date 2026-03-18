'use client';

import { getContentNodeByKeyPath } from '@intlayer/core/dictionaryManipulator';
import { getMarkdownMetadata } from '@intlayer/core/markdown';
import type { EditorStateManager } from '@intlayer/editor';
import { isEnabled } from '@intlayer/editor/isEnabled';
import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import type { LocalesValues } from '@intlayer/types/module_augmentation';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';

type MarkdownMetadataRendererProps = {
  dictionaryKey: string;
  keyPath: KeyPath[];
  locale?: LocalesValues;
  children: string;
  metadataKeyPath: KeyPath[];
};

/**
 * Gets the edited markdown string for this node from the global manager,
 * falling back to the original children string.
 */
const useEditedMarkdown = (
  dictionaryKey: string,
  keyPath: KeyPath[],
  children: string
): string => {
  const [editedMarkdown, setEditedMarkdown] = useState<string>(children);

  useEffect(() => {
    if (!isEnabled) return;

    let stopped = false;
    let unsubscribeFromManager: (() => void) | undefined;
    let unsubscribeFromGlobalChange: (() => void) | undefined;

    const setupManager = (manager: EditorStateManager) => {
      const updateValue = () => {
        const edited = manager.getContentValue(dictionaryKey, keyPath);
        if (typeof edited === 'string') {
          setEditedMarkdown(edited);
        }
      };

      updateValue();
      manager.editedContent.addEventListener('change', updateValue);
      unsubscribeFromManager = () =>
        manager.editedContent.removeEventListener('change', updateValue);
    };

    import('@intlayer/editor').then(
      ({ getGlobalEditorManager, onGlobalEditorManagerChange }) => {
        if (stopped) return;

        const manager = getGlobalEditorManager();

        if (manager) {
          setupManager(manager);
        } else {
          unsubscribeFromGlobalChange = onGlobalEditorManagerChange(
            (newManager) => {
              if (stopped) return;

              if (unsubscribeFromManager) {
                unsubscribeFromManager();
                unsubscribeFromManager = undefined;
              }

              if (newManager) {
                setupManager(newManager);
              }
            }
          );
        }
      }
    );

    return () => {
      stopped = true;
      unsubscribeFromManager?.();
      unsubscribeFromGlobalChange?.();
    };
  }, [dictionaryKey, keyPath, children]);

  return editedMarkdown;
};

export const MarkdownMetadataRendererInternal: FC<
  MarkdownMetadataRendererProps
> = ({ dictionaryKey, keyPath, children, metadataKeyPath }): ReactNode => {
  const markdownContent = useEditedMarkdown(dictionaryKey, keyPath, children);

  const metadata = getMarkdownMetadata(markdownContent);

  const metadataEl = getContentNodeByKeyPath(
    metadata as ContentNode,
    metadataKeyPath
  );

  return metadataEl as ReactNode;
};
