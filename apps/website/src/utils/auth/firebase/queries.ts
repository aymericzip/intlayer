import type { User } from 'firebase/auth';
import { encryptParams } from './encryptParams';
import type { DeleteUserResponse } from '@/app/api/auth/proxy/delete-user/route';
import type { SendEmailVerificationResponse } from '@/app/api/auth/proxy/email-verification/route';
import type { ConfirmPasswordResetResponse } from '@/app/api/auth/proxy/password/reset/confirm/route';
import type { ResetPasswordResponse } from '@/app/api/auth/proxy/password/reset/route';
import type { UpdatePasswordResponse } from '@/app/api/auth/proxy/password/update/route';
import type { SignInResponse } from '@/app/api/auth/proxy/sign-in/route';
import type { CreateAccountResponse } from '@/app/api/auth/proxy/sign-up/route';
import { auth } from '@/app/firebase';
import { APIRoutes } from '@/Routes';

export const signUp = async (
  email: string,
  password: string
): Promise<CreateAccountResponse> => {
  const response = await fetch(APIRoutes.SignUp, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(encryptParams({ auth, email, password })),
  });

  return await response.json();
};

export const sendEmailVerification = async (
  user: User
): Promise<SendEmailVerificationResponse> => {
  const response = await fetch(APIRoutes.VerifyEmail, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(encryptParams({ user })),
  });

  return await response.json();
};

export const signIn = async (
  email: string,
  password: string
): Promise<SignInResponse> => {
  const response = await fetch(APIRoutes.SignIn, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(encryptParams({ auth, email, password })),
  });

  return await response.json();
};

export const deleteUser = async (user: User): Promise<DeleteUserResponse> => {
  const response = await fetch(APIRoutes.DeleteUser, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(encryptParams({ auth, user })),
  });

  return await response.json();
};

export const sendPasswordResetEmail = async (
  email: string
): Promise<ResetPasswordResponse> => {
  const response = await fetch(APIRoutes.SendPasswordResetEmail, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(encryptParams({ auth, email })),
  });

  return await response.json();
};

export const confirmPasswordReset = async (
  oobCode: string,
  newPassword: string
): Promise<ConfirmPasswordResetResponse> => {
  const response = await fetch(APIRoutes.ConfirmPassword, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(encryptParams({ auth, oobCode, newPassword })),
  });

  return await response.json();
};

export const updatePassword = async (
  email: string,
  password: string,
  newPassword: string
): Promise<UpdatePasswordResponse> => {
  console.log('-1', email, password, newPassword);

  const response = await fetch(APIRoutes.UpdatePassword, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(encryptParams({ auth, email, password, newPassword })),
  });

  return await response.json();
};
