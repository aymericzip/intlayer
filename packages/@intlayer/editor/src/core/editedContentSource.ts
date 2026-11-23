import type { ContentNode } from '@intlayer/types/dictionary';
import type { KeyPath } from '@intlayer/types/keyPath';
import * as NodeTypes from '@intlayer/types/nodeType';
import type { EditorStateManager } from './EditorStateManager';
import {
  getGlobalEditorManager,
  onGlobalEditorManagerChange,
} from './globalManager';

type SourceNode = {
  nodeType?: unknown;
  content?: unknown;
  [key: string]: unknown;
};

/**
 * Unwraps an edited node down to its raw source string: translation → locale
 * entry, markdown / html → inner node, file → loaded content.
 */
export const resolveEditedSource = (
  node: ContentNode | undefined,
  locale: string | undefined
): string | undefined => {
  let currentNode: unknown = node;

  while (currentNode && typeof currentNode === 'object') {
    const sourceNode = currentNode as SourceNode;

    if (sourceNode.nodeType === NodeTypes.TRANSLATION) {
      const translations = sourceNode[NodeTypes.TRANSLATION] as
        | Record<string, unknown>
        | undefined;
      currentNode = locale ? translations?.[locale] : undefined;
    } else if (
      sourceNode.nodeType === NodeTypes.MARKDOWN ||
      sourceNode.nodeType === NodeTypes.HTML
    ) {
      currentNode = sourceNode[sourceNode.nodeType];
    } else if (sourceNode.nodeType === NodeTypes.FILE) {
      currentNode = sourceNode.content;
    } else {
      return undefined;
    }
  }

  return typeof currentNode === 'string' ? currentNode : undefined;
};

/**
 * Subscribes to the source string edited in the visual editor for a markdown /
 * html node. `onChange` receives `undefined` when the node is not edited.
 *
 * The selector wrapper only substitutes plain strings: nodes that need
 * framework rendering (markdown, html) re-render from this source instead.
 * Follows editor manager restarts. Returns an unsubscribe function.
 */
export const subscribeToEditedContentSource = (
  dictionaryKey: string,
  keyPath: KeyPath[],
  onChange: (editedSource: string | undefined) => void
): (() => void) => {
  let lastSource: string | undefined;
  let unsubscribeManagerState: (() => void) | null = null;

  const emit = (editedSource: string | undefined) => {
    if (editedSource === lastSource) return;
    lastSource = editedSource;
    onChange(editedSource);
  };

  const subscribeToManager = (manager: EditorStateManager | null) => {
    unsubscribeManagerState?.();
    unsubscribeManagerState = null;

    if (!manager) {
      emit(undefined);
      return;
    }

    const updateEditedSource = () =>
      emit(
        resolveEditedSource(
          manager.getContentValue(dictionaryKey, keyPath),
          manager.currentLocale.value as string | undefined
        )
      );

    updateEditedSource();
    manager.editedContent.addEventListener('change', updateEditedSource);
    manager.currentLocale.addEventListener('change', updateEditedSource);

    unsubscribeManagerState = () => {
      manager.editedContent.removeEventListener('change', updateEditedSource);
      manager.currentLocale.removeEventListener('change', updateEditedSource);
    };
  };

  subscribeToManager(getGlobalEditorManager());
  const unsubscribeManagerChange =
    onGlobalEditorManagerChange(subscribeToManager);

  return () => {
    unsubscribeManagerChange();
    unsubscribeManagerState?.();
  };
};
