import { useEditorStateManager } from './EditorProvider';

// UrlStateManager is started by EditorStateManager.start() in client mode.
// Nothing extra needed here.
export const useCrossURLPathSetter = () => {
  // No-op: UrlStateManager is managed by EditorStateManager
};

export const useCrossURLPathState = () => {
  // No-op: UrlStateManager is managed by EditorStateManager
};
