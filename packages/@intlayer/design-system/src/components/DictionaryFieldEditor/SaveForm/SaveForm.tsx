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
import { useDictionary } from 'react-intlayer';
import { Modal } from '../../../components/Modal';
import {
  useAuth,
  useDeleteDictionary,
  usePushDictionaries,
  useWriteDictionary,
} from '../../../hooks';
import { cn } from '../../../utils/cn';
import { Form } from '../../Form';
import { saveDictionaryContent } from './saveForm.content';

type DictionaryDetailsProps = {
  dictionary: Dictionary;
  mode: ('local' | 'remote')[];
  onDelete?: () => void;
} & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export const SaveForm: FC<DictionaryDetailsProps> = ({
  dictionary,
  mode,
  className,
  onDelete,
  ...props
}) => {
  const [isFormatAlertModalOpen, setIsFormatAlertModalOpen] = useState(false);
  const { setLocaleDictionary } = useDictionariesRecordActions();
  const { deleteDictionary, isLoading: isDeleting } = useDeleteDictionary();
  const { writeDictionary, isLoading: isWriting } = useWriteDictionary();
  const { pushDictionaries, isLoading: isPushing } = usePushDictionaries();
  const isLoading = isWriting || isPushing;
  const isJsonFormat =
    mode.includes('local') && dictionary.filePath?.endsWith('.json');

  const { editedContent, restoreEditedContent } = useEditedContent();
  const {
    deleteButton,
    resetButton,
    saveButton,
    publishButton,
    downloadButton,
    confirmation,
  } = useDictionary(saveDictionaryContent);
  const { isAuthenticated } = useAuth();

  const editedDictionary = editedContent?.[dictionary.key];

  const isEdited =
    editedDictionary &&
    JSON.stringify(editedDictionary) !== JSON.stringify(dictionary);

  const isDistantDictionary =
    typeof (dictionary as DistantDictionary)?.id !== 'undefined';

  const handleSaveDictionaryConfirmation = async () => {
    if (!editedContent?.[dictionary.key]) return;

    const updatedDictionary = {
      ...dictionary,
      ...editedContent?.[dictionary.key],
    };

    await writeDictionary({
      dictionary: updatedDictionary,
    }).then(() => {
      setLocaleDictionary(editedContent?.[dictionary.key]);
      restoreEditedContent(dictionary.key);
    });
  };

  const handlePushDictionary = async () => {
    if (!editedContent?.[dictionary.key]) return;

    const updatedDictionary = {
      ...dictionary,
      ...editedContent?.[dictionary.key],
    };

    await pushDictionaries([updatedDictionary]).then((res) => {
      if (res) {
        setLocaleDictionary(editedContent?.[dictionary.key]);
        restoreEditedContent(dictionary.key);
      }
    });
  };

  const handleDeleteDictionary = async () => {
    if (!(dictionary as DistantDictionary).id) return;

    await deleteDictionary(
      (dictionary as DistantDictionary).id.toString()
    ).then((res) => {
      if (res) {
        onDelete?.();
      }
    });
  };

  return (
    <>
      <Modal
        isOpen={isFormatAlertModalOpen}
        title={confirmation.title.value}
        size="md"
      >
        <form className="size-full px-3">
          {isJsonFormat ? (
            <p className="text-neutral py-4 text-sm">{confirmation.message}</p>
          ) : (
            <p className="text-neutral py-4 text-sm">
              {confirmation.differentFormatMessage}
            </p>
          )}
          <div className="mt-12 flex justify-end gap-2 max-md:flex-col">
            <Form.Button
              label={confirmation.cancelButton.label.value}
              disabled={!isEdited || isLoading}
              color="text"
              className="max-md:w-full"
              variant="outline"
              onClick={() => setIsFormatAlertModalOpen(false)}
            >
              {confirmation.cancelButton.text}
            </Form.Button>
            <Form.Button
              label={confirmation.confirmButton.label.value}
              disabled={!isEdited || isLoading}
              Icon={Save}
              color="text"
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
              color="error"
              variant="outline"
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
            variant="outline"
            color="text"
            className="max-md:w-full"
            onClick={() => restoreEditedContent(dictionary.key)}
          >
            {resetButton.text}
          </Form.Button>
        )}
        {mode.includes('local') && (
          <Form.Button
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
          </Form.Button>
        )}
        {mode.includes('remote') && isAuthenticated && !isDistantDictionary && (
          <Form.Button
            label={publishButton.label.value}
            disabled={isLoading}
            Icon={ArrowUpFromLine}
            color="text"
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
