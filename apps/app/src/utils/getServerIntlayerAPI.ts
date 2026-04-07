import { getIntlayerAPI, type IntlayerAPI } from '@intlayer/api';
import { getWebRequest } from 'vinxi/http';

/**
 * Gets the Intlayer API with cookies from the current request headers.
 * Only callable from server context (loaders, server functions).
 */
export const getServerIntlayerAPI = async (): Promise<IntlayerAPI> => {
  const request = getWebRequest();
  const cookie = request.headers.get('cookie');

  // Build API client with incoming request cookies so backend uses the user session
  const api = getIntlayerAPI({
    headers: {
      cookie,
    } as HeadersInit,
  });

  return api;
};
