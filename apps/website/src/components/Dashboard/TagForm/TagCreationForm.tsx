'use client';

import { useForm, Form } from '@intlayer/design-system';
import { useAddTag } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { useTagSchema, type TagFormData } from './useTagFormSchema';

type TagCreationFormProps = {
  onTagCreated?: () => void;
};

export const TagCreationForm: FC<TagCreationFormProps> = ({ onTagCreated }) => {
  const TagSchema = useTagSchema();
  const { addTag } = useAddTag();
  const { form, isSubmitting } = useForm(TagSchema);
  const { nameInput, createTagButton } = useIntlayer('tag-form');

  const onSubmitSuccess: (data: TagFormData) => Promise<void> = async (
    data
  ) => {
    await addTag(data).then((response) => {
      if (response.data) {
        onTagCreated?.();
      }
    });
  };

  return (
    <Form
      schema={TagSchema}
      onSubmitSuccess={onSubmitSuccess}
      className="w-full max-w-[400px]"
      {...form}
    >
      <Form.Input
        name="key"
        label={nameInput.label}
        description={nameInput.description}
        placeholder={nameInput.placeholder.value}
        isRequired
      />

      <Form.Button
        className="mt-12 w-full"
        type="submit"
        color="text"
        isLoading={isSubmitting}
        label={createTagButton.ariaLabel.value}
      >
        {createTagButton.text}
      </Form.Button>
    </Form>
  );
};
