import {
  type ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';

import { routes } from './app.routes';

/**
 * Standard ngx-translate setup.
 *
 * `@ngx-translate/core` resolves to `@intlayer/ngx-translate` (see
 * `esbuild.plugins.ts`), so no `TranslateHttpLoader` is needed: messages are
 * read from the dictionaries intlayer compiles out of
 * `./src/i18n/{locale}/{namespace}.json` (see `intlayer.config.ts`).
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
    }),
  ],
};
