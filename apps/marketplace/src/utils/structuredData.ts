import {
  External_Github,
  Marketplace_Root,
  Website_Home,
} from '@intlayer/design-system/routes';
import {
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from '@intlayer/design-system/structured-data';
import { createServerFn } from '@tanstack/react-start';
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions';
import { locales } from 'intlayer';

const LOGO_URL = `${Website_Home}/assets/logo.png`;

/** A `<script type="application/ld+json">` entry of a route `head`. */
export type JsonLdScript = { type: string; children: string };

const buildRootStructuredDataScripts = async (): Promise<JsonLdScript[]> => {
  return [
    {
      type: 'application/ld+json',
      children: JSON.stringify(
        buildWebsiteJsonLd({
          url: Marketplace_Root,
          searchUrl: Marketplace_Root,
          locales: locales as string[],
          keywords: [
            'translation marketplace',
            'reviewer marketplace',
            'i18n translation',
            'localization',
            'proofreading',
          ],
        })
      ),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(
        buildOrganizationJsonLd({
          url: Marketplace_Root,
          logoUrl: LOGO_URL,
          slogan: 'Intlayer Reviewer Marketplace',
          knowsAbout: ['Translation', 'Localization', 'Internationalization'],
          sameAs: [External_Github, 'https://twitter.com/intlayer'],
          availableLanguages: locales as string[],
        })
      ),
    },
  ];
};

/**
 * Returns the JSON-LD scripts of the root document, built on the server via `createServerFn`.
 */
export const getRootStructuredDataScripts = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(async (): Promise<JsonLdScript[]> => {
    return buildRootStructuredDataScripts();
  });
