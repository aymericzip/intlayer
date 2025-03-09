// Importing necessary dependencies and functions
import { Locales, getConfiguration, getPathWithoutLocale } from 'intlayer'; // Utility functions and types from 'intlayer'
import { FC, PropsWithChildren } from 'react'; // React types for functional components and props
import { IntlayerProvider } from 'react-intlayer'; // Provider for internationalization context
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'; // Router components for managing navigation

// Destructuring configuration from Intlayer
const { internationalization, middleware } = configuration;
const { locales, defaultLocale } = internationalization;

/**
 * A component that handles localization and wraps children with the appropriate locale context.
 * It manages URL-based locale detection and validation.
 */
const AppLocalized: FC<PropsWithChildren<{ locale: Locales }>> = ({
  children,
  locale,
}) => {
  const { pathname, search } = useLocation(); // Get the current URL path

  // Determine the current locale, falling back to the default if not provided
  const currentLocale = locale ?? defaultLocale;

  // Remove the locale prefix from the path to construct a base path
  const pathWithoutLocale = getPathWithoutLocale(
    pathname // Current URL path
  );

  /**
   * If middleware.prefixDefault is true, the default locale should always be prefixed.
   */
  if (middleware.prefixDefault) {
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
          (locale) => locale.toString() !== defaultLocale.toString() // Exclude the default locale
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

/**
 * A router component that sets up locale-specific routes.
 * It uses React Router to manage navigation and render localized components.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {locales
        .filter(
          (locale) => middleware.prefixDefault || locale !== defaultLocale
        )
        .map((locale) => (
          <Route
            // Route pattern to capture the locale (e.g., /en/, /fr/) and match all subsequent paths
            path={`/${locale}/*`}
            key={locale}
            element={<AppLocalized locale={locale}>{children}</AppLocalized>} // Wraps children with locale management
          />
        ))}

      {
        // If prefixing the default locale is disabled, render the children directly at the root path
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={
              <AppLocalized locale={defaultLocale}>{children}</AppLocalized>
            } // Wraps children with locale management
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
