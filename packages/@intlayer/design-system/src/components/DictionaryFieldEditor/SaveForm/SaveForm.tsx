'use client';

import { Dictionary as DistantDictionary } from '@intlayer/backend';
import { Dictionary } from '@intlayer/core';
import {
  useDictionariesRecordActions,
  useEditedContent,
} from '@intlayer/editor-react';
import { Locales } from 'intlayer';
import {
  ArrowUpFromLine,
  Download,
  RotateCcw,
  Save,
  WandSparkles,
} from 'lucide-react';
import { useCallback, useMemo, type FC } from 'react';
// @ts-ignore react-intlayer not build yet
import { useDictionary } from 'react-intlayer';
import {
  usePushDictionaries,
  useGetAllDictionaries,
  useAuditContentDeclaration,
  useWriteDictionary,
} from '../../../hooks';
import { useAuth } from '../../Auth';
import { Form, useForm } from '../../Form';
import { saveDictionaryContent } from './saveForm.content';
import { getSaveFormSchema } from './SaveFormSchema';

type DictionaryDetailsProps = {
  dictionary: Dictionary;
  mode: 'local' | 'remote';
};

export const SaveForm: FC<DictionaryDetailsProps> = ({ dictionary, mode }) => {
  const { session } = useAuth();
  const project = session?.project;
  const { setLocaleDictionary } = useDictionariesRecordActions();
  const { pushDictionaries } = usePushDictionaries();
  const { writeDictionary } = useWriteDictionary();
  const SaveFormSchema = getSaveFormSchema();
  const { online } = useGetAllDictionaries();
  const { isLoading: isAuditing, auditContentDeclaration } =
    useAuditContentDeclaration();

  const { editedContent, restoreEditedContent, setEditedContent } =
    useEditedContent();
  const { form, isSubmitting } = useForm(SaveFormSchema);
  const {
    auditButton,
    resetButton,
    saveButton,
    publishButton,
    downloadButton,
  } = useDictionary(saveDictionaryContent);

  const editedDictionary = useMemo(
    () => editedContent?.[dictionary.key],
    [editedContent, dictionary.key]
  );

  const onlineDictionary = useMemo(() => {
    return online?.[dictionary.key];
  }, [online, dictionary.key]);

  const isEdited = useMemo(() => {
    if (mode === 'remote') {
      return (
        editedDictionary &&
        onlineDictionary &&
        JSON.stringify(editedDictionary.content) !==
          JSON.stringify(onlineDictionary.content)
      );
    } else if (mode === 'local') {
      return (
        editedDictionary &&
        JSON.stringify(editedDictionary.content) !==
          JSON.stringify(dictionary.content)
      );
    }
  }, [onlineDictionary, editedDictionary, dictionary, mode]);

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

  const handleOnAuditFile = async () =>
    await auditContentDeclaration({
      defaultLocale:
        project?.configuration?.internationalization?.defaultLocale ??
        Locales.ENGLISH,
      locales: project?.configuration?.internationalization?.locales ?? [
        Locales.ENGLISH,
      ],
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
          onClick={() => restoreEditedContent(dictionary.key)}
        >
          {resetButton.text}
        </Form.Button>
      )}
      {mode === 'remote' ? (
        isLocalDictionary ? (
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
        )
      ) : (
        <Form.Button
          type="submit"
          label={downloadButton.label}
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
