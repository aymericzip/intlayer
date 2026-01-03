'use client';

import { Form, useForm } from '@intlayer/design-system';
import { useAddTag } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { type TagFormData, useTagSchema } from './useTagFormSchema';

type TagCreationFormProps = {
  onTagCreated?: () => void;
};

export const TagCreationForm: FC<TagCreationFormProps> = ({ onTagCreated }) => {
  const TagSchema = useTagSchema();
  const { mutate: addTag, isPending } = useAddTag();
  const { form, isSubmitting } = useForm(TagSchema);
  const { nameInput, createTagButton } = useIntlayer('tag-form');

  const onSubmitSuccess: (data: TagFormData) => Promise<void> = async (data) =>
    addTag(data, {
      onSuccess: (response) => {
        if (response.data) {
          onTagCreated?.();
        }
      },
    });

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
        isLoading={isSubmitting || isPending}
        label={createTagButton.ariaLabel.value}
      >
        {createTagButton.text}
      </Form.Button>
    </Form>
  );
};
