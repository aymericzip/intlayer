import {
  External_Github,
  Website_Doc_Search,
  Website_Home,
} from '@intlayer/design-system/routes';
import {
  buildOrganizationJsonLd,
  buildSoftwareApplicationJsonLd,
  buildWebsiteJsonLd,
} from '@intlayer/design-system/structured-data';
import { defaultLocale, getIntlayerAsync, locales } from 'intlayer';
import packageJson from '../../package_mock.json' with { type: 'json' };

const LOGO_URL = `${Website_Home}/assets/logo.png`;

/** A `<script type="application/ld+json">` entry of a route `head`. */
export type JsonLdScript = { type: string; children: string };

const buildRootStructuredDataScripts = async (): Promise<JsonLdScript[]> => {
  const [websiteContent, organizationContent, softwareContent] =
    await Promise.all([
      getIntlayerAsync('website-structured-data', defaultLocale),
      getIntlayerAsync('organization-structured-data', defaultLocale),
      getIntlayerAsync('software-application-structured-data', defaultLocale),
    ]);

  return [
    {
      type: 'application/ld+json',
      children: JSON.stringify(
        buildWebsiteJsonLd({
          url: Website_Home,
          searchUrl: Website_Doc_Search,
          locales: locales as string[],
          keywords: websiteContent.keywords as string[],
        })
      ),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(
        buildOrganizationJsonLd({
          url: Website_Home,
          logoUrl: LOGO_URL,
          slogan: String(organizationContent.slogan),
          knowsAbout: organizationContent.knowsAbout as string[],
          sameAs: [External_Github, 'https://twitter.com/intlayer'],
          availableLanguages: locales as string[],
        })
      ),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(
        buildSoftwareApplicationJsonLd({
          name: 'Intlayer',
          url: Website_Home,
          description: String(softwareContent.description),
          softwareVersion: packageJson.version,
          keywords: softwareContent.keywords as string[],
          audienceType: String(softwareContent.audienceType),
          authorUrl: Website_Home,
          logoUrl: LOGO_URL,
          githubUrl: External_Github,
          operatingSystem: 'Web, iOS, Android',
          mainEntityUrl: Website_Home,
        })
      ),
    },
  ];
};

/** In-flight or resolved scripts, shared by every call. */
let cachedRootStructuredDataScripts: Promise<JsonLdScript[]> | undefined;

/**
 * Returns the JSON-LD scripts of the root document, built at most once.
 *
 * The root `head` runs on every navigation, yet these nodes never vary: they
 * always describe Intlayer at the default locale. Caching the promise both
 * skips the repeated dictionary reads and pays the `JSON.stringify` cost once
 * per process.
 *
 * A rejected build is evicted, or every later call would replay the same
 * failure without ever retrying.
 */
export const getRootStructuredDataScripts = (): Promise<JsonLdScript[]> => {
  if (!cachedRootStructuredDataScripts) {
    const pending = buildRootStructuredDataScripts();
    cachedRootStructuredDataScripts = pending;

    pending.catch(() => {
      if (cachedRootStructuredDataScripts === pending) {
        cachedRootStructuredDataScripts = undefined;
      }
    });
  }

  return cachedRootStructuredDataScripts;
};
