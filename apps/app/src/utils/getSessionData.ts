import type { SessionAPI } from '@intlayer/backend';
import { getAuthAPI } from '@intlayer/design-system/libs';
import { getWebRequest } from 'vinxi/http';

export const getSessionData = async (): Promise<{
  session: SessionAPI | null;
  hasSessionToken: boolean;
}> => {
  const request = getWebRequest();
  const cookieHeader = request.headers.get('cookie');

  const hasSessionToken =
    cookieHeader?.includes('intlayer.session_token') ?? false;
  let session: SessionAPI | null = null;

  if (cookieHeader && hasSessionToken) {
    try {
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
    } catch (error) {
      console.error('Error getting session data:', error);
    }
  }

  return { session, hasSessionToken };
};
