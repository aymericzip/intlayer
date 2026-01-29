import { localeMap } from 'intlayer';
import type { ComponentChildren, FunctionalComponent } from 'preact';
import { IntlayerProvider } from 'preact-intlayer';
import { LocationProvider, Route, Router } from 'preact-iso';

/**
 * A router component that sets up locale-specific routes.
 * It uses preact-iso to manage navigation and render localized components.
 */
export const LocaleRouter: FunctionalComponent<{
  children: ComponentChildren;
}> = ({ children }) => (
  <LocationProvider>
    <Router>
      {localeMap(({ locale, urlPrefix }) => ({ locale, urlPrefix }))
        .sort((a, b) => b.urlPrefix.length - a.urlPrefix.length)
        .map(({ locale, urlPrefix }) => (
          <Route
            key={locale}
            path={`${urlPrefix}/:rest*`}
            component={() => (
              <IntlayerProvider locale={locale}>{children}</IntlayerProvider>
            )}
          />
        ))}
    </Router>
  </LocationProvider>
);
