// Importing necessary dependencies and functions
import { Locales, getConfiguration, getPathWithoutLocale } from 'intlayer'; // Utility functions and types from 'intlayer'
import { FC, PropsWithChildren } from 'react'; // React types for functional components and props
import { IntlayerProvider } from 'react-intlayer'; // Provider for internationalization context
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from 'react-router-dom'; // Router components for managing navigation

// Destructuring configuration from Intlayer
const { internationalization, middleware } = getConfiguration();
const { locales, defaultLocale } = internationalization;

/**
 * A component that handles localization and wraps children with the appropriate locale context.
 * It manages URL-based locale detection and validation.
 */
const AppLocalized: FC<PropsWithChildren> = ({ children }) => {
  const path = useLocation().pathname; // Get the current URL path
  const { locale } = useParams<{ locale: Locales }>(); // Extract the locale parameter from the URL

  // Determine the current locale, falling back to the default if not provided
  const currentLocale = locale ?? defaultLocale;

  // Remove the locale prefix from the path to construct a base path
  const pathWithoutLocale = getPathWithoutLocale(
    path, // Current URL path
    middleware.prefixDefault, // Whether to prefix the default locale in URLs
    currentLocale, // Currently detected locale
    defaultLocale // Default locale from configuration
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
          to={`/${defaultLocale}/${pathWithoutLocale}`}
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
      return <Navigate to={pathWithoutLocale} replace />;
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
      <Route
        // Route pattern to capture the locale (e.g., /en/, /fr/) and match all subsequent paths
        path="/:locale/*"
        element={<AppLocalized>{children}</AppLocalized>} // Wraps children with locale management
      />

      {
        // If prefixing the default locale is disabled, render the children directly at the root path
        !middleware.prefixDefault && (
          <Route
            path="*"
            element={<AppLocalized>{children}</AppLocalized>} // Wraps children with locale management
          />
        )
      }
    </Routes>
  </BrowserRouter>
);
