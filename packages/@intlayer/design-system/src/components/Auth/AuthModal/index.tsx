'use client';

import type { UserAPI } from '@intlayer/backend';
import { useState, type FC } from 'react';
import {
  useAskResetPassword,
  useChangePassword,
  useLogin,
  useRegister,
} from '../../../hooks';
import { Modal } from '../../Modal/Modal';
import { useToast } from '../../Toaster';
import { useAuth } from '../AuthProvider';
import { type ChangePassword, ChangePasswordForm } from '../ChangePasswordForm';
import { type ResetPassword, ResetPasswordForm } from '../ResetPasswordForm';
import { type SignIn, SignInForm } from '../SignInForm';
import { type SignUp, SignUpForm } from '../SignUpForm';

enum AuthState {
  SignIn,
  SignUp,
  ResetPassword,
  ChangePassword,
}

type AuthModalProps = {
  onClose: () => void;
  isOpen: boolean;
  state?: AuthState.SignIn;
  onSignInSuccess?: (data: UserAPI) => Promise<void>;
  onSignUpSuccess?: (data: UserAPI) => Promise<void>;
  onResetPasswordSuccess?: (data: UserAPI) => Promise<void>;
  onChangePasswordSuccess?: (data: UserAPI) => Promise<void>;
};

export const AuthModal: FC<AuthModalProps> = ({
  onClose,
  isOpen,
  state: initialState = AuthState.SignIn,
  onSignInSuccess,
  onSignUpSuccess,
  onResetPasswordSuccess,
  onChangePasswordSuccess,
}) => {
  const [state, setState] = useState<AuthState>(initialState);
  const { revalidateSession } = useAuth();
  const { login } = useLogin();
  const { register } = useRegister();
  const { askResetPassword } = useAskResetPassword();
  const { changePassword } = useChangePassword();
  const { toast } = useToast();

  const onSubmitSignInSuccess = async ({ email, password }: SignIn) => {
    const response = await login({
      email,
      password,
    });

    if (response.error) {
      toast({
        title: [response.error].flatMap((error) => error).join(', '),
        variant: 'error',
      });

      return;
    }

    if (response.data) {
      await revalidateSession();
      await onSignInSuccess?.(response.data);
    }
  };

  const onSubmitSignUpSuccess = async ({ email, password }: SignUp) => {
    const response = await register({
      email,
      password,
    });

    if (response.error) {
      toast({
        title: [response.error].flatMap((error) => error).join(', '),
        variant: 'error',
      });

      return;
    }

    if (response.data) {
      await revalidateSession();
      await onSignUpSuccess?.(response.data);
    }
  };

  const onSubmitResetPasswordSuccess = async ({ email }: ResetPassword) => {
    const response = await askResetPassword(email);

    if (response.error) {
      toast({
        title: [response.error].flatMap((error) => error).join(', '),
        variant: 'error',
      });

      return;
    }

    if (response.data) {
      await revalidateSession();
      await onResetPasswordSuccess?.(response.data);
    }
  };

  const onSubmitChangePasswordSuccess = async ({
    currentPassword,
    newPassword,
  }: ChangePassword) => {
    const response = await changePassword({
      oldPassword: currentPassword,
      newPassword,
    });

    if (response.error) {
      toast({
        title: [response.error].flatMap((error) => error).join(', '),
        variant: 'error',
      });

      return;
    }

    if (response.data) {
      await revalidateSession();
      await onChangePasswordSuccess?.(response.data);
    }
  };

  const onSubmitError = (error: Error) => {
    toast({
      title: error.message,
      variant: 'error',
    });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      {state === AuthState.SignIn && (
        <SignInForm
          onSubmitSuccess={onSubmitSignInSuccess}
          onSubmitError={onSubmitError}
          onClickForgotPassword={() => setState(AuthState.ResetPassword)}
          onClickSignUp={() => setState(AuthState.SignUp)}
        />
      )}
      {state === AuthState.SignUp && (
        <SignUpForm
          onSubmitSuccess={onSubmitSignUpSuccess}
          onSubmitError={onSubmitError}
          onClickBackToSignIn={() => setState(AuthState.SignIn)}
        />
      )}
      {state === AuthState.ResetPassword && (
        <ResetPasswordForm
          onSubmitSuccess={onSubmitResetPasswordSuccess}
          onSubmitError={onSubmitError}
          onClickBackToLogin={() => setState(AuthState.SignIn)}
        />
      )}
      {state === AuthState.ChangePassword && (
        <ChangePasswordForm
          onSubmitSuccess={onSubmitChangePasswordSuccess}
          onSubmitError={onSubmitError}
          onClickBackToHome={() => setState(AuthState.SignIn)}
        />
      )}
    </Modal>
  );
};
