import { configuration, getPathWithoutLocale, type Locale } from 'intlayer';
import type { ComponentChildren, FunctionalComponent } from 'preact';
import { useEffect } from 'preact/hooks';
import { IntlayerProvider } from 'preact-intlayer';
import { LocationProvider, useLocation } from 'preact-iso';

const { internationalization, routing } = configuration;
const { locales, defaultLocale } = internationalization;

const Navigate: FunctionalComponent<{ to: string; replace?: boolean }> = ({
  to,
  replace,
}) => {
  const { route } = useLocation();

  useEffect(() => {
    route(to, replace);
  }, [to, replace, route]);

  return null;
};

/**
 * A component that handles localization and wraps children with the appropriate locale context.
 * It manages URL-based locale detection and validation.
 */
const AppLocalized: FunctionalComponent<{
  children: ComponentChildren;
  locale?: Locale;
}> = ({ children, locale }) => {
  const { path: pathname, url } = useLocation();

  if (!url) {
    return null;
  }

  const search = url.substring(pathname.length);

  // Determine the current locale, falling back to the default if not provided
  const currentLocale = locale ?? defaultLocale;

  // Remove the locale prefix from the path to construct a base path
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Current URL path
  );

  /**
   * If middleware.prefixDefault is true, the default locale should always be prefixed.
   */
  if (routing.mode === 'prefix-all') {
    // Validate the locale
    if (!locale || !locales.includes(locale)) {
      // Redirect to the default locale with the updated path
      return (
        <Navigate
          to={`/${defaultLocale}/${pathWithoutLocale}${search}`}
          replace // Replace the current history entry with the new one
        />
      );
    }

    // Wrap children with the IntlayerProvider and set the current locale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  } else {
    /**
     * When middleware.prefixDefault is false, the default locale is not prefixed.
     * Ensure that the current locale is valid and not the default locale.
     */
    if (
      currentLocale.toString() !== defaultLocale.toString() &&
      !locales
        .filter(
          (loc) => loc.toString() !== defaultLocale.toString() // Exclude the default locale
        )
        .includes(currentLocale) // Check if the current locale is in the list of valid locales
    ) {
      // Redirect to the path without locale prefix
      return <Navigate to={`${pathWithoutLocale}${search}`} replace />;
    }

    // Wrap children with the IntlayerProvider and set the current locale
    return (
      <IntlayerProvider locale={currentLocale}>{children}</IntlayerProvider>
    );
  }
};

const RouterContent: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => {
  const { path } = useLocation();

  if (!path) {
    return null;
  }

  const pathLocale = path.split('/')[1] as Locale;

  const isLocaleRoute = locales
    .filter(
      (locale) => routing.mode === 'prefix-all' || locale !== defaultLocale
    )
    .some((locale) => locale.toString() === pathLocale);

  if (isLocaleRoute) {
    return <AppLocalized locale={pathLocale}>{children}</AppLocalized>;
  }

  return (
    <AppLocalized
      locale={routing.mode === 'prefix-all' ? defaultLocale : undefined}
    >
      {children}
    </AppLocalized>
  );
};

/**
 * A router component that sets up locale-specific routes.
 * It uses preact-iso to manage navigation and render localized components.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <RouterContent>{children}</RouterContent>
  </LocationProvider>
);
