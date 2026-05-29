import { Website_Contributors } from '@intlayer/design-system/routes';
import {
  getIntlayer,
  getLocaleFromPath,
  getLocalizedUrl,
  getMultilingualUrls,
} from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import {
  type Contributor,
  ContributorsList,
} from '~/components/Contributors/ContributorsList';
import { PageLayout } from '~/layouts/PageLayout';
import { OrganizationHeader } from '~/structuredData/OrganizationHeader';
import { WebsiteHeader } from '~/structuredData/WebsiteHeader';

import type { Route } from './+types/contributors';

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [];
  const { locale } = data;
  const { title, description, keywords } = getIntlayer(
    'contributors-metadata',
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
      content: getLocalizedUrl(Website_Contributors, locale!),
    },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    {
      tagName: 'link',
      rel: 'canonical',
      href: getLocalizedUrl(Website_Contributors, locale!),
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: Website_Contributors,
    },
    ...Object.entries(getMultilingualUrls(Website_Contributors)).map(
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
  let contributors: Contributor[] = [];
  try {
    const response = await fetch(
      'https://api.github.com/repos/aymericzip/intlayer/contributors'
    );

    if (response.ok) {
      const data = await response.json();
      contributors = data.filter(
        (contributor: Contributor) =>
          contributor.type !== 'Bot' && !contributor.login.includes('[bot]')
      );
    }
  } catch (error) {
    console.error('Error fetching contributors:', error);
  }

  return { locale, contributors };
}

function ContributorsPageContent({ children }: { children: React.ReactNode }) {
  const { title, subtitle } = useIntlayer('contributors-page');

  return (
    <BackgroundLayout>
      <div className="flex min-h-screen w-full flex-col items-center px-4 py-12 md:px-8 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative mb-12 text-center">
            <p className="mb-3 font-medium text-base text-neutral-400 sm:text-lg">
              {subtitle}
            </p>
            <h1 className="font-bold text-5xl text-neutral-900 sm:text-6xl md:text-7xl dark:text-neutral-100">
              {title}
            </h1>
          </div>
        </div>
        {children}
      </div>
    </BackgroundLayout>
  );
}

export default function ContributorsPageRoute({
  loaderData,
}: Route.ComponentProps) {
  const { locale, contributors } = loaderData;

  return (
    <PageLayout>
      <WebsiteHeader key={locale} />
      <OrganizationHeader />
      <ContributorsPageContent>
        <ContributorsList contributors={contributors} />
      </ContributorsPageContent>
    </PageLayout>
  );
}
