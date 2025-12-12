import { BackgroundLayout } from '@components/BackgroundLayout';
import {
  type Contributor,
  ContributorsList,
} from '@components/Contributors/ContributorsList';
import type { LocalesValues } from 'intlayer';
import type { NextPageIntlayer } from 'next-intlayer';
import { IntlayerServerProvider, useIntlayer } from 'next-intlayer/server';
import type { FC, PropsWithChildren } from 'react';
import { generateMetadata } from './metadata';

export { generateMetadata };

const getContributors = async () => {
  let contributors: Contributor[] = [];
  try {
    const response = await fetch(
      'https://api.github.com/repos/aymericzip/intlayer/contributors',
      {
        next: { revalidate: 86400 },
      }
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

  return contributors;
};

const ContributorsPageContent: FC<
  PropsWithChildren<{ locale: LocalesValues }>
> = ({ locale, children }) => {
  const { title, subtitle } = useIntlayer('contributors-page', locale);

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
};

const ContributorsPage: NextPageIntlayer = async ({ params }) => {
  const { locale } = await params;

  const contributors: Contributor[] = await getContributors();

  return (
    <IntlayerServerProvider locale={locale}>
      <ContributorsPageContent locale={locale}>
        <ContributorsList contributors={contributors} />
      </ContributorsPageContent>
    </IntlayerServerProvider>
  );
};

export default ContributorsPage;
