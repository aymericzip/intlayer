'use client';

import type { Dictionary as DistantDictionary } from '@intlayer/backend';
import type { Dictionary } from '@intlayer/core';
import {
  useDictionariesRecordActions,
  useEditedContent,
} from '@intlayer/editor-react';
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
import { Modal, ModalSize } from '../../../components/Modal';
import {
  useAuth,
  useDeleteDictionary,
  usePushDictionaries,
  useWriteDictionary,
} from '../../../hooks';
import { cn } from '../../../utils/cn';
import { ButtonColor, ButtonVariant } from '../../Button';
import { Form } from '../../Form';

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
          onSave?.();
        },
      }
    );
  };

  const handlePushDictionary = () => {
    if (!editedContent?.[dictionary.localId!]) return;

    const updatedDictionary = {
      ...dictionary,
      ...editedContent?.[dictionary.localId!],
    };

    pushDictionaries([updatedDictionary], {
      onSuccess: (res) => {
        if (res) {
          setLocaleDictionary(editedContent?.[dictionary.localId!]);
          restoreEditedContent(dictionary.localId!);
          onSave?.();
        }
      },
    });
  };

  const handleDeleteDictionary = () => {
    if (!(dictionary as unknown as DistantDictionary).id) return;

    deleteDictionary(
      (dictionary as unknown as DistantDictionary).id.toString(),
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
        size={ModalSize.MD}
      >
        <form className="size-full px-3">
          <p className="text-neutral py-4 text-sm">{confirmation.message}</p>

          <div className="mt-12 flex justify-end gap-2 max-md:flex-col">
            <Form.Button
              label={confirmation.cancelButton.label.value}
              disabled={!isEdited || isLoading}
              color={ButtonColor.TEXT}
              className="max-md:w-full"
              variant={ButtonVariant.OUTLINE}
              onClick={() => setIsFormatAlertModalOpen(false)}
            >
              {confirmation.cancelButton.text}
            </Form.Button>
            <Form.Button
              label={confirmation.confirmButton.label.value}
              disabled={!isEdited || isLoading}
              Icon={Save}
              color={ButtonColor.TEXT}
              className="max-md:w-full"
              isLoading={isPushing}
              onClick={handleSaveDictionaryConfirmation}
            >
              {confirmation.confirmButton.text}
            </Form.Button>
          </div>
        </form>
      </Modal>
      <form
        className={cn('flex justify-end gap-2 max-md:flex-col', className)}
        {...props}
      >
        {mode.includes('remote') &&
          isDistantDictionary &&
          onDelete &&
          isAuthenticated && (
            <Form.Button
              label={deleteButton.label.value}
              Icon={Trash}
              color={ButtonColor.ERROR}
              variant={ButtonVariant.OUTLINE}
              className="max-md:w-full"
              isLoading={isDeleting}
              onClick={handleDeleteDictionary}
            >
              {deleteButton.text}
            </Form.Button>
          )}
        {isEdited && (
          <Form.Button
            label={resetButton.label.value}
            disabled={!isEdited}
            Icon={RotateCcw}
            variant={ButtonVariant.OUTLINE}
            color={ButtonColor.TEXT}
            className="max-md:w-full"
            onClick={() => restoreEditedContent(dictionary.localId!)}
          >
            {resetButton.text}
          </Form.Button>
        )}
        {mode.includes('local') && (
          <Form.Button
            label={downloadButton.label.value}
            disabled={!isEdited || isLoading}
            Icon={Download}
            color={ButtonColor.TEXT}
            variant={
              isAuthenticated ? ButtonVariant.OUTLINE : ButtonVariant.DEFAULT
            }
            className="max-md:w-full"
            isLoading={isWriting}
            onClick={() => setIsFormatAlertModalOpen(true)}
          >
            {downloadButton.text}
          </Form.Button>
        )}
        {mode.includes('remote') && isAuthenticated && !isDistantDictionary && (
          <Form.Button
            label={publishButton.label.value}
            disabled={isLoading}
            Icon={ArrowUpFromLine}
            color={ButtonColor.TEXT}
            className="max-md:w-full"
            isLoading={isPushing}
            onClick={handlePushDictionary}
          >
            {publishButton.text}
          </Form.Button>
        )}
        {mode.includes('remote') &&
          isAuthenticated &&
          isDistantDictionary &&
          isEdited && (
            <Form.Button
              label={saveButton.label.value}
              disabled={!isEdited || isLoading}
              Icon={Save}
              color="text"
              className="max-md:w-full"
              isLoading={isPushing}
              onClick={handlePushDictionary}
            >
              {saveButton.text}
            </Form.Button>
          )}
      </form>
    </>
  );
};
