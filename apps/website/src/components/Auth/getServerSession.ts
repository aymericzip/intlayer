import { getAuthAPI } from '@intlayer/api';
import type { Session } from '@intlayer/design-system';
import { cookies } from 'next/headers';

export const getServerSession = async () => {
  const cookiesStore = await cookies();
  const session_token = cookiesStore.get('intlayer_auth');

  if (!session_token?.value) {
    return null;
  }

  try {
    const { data } = await getAuthAPI().getSession(session_token.value);

    const session: Session = {
      user: {
        _id: data?.user?.id,
        ...data?.user,
      } as unknown as Session['user'],
      organization: null,
      project: null,
      isOrganizationAdmin: false,
      isProjectAdmin: false,
    };

    return session;
  } catch (error) {
    console.error(error);

    return null;
  }
};
