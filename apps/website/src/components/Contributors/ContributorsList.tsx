import { Link } from '@components/Link/Link';
import { Avatar, Container } from '@intlayer/design-system';
import { ArrowUpRight } from 'lucide-react';
import type React from 'react';

type Contributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions?: number;
  type?: string;
};

type ContributorsListProps = {
  contributors: Contributor[];
};

const ShimmerCard = () => (
  <Container className="flex items-center gap-4 overflow-hidden rounded-sm p-4">
    <div className="h-16 w-16 shrink-0 animate-pulse overflow-hidden rounded-sm" />
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="h-5 w-32 animate-pulse rounded" />
      <div className="h-4 w-24 animate-pulse rounded" />
    </div>
    <div className="h-6 w-6 shrink-0 animate-pulse rounded" />
  </Container>
);

const ContributorsList: React.FC<ContributorsListProps> = ({
  contributors,
}) => {
  if (!contributors || contributors.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 12 }).map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contributors.map((contributor) => {
          return (
            <Link
              key={contributor.login}
              href={contributor.html_url}
              isExternalLink
              className="no-underline hover:no-underline"
              label={contributor.login}
            >
              <Container className="flex flex-row items-center gap-4 overflow-hidden rounded border p-4">
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
                      contribution{contributor.contributions !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>

                <ArrowUpRight className="h-6 w-6 shrink-0" />
              </Container>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ContributorsList;
