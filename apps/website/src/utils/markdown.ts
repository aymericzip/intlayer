import { Locales } from 'intlayer';
import { locales } from '../../intlayer.config';
import { GithubRoutes, PagesRoutes } from '@/Routes';

const getDocLocale = (url: string, locale: Locales): string =>
  url.replace('/en/', `/${locale}/`);

const urlRecord: Partial<Record<GithubRoutes, PagesRoutes>> = {
  [GithubRoutes.Introduction]: PagesRoutes.Doc,
  [GithubRoutes.HowWorksIntlayer]: PagesRoutes.Doc_HowWorksIntlayer,
  [GithubRoutes.Configuration]: PagesRoutes.Doc_Configuration,
  [GithubRoutes.InterestOfIntlayer]: PagesRoutes.Doc_Interest,
  [GithubRoutes.IntlayerCLI]: PagesRoutes.Doc_CLI,
  [GithubRoutes.IntlayerVisualEditor]: PagesRoutes.Doc_IntlayerVisualEditor,
  [GithubRoutes.IntlayerCMS]: PagesRoutes.Doc_IntlayerCMS,
  [GithubRoutes.IntlayerWithNextJS15]: PagesRoutes.Doc_Environment_NextJS_15,
  [GithubRoutes.IntlayerWithNextJS14]: PagesRoutes.Doc_Environment_NextJS_14,
  [GithubRoutes.IntlayerWithNextJSUsingPageRouter]:
    PagesRoutes.Doc_Intlayer_with_NextJS_using_Page_Router,
  [GithubRoutes.IntlayerWithReactCRA]: PagesRoutes.Doc_Environment_CRA,
  [GithubRoutes.IntlayerWithViteReact]:
    PagesRoutes.Doc_Environment_ViteAndReact,
  [GithubRoutes.IntlayerWithExpress]: PagesRoutes.Doc_Environment_Express,
  [GithubRoutes.Dictionary_GetStarted]: PagesRoutes.Doc_ContentDeclaration,
  [GithubRoutes.Dictionary_ContentExtensionCustomization]:
    PagesRoutes.Doc_ContentDeclaration,
  [GithubRoutes.Dictionary_Enumeration]: PagesRoutes.Doc_Dictionary_Enumeration,
  [GithubRoutes.Dictionary_FunctionFetching]:
    PagesRoutes.Doc_Dictionary_FunctionFetching,
  [GithubRoutes.Dictionary_Translation]: PagesRoutes.Doc_Dictionary_Translation,
  [GithubRoutes.Dictionary_Markdown]: PagesRoutes.Doc_Dictionary_Markdown,
  [GithubRoutes.Dictionary_Condition]: PagesRoutes.Doc_Dictionary_Condition,
  [GithubRoutes.Dictionary_Nesting]: PagesRoutes.Doc_Dictionary_Nesting,
  [GithubRoutes['Packages_intlayer']]: PagesRoutes['Doc_Packages_intlayer'],
  [GithubRoutes['Packages_intlayer_getConfiguration']]:
    PagesRoutes['Doc_Packages_intlayer_getConfiguration'],
  [GithubRoutes['Packages_intlayer_getDictionary']]:
    PagesRoutes['Doc_Packages_intlayer_getDictionary'],
  [GithubRoutes['Packages_intlayer_getLocaleLang']]:
    PagesRoutes['Doc_Packages_intlayer_getLocaleLang'],
  [GithubRoutes['Packages_intlayer_getLocaleName']]:
    PagesRoutes['Doc_Packages_intlayer_getLocaleName'],
  [GithubRoutes['Packages_intlayer_getHTMLTextDir']]:
    PagesRoutes['Doc_Packages_intlayer_getHTMLTextDir'],
  [GithubRoutes['Packages_intlayer_getLocalizedUrl']]:
    PagesRoutes['Doc_Packages_intlayer_getLocalizedUrl'],
  [GithubRoutes['Packages_intlayer_getMultilingualUrls']]:
    PagesRoutes['Doc_Packages_intlayer_getMultilingualUrls'],
  [GithubRoutes['Packages_intlayer_getPathWithoutLocale']]:
    PagesRoutes['Doc_Packages_intlayer_getPathWithoutLocale'],
  [GithubRoutes['Packages_intlayer_getTranslationContent']]:
    PagesRoutes['Doc_Packages_intlayer_getTranslationContent'],
  [GithubRoutes['Packages_intlayer_getEnumerationContent']]:
    PagesRoutes['Doc_Packages_intlayer_getEnumerationContent'],
  [GithubRoutes['Packages_intlayer_removeLocaleFromUrl']]:
    PagesRoutes['Doc_Packages_intlayer_removeLocaleFromUrl'],
  [GithubRoutes['Packages_express-intlayer']]:
    PagesRoutes['Doc_Packages_express-intlayer'],
  [GithubRoutes['Packages_express-intlayer_t']]:
    PagesRoutes['Doc_Packages_express-intlayer_t'],
  [GithubRoutes['Packages_react-intlayer']]:
    PagesRoutes['Doc_Packages_react-intlayer'],
  [GithubRoutes['Packages_react-intlayer_t']]:
    PagesRoutes['Doc_Packages_react-intlayer_t'],
  [GithubRoutes['Packages_react-intlayer_useIntlayer']]:
    PagesRoutes['Doc_Packages_react-intlayer_useIntlayer'],
  [GithubRoutes['Packages_react-intlayer_useIntlayerAsync']]:
    PagesRoutes['Doc_Packages_react-intlayer_useIntlayerAsync'],
  [GithubRoutes['Packages_react-intlayer_useDictionary']]:
    PagesRoutes['Doc_Packages_react-intlayer_useDictionary'],
  [GithubRoutes['Packages_react-intlayer_useLocale']]:
    PagesRoutes['Doc_Packages_react-intlayer_useLocale'],
  [GithubRoutes['Packages_next-intlayer']]:
    PagesRoutes['Doc_Packages_next-intlayer'],
  [GithubRoutes['Packages_next-intlayer_t']]:
    PagesRoutes['Doc_Packages_next-intlayer_t'],
  [GithubRoutes['Packages_next-intlayer_useIntlayer']]:
    PagesRoutes['Doc_Packages_next-intlayer_useIntlayer'],
  [GithubRoutes['Packages_next-intlayer_useIntlayerAsync']]:
    PagesRoutes['Doc_Packages_next-intlayer_useIntlayerAsync'],
  [GithubRoutes['Packages_next-intlayer_useDictionary']]:
    PagesRoutes['Doc_Packages_next-intlayer_useDictionary'],
  [GithubRoutes['Packages_next-intlayer_useLocale']]:
    PagesRoutes['Doc_Packages_next-intlayer_useLocale'],
  [GithubRoutes.BlogIndex]: PagesRoutes['Blog'],
  [GithubRoutes.IntlayerWithNextI18next]:
    PagesRoutes['Blog_Intlayer_with_Next-i18next'],
  [GithubRoutes.IntlayerWithReactI18next]:
    PagesRoutes['Blog_Intlayer_with_React-i18next'],
  [GithubRoutes.IntlayerWithNextIntl]:
    PagesRoutes['Blog_Intlayer_with_Next-intl'],
  [GithubRoutes.IntlayerWithReactIntl]:
    PagesRoutes['Blog_Intlayer_with_React-intl'],
  [GithubRoutes['Next-i18next_vs_Next-intl_vs_Intlayer']]:
    PagesRoutes['Blog_Next-i18next_vs_Next-intl_vs_Intlayer'],
  [GithubRoutes['React-i18next_vs_React-intl_vs_Intlayer']]:
    PagesRoutes['Blog_React-i18next_vs_React-intl_vs_Intlayer'],
  [GithubRoutes['I18nAndSEO']]: PagesRoutes.Blog_SEO_and_i18n,
  [GithubRoutes['i18n-technologies__frameworks__angular']]:
    PagesRoutes['Blog_i18n-technologies__frameworks__angular'],
  [GithubRoutes['i18n-technologies__frameworks__vue']]:
    PagesRoutes['Blog_i18n-technologies__frameworks__vue'],
  [GithubRoutes['i18n-technologies__frameworks__svelte']]:
    PagesRoutes['Blog_i18n-technologies__frameworks__svelte'],
  [GithubRoutes['i18n-technologies__frameworks__flutter']]:
    PagesRoutes['Blog_i18n-technologies__frameworks__flutter'],
  [GithubRoutes['i18n-technologies__frameworks__react-native']]:
    PagesRoutes['Blog_i18n-technologies__frameworks__react-native'],
  [GithubRoutes['i18n-technologies__CMS__wordpress']]:
    PagesRoutes['Blog_i18n-technologies__CMS__wordpress'],
  [GithubRoutes['i18n-technologies__CMS__drupal']]:
    PagesRoutes['Blog_i18n-technologies__CMS__drupal'],
  [GithubRoutes['i18n-technologies__CMS__wix']]:
    PagesRoutes['Blog_i18n-technologies__CMS__wix'],
  [GithubRoutes.PrivacyPolicy]: PagesRoutes.PrivacyPolicy,
  [GithubRoutes.TermsOfService]: PagesRoutes.TermsOfService,
};

