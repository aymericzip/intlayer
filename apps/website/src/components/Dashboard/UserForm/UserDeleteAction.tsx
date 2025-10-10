'use client';

import type { UserAPI } from '@intlayer/backend';
import { Form, Loader, Modal, toast } from '@intlayer/design-system';
import {
  useDeleteUser,
  useGetUserById,
} from '@intlayer/design-system/hooks';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { PagesRoutes } from '@/Routes';

export const UserDeleteAction: FC<{ userId: string }> = ({ userId }) => {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: userResponse, isLoading, error } = useGetUserById(userId);

  const deleteUserMutation = useDeleteUser();

  const { errorMessages, deleteSection, successMessages } =
    useIntlayer('user-delete-action');

  const user: UserAPI | undefined = userResponse?.data ?? undefined;

  const handleDeleteUser = async () => {
    if (!user) return;

    try {
      await deleteUserMutation.mutateAsync(user.id);

      toast({
        title: successMessages.userDeleted.value,
        variant: 'success',
      });

      router.push(PagesRoutes.Admin_Users);
    } catch (error) {
      toast({
        title: errorMessages.deleteError.value,
        description: (error as Error).message,
        variant: 'error',
      });
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  if (error) {
    return (
      <div className="text-error p-6">
        {errorMessages.loadingError}:{' '}
        {(error as Error)?.message ?? 'Unknown error'}
      </div>
    );
  }

  return (
    <>
      <Loader isLoading={isLoading}>
        {user ? (
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/20">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-lg text-red-900 dark:text-red-100">
              <AlertTriangle className="h-5 w-5" />
              {deleteSection.title}
            </h3>
            <p className="mb-4 text-red-700 text-sm dark:text-red-300">
              {deleteSection.description}
            </p>
            <Form.Button
              label={deleteSection.button.value}
              onClick={() => setIsDeleteModalOpen(true)}
              disabled={deleteUserMutation.isPending}
              Icon={Trash2}
              variant="outline"
              className="ml-auto"
              color="error"
            >
              {deleteSection.button}
            </Form.Button>
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-neutral-500 dark:text-neutral-400">
              User not found
            </p>
          </div>
        )}
      </Loader>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={deleteSection.modalTitle.value}
      >
        <div className="flex flex-col gap-8 px-3 pt-4">
          <div className="flex items-start gap-3 rounded-lg px-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
            <div className="flex-1">
              <p className="font-medium text-red-900 text-sm dark:text-red-100">
                {deleteSection.modalWarning}
              </p>
              <p className="mt-1 text-red-700 text-sm dark:text-red-300">
                {deleteSection.modalDescription}
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Form.Button
              label={deleteSection.cancelButton.value}
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={deleteUserMutation.isPending}
              variant="outline"
              color="text"
            >
              {deleteSection.cancelButton}
            </Form.Button>
            <Form.Button
              label={deleteSection.confirmButton.value}
              onClick={handleDeleteUser}
              isLoading={deleteUserMutation.isPending}
              Icon={Trash2}
              variant="outline"
              color="error"
            >
              {deleteSection.confirmButton}
            </Form.Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
