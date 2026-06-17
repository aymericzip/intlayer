'use client';

import {
  useAuth,
  useDeleteDictionary,
  usePushDictionaries,
  useSession,
  useWriteDictionary,
} from '@api/index';
import { FormButton } from '@components/Form';
import { Modal } from '@components/Modal';
import type { Dictionary as DistantDictionary } from '@intlayer/backend';
import {
  useDictionariesRecordActions,
  useEditedContent,
} from '@intlayer/editor-react';
import type { Dictionary } from '@intlayer/types/dictionary';
import { cn } from '@utils/cn';
import {
  ArrowUpFromLine,
  Download,
  RotateCcw,
  Save,
  Trash,
} from 'lucide-react';
import {
  type DetailedHTMLProps,
  type FC,
  type FormHTMLAttributes,
  useState,
} from 'react';
import { useIntlayer } from 'react-intlayer';

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
    resetButton,
    saveButton,
    publishButton,
    downloadButton,
    confirmation,
  } = useIntlayer('save-dictionary-details');
  const { isAuthenticated } = useAuth();
  const { session } = useSession();

  const hasDictionaryWritePermission =
    (session?.permissions?.includes('dictionary:admin') ||
      session?.permissions?.includes('dictionary:write')) ??
    false;

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
          setLocaleDictionary(editedContent?.[dictionary.localId!]);
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

  return (
    <>
      <Modal
        isOpen={isFormatAlertModalOpen}
        title={confirmation.title.value}
        size="md"
        onClose={() => setIsFormatAlertModalOpen(false)}
        padding="md"
      >
        <form className="size-full">
          <p className="py-4 text-neutral text-sm">{confirmation.message}</p>

          <div className="mt-12 flex justify-end gap-2 max-md:flex-col">
            <FormButton
              label={confirmation.cancelButton.label.value}
              disabled={!isEdited || isLoading}
              color="text"
              className="max-md:w-full"
              variant="outline"
              onClick={() => setIsFormatAlertModalOpen(false)}
            >
              {confirmation.cancelButton.text}
            </FormButton>
            <FormButton
              label={confirmation.confirmButton.label.value}
              disabled={!isEdited || isLoading || !hasDictionaryWritePermission}
              Icon={Save}
              color="text"
              className="max-md:w-full"
              isLoading={isPushing}
              onClick={handleSaveDictionaryConfirmation}
            >
              {confirmation.confirmButton.text}
            </FormButton>
          </div>
        </form>
      </Modal>
      <form className={cn('flex justify-end gap-2', className)} {...props}>
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
            label={resetButton.label.value}
            disabled={!isEdited}
            Icon={RotateCcw}
            variant="outline"
            color="text"
            className="max-md:w-full"
            onClick={() => restoreEditedContent(dictionary.localId!)}
          >
            {resetButton.text}
          </FormButton>
        )}
        {mode.includes('local') && (
          <FormButton
            label={downloadButton.label.value}
            disabled={!isEdited || isLoading}
            Icon={Download}
            color="text"
            variant={isAuthenticated ? 'outline' : 'default'}
            className="max-md:w-full"
            isLoading={isWriting}
            onClick={() => setIsFormatAlertModalOpen(true)}
          >
            {downloadButton.text}
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
        {mode.includes('remote') &&
          isAuthenticated &&
          isDistantDictionary &&
          isEdited && (
            <FormButton
              label={saveButton.label.value}
              disabled={!isEdited || isLoading || !hasDictionaryWritePermission}
              Icon={Save}
              color="text"
              className="max-md:w-full"
              isLoading={isPushing}
              onClick={handlePushDictionary}
            >
              {saveButton.text}
            </FormButton>
          )}
      </form>
    </>
  );
};
