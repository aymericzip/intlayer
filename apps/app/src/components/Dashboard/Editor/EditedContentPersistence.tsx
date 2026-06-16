'use client';

import { usePersistedStore } from '@intlayer/design-system/hooks';
import { useEditedContent } from '@intlayer/editor-react';
import { type FC, useEffect, useRef } from 'react';

/** localStorage key under which in-progress dictionary edits are kept. */
const EDITED_CONTENT_STORAGE_KEY = 'intlayer-cms-edited-content';

/**
 * The `editedContent` map (keyed by dictionary `localId`), derived from the
 * editor hook so we avoid depending on `@intlayer/editor` directly.
 */
type EditedContent = Parameters<
  ReturnType<typeof useEditedContent>['setEditedContentState']
>[0];

/**
 * Bridges the in-memory `editedContent` store — held by the framework-agnostic
 * `EditorStateManager` — with `localStorage`, so unsaved dictionary edits survive
 * provider remounts, query refetches and full page reloads.
 *
 * Without this, the manager is recreated empty on mount and `SaveForm` submits
 * the originally-fetched dictionary instead of the edited one (the submitted
 * dictionary ends up identical to the initial one).
 *
 * The persisted value is the whole `editedContent` map, keyed by dictionary
 * `localId`. Saving or resetting a dictionary removes its entry from the map
 * (via `restoreEditedContent`); that mutation is mirrored straight to
 * `localStorage`, so drafts clear on save/reset.
 *
 * Renders nothing — mount it as a child of an editor provider so it shares the
 * provider's `EditorStateManager`.
 */
export const EditedContentPersistence: FC = () => {
  const { editedContent, setEditedContentState } = useEditedContent();
  const [persistedEditedContent, setPersistedEditedContent] =
    usePersistedStore<EditedContent>(EDITED_CONTENT_STORAGE_KEY, {});
  const hasHydratedRef = useRef(false);

  // Hydrate the manager once from localStorage on first mount, restoring any
  // drafts left over from a previous session / before a reload.
  useEffect(() => {
    if (hasHydratedRef.current) return;
    hasHydratedRef.current = true;

    const hasPersistedDrafts =
      persistedEditedContent && Object.keys(persistedEditedContent).length > 0;

    if (hasPersistedDrafts) {
      setEditedContentState(persistedEditedContent);
    }
  }, [persistedEditedContent, setEditedContentState]);

  // Mirror every manager change back to localStorage. The `undefined` guard and
  // the hydration ref prevent the manager's empty start-up value from clobbering
  // stored drafts before hydration has run.
  useEffect(() => {
    if (!hasHydratedRef.current || editedContent === undefined) return;

    setPersistedEditedContent(editedContent);
  }, [editedContent, setPersistedEditedContent]);

  return null;
};
