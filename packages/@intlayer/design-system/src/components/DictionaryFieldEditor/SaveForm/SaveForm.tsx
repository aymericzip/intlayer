'use client';

import {
  useAuth,
  useBearerAuth,
  useDeleteDictionary,
  useSession,
} from '@api/index';
import { FormButton } from '@components/Form';
import { Modal } from '@components/Modal';
import type { DictionaryAPI as DistantDictionary } from '@intlayer/backend-contract/dictionary';
import { useConfiguration, useEditedContent } from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types/dictionary';
import { cn } from '@utils/cn';
import {
  ArrowUpFromLine,
  FileDown,
  RotateCcw,
  Save,
  Trash,
} from 'lucide-react';
import {
  type DetailedHTMLProps,
  type FC,
  type FormHTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';
import { ChangeSetPopover } from '../ContentGrid/ChangeSetPopover';
import {
  type ChangeSetEntry,
  computeChangeSet,
} from '../ContentGrid/changeSet';
import { flattenContentRows } from '../ContentGrid/flattenContentRows';
import { useOptionalContentGrid } from '../ContentGrid/useOptionalContentGrid';
import { isDictionaryEdited, mergeDictionaryEdits } from './dictionaryEdits';
import { useDictionarySave } from './useDictionarySave';

/** Stable empty change set, so memoized consumers skip re-rendering. */
const EMPTY_CHANGE_SET: ChangeSetEntry[] = [];

type DictionaryDetailsProps = {
  dictionary: Dictionary;
  mode: ('local' | 'remote')[];
  onDelete?: () => void;
  onSave?: () => void;
} & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export const SaveForm: FC<DictionaryDetailsProps> = ({
  dictionary,
  mode,
  className,
  onDelete,
  onSave,
  ...props
}) => {
  const [isFormatAlertModalOpen, setIsFormatAlertModalOpen] = useState(false);
  const { mutate: deleteDictionary, isPending: isDeleting } =
    useDeleteDictionary();
  const {
    saveDictionary,
    isPushing,
    isWriting,
    isSaving: isLoading,
  } = useDictionarySave();

  const { editedContent, restoreEditedContent } = useEditedContent();
  const {
    deleteButton,
    discardButton,
    saveButton,
    publishButton,
    saveToFileButton,
    writesTo,
    confirmation,
  } = useIntlayer('save-dictionary-details');
  // Absent when the form is rendered outside the dictionary editor
  const contentGrid = useOptionalContentGrid();
  const configuration = useConfiguration();
  const editedDictionary = editedContent?.[dictionary.localId!];

  // Outside the grid (e.g. a drawer footer), the changes are computed here
  const standaloneChangeSet = useMemo(() => {
    if (contentGrid || !editedDictionary) return EMPTY_CHANGE_SET;

    const locales = (configuration?.internationalization?.locales ?? []).map(
      String
    );
    const flattenOptions = {
      locales,
      sourceLocale: String(
        configuration?.internationalization?.defaultLocale ?? locales[0] ?? 'en'
      ),
    };

    return computeChangeSet(
      flattenContentRows(dictionary.content, flattenOptions),
      flattenContentRows(
        editedDictionary.content ?? dictionary.content,
        flattenOptions
      )
    );
  }, [contentGrid, editedDictionary, dictionary.content, configuration]);

  const changeSet = contentGrid?.changeSet ?? standaloneChangeSet;
  const changeCount = changeSet.length;
  const { isAuthenticated } = useAuth();
  const { session } = useSession();
  const bearerAuth = useBearerAuth();
  // Push requested while signed out, sent once the sign-in lands
  const [isPushAwaitingLogin, setIsPushAwaitingLogin] = useState(false);

  // A bearer token carries no permission list: the backend enforces it
  const hasDictionaryWritePermission = session
    ? ((session.permissions?.includes('dictionary:admin') ||
        session.permissions?.includes('dictionary:write')) ??
      false)
    : Boolean(bearerAuth?.accessToken);

  const canLoginToPush =
    mode.includes('remote') && !isAuthenticated && Boolean(bearerAuth?.login);

  const hasDictionaryDeletePermission = hasDictionaryWritePermission;

  // Serializing a large dictionary is costly: only redo it when either changes
  const isEdited = useMemo(
    () => isDictionaryEdited(editedDictionary, dictionary),
    [editedDictionary, dictionary]
  );

  const isDistantDictionary =
    typeof (dictionary as unknown as DistantDictionary)?.id !== 'undefined';

  const getDictionaryToSave = () =>
    mergeDictionaryEdits(dictionary, editedDictionary ?? dictionary);

  const handleSaveDictionaryConfirmation = async () => {
    if (!editedDictionary) return;

    const isSaved = await saveDictionary(getDictionaryToSave(), 'local');

    if (!isSaved) return;

    setIsFormatAlertModalOpen(false);
    onSave?.();
  };

  const handlePushDictionary = async () => {
    const isSaved = await saveDictionary(getDictionaryToSave(), 'remote');

    if (isSaved) onSave?.();
  };

  const handleLoginToPush = () => {
    setIsPushAwaitingLogin(true);
    bearerAuth?.login?.();
  };

  const isLoggingIn = Boolean(bearerAuth?.isLoggingIn);

  useEffect(() => {
    if (!isPushAwaitingLogin) return;

    if (isAuthenticated) {
      setIsPushAwaitingLogin(false);
      handlePushDictionary();
    } else if (!isLoggingIn) {
      // Sign-in abandoned: drop the push instead of firing it later
      setIsPushAwaitingLogin(false);
    }
  }, [isPushAwaitingLogin, isAuthenticated, isLoggingIn]);

  const handleDeleteDictionary = () => {
    if (!dictionary.id) return;

    deleteDictionary(
      {
        dictionaryId: dictionary.id,
      },
      {
        onSuccess: (res) => {
          if (res) {
            onDelete?.();
          }
        },
      }
    );
  };

  const saveButtonElement = (
    <FormButton
      label={saveButton.label.value}
      disabled={!isEdited || isLoading || !hasDictionaryWritePermission}
      Icon={Save}
      color="text"
      className="max-w-2xs flex-1"
      isLoading={isPushing}
      onClick={handlePushDictionary}
    >
      {changeCount > 0
        ? saveButton.text({ count: changeCount })(changeCount)
        : saveButton.textWithoutCount}
    </FormButton>
  );

  // Hovering the save button reviews the unsaved changes
  const saveChangesButtonElement =
    changeCount > 0 ? (
      <ChangeSetPopover
        changeSet={changeSet}
        onRevert={contentGrid?.revertChange}
        className="max-w-2xs flex-1"
      >
        {saveButtonElement}
      </ChangeSetPopover>
    ) : (
      saveButtonElement
    );

  return (
    <>
      <Modal
        isOpen={isFormatAlertModalOpen}
        title={confirmation.title.value}
        size="md"
        roundedSize="2xl"
        onClose={() => setIsFormatAlertModalOpen(false)}
        padding="md"
        border
        borderColor="neutral"
      >
        <form
          className="size-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveDictionaryConfirmation();
          }}
        >
          <p className="py-4 text-muted-foreground text-sm">
            {confirmation.message}
          </p>

          <div className="mt-12 flex flex-row-reverse justify-start gap-2">
            <FormButton
              type="submit"
              label={confirmation.confirmButton.label.value}
              disabled={!isEdited || isLoading}
              Icon={Save}
              color="text"
              className="max-w-2xs flex-1"
              isLoading={isWriting}
              onClick={handleSaveDictionaryConfirmation}
            >
              {confirmation.confirmButton.text}
            </FormButton>
            <FormButton
              type="button"
              label={confirmation.cancelButton.label.value}
              disabled={isLoading}
              color="text"
              className="max-w-2xs flex-1"
              variant="outline"
              onClick={() => setIsFormatAlertModalOpen(false)}
            >
              {confirmation.cancelButton.text}
            </FormButton>
          </div>
        </form>
      </Modal>
      <form
        className={cn(
          'flex flex-row flex-row-reverse flex-wrap items-end justify-start gap-2',
          className
        )}
        {...props}
      >
        {mode.includes('remote') &&
          isAuthenticated &&
          isDistantDictionary &&
          isEdited &&
          saveChangesButtonElement}

        {mode.includes('local') && dictionary.filePath && (
          <span
            className="me-auto truncate font-mono text-muted-foreground text-xs"
            dir="ltr"
          >
            {writesTo({ filePath: dictionary.filePath })}
          </span>
        )}
        {canLoginToPush && !isDistantDictionary && (
          <FormButton
            label={publishButton.label.value}
            disabled={isLoading}
            Icon={ArrowUpFromLine}
            color="text"
            className="max-w-2xs flex-1"
            isLoading={isPushAwaitingLogin}
            onClick={handleLoginToPush}
          >
            {publishButton.text}
          </FormButton>
        )}

        {mode.includes('remote') && isAuthenticated && !isDistantDictionary && (
          <FormButton
            label={publishButton.label.value}
            disabled={isLoading || !hasDictionaryWritePermission}
            Icon={ArrowUpFromLine}
            color="text"
            className="max-w-2xs flex-1"
            isLoading={isPushing}
            onClick={handlePushDictionary}
          >
            {publishButton.text}
          </FormButton>
        )}

        {mode.includes('local') && (
          <FormButton
            label={saveToFileButton.label.value}
            disabled={!isEdited || isLoading}
            Icon={FileDown}
            color="text"
            variant={isAuthenticated || canLoginToPush ? 'outline' : 'default'}
            className="max-w-2xs flex-1"
            isLoading={isWriting}
            onClick={() => setIsFormatAlertModalOpen(true)}
          >
            {saveToFileButton.text}
          </FormButton>
        )}

        {isEdited && (
          <FormButton
            label={discardButton.label.value}
            disabled={!isEdited}
            Icon={RotateCcw}
            variant="outline"
            color="text"
            className="max-w-2xs flex-1"
            onClick={() => restoreEditedContent(dictionary.localId!)}
          >
            {changeCount > 0
              ? discardButton.text({ count: changeCount })(changeCount)
              : discardButton.textWithoutCount}
          </FormButton>
        )}

        {mode.includes('remote') &&
          isDistantDictionary &&
          onDelete &&
          isAuthenticated && (
            <FormButton
              label={deleteButton.label.value}
              Icon={Trash}
              color="error"
              variant="outline"
              className="max-w-2xs flex-1"
              isLoading={isDeleting}
              onClick={handleDeleteDictionary}
              disabled={!hasDictionaryDeletePermission}
            >
              {deleteButton.text}
            </FormButton>
          )}
      </form>
    </>
  );
};
