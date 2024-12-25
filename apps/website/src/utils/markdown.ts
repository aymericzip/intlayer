import { Locales } from 'intlayer';
import { locales } from '../../intlayer.config';
import { GithubRoutes, PagesRoutes } from '@/Routes';

const getDocLocale = (url: string, locale: Locales): string =>
  url.replace('/en/', `/${locale}/`);

const urlRecord: Record<GithubRoutes | string, PagesRoutes> = {
  [`${process.env.NEXT_PUBLIC_URL}/`]: PagesRoutes.Home,
  [process.env.NEXT_PUBLIC_URL!]: PagesRoutes.Home,
  [GithubRoutes.Introduction]: PagesRoutes.Doc,
  [GithubRoutes.HowWorksIntlayer]: PagesRoutes.Doc_HowWorksIntlayer,
  [GithubRoutes.Configuration]: PagesRoutes.Doc_Configuration,
  [GithubRoutes.InterestOfIntlayer]: PagesRoutes.Doc_Interest,
  [GithubRoutes.IntlayerCLI]: PagesRoutes.Doc_CLI,
  [GithubRoutes.IntlayerEditor]: PagesRoutes.Doc_IntlayerEditor,
  [GithubRoutes.IntlayerWithNextJS15]: PagesRoutes.Doc_Environment_NextJS_15,
  [GithubRoutes.IntlayerWithNextJS14]: PagesRoutes.Doc_Environment_NextJS_14,
  [GithubRoutes.IntlayerWithNextJSUsingPageRouter]:
    PagesRoutes.Doc_Intlayer_with_NextJS_using_Page_Router,
  [GithubRoutes.IntlayerWithReactCRA]: PagesRoutes.Doc_Environment_CRA,
  [GithubRoutes.IntlayerWithViteReact]:
    PagesRoutes.Doc_Environment_ViteAndReact,
  [GithubRoutes.IntlayerWithExpress]: PagesRoutes.Doc_Environment_Express,

  [GithubRoutes.ContentDeclaration_GetStarted]:
    PagesRoutes.Doc_ContentDeclaration,
  [GithubRoutes.ContentDeclaration_ContentExtensionCustomization]:
    PagesRoutes.Doc_ContentDeclaration,
  [GithubRoutes.ContentDeclaration_Enumeration]:
    PagesRoutes.Doc_ContentDeclaration_Enumeration,
  [GithubRoutes.ContentDeclaration_FunctionFetching]:
    PagesRoutes.Doc_ContentDeclaration_FunctionFetching,
  [GithubRoutes.ContentDeclaration_Translation]:
    PagesRoutes.Doc_ContentDeclaration_Translation,

  [GithubRoutes.IntlayerWithI18next]: PagesRoutes.Doc_Intlayer_with_I18next,

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
  [GithubRoutes['Packages_express-intlayer_t']]:
    PagesRoutes['Doc_Packages_express-intlayer_t'],
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

  return updatedContent;
};
