import { getIntlayerAPI, type IntlayerAPI } from '@intlayer/api';
import { headers } from 'next/headers';

/**
 * This function is useful as cookies are not directly available in the server context (Page / Layout)
 * So we need to get the cookies from the headers and build the API client with the cookies
 */
export const getServerIntlayerAPI = async (): Promise<IntlayerAPI> => {
  const headersList = await headers();
  const cookie = headersList.get('cookie');

  // Build API client with incoming request cookies so backend uses the user session
  const api = getIntlayerAPI({
    headers: {
      cookie,
    } as HeadersInit,
  });

  return api;
};
