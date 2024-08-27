import { backendAPI } from '@utils/backend-api';
import type { AuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PagesRoutes } from '@/Routes';

const SESSION_MAX_AGE = 3000;

export const authOptions: AuthOptions = {
  pages: {
    signIn: PagesRoutes.Auth_SignIn,
    signOut: PagesRoutes.Auth_SignUp,
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user',
  },
  session: {
    strategy: 'jwt',
    maxAge: SESSION_MAX_AGE,
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials ?? {};

        if (!email || !password) return null;

        const response = await backendAPI.user.login({
          email,
          password,
        });

        const user = response.data;

        if (!user) return null;

        const nextAuthUser: User = {
          id: String(user._id),
          name: `${user.firstname} ${user.lastname}`,
          email: user.email,
          role: 'user',
        };

        return nextAuthUser;
      },
    }),
  ],
  callbacks: {
    signIn: () => true,
  },

  secret: process.env.NEXTAUTH_SECRET,
};
