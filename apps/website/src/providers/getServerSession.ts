import { backendAPI } from '@utils/backend-api';
import { Cookies } from '@utils/cookies';
import { cookies } from 'next/headers';
import type { Session } from './AuthProvider';

export const getServerSession = async () => {
  const cookiesStore = cookies();
  const session_token = cookiesStore.get(Cookies.JWT_AUTH);

  if (!session_token?.value) {
    return null;
  }

  try {
    const { data } = await backendAPI.auth.getSessionInformation(
      session_token.value
    );

    const session: Session = {
      user: data?.user ?? null,
      organization: null,
      project: null,
    };

    return session;
  } catch (error) {
    return null;
  }
};
