import * as http from 'node:http';
import { createRequestListener } from 'remix/node-fetch-server';
import { createHtmlResponse } from 'remix/response/html';
import { createRouter } from 'remix/router';
import { intlayer, useIntlayer, useLocale } from 'remix-intlayer';
import { routes } from './routes';
import { renderAboutPage } from './views/about';
import { renderHomePage } from './views/home';

/**
 * Initialize Remix 3 router with the Intlayer middleware.
 *
 * The middleware handles the locale routing (`/about` → `/fr/about` redirect
 * for a French visitor, `/fr/about` served from the `about` route, `/en/about`
 * → `/about`) and exposes the resolved locale to the hooks below.
 */
export const router = createRouter({
  middleware: [intlayer()],
});

/**
 * Map defined routes to their corresponding actions.
 */
router.map(routes, {
  actions: {
    home() {
      return createHtmlResponse(renderHomePage());
    },
    about() {
      return createHtmlResponse(renderAboutPage());
    },
    apiGreeting() {
      const { locale } = useLocale();
      const home = useIntlayer('home');
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
