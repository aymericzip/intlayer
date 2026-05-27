import type { SessionAPI } from '@intlayer/backend';
import { getAuthAPI } from '@intlayer/design-system/libs';

export const getSessionData = async (
  request?: Request
): Promise<{
  session: SessionAPI | null;
  hasSessionToken: boolean;
}> => {
  const cookieHeader = request?.headers.get('cookie') ?? null;

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
