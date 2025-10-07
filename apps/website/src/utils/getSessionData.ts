import type { SessionAPI } from '@intlayer/backend';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { headers } from 'next/headers';

export const getSessionData = async (): Promise<{
  session: SessionAPI | null;
  hasSessionToken: boolean;
}> => {
  const headersList = await headers();
  const cookieHeader = headersList.get('cookie');

  const hasSessionToken =
    cookieHeader?.includes('intlayer.session_token') ?? false;
  let session: SessionAPI | null = null;

  if (cookieHeader && hasSessionToken) {
    const result = await getAuthAPI()
      .getAuthClient()
      .getSession({
        fetchOptions: {
          cache: 'no-store',
          headers: {
            cookie: cookieHeader,
          },
        },
      });

    session = result.data as unknown as SessionAPI;
  }

  return { session, hasSessionToken };
};
