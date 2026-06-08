import { getCookie, getIntlayer, getLocale } from 'intlayer';

/**
 * React Router provides a standard Request object in loaders/actions.
 * We pass that request here to extract locale information securely.
 */
export const getServerContent = async (request: Request) => {
  const locale = await getLocale({
    // Logic to extract a specific cookie from the Request headers
    getCookie: (name) => {
      const cookieHeader = request.headers.get('Cookie');

      if (!cookieHeader) return undefined;

      const locale = getCookie(name, cookieHeader);

      return locale;
    },

    // Logic to extract headers (e.g., 'accept-language')
    getHeader: (name) => request.headers.get(name) ?? undefined,
  });

  // Returns the localized dictionary for the 'data' key
  return getIntlayer('data', locale);
};
