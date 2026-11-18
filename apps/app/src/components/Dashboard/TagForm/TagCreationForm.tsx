import { useAddTag } from '@intlayer/design-system/api';
import {
  Form,
  FormButton,
  FormInput,
  useForm,
} from '@intlayer/design-system/form';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { type TagFormData, useTagSchema } from './useTagFormSchema';

type TagCreationFormProps = {
  onTagCreated?: () => void;
};

export const TagCreationForm: FC<TagCreationFormProps> = ({ onTagCreated }) => {
  const TagSchema = useTagSchema();
  const { mutate: addTag, isPending } = useAddTag();
  const form = useForm(TagSchema);
  const { nameInput, createTagButton } = useIntlayer('tag-form');

  const onSubmitSuccess: (data: TagFormData) => Promise<void> = async (data) =>
    addTag(data, {
      onSuccess: (response: any) => {
        if (response.data) {
          onTagCreated?.();
        }
      },
    });

  return (
    <Form
      onSubmitSuccess={onSubmitSuccess}
      className="w-full max-w-xl"
      form={form}
    >
      <FormInput
        name="key"
        id="tag-key-input"
        label={nameInput.label.value}
        description={nameInput.description}
        placeholder={nameInput.placeholder.value}
        isRequired
      />

      <FormButton
        className="mt-4 w-full"
        type="submit"
        color="text"
        isLoading={isPending}
        label={createTagButton.ariaLabel.value}
      >
        {createTagButton.text}
      </FormButton>
    </Form>
  );
};
