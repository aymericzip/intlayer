'use client';

import { Button, Form, Modal, useForm } from '@intlayer/design-system';
import { useDeleteUser, useUser } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { useState } from 'react';
import {
  type DeleteUserForm,
  useDeleteUserSchema,
} from './useDeleteUserSchema';

export const DeleteUser: FC = () => {
  const { deleteButton, modal } = useIntlayer('delete-user');
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

  const handleSubmit = (data: DeleteUserForm) => {
    deleteUser(data.email, {
      onSuccess: () => {
        handleCloseModal();
        logout();
      },
    });
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        color="error"
        variant="outline"
        label={deleteButton.ariaLabel.value}
      >
        {deleteButton.text}
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modal.title.value}
        padding="lg"
        hasCloseButton
      >
        <div className="mt-6 flex w-full flex-col gap-6">
          <p className="text-neutral text-sm">{modal.description}</p>

          <p className="text-neutral text-sm">
            {modal.instruction[0]}
            <span className="mx-1 font-bold">{user?.email ?? ''}</span>
            {modal.instruction[1]}
          </p>

          <Form
            schema={DeleteUserSchema}
            onSubmitSuccess={handleSubmit}
            className="flex flex-col gap-4 py-4"
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
      </Modal>
    </>
  );
};
