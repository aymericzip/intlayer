'use client';

import { Dictionary as DistantDictionary } from '@intlayer/backend';
import type { Dictionary } from '@intlayer/core';
import {
  useDictionariesRecordActions,
  useEditedContent,
} from '@intlayer/editor-react';
import { ArrowUpFromLine, Download, RotateCcw, Save } from 'lucide-react';
import { useCallback, useMemo, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { usePushDictionaries, useWriteDictionary } from '../../hooks';
import { Form, useForm } from '../Form';
import { validDictionaryChangeButtonsContent } from './validDictionaryChangeButtons.content';
import { getValidDictionaryChangeButtonsSchemaSchema } from './validDictionaryChangeButtonsSchema';

type ValidDictionaryChangeButtonsProps = {
  dictionary: Dictionary;
  mode: 'local' | 'remote';
};

export const ValidDictionaryChangeButtons: FC<
  ValidDictionaryChangeButtonsProps
> = ({ dictionary, mode }) => {
  const ValidDictionaryChangeButtonsSchemaSchema =
    getValidDictionaryChangeButtonsSchemaSchema();

  const { resetButton, saveButton, publishButton, downloadButton } =
    useDictionary(validDictionaryChangeButtonsContent);

  const { setLocaleDictionary } = useDictionariesRecordActions();
  const { writeDictionary } = useWriteDictionary();
  const { pushDictionaries } = usePushDictionaries();

  const { editedContent, restoreEditedContent } = useEditedContent();
  const { form, isSubmitting } = useForm(
    ValidDictionaryChangeButtonsSchemaSchema
  );

  const editedDictionary = useMemo(
    () => editedContent?.[dictionary.key],
    [editedContent, dictionary.key]
  );

  const isEdited = useMemo(
    () =>
      editedDictionary &&
      JSON.stringify(editedDictionary?.content) !==
        JSON.stringify(dictionary?.content),
    [editedDictionary, dictionary]
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
  }, [
    dictionary,
    editedContent,
    pushDictionaries,
    setLocaleDictionary,
    writeDictionary,
    restoreEditedContent,
    mode,
  ]);

  return (
    <div className="mb-4">
      <Form
        className="flex w-full flex-row flex-wrap justify-end gap-3"
        {...form}
        schema={ValidDictionaryChangeButtonsSchemaSchema}
        onSubmitSuccess={onSubmitSuccess}
      >
        {isEdited && (
          <Form.Button
            type="button"
            label={resetButton.label.value}
            disabled={!isEdited || isSubmitting}
            className="ml-auto"
            Icon={RotateCcw}
            variant="outline"
            color="text"
            isFullWidth
            isLoading={isSubmitting}
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
              isFullWidth
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
                isFullWidth
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
            isFullWidth
            isLoading={isSubmitting}
          >
            {downloadButton.text}
          </Form.Button>
        )}
      </Form>
    </div>
  );
};
