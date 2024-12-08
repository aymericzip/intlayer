import { getConfiguration, Locales } from '@intlayer/config';
import {
  getPathWithoutLocale,
  localeDetector as localeDetector,
} from '@intlayer/core';
// @ts-ignore - Fix error Module '"vite"' has no exported member
import { type Plugin } from 'vite';

const intlayerConfig = getConfiguration();
const { internationalization, middleware } = intlayerConfig;

const { locales: supportedLocales, defaultLocale } = internationalization;
const { cookieName, headerName, prefixDefault } = middleware;

/**
 * A Vite plugin that integrates IntLayer middleware into the build process
 *
 * ```ts
 * // Example usage of the plugin in a Vite configuration
 * export default defineConfig({
 *   plugins: [ intLayerMiddlewarePlugin() ],
 * });
 * ```
 */
export const intLayerMiddlewarePlugin = (_pluginOptions = {}): Plugin => ({
  name: 'vite-intlayer-middleware-plugin',

  configureServer: (server) => {
    // server.middlewares is a Connect instance; you can add middleware here
    server.middlewares.use((req, res, next) => {
      // Skip if request looks like a static asset or internal Vite request
      if (
        req.url?.startsWith('/node_modules') ||
        req.url?.startsWith('/@') ||
        req.url?.split('?')[0].match(/\.[a-z]+$/i) // checks if URL has a file extension
      ) {
        return next();
      }

      const originalUrl = req.url ?? '/';

      const cookies = parseCookies(req.headers.cookie ?? '');
      const cookieLocale = cookies[cookieName];

      const headers = req.headers;
      const headerLocale = headers[headerName];

      const pathParts = originalUrl.split('?')[0].split('/').filter(Boolean);

      const firstPart = pathParts[0] as unknown as Locales;

      const pathLocale =
        pathParts[0] && supportedLocales.includes(firstPart)
          ? pathParts[0]
          : undefined;

      if (!pathLocale) {
        let locale;

        // Try to get the locale from the request cookies
        if (
          !locale &&
          cookieLocale &&
          supportedLocales.includes(cookieLocale as Locales)
        ) {
          locale = cookieLocale as Locales;
        }

        // Try to get the locale from the request headers
        if (
          !locale &&
          headerLocale &&
          supportedLocales.includes(headerLocale as Locales)
        ) {
          locale = headerLocale as Locales;
        }

        // Get the locale from the negotiator
        if (!locale) {
          const detectedLocale = localeDetector(
            headers as Record<string, string>,
            supportedLocales,
            defaultLocale
          );
          locale = detectedLocale;
        }

        // Instead of redirecting, try rewriting internally:
        req.url = formatUrlWithLocale(originalUrl, locale);

        if (req.url === originalUrl) {
          return next();
        }

        res.writeHead(301, { Location: req.url });
        return res.end();
      }

      if (
        pathLocale.toString() === defaultLocale.toString() &&
        !prefixDefault
      ) {
        req.url = getPathWithoutLocale(
          originalUrl,
          prefixDefault,
          pathLocale as Locales,
          defaultLocale
        );

        res.writeHead(301, { Location: req.url });
        return res.end();
      }

      return next();
    });
  },
});

// Simple cookie parser:
const parseCookies = (cookieHeader: string) =>
  cookieHeader.split(';').reduce(
    (acc, cookie) => {
      const [key, val] = cookie.trim().split('=');
      acc[key as keyof typeof acc] = val;
      return acc;
    },
    {} as Record<string, string>
  );

const formatUrlWithLocale = (url: string, locale: Locales) => {
  if (locale.toString() === defaultLocale.toString()) {
    if (prefixDefault) {
      return `/${locale}${url}`;
    }

    return url;
  }

  return `/${locale}${url}`;
};