const urlRenamerMultiLocale: Record<string, string> = locales.reduce(
  (acc, locale) =>
    Object.entries(urlRecord).reduce((acc, [githubRoute, pagesRoute]) => {
      const githubUrl = getDocLocale(githubRoute, locale);

      if (locale === Locales.ENGLISH) {
        acc[githubUrl] = pagesRoute;
      } else {
        acc[githubUrl] = `/${locale}${pagesRoute}`;
      }
      return acc;
    }, acc),
  {} as Record<string, string>
);

/**
 * Escapes special characters in a string for use in a regular expression.
 *
 * @param string - The string to escape.
 * @returns The escaped string.
 */
const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

/**
 * Replaces URLs in the input text that match the application's domain
 * and do not have a file extension with their path only.
 *
 * @param text - The input text containing URLs to be processed.
 * @returns - The processed text with applicable URLs renamed.
 */
const removeURLDomain = (text: string): string => {
  // Retrieve the application domain from environment variables

  // Escape special regex characters in the domain to prevent regex injection
  const escapedDomain = process.env.NEXT_PUBLIC_DOMAIN!.replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  );

  // Regular expression to match URLs:
  // - Starts with https:// followed by the escaped domain
  // - Followed by a path that does not end with a file extension
  const urlRegex = new RegExp(
    `https?://${escapedDomain}(\\/[^\\s./?#]+(?:\\/[^\\s./?#]+)*)`,
    'g'
  );

  // Replace matched URLs with their path only, ensuring no file extension
  return text.replace(urlRegex, (match, path) => {
    // Check if the path ends with a file extension (e.g., .png, .jpg)
    const hasExtension = /\.[a-zA-Z0-9]+$/.test(path.split('/').pop());

    // If there's no extension, return the path; otherwise, keep the original URL
    return hasExtension ? match : path;
  });
};

/**
 * Replaces GitHub URLs in the content with corresponding PagesRoutes.
 *
 * @param content - The input string content containing GitHub URLs.
 * @returns The updated content with URLs replaced.
 */
export const urlRenamer = (content: string): string => {
  let updatedContent = content;

  // Sort the entries by URL length in descending order to prevent partial replacements
  const sortedEntries = Object.entries(urlRenamerMultiLocale);

  sortedEntries.forEach(([githubUrl, pagesRoute]) => {
    const regex = new RegExp(escapeRegExp(githubUrl), 'g');
    updatedContent = updatedContent.replace(regex, pagesRoute);
  });

  // Remove the base domain from URLs
  updatedContent = removeURLDomain(updatedContent);

  return updatedContent;
};
