'use client';

import { TagAPI } from '@intlayer/backend';
import { useForm, Form } from '@intlayer/design-system';
import { useUpdateTag } from '@intlayer/design-system/hooks';
import { Save, XCircle } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useState, type FC } from 'react';
import { DeleteTagModal } from './DeleteTagModal';
import { useTagSchema, type TagFormData } from './useTagFormSchema';

type TagEditionFormProps = {
  tag: TagAPI;
};

export const TagEditionForm: FC<TagEditionFormProps> = ({ tag }) => {
  const TagSchema = useTagSchema();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { updateTag, isLoading } = useUpdateTag();
  const { form, isSubmitting } = useForm(TagSchema, {
    defaultValues: tag,
  });
  const {
    keyInput,
    nameInput,
    descriptionInput,
    instructionsInput,
    editButton,
    deleteButton,
  } = useIntlayer('tag-form');

  const onSubmitSuccess = async (data: TagFormData) => {
    await updateTag(tag._id, data);
  };

  return (
    <>
      <DeleteTagModal
        tag={tag}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
      <Form
        schema={TagSchema}
        onSubmitSuccess={onSubmitSuccess}
        className="flex size-full flex-1 flex-col gap-8"
        {...form}
      >
        <div className="flex size-full flex-1 gap-8 max-md:flex-col">
          <Form.EditableFieldInput
            name="key"
            label={keyInput.label}
            placeholder={keyInput.placeholder.value}
            description={keyInput.description}
            isRequired
          />

          <Form.EditableFieldInput
            name="name"
            label={nameInput.label}
            placeholder={nameInput.placeholder.value}
            description={nameInput.description}
          />
        </div>

        <Form.EditableFieldTextArea
          name="description"
          label={descriptionInput.label}
          placeholder={descriptionInput.placeholder.value}
          description={descriptionInput.description}
        />

        <Form.EditableFieldTextArea
          name="instructions"
          label={instructionsInput.label}
          placeholder={instructionsInput.placeholder.value}
          description={instructionsInput.description}
        />

        <div className="mt-4 flex justify-end gap-2 max-md:flex-col">
          <Form.Button
            type="button"
            variant="outline"
            color="error"
            isLoading={isLoading}
            label={deleteButton.ariaLabel.value}
            disabled={isSubmitting || isLoading}
            Icon={XCircle}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            {deleteButton.text}
          </Form.Button>
          {form.formState.isDirty && (
            <Form.Button
              type="submit"
              color="text"
              label={editButton.ariaLabel.value}
              disabled={isSubmitting || isLoading}
              Icon={Save}
            >
              {editButton.text}
            </Form.Button>
          )}
        </div>
      </Form>
    </>
  );
};
