import { localeMap } from 'intlayer'; // Utility functions and types from 'intlayer'
import type { FC, PropsWithChildren } from 'react'; // React types for functional components and props
import { IntlayerProvider } from 'react-intlayer'; // Provider for internationalization context
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Router components for managing navigation

/**
 * A router component that sets up locale-specific routes.
 * It uses React Router to manage navigation and render localized components.
 */
export const LocaleRouter: FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Routes>
      {localeMap(({ locale, urlPrefix }) => (
        <Route
          // Route pattern to capture the locale (e.g., /en/, /fr/) and match all subsequent paths
          path={`${urlPrefix}/*`}
          key={locale}
          element={
            <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
          } // Wraps children with locale management
        />
      ))}
    </Routes>
  </BrowserRouter>
);
