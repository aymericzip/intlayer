import { Form } from '@intlayer/design-system/form';
import { useDeleteProject } from '@intlayer/design-system/hooks';
import { Modal } from '@intlayer/design-system/modal';
import { App_Dashboard_Projects_Path } from '@intlayer/design-system/routes';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';

type DeleteProjectModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  onDelete?: () => void;
};

export const DeleteProjectModal: FC<DeleteProjectModalProps> = ({
  onClose,
  onDelete,
  isOpen,
}) => {
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  const { confirmButton, cancelButton, description, title } = useIntlayer(
    'delete-project-modal'
  );
  const navigate = useLocalizedNavigate();

  const handleDelete = () => {
    deleteProject(undefined, {
      onSuccess: () => {
        onDelete?.();
        onClose?.();
        navigate({ to: App_Dashboard_Projects_Path });
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title.value}
      size="md"
      hasCloseButton
      padding="md"
    >
      <form className="size-full px-3">
        <p className="py-4 text-neutral text-sm">{description}</p>
        <div className="mt-12 flex justify-end gap-2 max-md:flex-col">
          <Form.Button
            variant="outline"
            label={cancelButton.label.value}
            color="text"
            type="button"
            isFullWidth={true}
            className="w-auto"
            onClick={onClose}
          >
            {cancelButton.text}
          </Form.Button>
          <Form.Button
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
          </Form.Button>
        </div>
      </form>
    </Modal>
  );
};
