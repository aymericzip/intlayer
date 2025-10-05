'use client';

import type { TagAPI } from '@intlayer/backend';
import { Form, useForm } from '@intlayer/design-system';
import { useAuditTag, useUpdateTag } from '@intlayer/design-system/hooks';
import { Save, WandSparkles, XCircle } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useMemo, useState } from 'react';
import { DeleteTagModal } from './DeleteTagModal';
import { type TagFormData, useTagSchema } from './useTagFormSchema';

type TagEditionFormProps = {
  tag: TagAPI;
};

export const TagEditionForm: FC<TagEditionFormProps> = ({ tag }) => {
  const TagSchema = useTagSchema();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { auditTag, isLoading: isAuditing } = useAuditTag();
  const { updateTag, isLoading: isUpdating } = useUpdateTag();
  const { form, isSubmitting } = useForm(TagSchema, {
    defaultValues: tag,
  });
  const {
    keyInput,
    nameInput,
    descriptionInput,
    instructionsInput,
    editButton,
    auditButton,
    deleteButton,
  } = useIntlayer('tag-form');

  const onSubmitSuccess = async (data: TagFormData) => {
    await updateTag(tag.id, data);
  };

  const handleOnAuditFile = async () => {
    const tagToAudit = form.getValues();
    await auditTag({ tag: { ...tag, ...tagToAudit } }).then((response) => {
      if (!response.data) return;

      try {
        const editedTag = JSON.parse(response.data.fileContent) as TagAPI;

        form.reset(editedTag);
      } catch (error) {
        console.error(error);
      }
    });
  };

  const isEdited = useMemo(
    () => tag && JSON.stringify(tag) !== JSON.stringify(form.getValues()),

    [tag, form.getValues()]
  );

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
            label={auditButton.label.value}
            Icon={WandSparkles}
            variant="outline"
            color="text"
            className="ml-auto max-md:w-full"
            onClick={handleOnAuditFile}
            disabled={isSubmitting || isAuditing}
            isLoading={isAuditing}
          >
            {auditButton.text}
          </Form.Button>

          <Form.Button
            type="button"
            variant="outline"
            color="error"
            isLoading={isUpdating}
            label={deleteButton.ariaLabel.value}
            disabled={isSubmitting || isUpdating}
            Icon={XCircle}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            {deleteButton.text}
          </Form.Button>
          {isEdited && (
            <Form.Button
              type="submit"
              color="text"
              label={editButton.ariaLabel.value}
              disabled={isSubmitting || isUpdating}
              isLoading={isUpdating}
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
