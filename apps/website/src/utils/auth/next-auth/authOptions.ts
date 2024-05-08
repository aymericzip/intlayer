import { FirestoreAdapter } from '@auth/firebase-adapter';
import { signInWithEmailAndPassword, type UserCredential } from 'firebase/auth';
import { cert } from 'firebase-admin/app';
import type { AuthOptions, User } from 'next-auth';
import type { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { auth } from '@/app/firebase';
import { PagesRoutes } from '@/Routes';

const formatPrivateKey = (privateKey?: string) =>
  privateKey?.replace(/\\n/g, '\n');

export const authOptions: AuthOptions = {
  pages: {
    signIn: PagesRoutes.LogIn,
    signOut: PagesRoutes.SignUp,
    // error: '/auth/error',
    // verifyRequest: '/auth/verify-request',
    // newUser: '/auth/new-user',
  },
  session: {
    strategy: 'jwt',
    maxAge: 3000,
  },
  providers: [
    GoogleProvider({
      clientId: process.env
        .NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as unknown as string,
      clientSecret: process.env
        .NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_SECRET as unknown as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (
        credentials: Record<'email' | 'password', string> | undefined
      ) => {
        const response: UserCredential = await signInWithEmailAndPassword(
          auth,
          credentials?.email ?? '',
          credentials?.password ?? ''
        );

        if (!response.user) return null;

        const user: User = {
          id: response.user.uid,
          name: response.user.displayName,
          email: response.user.email,
          image: response.user.photoURL,
          role: 'user',
        };

        return user;
      },
    }),
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: formatPrivateKey(
        process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY
      ),
    }),
  }) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
};
