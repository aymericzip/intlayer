'use client';

import type { Dictionary as DistantDictionary } from '@intlayer/backend';
import type { Dictionary } from '@intlayer/core';
import {
  useDictionariesRecordActions,
  useEditedContent,
} from '@intlayer/editor-react';
import { ArrowUpFromLine, Download, RotateCcw, Save } from 'lucide-react';
import { useCallback, useMemo, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { usePushDictionaries, useWriteDictionary } from '../../../hooks';
import { Form, useForm } from '../../Form';
import { saveDictionaryContent } from './saveForm.content';
import { getSaveFormSchema } from './SaveFormSchema';

type DictionaryDetailsProps = {
  dictionary: Dictionary;
  mode: 'local' | 'remote';
};

export const SaveForm: FC<DictionaryDetailsProps> = ({ dictionary, mode }) => {
  const { setLocaleDictionary } = useDictionariesRecordActions();
  const { pushDictionaries } = usePushDictionaries();
  const { writeDictionary } = useWriteDictionary();
  const SaveFormSchema = getSaveFormSchema();

  const { editedContent, restoreEditedContent } = useEditedContent();
  const { form, isSubmitting } = useForm(SaveFormSchema);
  const { resetButton, saveButton, publishButton, downloadButton } =
    useDictionary(saveDictionaryContent);

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

  const onSubmitSuccess = useCallback(async () => {
    if (!editedContent?.[dictionary.key]) return;

    const updatedDictionary = {
      ...dictionary,
      ...editedContent?.[dictionary.key],
    };

    if (mode === 'remote') {
      await pushDictionaries([updatedDictionary]);
    } else {
      await writeDictionary(updatedDictionary);
    }
    setLocaleDictionary(editedContent?.[dictionary.key]);
    restoreEditedContent(dictionary.key);
  }, [dictionary, editedContent, mode]);

  return (
    <Form
      className="flex h-auto w-full flex-col flex-wrap justify-end gap-3 md:flex-row"
      {...form}
      schema={SaveFormSchema}
      onSubmitSuccess={onSubmitSuccess}
    >
      {isEdited && (
        <Form.Button
          type="button"
          label={resetButton.label.value}
          disabled={!isEdited || isSubmitting}
          Icon={RotateCcw}
          variant="outline"
          color="text"
          className="max-md:w-full"
          onClick={() => restoreEditedContent(dictionary.key)}
        >
          {resetButton.text}
        </Form.Button>
      )}
      {mode === 'remote' ? (
        isLocalDictionary ? (
          <Form.Button
            type="submit"
            label={publishButton.label.value}
            disabled={!isEdited || isSubmitting}
            Icon={ArrowUpFromLine}
            color="text"
            className="max-md:w-full"
            isLoading={isSubmitting}
          >
            {publishButton.text}
          </Form.Button>
        ) : (
          isEdited && (
            <Form.Button
              type="submit"
              label={saveButton.label.value}
              disabled={!isEdited || isSubmitting}
              Icon={Save}
              color="text"
              className="max-md:w-full"
              isLoading={isSubmitting}
            >
              {saveButton.text}
            </Form.Button>
          )
        )
      ) : (
        <Form.Button
          type="submit"
          label={downloadButton.label.value}
          disabled={!isEdited || isSubmitting}
          Icon={Download}
          color="text"
          className="max-md:w-full"
          isLoading={isSubmitting}
        >
          {downloadButton.text}
        </Form.Button>
      )}
    </Form>
  );
};
