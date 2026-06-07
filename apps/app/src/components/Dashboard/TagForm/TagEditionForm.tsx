import type { TagAPI } from '@intlayer/backend';
import { useAuditTag, useUpdateTag } from '@intlayer/design-system/api';
import {
  Form,
  FormButton,
  FormEditableFieldInput,
  FormEditableFieldTextArea,
  useForm,
} from '@intlayer/design-system/form';
import { Save, WandSparkles, XCircle } from 'lucide-react';
import { type FC, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useIntlayer } from 'react-intlayer';
import { DeleteTagModal } from './DeleteTagModal';
import { type TagFormData, useTagSchema } from './useTagFormSchema';

type TagEditionFormProps = {
  tag: TagAPI;
};

export const TagEditionForm: FC<TagEditionFormProps> = ({ tag }) => {
  const TagSchema = useTagSchema();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { mutate: auditTag, isPending: isAuditing } = useAuditTag();
  const { mutate: updateTag, isPending: isUpdating } = useUpdateTag();
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

  const onSubmitSuccess = (data: TagFormData) => {
    updateTag(
      { tagId: tag.id, tag: data },
      {
        onSuccess: (response: { data: TagAPI }) => {
          if (response.data) {
            form.reset(response.data);
          }
        },
      }
    );
  };

  const handleOnAuditFile = () => {
    const tagToAudit = form.getValues();
    auditTag(
      { tag: { ...tag, ...tagToAudit } },
      {
        onSuccess: (response: { data: { fileContent: TagAPI } }) => {
          if (!response.data?.fileContent) return;

          form.reset(response.data.fileContent);
        },
      }
    );
  };

  const formValues = useWatch({ control: form.control });
  const isEdited = Boolean(
    tag &&
      (formValues.key !== tag.key ||
        formValues.name !== tag.name ||
        formValues.description !== tag.description ||
        formValues.instructions !== tag.instructions)
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
          <FormEditableFieldInput
            name="key"
            id="tag-key-input"
            label={keyInput.label.value}
            placeholder={keyInput.placeholder.value}
            description={keyInput.description}
            isRequired
          />

          <FormEditableFieldInput
            name="name"
            id="tag-name-input"
            label={nameInput.label}
            placeholder={nameInput.placeholder.value}
            description={nameInput.description}
          />
        </div>

        <FormEditableFieldTextArea
          name="description"
          label={descriptionInput.label}
          placeholder={descriptionInput.placeholder.value}
          description={descriptionInput.description}
        />

        <FormEditableFieldTextArea
          name="instructions"
          label={instructionsInput.label}
          placeholder={instructionsInput.placeholder.value}
          description={instructionsInput.description}
        />

        <div className="mt-4 flex justify-end gap-2 max-md:flex-col">
          <FormButton
            type="button"
            label={auditButton.label.value}
            Icon={WandSparkles}
            variant="outline"
            color="text"
            size="icon-md"
            className="ml-auto max-md:w-full"
            onClick={handleOnAuditFile}
            disabled={isSubmitting || isAuditing}
            isLoading={isAuditing}
          />

          <FormButton
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
          </FormButton>
          {isEdited && (
            <FormButton
              type="submit"
              color="text"
              label={editButton.ariaLabel.value}
              disabled={isSubmitting || isUpdating}
              isLoading={isUpdating}
              Icon={Save}
            >
              {editButton.text}
            </FormButton>
          )}
        </div>
      </Form>
    </>
  );
};
