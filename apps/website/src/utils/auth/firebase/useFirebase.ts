// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics';
import { getAuth, signOut, type User } from 'firebase/auth';
import {
  signIn,
  updatePassword,
  signUp as signUpQuery,
  sendEmailVerification,
  deleteUser,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from './queries';
import { app } from '@/app/firebase';

export const useFirebase = (isAnalytics = false) => {
  const analytics = isAnalytics ? getAnalytics(app) : undefined;
  const auth = getAuth(app);

  // Set language code for emails
  auth.useDeviceLanguage();

  const signUp = async (email: string, password: string) => {
    let tempsUser: User | null = null;
    let tempError: { message: string; code: string } | undefined;

    await signUpQuery(email, password).then(async ({ user, error }) => {
      tempsUser = user;
      tempError = error;

      if (error ?? !user) return;

      await sendEmailVerification(user).then((response) => {
        if (response?.error) {
          tempError = response.error;
        }
      });
    });

    return { user: tempsUser, error: tempError };
  };

  return {
    app,
    auth,
    analytics,
    signUp,
    signIn,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updatePassword,
    sendEmailVerification,
    deleteUser,
  };
};
