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
import { getIntlayerAsync, type LocalesValues, locales } from 'intlayer';
import packageJson from '../../package_mock.json' with { type: 'json' };

const LOGO_URL = `${Website_Home}/assets/logo.png`;
const RSS_FEED_URL = `${Website_Home}/feed.xml`;
const SAME_AS_URLS = [External_Github, 'https://twitter.com/intlayer'];

/** A `<script type="application/ld+json">` entry of a route `head`. */
export type JsonLdScript = { type: string; children: string };

/**
 * Wraps an already-serialised JSON-LD node into a `head` script entry.
 */
const toJsonLdScript = (children: string): JsonLdScript => ({
  type: 'application/ld+json',
  children,
});

/**
 * The two JSON-LD nodes describing the site itself, which every page emits
 * unchanged.
 *
 * They are held as strings rather than objects because that is the only shape
 * a `head` script consumes, and it lets the `JSON.stringify` cost be paid once
 * per locale instead of once per navigation.
 */
export type SiteStructuredData = {
  /** Serialised `WebSite` node, RSS `DataFeed` subject included. */
  website: string;
  /** Serialised `Organization` node. */
  organization: string;
};

const buildSiteStructuredData = async (
  locale: string
): Promise<SiteStructuredData> => {
  const [websiteContent, organizationContent] = await Promise.all([
    getIntlayerAsync('website-structured-data', locale),
    getIntlayerAsync('organization-structured-data', locale),
  ]);

  return {
    website: JSON.stringify(
      buildWebsiteJsonLd({
        url: Website_Home,
        searchUrl: Website_Doc_Search,
        locales: locales as string[],
        keywords: websiteContent.keywords as string[],
        rssUrl: RSS_FEED_URL,
      })
    ),
    organization: JSON.stringify(
      buildOrganizationJsonLd({
        url: Website_Home,
        logoUrl: LOGO_URL,
        slogan: String(organizationContent.slogan),
        knowsAbout: organizationContent.knowsAbout as string[],
        sameAs: SAME_AS_URLS,
        availableLanguages: locales as string[],
      })
    ),
  };
};

/**
 * Returns the `WebSite` and `Organization` nodes for a locale, building them
 * at most once.
 *
 * Every route `head` used to re-read the same dictionaries and re-run the same
 * `JSON.stringify` calls on each navigation. The content only ever varies by
 * locale, so one entry per declared locale bounds the cache exactly.
 *
 * @example
 * ```ts
 * const siteStructuredData = await getSiteStructuredData(locale);
 * // → scripts: [...getSiteStructuredDataScripts(siteStructuredData)]
 * ```
 */
export const getSiteStructuredData = buildSiteStructuredData;

/** Emits the site-wide JSON-LD scripts in the order every page declares them. */
export const getSiteStructuredDataScripts = (
  siteStructuredData: SiteStructuredData
): JsonLdScript[] => [
  toJsonLdScript(siteStructuredData.website),
  toJsonLdScript(siteStructuredData.organization),
];

/**
 * Copy backing a `SoftwareApplication` node, as stored in the
 * `software-application-structured-data` dictionary.
 */
export type SoftwareStructuredDataContent = {
  description: string;
  keywords: string[];
  audienceType: string;
};

export type SoftwareStructuredData = {
  /** Serialised `SoftwareApplication` node describing Intlayer itself. */
  application: string;
  /**
   * Raw copy, for the pages describing their own application — the scanner,
   * the translate CLI — which only borrow the shared keywords and audience.
   */
  content: SoftwareStructuredDataContent;
};

const buildSoftwareStructuredData = async (
  locale: string
): Promise<SoftwareStructuredData> => {
  const softwareContent = await getIntlayerAsync(
    'software-application-structured-data',
    locale as LocalesValues
  );

  const content: SoftwareStructuredDataContent = {
    description: String(softwareContent.description),
    keywords: softwareContent.keywords as string[],
    audienceType: String(softwareContent.audienceType),
  };

  return {
    application: JSON.stringify(
      buildSoftwareApplicationJsonLd({
        name: 'Intlayer',
        url: Website_Home,
        description: content.description,
        softwareVersion: packageJson.version,
        keywords: content.keywords,
        audienceType: content.audienceType,
        authorUrl: Website_Home,
        logoUrl: LOGO_URL,
        githubUrl: External_Github,
        operatingSystem: 'Web, iOS, Android',
        mainEntityUrl: Website_Home,
      })
    ),
    content,
  };
};

/**
 * Returns the `SoftwareApplication` node for Intlayer itself, built at most
 * once per locale.
 *
 * Kept separate from {@link getSiteStructuredData} so the documentation and
 * blog pages — which never emit an application node — do not pull the
 * `software-application-structured-data` chunk they have no use for.
 */
export const getSoftwareStructuredData = buildSoftwareStructuredData;
