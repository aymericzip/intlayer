'use client';

import { PagesRoutes } from '@/Routes';
import { Form, Modal } from '@intlayer/design-system';
import { useDeleteProject } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

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
  const router = useRouter();

  const handleDelete = () => {
    deleteProject(undefined, {
      onSuccess: () => {
        onDelete?.();
        onClose?.();
        router.push(PagesRoutes.Dashboard_Projects);
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title.value} size="md">
      <form className="size-full px-3">
        <p className="text-neutral py-4 text-sm">{description}</p>
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
