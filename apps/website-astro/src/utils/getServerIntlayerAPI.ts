import { getIntlayerAPI, type IntlayerAPI } from '@intlayer/api';

/**
 * This function is useful as cookies are not directly available in the server context (Page / Layout)
 * So we need to get the cookies from the headers and build the API client with the cookies.
 * Pass the incoming request headers to extract session cookies.
 */
export const getServerIntlayerAPI = async (
  request?: Request
): Promise<IntlayerAPI> => {
  const cookie = request?.headers.get('cookie') ?? undefined;

  // Build API client with incoming request cookies so backend uses the user session
  const api = getIntlayerAPI({
    headers: {
      cookie,
    } as HeadersInit,
  });

  return api;
};
