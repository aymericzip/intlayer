import {
  External_Github,
  Website_Contributors,
  Website_Doc_Search,
  Website_Home,
} from '@intlayer/design-system/routes';
import {
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from '@intlayer/design-system/structured-data';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer, locales } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import {
  type Contributor,
  ContributorsList,
} from '~/components/Contributors/ContributorsList';
import { PageLayout } from '~/layouts/PageLayout';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

export const Route = createFileRoute('/{-$locale}/contributors')({
  loader: async () => {
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
    return { contributors };
  },
  head: ({ params }) => {
    const { locale = defaultLocale } = params;
    const path = Website_Contributors;
    const { title, description, keywords } = getIntlayer(
      'contributors-metadata',
      locale
    );

    const websiteContent = getIntlayer('website-structured-data', locale);
    const orgContent = getIntlayer('organization-structured-data', locale);

    return {
      title: String(title),
      meta: [
        { name: 'description', content: String(description) },
        {
          name: 'keywords',
          content: Array.isArray(keywords)
            ? keywords.join(', ')
            : String(keywords || ''),
        },
        { property: 'og:url', content: getAbsoluteUrl(path, locale) },
        { property: 'og:title', content: String(title) },
        { property: 'og:description', content: String(description) },
      ],
      links: [
        { rel: 'canonical', href: getAbsoluteUrl(path, locale) },
        ...getHreflangLinks(path),
      ],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildWebsiteJsonLd({
              url: Website_Home,
              searchUrl: Website_Doc_Search,
              locales: locales as string[],
              keywords: websiteContent.keywords as string[],
              rssUrl: `${Website_Home}/feed.xml`,
            })
          ),
        },
        {
          type: 'application/ld+json',
          children: JSON.stringify(
            buildOrganizationJsonLd({
              url: Website_Home,
              logoUrl: `${Website_Home}/assets/logo.png`,
              slogan: String(orgContent.slogan),
              knowsAbout: orgContent.knowsAbout as string[],
              sameAs: [External_Github, 'https://twitter.com/intlayer'],
              availableLanguages: locales as string[],
            })
          ),
        },
      ],
    };
  },
  component: ContributorsPageRoute,
});

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

function ContributorsPageRoute() {
  const { contributors } = Route.useLoaderData();

  return (
    <PageLayout>
      <ContributorsPageContent>
        <ContributorsList contributors={contributors} />
      </ContributorsPageContent>
    </PageLayout>
  );
}
