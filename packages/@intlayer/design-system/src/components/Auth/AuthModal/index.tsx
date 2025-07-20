'use client';

import type { UserAPI } from '@intlayer/backend';
import { type FC, useState } from 'react';
import {
  useAskResetPassword,
  useChangePassword,
  useLogin,
  useRegister,
} from '../../../hooks';
import { Modal } from '../../Modal/Modal';
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
  const { login } = useLogin();
  const { register } = useRegister();
  const { askResetPassword } = useAskResetPassword();
  const { changePassword } = useChangePassword();

  const onSubmitSignInSuccess = async ({ email, password }: SignIn) =>
    await login({
      email,
      password,
    }).then(async (response) => {
      if (response?.data?.user) {
        await onSignInSuccess?.(response.data as unknown as UserAPI);
      }
    });

  const onSubmitSignUpSuccess = async ({ email, password }: SignUp) =>
    await register({
      email,
      password,
      name: email.split('@')[0],
    }).then(async (response) => {
      if (response?.data) {
        await onSignUpSuccess?.(response.data as unknown as UserAPI);
      }
    });

  const onSubmitResetPasswordSuccess = async ({ email }: ResetPassword) =>
    await askResetPassword({ email }).then(async (response) => {
      if (response?.data) {
        await onResetPasswordSuccess?.(response.data as unknown as UserAPI);
      }
    });

  const onSubmitChangePasswordSuccess = async ({
    currentPassword,
    newPassword,
  }: ChangePassword) =>
    await changePassword({
      currentPassword,
      newPassword,
    }).then(async (response) => {
      if (response?.data) {
        await onChangePasswordSuccess?.(response.data as unknown as UserAPI);
      }
    });

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      {state === AuthState.SignIn && (
        <SignInForm
          onSubmitSuccess={onSubmitSignInSuccess}
          onClickForgotPassword={() => setState(AuthState.ResetPassword)}
          onClickSignUp={() => setState(AuthState.SignUp)}
        />
      )}
      {state === AuthState.SignUp && (
        <SignUpForm
          onSubmitSuccess={onSubmitSignUpSuccess}
          onClickBackToSignIn={() => setState(AuthState.SignIn)}
        />
      )}
      {state === AuthState.ResetPassword && (
        <ResetPasswordForm
          onSubmitSuccess={onSubmitResetPasswordSuccess}
          onClickBackToLogin={() => setState(AuthState.SignIn)}
        />
      )}
      {state === AuthState.ChangePassword && (
        <ChangePasswordForm onSubmitSuccess={onSubmitChangePasswordSuccess} />
      )}
    </Modal>
  );
};
