import type { Session } from '@intlayer/backend';
import { getAuthAPI } from '@intlayer/design-system/hooks';
import { headers } from 'next/headers';

export const getServerSession = async (): Promise<Session | null> => {
  try {
    const { data } = await getAuthAPI().getSession({
      fetchOptions: {
        headers: await headers(),
      },
    });

    return data as unknown as Session;
  } catch (error) {
    console.error(error);

    return null;
  }
};
