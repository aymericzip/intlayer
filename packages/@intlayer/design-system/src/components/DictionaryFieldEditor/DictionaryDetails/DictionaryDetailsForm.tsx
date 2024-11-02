'use client';

import { Dictionary as DistantDictionary } from '@intlayer/backend';
import { Dictionary } from '@intlayer/core';
import { ArrowUpFromLine, Save } from 'lucide-react';
import { type FC } from 'react';
import { useDictionary } from 'react-intlayer';
import { usePushDictionaries } from '../../../hooks';
import { cn } from '../../../utils/cn';
import { Form, useForm } from '../../Form';
import { useToast } from '../../Toaster';
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
  const { pushDictionaries } = usePushDictionaries();
  const DictionaryDetailsSchema = getDictionaryDetailsSchema();
  const { form, isSubmitting } = useForm(DictionaryDetailsSchema, {
    defaultValues: dictionary,
  });
  const {
    pushDictionariesToasts,
    updateDictionaryToasts,
    titleInput,
    keyInput,
    descriptionInput,
    publishButton,
    saveButton,
  } = useDictionary(dictionaryDetailsContent);
  const { toast } = useToast();

  const isFormEdited = form.formState.isDirty;
  const isLocalDictionary =
    typeof (dictionary as DistantDictionary)?._id === 'undefined';

  const onSubmitSuccess = async (data: DictionaryDetailsFormData) => {
    await pushDictionaries([
      {
        ...dictionary,
        ...data,
      },
    ])
      .then(() => {
        if (isLocalDictionary) {
          toast({
            title: pushDictionariesToasts.updated.title.value,
            description: pushDictionariesToasts.updated.description.value,
            variant: 'success',
          });
        } else {
          toast({
            title: updateDictionaryToasts.updated.title.value,
            description: updateDictionaryToasts.updated.description.value,
            variant: 'success',
          });
        }
      })
      .catch((error) => {
        if (isLocalDictionary) {
          toast({
            title: pushDictionariesToasts.failed.title.value,
            description: pushDictionariesToasts.failed.description.value,
            variant: 'error',
          });
        } else {
          toast({
            title: updateDictionaryToasts.failed.title.value,
            description: error.message,
            variant: 'error',
          });
        }
      });
  };

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

      {isLocalDictionary ? (
        <Form.Button
          type="submit"
          label={publishButton.label.value}
          isDisabled={isSubmitting || !isFormEdited}
          Icon={ArrowUpFromLine}
          isFullWidth={false}
          color="text"
          isLoading={isSubmitting}
          className="ml-auto"
        >
          {publishButton.text}
        </Form.Button>
      ) : (
        <Form.Button
          type="submit"
          label={saveButton.label.value}
          isDisabled={isSubmitting}
          isFullWidth={false}
          className={cn('ml-auto', isFormEdited ? '' : 'invisible')}
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
