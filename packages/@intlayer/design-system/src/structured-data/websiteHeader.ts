import { internationalization } from '@intlayer/config/built';
import {
  Website_Doc_Search,
  Website_Home,
} from '@intlayer/design-system/routes';
import { getIntlayer, type Locales } from 'intlayer';

export const getWebsiteHeader = ({ locale }: { locale: Locales }) => {
  const { keywords } = getIntlayer('website-structured-data', locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: Website_Home,
    name: 'Intlayer',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${Website_Doc_Search}?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    inLanguage: internationalization.locales,
    keywords: keywords.map((keyword) => keyword.value),
  };
};
