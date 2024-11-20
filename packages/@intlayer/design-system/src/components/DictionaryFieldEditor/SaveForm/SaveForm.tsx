'use client';

import { Dictionary as DistantDictionary } from '@intlayer/backend';
import { Dictionary } from '@intlayer/core';
import { ArrowUpFromLine, RotateCcw, Save } from 'lucide-react';
import { useMemo, type FC } from 'react';
// @ts-ignore react-intlayer not build yet
import { useDictionary } from 'react-intlayer';
import { useGetAllDictionaries, usePushDictionaries } from '../../../hooks';
import { useEditedContentStore } from '../../DictionaryEditor';
import { Form, useForm } from '../../Form';
import { saveDictionaryContent } from './saveForm.content';
import { getSaveFormSchema } from './SaveFormSchema';

type DictionaryDetailsProps = {
  dictionary: Dictionary;
};

export const SaveForm: FC<DictionaryDetailsProps> = ({ dictionary }) => {
  const { pushDictionaries } = usePushDictionaries();
  const SaveFormSchema = getSaveFormSchema();
  const { online } = useGetAllDictionaries();

  const { editedContent, restoreEditedContent } = useEditedContentStore(
    (s) => ({
      editedContent: s.editedContent,
      restoreEditedContent: s.restoreEditedContent,
    })
  );
  const { form, isSubmitting } = useForm(SaveFormSchema);
  const { resetButton, saveButton, publishButton } = useDictionary(
    saveDictionaryContent
  );

  const editedDictionary = useMemo(
    () => editedContent[dictionary.key],
    [editedContent, dictionary.key]
  );

  const onlineDictionary = useMemo(() => {
    return online?.[dictionary.key];
  }, [online, dictionary.key]);

  const isEdited = useMemo(
    () =>
      editedDictionary &&
      JSON.stringify(editedDictionary?.content) !==
        JSON.stringify(onlineDictionary?.content),
    [onlineDictionary, editedDictionary]
  );

  const isLocalDictionary = useMemo(
    () => typeof (dictionary as DistantDictionary)?._id === 'undefined',
    [dictionary]
  );

  const onSubmitSuccess = async () => {
    await pushDictionaries([
      {
        ...dictionary,
        ...editedContent[dictionary.key],
      },
    ]);
  };

  return (
    <Form
      className="flex w-full flex-1 flex-row justify-end gap-3"
      {...form}
      schema={SaveFormSchema}
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
          isLoading={isSubmitting}
          onClick={() => restoreEditedContent(dictionary.key)}
        >
          {resetButton.text}
        </Form.Button>
      )}
      {isLocalDictionary ? (
        <Form.Button
          type="submit"
          label={publishButton.label.value}
          disabled={!isEdited || isSubmitting}
          Icon={ArrowUpFromLine}
          color="text"
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
            isLoading={isSubmitting}
          >
            {saveButton.text}
          </Form.Button>
        )
      )}
    </Form>
  );
};
