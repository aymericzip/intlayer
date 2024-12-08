import { Locales } from '@intlayer/config';

export const getPathWithoutLocale = (
  pathname: string,
  prefixDefault: boolean,
  currentLocale: Locales,
  defaultLocale: Locales
) => {
  if (
    // If the locale is the default one and the prefixDefault is false, we don't need to add the locale to the path
    !prefixDefault &&
    currentLocale.toString() === defaultLocale.toString() &&
    !pathname.startsWith(`/${defaultLocale}`)
  ) {
    return pathname;
  }

  const slicedPath = pathname.slice(`/${currentLocale}`.length);

  // If the path without locale is not empty, we return it
  if (slicedPath) {
    return slicedPath;
  }

  // If the path without locale is empty, we return the root path
  return '/';
};
