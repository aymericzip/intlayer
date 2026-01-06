'use client';

import { Button, Form, Modal, useForm } from '@intlayer/design-system';
import { useSignInMagicLink } from '@intlayer/design-system/hooks';
import { cn } from '@utils/cn';
import { Mail } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { type MagicLinkForm, useMagicLinkSchema } from './useMagicLinkSchema';

type MagicLinkButtonProps = {
  email?: string;
  className?: string;
};

export const MagicLinkButton: FC<MagicLinkButtonProps> = ({
  email,
  className,
}) => {
  const { text, ariaLabel, successMessage, errorMessage, modal } =
    useIntlayer('magic-link-button');
  const { mutate: signInMagicLink, isPending } = useSignInMagicLink();
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const MagicLinkSchema = useMagicLinkSchema();
  const { form, isSubmitting } = useForm(MagicLinkSchema, {
    defaultValues: {
      email: email ?? '',
    },
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setStatus('idle');
    form.reset({ email: email ?? '' });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    form.reset();
  };

  const handleSubmit = (data: MagicLinkForm) => {
    signInMagicLink(
      {
        email: data.email,
        callbackURL: window.location.href,
      },
      {
        onSuccess: () => {
          setStatus('success');

          setTimeout(() => {
            handleCloseModal();
          }, 4000);
        },
        onError: () => {
          setStatus('error');
        },
      }
    );
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          color="text"
          className={cn('w-full', className)}
          Icon={Mail}
          label={ariaLabel.value}
          onClick={handleOpenModal}
        >
          {text}
        </Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modal.title.value}
        padding="lg"
        hasCloseButton
      >
        <div className="mt-6 flex w-full flex-col gap-6">
          <p className="text-neutral text-sm">{modal.description}</p>

          <Form
            schema={MagicLinkSchema}
            onSubmitSuccess={handleSubmit}
            className="flex flex-col gap-4 py-4"
            {...form}
          >
            <Form.Input
              name="email"
              id="magic-link-email"
              type="email"
              autoComplete="email"
              placeholder={modal.emailPlaceholder.value}
              isRequired
              autoFocus
            />
            {status === 'success' && (
              <p className="text-success text-xs">{successMessage}</p>
            )}
            {status === 'error' && !isModalOpen && (
              <p className="text-error text-xs">{errorMessage}</p>
            )}

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
                color="text"
                variant="default"
                isLoading={isPending || isSubmitting}
                disabled={isPending || isSubmitting}
                label={modal.sendButton.value}
                className="flex-1"
              >
                {modal.sendButton}
              </Form.Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
};
