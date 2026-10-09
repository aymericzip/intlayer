import {
  getPushableDictionaries,
  usePushDictionaries,
} from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { PushDictionariesProgress } from '@intlayer/design-system/dictionary-field-editor';
import { PopoverStatic } from '@intlayer/design-system/popover';
import {
  type DictionaryContent,
  type EditorStateManager,
  getGlobalEditorManager,
  onGlobalEditorManagerChange,
} from '@intlayer/editor';
import type { Dictionary, LocalDictionaryId } from '@intlayer/types/dictionary';
import { Upload } from 'lucide-react';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useIntlayer } from 'react-intlayer';

const POPOVER_IDENTIFIER = 'push-dictionaries-toolbar';

const getDictionaryList = (
  dictionaryContent: DictionaryContent | null | undefined
): Dictionary[] => (dictionaryContent ? Object.values(dictionaryContent) : []);

type PushUnmergedDictionariesButtonProps = {
  hasDictionaryWritePermission: boolean;
  /** Called once the push settled, to refresh the dictionary list. */
  onPushed: () => void;
};

/**
 * Pushes the unmerged dictionaries of the connected application to the CMS, as
 * `intlayer push` does: only `remote`, `hybrid` and custom locations, in
 * parallel batches, with their pending edits. Hidden when there is none.
 */
export const PushUnmergedDictionariesButton: FC<
  PushUnmergedDictionariesButtonProps
> = ({ hasDictionaryWritePermission, onPushed }) => {
  const { pushUnmergedDictionariesButton } = useIntlayer('dictionary-list');

  const [editorManager, setEditorManager] = useState<EditorStateManager | null>(
    () => getGlobalEditorManager()
  );
  const [localeDictionaries, setLocaleDictionaries] = useState<Dictionary[]>(
    () => getDictionaryList(getGlobalEditorManager()?.localeDictionaries.value)
  );
  const [editedContent, setEditedContent] = useState<DictionaryContent>(
    () => getGlobalEditorManager()?.editedContent.value ?? {}
  );

  const {
    mutate: pushDictionaries,
    isPending: isPushing,
    progress,
  } = usePushDictionaries();

  useEffect(() => {
    const updateFromManager = (manager: EditorStateManager | null) => {
      setEditorManager(manager);
      setLocaleDictionaries(
        getDictionaryList(manager?.localeDictionaries.value)
      );
      setEditedContent(manager?.editedContent.value ?? {});
    };

    updateFromManager(getGlobalEditorManager());

    return onGlobalEditorManagerChange(updateFromManager);
  }, []);

  useEffect(() => {
    if (!editorManager) return;

    const handleDictionariesChange = (event: Event) =>
      setLocaleDictionaries(
        getDictionaryList((event as CustomEvent<DictionaryContent>).detail)
      );
    const handleEditedContentChange = (event: Event) =>
      setEditedContent(
        (event as CustomEvent<DictionaryContent | null>).detail ?? {}
      );

    editorManager.localeDictionaries.addEventListener(
      'change',
      handleDictionariesChange
    );
    editorManager.editedContent.addEventListener(
      'change',
      handleEditedContentChange
    );

    return () => {
      editorManager.localeDictionaries.removeEventListener(
        'change',
        handleDictionariesChange
      );
      editorManager.editedContent.removeEventListener(
        'change',
        handleEditedContentChange
      );
    };
  }, [editorManager]);

  // Pending edits are pushed along with their dictionary
  const dictionariesToPush = useMemo(
    () =>
      getPushableDictionaries(localeDictionaries).map(
        (dictionary) =>
          editedContent[dictionary.localId as LocalDictionaryId] ?? dictionary
      ),
    [localeDictionaries, editedContent]
  );

  if (dictionariesToPush.length === 0) return null;

  const handlePush = () =>
    pushDictionaries(
      { dictionaries: dictionariesToPush },
      {
        onSuccess: (result) => {
          const failedLocalIds = new Set(
            (result.data?.error ?? []).map(({ localId }) => localId)
          );

          // Pushed edits become the dictionary baseline
          for (const dictionary of dictionariesToPush) {
            const localId = dictionary.localId as LocalDictionaryId;

            if (failedLocalIds.has(localId) || !editedContent[localId]) {
              continue;
            }

            editorManager?.setLocaleDictionary(dictionary);
            editorManager?.restoreContent(localId);
          }
        },
        onSettled: () => onPushed(),
      }
    );

  const hasFailedDictionaries = (progress?.failedKeys.length ?? 0) > 0;
  const isProgressVisible = Boolean(
    progress && (isPushing || hasFailedDictionaries)
  );

  return (
    <PopoverStatic identifier={POPOVER_IDENTIFIER}>
      <Button
        Icon={Upload}
        color="text"
        variant="outline"
        label={pushUnmergedDictionariesButton.label.value}
        disabled={!hasDictionaryWritePermission || isPushing}
        isLoading={isPushing}
        onClick={handlePush}
      >
        {pushUnmergedDictionariesButton.text} ({dictionariesToPush.length})
      </Button>
      <PopoverStatic.Detail
        xAlign="end"
        identifier={POPOVER_IDENTIFIER}
        // Stays open while pushing, to follow the progress
        isHidden={isPushing ? false : undefined}
      >
        <Container className="min-w-64 p-3">
          {isProgressVisible && progress ? (
            <PushDictionariesProgress progress={progress} />
          ) : (
            <p>{pushUnmergedDictionariesButton.popover}</p>
          )}
        </Container>
      </PopoverStatic.Detail>
    </PopoverStatic>
  );
};
