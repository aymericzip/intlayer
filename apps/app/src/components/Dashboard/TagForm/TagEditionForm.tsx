import type { TagAPI } from '@intlayer/backend-contract/tag';
import { useAuditTag, useUpdateTag } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import {
  Form,
  FormButton,
  FormEditableFieldInput,
  FormEditableFieldTextArea,
  useForm,
} from '@intlayer/design-system/form';
import { PopoverStatic } from '@intlayer/design-system/popover';
import { App_Dashboard_Tags_Path } from '@intlayer/design-system/routes';
import { ArrowLeft, Save, WandSparkles, XCircle } from 'lucide-react';
import { type FC, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { DeleteTagModal } from './DeleteTagModal';
import { type TagFormData, useTagSchema } from './useTagFormSchema';

type TagEditionFormProps = {
  tag: TagAPI;
  showReturnButton?: boolean;
};

export const TagEditionForm: FC<TagEditionFormProps> = ({
  tag,
  showReturnButton = true,
}) => {
  const navigate = useLocalizedNavigate();
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
  const { returnToTagList } = useIntlayer('tag-details');

  const onSubmitSuccess = (data: TagFormData) => {
    updateTag(
      { tagId: tag.id, tag: data },
      {
        onSuccess: (response) => {
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
        onSuccess: (response) => {
          if (!response.data?.fileContent) return;

          form.reset({ ...tagToAudit, ...response.data.fileContent });
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
        className="flex w-full flex-col gap-8"
        {...form}
      >
        <div className="flex items-center gap-2 px-10">
          {showReturnButton && (
            <Button
              type="button"
              onClick={() => navigate({ to: App_Dashboard_Tags_Path })}
              variant="hoverable"
              className="z-10 me-auto"
              color="text"
              Icon={ArrowLeft}
              label={returnToTagList.label.value}
            >
              {returnToTagList.text}
            </Button>
          )}

          <div className="flex items-center gap-2 max-md:flex-col">
            <PopoverStatic
              identifier="audit-tag"
              className="ms-auto max-md:w-full"
            >
              <FormButton
                type="button"
                label={auditButton.label.value}
                Icon={WandSparkles}
                variant="outline"
                color="text"
                size="icon-md"
                className="max-md:w-full"
                onClick={handleOnAuditFile}
                disabled={isSubmitting || isAuditing}
                isLoading={isAuditing}
              />
              <PopoverStatic.Detail identifier="audit-tag" xAlign="end">
                <Container padding="sm" roundedSize="xl">
                  <span className="text-nowrap">{auditButton.popover}</span>
                </Container>
              </PopoverStatic.Detail>
            </PopoverStatic>

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
        </div>

        <div className="flex size-full gap-8 px-10 max-md:flex-col">
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

        <div className="flex size-full flex-1 gap-8 px-10 max-md:flex-col">
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
        </div>
      </Form>
    </>
  );
};
