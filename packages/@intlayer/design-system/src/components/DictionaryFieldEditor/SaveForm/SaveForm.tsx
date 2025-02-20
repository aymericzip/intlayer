'use client';

import type { Dictionary as DistantDictionary } from '@intlayer/backend';
import type { Dictionary } from '@intlayer/core';
import {
  useDictionariesRecordActions,
  useEditedContent,
} from '@intlayer/editor-react';
import { ArrowUpFromLine, Download, RotateCcw, Save } from 'lucide-react';
import {
  type DetailedHTMLProps,
  type FormHTMLAttributes,
  useMemo,
  type FC,
} from 'react';
import { useDictionary } from 'react-intlayer';
import { usePushDictionaries, useWriteDictionary } from '../../../hooks';
import { cn } from '../../../utils/cn';
import { useAuth } from '../../Auth';
import { Form } from '../../Form';
import { saveDictionaryContent } from './saveForm.content';

type DictionaryDetailsProps = {
  dictionary: Dictionary;
  mode: ('local' | 'remote')[];
} & DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export const SaveForm: FC<DictionaryDetailsProps> = ({
  dictionary,
  mode,
  className,
  ...props
}) => {
  const { setLocaleDictionary } = useDictionariesRecordActions();
  const { writeDictionary, isLoading: isWriting } = useWriteDictionary();
  const { pushDictionaries, isLoading: isPushing } = usePushDictionaries();
  const isLoading = isWriting || isPushing;

  const { editedContent, restoreEditedContent } = useEditedContent();
  const { resetButton, saveButton, publishButton, downloadButton } =
    useDictionary(saveDictionaryContent);
  const { isAuthenticated } = useAuth();

  const editedDictionary = useMemo(
    () => editedContent?.[dictionary.key],
    [editedContent, dictionary.key]
  );

  const isEdited = useMemo(
    () =>
      editedDictionary &&
      JSON.stringify(editedDictionary) !== JSON.stringify(dictionary),
    [editedDictionary, dictionary, mode]
  );

  const isLocalDictionary = useMemo(
    () => typeof (dictionary as DistantDictionary)?._id === 'undefined',
    [dictionary]
  );

  const handleSaveDictionary = async () => {
    if (!editedContent?.[dictionary.key]) return;

    const updatedDictionary = {
      ...dictionary,
      ...editedContent?.[dictionary.key],
    };

    await writeDictionary(updatedDictionary).then(() => {
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

    await pushDictionaries([updatedDictionary]).then(() => {
      setLocaleDictionary(editedContent?.[dictionary.key]);
      restoreEditedContent(dictionary.key);
    });
  };

  return (
    <form
      className={cn('flex justify-end gap-2 max-md:flex-col', className)}
      {...props}
    >
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
      {mode.includes('remote') && isAuthenticated && isLocalDictionary && (
        <Form.Button
          label={publishButton.label.value}
          disabled={!isEdited}
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
        !isLocalDictionary &&
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
      {mode.includes('local') && (
        <Form.Button
          label={downloadButton.label.value}
          disabled={!isEdited || isLoading}
          Icon={Download}
          color="text"
          className="max-md:w-full"
          isLoading={isWriting}
          onClick={handleSaveDictionary}
        >
          {downloadButton.text}
        </Form.Button>
      )}
    </form>
  );
};
