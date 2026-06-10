import { useDeleteUser, useUser } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { Form, useForm } from '@intlayer/design-system/form';
import { Modal } from '@intlayer/design-system/modal';
import { Trash2, TriangleAlert } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';
import {
  type DeleteUserForm,
  useDeleteUserSchema,
} from './useDeleteUserSchema';

export const DeleteUser: FC = () => {
  const { dangerZoneTitle, deleteButton, modal } = useIntlayer('delete-user');
  const { mutate: deleteUser, isPending } = useDeleteUser();
  const { logout, user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const DeleteUserSchema = useDeleteUserSchema(user?.email);
  const { form, isSubmitting } = useForm(DeleteUserSchema, {
    defaultValues: {
      email: '',
    },
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    form.reset();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.reset();
  };

  const handleSubmit = (_data: DeleteUserForm) => {
    if (!user?.id) return;

    deleteUser(user.id, {
      onSuccess: () => {
        handleCloseModal();
        logout();
      },
    });
  };

  return (
    <>
      <div className="flex items-start gap-6 px-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-error/10">
          <TriangleAlert className="size-5 text-error" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-base text-error">
            {dangerZoneTitle}
          </h3>
          <p className="mt-1 text-neutral text-sm">{modal.description}</p>
          <Button
            onClick={handleOpenModal}
            color="error"
            variant="outline"
            label={deleteButton.ariaLabel.value}
            Icon={Trash2}
            className="mt-4"
          >
            {deleteButton.text}
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modal.title.value}
        padding="lg"
        hasCloseButton
      >
        {isModalOpen && (
          <div className="mt-6 flex w-full flex-col gap-6">
            <p className="text-neutral text-sm">{modal.description}</p>

            <p className="text-neutral text-sm">
              {modal.instruction({
                email: (
                  <span className="mx-1 font-bold">{user?.email ?? ''}</span>
                ),
              })}
            </p>

            <Form
              schema={DeleteUserSchema}
              onSubmitSuccess={handleSubmit}
              className="flex flex-col gap-4 pt-4"
              {...form}
            >
              <Form.Input
                name="email"
                id="delete-user-email-confirmation"
                type="email"
                autoComplete="email"
                placeholder={modal.emailPlaceholder.value}
                isRequired
                autoFocus
              />

              <div className="flex gap-3">
                <Button
                  onClick={handleCloseModal}
                  color="text"
                  variant="outline"
                  disabled={isPending || isSubmitting}
                  label={modal.cancelButton.value}
                  className="flex-1"
                >
                  {modal.cancelButton}
                </Button>
                <Form.Button
                  type="submit"
                  color="error"
                  variant="outline"
                  isLoading={isPending || isSubmitting}
                  disabled={isPending || isSubmitting}
                  label={modal.confirmButton.value}
                  className="flex-1"
                >
                  {modal.confirmButton}
                </Form.Button>
              </div>
            </Form>
          </div>
        )}
      </Modal>
    </>
  );
};
