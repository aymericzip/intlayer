/** @jsxImportSource react */

import { BackgroundLayout } from '@components/BackgroundLayout';
import {
  type Contributor,
  ContributorsList,
} from '@components/Contributors/ContributorsList';
import type { LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { WebsiteIslandWrapper } from './WebsiteIslandWrapper';

const ContributorsContent: FC<{ contributors: Contributor[] }> = ({
  contributors,
}) => {
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
        <ContributorsList contributors={contributors} />
      </div>
    </BackgroundLayout>
  );
};

export const ContributorsIsland: FC<{
  locale: LocalesValues;
  contributors: Contributor[];
}> = ({ locale, contributors }) => (
  <WebsiteIslandWrapper locale={locale}>
    <ContributorsContent contributors={contributors} />
  </WebsiteIslandWrapper>
);
