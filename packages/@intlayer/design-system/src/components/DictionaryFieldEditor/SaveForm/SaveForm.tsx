'use client';

import {
  useAuth,
  useBearerAuth,
  useDeleteDictionary,
  usePushDictionaries,
  useSession,
  useWriteDictionary,
} from '@api/index';
import { FormButton } from '@components/Form';
import { Modal } from '@components/Modal';
import type { DictionaryAPI as DistantDictionary } from '@intlayer/backend-contract/dictionary';
import {
  useDictionariesRecordActions,
  useEditedContent,
} from '@intlayer/editor-react';
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
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';
import { ChangeSetPopover } from '../ContentGrid/ChangeSetPopover';
import { useOptionalContentGrid } from '../ContentGrid/useOptionalContentGrid';

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
  const { setLocaleDictionary } = useDictionariesRecordActions();
  const { mutate: deleteDictionary, isPending: isDeleting } =
    useDeleteDictionary();
  const { mutate: writeDictionary, isPending: isWriting } =
    useWriteDictionary();
  const { mutate: pushDictionaries, isPending: isPushing } =
    usePushDictionaries();
  const isLoading = isWriting || isPushing;

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
  const changeCount = contentGrid?.changeSet.length ?? 0;
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

  const editedDictionary = editedContent?.[dictionary.localId!];

  const isEdited =
    editedDictionary &&
    JSON.stringify(editedDictionary) !== JSON.stringify(dictionary);

  const isDistantDictionary =
    typeof (dictionary as unknown as DistantDictionary)?.id !== 'undefined';

  const handleSaveDictionaryConfirmation = async () => {
    if (!editedContent?.[dictionary.localId!]) return;

    const updatedDictionary = {
      ...dictionary,
      ...editedContent?.[dictionary.localId!],
    };

    writeDictionary(
      {
        dictionary: updatedDictionary,
      },
      {
        onSuccess: () => {
          const savedDictionary = editedContent?.[dictionary.localId!];
          if (savedDictionary) setLocaleDictionary(savedDictionary);
          restoreEditedContent(dictionary.localId!);
          setIsFormatAlertModalOpen(false);
          onSave?.();
        },
      }
    );
  };

  const handlePushDictionary = () => {
    const updatedDictionary = {
      ...dictionary,
      ...editedContent?.[dictionary.localId!],
    };

    pushDictionaries(
      { dictionaries: [updatedDictionary] },
      {
        onSuccess: (res) => {
          if (res) {
            setLocaleDictionary(updatedDictionary);
            restoreEditedContent(dictionary.localId!);
            onSave?.();
          }
        },
      }
    );
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
      className="max-md:w-full"
      isLoading={isPushing}
      onClick={handlePushDictionary}
    >
      {changeCount > 0
        ? saveButton.countText({ count: changeCount })
        : saveButton.text}
    </FormButton>
  );

  // Hovering the save button reviews the unsaved changes
  const saveChangesButton =
    contentGrid && changeCount > 0 ? (
      <ChangeSetPopover
        changeSet={contentGrid.changeSet}
        onRevert={contentGrid.revertChange}
        className="max-md:w-full"
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

          <div className="mt-12 flex justify-end gap-2 max-md:flex-col">
            <FormButton
              type="button"
              label={confirmation.cancelButton.label.value}
              disabled={isLoading}
              color="text"
              className="max-md:w-full"
              variant="outline"
              onClick={() => setIsFormatAlertModalOpen(false)}
            >
              {confirmation.cancelButton.text}
            </FormButton>
            <FormButton
              type="submit"
              label={confirmation.confirmButton.label.value}
              disabled={!isEdited || isLoading}
              Icon={Save}
              color="text"
              className="max-md:w-full"
              isLoading={isWriting}
              onClick={handleSaveDictionaryConfirmation}
            >
              {confirmation.confirmButton.text}
            </FormButton>
          </div>
        </form>
      </Modal>
      <form
        className={cn(
          'flex flex-wrap items-center justify-end gap-2',
          className
        )}
        {...props}
      >
        {mode.includes('local') && dictionary.filePath && (
          <span
            className="me-auto truncate font-mono text-muted-foreground text-xs"
            dir="ltr"
          >
            {writesTo({ filePath: dictionary.filePath })}
          </span>
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
              className="max-md:w-full"
              isLoading={isDeleting}
              onClick={handleDeleteDictionary}
              disabled={!hasDictionaryDeletePermission}
            >
              {deleteButton.text}
            </FormButton>
          )}
        {isEdited && (
          <FormButton
            label={discardButton.label.value}
            disabled={!isEdited}
            Icon={RotateCcw}
            variant="outline"
            color="text"
            className="max-md:w-full"
            onClick={() => restoreEditedContent(dictionary.localId!)}
          >
            {changeCount > 0
              ? discardButton.countText({ count: changeCount })
              : discardButton.text}
          </FormButton>
        )}
        {mode.includes('local') && (
          <FormButton
            label={saveToFileButton.label.value}
            disabled={!isEdited || isLoading}
            Icon={FileDown}
            color="text"
            variant={isAuthenticated || canLoginToPush ? 'outline' : 'default'}
            className="max-md:w-full"
            isLoading={isWriting}
            onClick={() => setIsFormatAlertModalOpen(true)}
          >
            {saveToFileButton.text}
          </FormButton>
        )}
        {mode.includes('remote') && isAuthenticated && !isDistantDictionary && (
          <FormButton
            label={publishButton.label.value}
            disabled={isLoading || !hasDictionaryWritePermission}
            Icon={ArrowUpFromLine}
            color="text"
            className="max-md:w-full"
            isLoading={isPushing}
            onClick={handlePushDictionary}
          >
            {publishButton.text}
          </FormButton>
        )}
        {canLoginToPush && !isDistantDictionary && (
          <FormButton
            label={publishButton.label.value}
            disabled={isLoading}
            Icon={ArrowUpFromLine}
            color="text"
            className="max-md:w-full"
            isLoading={isPushAwaitingLogin}
            onClick={handleLoginToPush}
          >
            {publishButton.text}
          </FormButton>
        )}
        {mode.includes('remote') &&
          isAuthenticated &&
          isDistantDictionary &&
          isEdited &&
          saveChangesButton}
      </form>
    </>
  );
};
