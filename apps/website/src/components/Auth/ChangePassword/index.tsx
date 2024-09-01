'use client';

import {
  Button,
  Container,
  Form,
  InputPasswordElement,
  useForm,
  // useToast,
} from '@intlayer/design-system';
import { useUser } from '@utils/auth/auth/useUser';
import { backendAPI } from '@utils/backend-api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import {
  ChangePasswordSchema,
  type ChangePassword,
} from './ChangePasswordSchema';
import { PagesRoutes } from '@/Routes';

type ChangePasswordFormProps = {
  callbackUrl?: string;
};

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  callbackUrl = PagesRoutes.Auth_SignIn,
}) => {
  const {
    title,
    description,
    currentPasswordInput,
    newPasswordInput,
    confirmPasswordInput,
    forgotPasswordLink,
    changePasswordButton,
    backToHomeButton,
  } = useIntlayer('change-password-form');

  const { form, isSubmitting, isSubmitted, isValid } =
    useForm(ChangePasswordSchema);

  // const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();

  const onSubmitSuccess = async ({
    currentPassword,
    newPassword,
  }: ChangePassword) => {
    const result = await backendAPI.auth.changePassword({
      oldPassword: currentPassword,
      newPassword,
    });

    if (!result.success) {
      return router.push(callbackUrl);
    }
  };

  const onSubmitError = (error: Error) => {
    // toast({
    //   title: error.message,
    //   variant: 'default',
    // });
  };

  if (!user) return null;

  return (
    <Container className="w-[85%] max-w-md justify-center gap-16 p-10 text-2xl">
      <div className="flex flex-col gap-3 text-center">
        <h2 className="font-extrabold">{title}</h2>
        <span className="text-neutral dark:text-neutral-dark text-xs">
          {description}
        </span>
      </div>

      <Form
        schema={ChangePasswordSchema}
        onSubmitSuccess={onSubmitSuccess}
        onSubmitError={onSubmitError}
        {...form}
      >
        <div className="flex flex-col gap-y-6">
          <div>
            <InputPasswordElement
              name="currentPassword"
              label={currentPasswordInput.label}
              placeholder={currentPasswordInput.placeholder.value}
              autoComplete="current-password"
              isRequired
            />
            <Link
              href={PagesRoutes.Auth_ResetPassword}
              className="text-primary dark:text-primary-dark float-right !m-0 p-2 text-xs"
              aria-label={forgotPasswordLink.ariaLabel.value}
            >
              {forgotPasswordLink.text}
            </Link>
          </div>
          <InputPasswordElement
            name="newPassword"
            label={newPasswordInput.label}
            placeholder={newPasswordInput.placeholder.value}
            autoComplete="new-password"
            isRequired
          />
          <InputPasswordElement
            name="newPasswordConfirmation"
            label={confirmPasswordInput.label}
            placeholder={confirmPasswordInput.placeholder.value}
            autoComplete="new-password"
            isRequired
          />
        </div>

        <Button
          type="submit"
          className="mt-12 w-full"
          isLoading={isSubmitting}
          disabled={!isValid}
          variant={isSubmitted ? 'outline' : 'default'}
          label={changePasswordButton.ariaLabel.value}
        >
          {changePasswordButton.text}
        </Button>
        {isSubmitted && (
          <Button
            type="button"
            className="mt-4 w-full"
            label={backToHomeButton.ariaLabel.value}
            onClick={() => router.push(callbackUrl)}
          >
            {backToHomeButton.text}
          </Button>
        )}
      </Form>
    </Container>
  );
};
