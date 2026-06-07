import type { TagAPI } from '@intlayer/backend';
import { useDeleteTag } from '@intlayer/design-system/api';
import { Form, FormButton } from '@intlayer/design-system/form';
import { Modal } from '@intlayer/design-system/modal';
import { App_Dashboard_Tags } from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';

type DeleteTagModalProps = {
  tag: TagAPI;
  isOpen: boolean;
  onClose?: () => void;
  onDelete?: () => void;
};

export const DeleteTagModal: FC<DeleteTagModalProps> = ({
  tag,
  onClose,
  onDelete,
  isOpen,
}) => {
  const { mutate: deleteTag, isPending: isDeleting } = useDeleteTag();
  const { confirmButton, cancelButton, description, title } =
    useIntlayer('delete-tag-modal');
  const navigate = useLocalizedNavigate();

  const handleDelete = () => {
    deleteTag(tag.id, {
      onSuccess: (response: any) => {
        if (response.data) {
          onDelete?.();
          onClose?.();
          navigate({ to: App_Dashboard_Tags as any });
        }
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title.value} size="md">
      <form className="size-full px-3">
        <p className="text-neutral text-sm">{description.single}</p>
        <div className="mt-12 flex justify-end gap-2 max-md:flex-col">
          <FormButton
            variant="outline"
            label={cancelButton.label.value}
            color="text"
            type="button"
            isFullWidth={true}
            className="w-auto"
            onClick={onClose}
          >
            {cancelButton.text}
          </FormButton>
          <FormButton
            variant="outline"
            label={confirmButton.label.value}
            isFullWidth={true}
            color="error"
            className="w-auto"
            isLoading={isDeleting}
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {confirmButton.text}
          </FormButton>
        </div>
      </form>
    </Modal>
  );
};
