'use client';

import type { UserAPI } from '@intlayer/backend';
import { intlayerAPI } from '@intlayer/core';
import { useState, type FC } from 'react';
import { Modal } from '../../Modal/Modal';
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
  const { checkSession } = useAuth();

  const onSubmitSignInSuccess = async ({ email, password }: SignIn) => {
    const response = await intlayerAPI.auth.login({
      email,
      password,
    });

    if (response.data) {
      await checkSession();
      await onSignInSuccess?.(response.data);
    }
  };

  const onSubmitSignInError = (_error: Error) => {
    // toast({
    //   title: error.message,
    //   variant: 'default',
    // });
  };

  const onSubmitSignUpSuccess = async ({ email, password }: SignUp) => {
    const response = await intlayerAPI.auth.register({
      email,
      password,
    });

    if (response.data) {
      await checkSession();
      await onSignUpSuccess?.(response.data);
    }
  };

  const onSubmitSignUpError = (_error: Error) => {
    // toast({
    //   title: error.message,
    //   variant: 'default',
    // });
  };

  const onSubmitResetPasswordSuccess = async ({ email }: ResetPassword) => {
    const response = await intlayerAPI.auth.askResetPassword(email);

    if (response.data) {
      await checkSession();
      await onResetPasswordSuccess?.(response.data);
    }
  };

  const onSubmitResetPasswordError = (_error: Error) => {
    // toast({
    //   title: error.message,
    //   variant: 'default',
    // });
  };

  const onSubmitChangePasswordSuccess = async ({
    currentPassword,
    newPassword,
  }: ChangePassword) => {
    const response = await intlayerAPI.auth.changePassword({
      oldPassword: currentPassword,
      newPassword,
    });

    if (response.data) {
      await checkSession();
      await onChangePasswordSuccess?.(response.data);
    }
  };

  const onSubmitChangePasswordError = (_error: Error) => {
    // toast({
    //   title: error.message,
    //   variant: 'default',
    // });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      {state === AuthState.SignIn && (
        <SignInForm
          onSubmitSuccess={onSubmitSignInSuccess}
          onSubmitError={onSubmitSignInError}
          onClickForgotPassword={() => setState(AuthState.ResetPassword)}
          onClickSignUp={() => setState(AuthState.SignUp)}
        />
      )}
      {state === AuthState.SignUp && (
        <SignUpForm
          onSubmitSuccess={onSubmitSignUpSuccess}
          onSubmitError={onSubmitSignUpError}
          onClickBackToSignIn={() => setState(AuthState.SignIn)}
        />
      )}
      {state === AuthState.ResetPassword && (
        <ResetPasswordForm
          onSubmitSuccess={onSubmitResetPasswordSuccess}
          onSubmitError={onSubmitResetPasswordError}
          onClickBackToLogin={() => setState(AuthState.SignIn)}
        />
      )}
      {state === AuthState.ChangePassword && (
        <ChangePasswordForm
          onSubmitSuccess={onSubmitChangePasswordSuccess}
          onSubmitError={onSubmitChangePasswordError}
          onClickResetPassword={() => setState(AuthState.ResetPassword)}
          onClickBackToHome={() => setState(AuthState.SignIn)}
        />
      )}
    </Modal>
  );
};
