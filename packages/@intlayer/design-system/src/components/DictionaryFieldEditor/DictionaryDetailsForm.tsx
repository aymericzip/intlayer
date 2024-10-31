'use client';

import { Dictionary } from '@intlayer/core';
import { Save } from 'lucide-react';
import { type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { useUpdateDictionary } from '../../hooks';
import { cn } from '../../utils/cn';
import { Form, useForm } from '../Form';
import { useToast } from '../Toaster';
import { dictionaryDetailsContent } from './dictionaryDetails.content';
import {
  getDictionaryDetailsSchema,
  DictionaryDetailsFormData,
} from './DictionaryDetailsSchema';

type DictionaryDetailsProps = {
  dictionary: Dictionary;
};

export const DictionaryDetailsForm: FC<DictionaryDetailsProps> = ({
  dictionary,
}) => {
  const { updateDictionary } = useUpdateDictionary();
  const DictionaryDetailsSchema = getDictionaryDetailsSchema();
  const { form, isSubmitting } = useForm(DictionaryDetailsSchema, {
    defaultValues: dictionary,
  });
  const {
    updateOrganizationToasts,
    titleInput,
    keyInput,
    descriptionInput,
    submitButton,
  } = useDictionary(dictionaryDetailsContent);
  const { toast } = useToast();

  const onSubmitSuccess = async (data: DictionaryDetailsFormData) => {
    await updateDictionary({
      ...dictionary,
      ...data,
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

  const isFormEdited = form.formState.isDirty;

  return (
    <Form
      className="flex size-full flex-1 flex-col gap-8"
      {...form}
      schema={DictionaryDetailsSchema}
      onSubmitSuccess={onSubmitSuccess}
    >
      <div className="flex size-full flex-1 gap-8 max-md:flex-col">
        <Form.EditableFieldInput
          name="title"
          value={dictionary.title}
          label={titleInput.label.value}
          placeholder={titleInput.placeholder.value}
          description={titleInput.description.value}
          isDisabled={isSubmitting}
        />
        <Form.EditableFieldInput
          name="key"
          value={dictionary.key}
          label={keyInput.label.value}
          placeholder={keyInput.label.value}
          description={keyInput.description.value}
          isDisabled={isSubmitting}
          required
        />
      </div>

      <Form.EditableFieldTextArea
        value={dictionary.description}
        name="description"
        label={descriptionInput.label.value}
        placeholder={descriptionInput.placeholder.value}
        description={descriptionInput.description.value}
        isDisabled={isSubmitting}
      />

      <Form.Button
        type="submit"
        label={submitButton.label.value}
        isDisabled={isSubmitting || isFormEdited}
        className={cn(
          'ml-auto w-auto',
          isFormEdited ? 'opacity-100' : 'opacity-0'
        )}
        Icon={Save}
        color="text"
        isLoading={isSubmitting}
      >
        {submitButton.text}
      </Form.Button>
    </Form>
  );
};
