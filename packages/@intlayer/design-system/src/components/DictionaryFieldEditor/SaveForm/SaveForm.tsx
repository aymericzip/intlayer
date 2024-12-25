'use client';

import { Dictionary as DistantDictionary } from '@intlayer/backend';
import { Dictionary } from '@intlayer/core';
import { Locales } from 'intlayer';
import { ArrowUpFromLine, RotateCcw, Save, WandSparkles } from 'lucide-react';
import { useCallback, useMemo, type FC } from 'react';
// @ts-ignore react-intlayer not build yet
import { useDictionary } from 'react-intlayer';
import { useShallow } from 'zustand/react/shallow';
import { useAuth } from '../../../components/Auth';
import {
  useAuditFile,
  useGetAllDictionaries,
  usePushDictionaries,
} from '../../../hooks';
import { useEditedContentStore } from '../../DictionaryEditor';
import { Form, useForm } from '../../Form';
import { saveDictionaryContent } from './saveForm.content';
import { getSaveFormSchema } from './SaveFormSchema';

type DictionaryDetailsProps = {
  dictionary: Dictionary;
};

export const SaveForm: FC<DictionaryDetailsProps> = ({ dictionary }) => {
  const { session } = useAuth();
  const project = session?.project;
  const { pushDictionaries } = usePushDictionaries();
  const SaveFormSchema = getSaveFormSchema();
  const { online } = useGetAllDictionaries();
  const { isLoading: isAuditing, auditFile } = useAuditFile();

  const { editedContent, restoreEditedContent, setEditedContent } =
    useEditedContentStore(
      useShallow((s) => ({
        editedContent: s.editedContent,
        restoreEditedContent: s.restoreEditedContent,
        setEditedContent: s.setEditedContent,
      }))
    );
  const { form, isSubmitting } = useForm(SaveFormSchema);
  const { auditButton, resetButton, saveButton, publishButton } = useDictionary(
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
      onlineDictionary &&
      JSON.stringify(editedDictionary.content) !==
        JSON.stringify(onlineDictionary.content),
    [onlineDictionary, editedDictionary]
  );

  const isLocalDictionary = useMemo(
    () => typeof (dictionary as DistantDictionary)?._id === 'undefined',
    [dictionary]
  );

  const onSubmitSuccess = useCallback(async () => {
    await pushDictionaries([
      {
        ...dictionary,
        ...editedContent[dictionary.key],
      },
    ]);
  }, [dictionary, editedContent, pushDictionaries]);

  const handleOnAuditFile = async () =>
    await auditFile({
      defaultLocale: project?.defaultLocale ?? Locales.ENGLISH,
      locales: project?.locales ?? [Locales.ENGLISH],
      fileContent: JSON.stringify(editedDictionary ?? dictionary),
    }).then((response) => {
      if (!response.data) return;

      const editedDictionary = JSON.parse(
        response.data.fileContent
      ) as Dictionary;

      setEditedContent(dictionary.key, editedDictionary.content);
    });

  return (
    <Form
      className="flex w-full flex-1 flex-row flex-wrap justify-end gap-3"
      {...form}
      schema={SaveFormSchema}
      onSubmitSuccess={onSubmitSuccess}
    >
      <Form.Button
        type="button"
        label={auditButton.label}
        disabled={isSubmitting}
        Icon={WandSparkles}
        variant="outline"
        color="text"
        className="ml-auto max-md:w-full"
        isLoading={isAuditing}
        onClick={handleOnAuditFile}
      >
        {auditButton.text}
      </Form.Button>
      {isEdited && (
        <Form.Button
          type="button"
          label={resetButton.label}
          disabled={!isEdited || isSubmitting}
          Icon={RotateCcw}
          variant="outline"
          color="text"
          className="max-md:w-full"
          isLoading={isSubmitting}
          onClick={() => restoreEditedContent(dictionary.key)}
        >
          {resetButton.text}
        </Form.Button>
      )}
      {isLocalDictionary ? (
        <Form.Button
          type="submit"
          label={publishButton.label}
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
            label={saveButton.label}
            disabled={!isEdited || isSubmitting}
            Icon={Save}
            color="text"
            className="max-md:w-full"
            isLoading={isSubmitting}
          >
            {saveButton.text}
          </Form.Button>
        )
      )}
    </Form>
  );
};
