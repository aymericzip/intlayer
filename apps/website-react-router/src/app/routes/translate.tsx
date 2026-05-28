import { AiTranslationLandingCore } from '@components/TranslationLandingPage';
import { Website_Translate } from '@intlayer/design-system/routes';
import { PageLayout } from '@layouts/PageLayout';
import { OrganizationHeader } from '@structuredData/OrganizationHeader';
import { TranslateSoftwareApplicationHeader } from '@structuredData/TranslateSoftwareApplicationHeader';
import { WebsiteHeader } from '@structuredData/WebsiteHeader';
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getMultilingualUrls,
} from 'intlayer';

import type { Route } from './+types/translate';

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [];
  const { locale } = data;
  const { title, description, keywords } = getIntlayer(
    'translate-metadata',
    locale!
  );

  return [
    { title },
    { name: 'description', content: description },
    {
      name: 'keywords',
      content: Array.isArray(keywords) ? keywords.join(', ') : keywords || '',
    },
    {
      property: 'og:url',
      content: getLocalizedUrl(Website_Translate, locale!),
    },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    {
      tagName: 'link',
      rel: 'canonical',
      href: getLocalizedUrl(Website_Translate, locale!),
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: Website_Translate,
    },
    ...Object.entries(getMultilingualUrls(Website_Translate)).map(
      ([lang, url]) => ({
        tagName: 'link',
        rel: 'alternate',
        hrefLang: lang,
        href: url,
      })
    ),
  ];
};

export async function loader({ request }: Route.LoaderArgs) {
  const locale = getLocaleFromPath(request.url);
  return { locale };
}

export default function TranslatePage({ loaderData }: Route.ComponentProps) {
  const { locale } = loaderData;

  return (
    <PageLayout>
      <WebsiteHeader key={locale} />
      <OrganizationHeader />
      <TranslateSoftwareApplicationHeader />
      <AiTranslationLandingCore />
    </PageLayout>
  );
}
