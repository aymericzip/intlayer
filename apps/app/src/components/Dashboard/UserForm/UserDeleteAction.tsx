import type { UserAPI } from '@intlayer/backend';
import { Container } from '@intlayer/design-system/container';
import { Form } from '@intlayer/design-system/form';
import { useDeleteUser, useGetUserById } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { Modal } from '@intlayer/design-system/modal';
import { App_Admin_Users_Path } from '@intlayer/design-system/routes';
import { toast } from '@intlayer/design-system/toaster';
import { Trash2, TriangleAlert } from 'lucide-react';
import { type FC, useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';

export const UserDeleteAction: FC<{ userId: string }> = ({ userId }) => {
  const navigate = useLocalizedNavigate();
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

      navigate({ to: App_Admin_Users_Path });
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
      <div className="p-6 text-error">
        {errorMessages.loadingError}:{' '}
        {(error as Error)?.message ?? 'Unknown error'}
      </div>
    );
  }

  return (
    <>
      <Loader isLoading={isLoading}>
        {user ? (
          <Container
            roundedSize="3xl"
            padding="lg"
            border
            borderColor="neutral"
            className="w-full"
          >
            <div className="flex items-start gap-6 px-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                <TriangleAlert className="h-5 w-5 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-base text-red-500">
                  {deleteSection.title}
                </h3>
                <p className="mt-1 text-neutral text-sm">
                  {deleteSection.description}
                </p>
                <Form.Button
                  label={deleteSection.button.value}
                  onClick={() => setIsDeleteModalOpen(true)}
                  disabled={deleteUserMutation.isPending}
                  Icon={Trash2}
                  variant="outline"
                  color="error"
                  className="mt-4"
                >
                  {deleteSection.button}
                </Form.Button>
              </div>
            </div>
          </Container>
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
        hasCloseButton
        padding="md"
      >
        <div className="flex flex-col gap-8 px-3 pt-4">
          <div className="flex items-start gap-3 rounded-lg px-4">
            <TriangleAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
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
