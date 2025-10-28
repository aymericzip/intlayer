import { Link } from '@components/Link/Link';
import { Avatar, Container } from '@intlayer/design-system';
import { ArrowUpRight } from 'lucide-react';
import { useIntlayer } from 'next-intlayer/server';
import type React from 'react';

export type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions?: number;
  type?: string;
};

type ContributorsListProps = {
  contributors: Contributor[];
};

export const ContributorsList: React.FC<ContributorsListProps> = ({
  contributors: contributorsData,
}) => {
  const { label } = useIntlayer('contributors-list');

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contributorsData.map((contributor) => (
          <Link
            key={contributor.login}
            href={contributor.html_url}
            isExternalLink
            className="no-underline hover:no-underline"
            label={contributor.login}
          >
            <Container
              className="flex w-full flex-row items-center gap-4 p-3 transition-all duration-300 hover:scale-105"
              roundedSize="xl"
              transparency="xl"
            >
              <div className="shrink-0">
                <div className="relative h-16 w-16 overflow-hidden rounded-sm">
                  <Avatar
                    src={contributor.avatar_url}
                    alt={`${contributor.login}'s avatar`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="mb-1 truncate font-semibold">
                  {contributor.login}
                </h2>

                {contributor.contributions && (
                  <p className="text-sm">
                    <span className="font-semibold">
                      {contributor.contributions.toLocaleString()}
                    </span>{' '}
                    {label}
                  </p>
                )}
              </div>

              <ArrowUpRight className="h-6 w-6 shrink-0" />
            </Container>
          </Link>
        ))}
      </div>
    </div>
  );
};
