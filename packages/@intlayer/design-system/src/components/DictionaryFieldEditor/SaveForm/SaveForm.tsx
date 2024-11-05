'use client';

import { Dictionary as DistantDictionary } from '@intlayer/backend';
import { Dictionary } from '@intlayer/core';
import { ArrowUpFromLine, RotateCcw, Save } from 'lucide-react';
import { useMemo, type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { useGetAllDictionaries, usePushDictionaries } from '../../../hooks';
import { useEditedContentStore } from '../../DictionaryEditor';
import { Form, useForm } from '../../Form';
import { useToast } from '../../Toaster';
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
  const { form, isSubmitting } = useForm(SaveFormSchema, {
    defaultValues: dictionary,
  });
  const { updateOrganizationToasts, resetButton, saveButton, publishButton } =
    useDictionary(saveDictionaryContent);
  const { toast } = useToast();

  const isEdited = useMemo(() => {
    return (
      editedContent[dictionary.key] &&
      JSON.stringify(online?.[dictionary.key]?.content) !==
        JSON.stringify(editedContent[dictionary.key]?.content)
    );
  }, [editedContent, online, dictionary.key]);

  const isLocalDictionary =
    typeof (dictionary as DistantDictionary)?._id === 'undefined';

  const onSubmitSuccess = async () => {
    await pushDictionaries([
      {
        ...dictionary,
        ...editedContent[dictionary.key],
      },
    ])
      .then(() => {
        toast({
          title: updateOrganizationToasts.updated.title.value,
          description: updateOrganizationToasts.updated.description,
          variant: 'success',
        });
      })
      .catch((error) => {
        toast({
          title: updateOrganizationToasts.failed.title.value,
          description: error.message,
          variant: 'error',
        });
      });
  };

  if (!isEdited) return <></>;

  return (
    <Form
      className="flex size-full h-full flex-1 flex-row gap-3"
      {...form}
      schema={SaveFormSchema}
      onSubmitSuccess={onSubmitSuccess}
    >
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
      {isLocalDictionary ? (
        <Form.Button
          type="submit"
          label={publishButton.label.value}
          disabled={!isEdited || isSubmitting}
          Icon={ArrowUpFromLine}
          color="text"
          isLoading={isSubmitting}
        >
          {saveButton.text}
        </Form.Button>
      ) : (
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
      )}
    </Form>
  );
};
