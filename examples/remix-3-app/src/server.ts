import * as http from 'node:http';
import { getIntlayer, isDeclaredLocale } from 'intlayer';
import { createRequestListener } from 'remix/node-fetch-server';
import { createHtmlResponse } from 'remix/response/html';
import { createRouter } from 'remix/router';
import { intlayer, localeKey } from './middleware/intlayer';
import { routes } from './routes';
import { renderAboutPage } from './views/about';
import { renderHomePage } from './views/home';

/**
 * Initialize Remix 3 router with Intlayer internationalization middleware.
 */
export const router = createRouter({
  middleware: [intlayer()],
});

/**
 * Map defined routes to their corresponding actions.
 */
router.map(routes, {
  actions: {
    home(context) {
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },
    about(context) {
      const locale = context.get(localeKey);
      return createHtmlResponse(renderAboutPage(locale));
    },
    localizedHome(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response('Not Found', { status: 404 });
      }
      const locale = context.get(localeKey);
      return createHtmlResponse(renderHomePage(locale));
    },
    localizedAbout(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return new Response('Not Found', { status: 404 });
      }
      const locale = context.get(localeKey);
      return createHtmlResponse(renderAboutPage(locale));
    },
    apiGreeting(context) {
      const locale = context.get(localeKey);
      const home = getIntlayer('home', locale);
      return Response.json({
        success: true,
        locale,
        message: home.title,
        timestamp: new Date().toISOString(),
      });
    },
    localizedApiGreeting(context) {
      if (!isDeclaredLocale(context.params.locale)) {
        return Response.json(
          { success: false, error: 'Not Found' },
          { status: 404 }
        );
      }
      const locale = context.get(localeKey);
      const home = getIntlayer('home', locale);
      return Response.json({
        success: true,
        locale,
        message: home.title,
        timestamp: new Date().toISOString(),
      });
    },
  },
});

// Runtime-agnostic: start Node.js HTTP server if run in Node directly
const PORT = Number(process.env.PORT || 3000);

if (
  typeof (process.versions as any)?.bun === 'undefined' &&
  process.env.NODE_ENV !== 'test'
) {
  const server = http.createServer(
    createRequestListener((request) => router.fetch(request))
  );
  server.listen(PORT, () => {
    console.log(
      `🚀 Remix 3 + Intlayer server running at http://localhost:${PORT}`
    );
  });
}

export default {
  port: PORT,
  fetch(request: Request) {
    return router.fetch(request);
  },
};
