'use client';

import { Dictionary } from '@intlayer/core';
import { RotateCcw, Save } from 'lucide-react';
import { type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { useUpdateDictionary } from '../../../hooks';
import { useEditedContentStore } from '../../DictionaryEditor';
import { Form, useForm } from '../../Form';
import { useToast } from '../../Toaster';
import { saveDictionaryContent } from './saveForm.content';
import { getSaveFormSchema } from './SaveFormSchema';

type DictionaryDetailsProps = {
  dictionary: Dictionary;
};

export const SaveForm: FC<DictionaryDetailsProps> = ({ dictionary }) => {
  const { updateDictionary } = useUpdateDictionary();
  const SaveFormSchema = getSaveFormSchema();
  const { editedContent, restoreEditedContent } = useEditedContentStore(
    (s) => ({
      editedContent: s.editedContent,
      restoreEditedContent: s.restoreEditedContent,
    })
  );
  const { form, isSubmitting } = useForm(SaveFormSchema, {
    defaultValues: dictionary,
  });
  const { updateOrganizationToasts, resetButton, submitButton } = useDictionary(
    saveDictionaryContent
  );
  const { toast } = useToast();

  const isEdited =
    JSON.stringify(dictionary.content) !==
    JSON.stringify(editedContent[dictionary.key]?.content);

  const onSubmitSuccess = async () => {
    await updateDictionary({
      ...dictionary,
      ...editedContent[dictionary.key],
    })
      .then(() => {
        toast({
          title: updateOrganizationToasts.updated.title.value,
          description: updateOrganizationToasts.updated.description.value,
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
      className="border-text dark:border-text-dark flex size-full h-full flex-1 flex-row gap-3 overflow-hidden rounded-xl border-[1.5px] p-2"
      {...form}
      schema={SaveFormSchema}
      onSubmitSuccess={onSubmitSuccess}
    >
      <Form.Button
        type="button"
        label={resetButton.label.value}
        isDisabled={!isEdited || isSubmitting}
        className="ml-auto"
        Icon={RotateCcw}
        variant="outline"
        color="text"
        isLoading={isSubmitting}
        onClick={() => restoreEditedContent(dictionary.key)}
      >
        {resetButton.text}
      </Form.Button>
      <Form.Button
        type="submit"
        label={submitButton.label.value}
        isDisabled={!isEdited || isSubmitting}
        Icon={Save}
        color="text"
        isLoading={isSubmitting}
      >
        {submitButton.text}
      </Form.Button>
    </Form>
  );
};
