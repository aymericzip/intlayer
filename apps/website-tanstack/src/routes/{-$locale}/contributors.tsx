import { Website_Contributors_Path } from '@intlayer/design-system/routes';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { defaultLocale, getIntlayer } from 'intlayer';
import { useIntlayer } from 'react-intlayer';
import { BackgroundLayout } from '~/components/BackgroundLayout';
import {
  type Contributor,
  ContributorsList,
} from '~/components/Contributors/ContributorsList';
import staticContributors from '~/data/contributors.json';
import { PageLayout } from '~/layouts/PageLayout';
import { getAbsoluteUrl, getHreflangLinks } from '~/utils/seo';

const fetchContributors = async (): Promise<Contributor[]> => {
  try {
    const response = await fetch(
      'https://api.github.com/repos/aymericzip/intlayer/contributors?per_page=100'
    );
    if (response.ok) {
      const data = await response.json();
      return data.filter(
        (contributor: Contributor) =>
          contributor.type !== 'Bot' && !contributor.login.includes('[bot]')
      );
    }
  } catch (error) {
    console.error('Error fetching contributors:', error);
  }
  return [];
};

export const Route = createFileRoute('/{-$locale}/contributors')({
  loader: () => {
    return { contributors: staticContributors as Contributor[] };
  },
  head: ({ params }) => {
    const locale = params.locale ?? defaultLocale;
    const path = Website_Contributors_Path;
    const { title, description, keywords } = getIntlayer(
      'contributors-metadata',
      locale
    );

    return {
      meta: [
        { title: String(title) },
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
  const { contributors: initialContributors } = Route.useLoaderData();

  const { data: contributors = initialContributors } = useQuery({
    queryKey: ['contributors'],
    queryFn: fetchContributors,
    initialData: initialContributors,
    staleTime: 0,
  });

  return (
    <PageLayout>
      <ContributorsPageContent>
        <ContributorsList contributors={contributors} />
      </ContributorsPageContent>
    </PageLayout>
  );
}
