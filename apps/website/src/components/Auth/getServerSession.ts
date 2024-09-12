import { Cookies } from '@intlayer/backend';
import type { Session } from '@intlayer/design-system';
import { getIntlayerAPI } from '@intlayer/design-system/libs';
import { cookies } from 'next/headers';

export const getServerSession = async () => {
  const cookiesStore = cookies();
  const session_token = cookiesStore.get(Cookies.JWT_AUTH);

  if (!session_token?.value) {
    return null;
  }

  try {
    const { data } = await getIntlayerAPI().auth.getSession(
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
