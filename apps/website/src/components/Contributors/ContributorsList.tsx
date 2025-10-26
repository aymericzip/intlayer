import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
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
  <div className="relative flex items-center gap-4 overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800 p-4">
    <div className="-translate-x-full absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-600/20 to-transparent" />
    <div className="relative h-16 w-16 shrink-0 animate-pulse overflow-hidden rounded-xl bg-neutral-700" />
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="h-5 w-32 animate-pulse rounded bg-neutral-700" />
      <div className="h-4 w-24 animate-pulse rounded bg-neutral-700" />
    </div>
    <div className="h-6 w-6 shrink-0 animate-pulse rounded bg-neutral-700" />
  </div>
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
            <a
              key={contributor.login}
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 overflow-hidden rounded-xl border border-neutral-700 bg-black p-4"
            >
              <div className="shrink-0">
                <div className="relative h-16 w-16 overflow-hidden rounded-xl border-2 border-neutral-700">
                  <Image
                    src={contributor.avatar_url}
                    alt={`${contributor.login}'s avatar`}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="mb-1 truncate font-semibold text-base text-white">
                  {contributor.login}
                </h2>

                {contributor.contributions && (
                  <p className="text-neutral-500 text-sm">
                    <span className="font-semibold text-neutral-500">
                      {contributor.contributions.toLocaleString()}
                    </span>{' '}
                    contribution{contributor.contributions !== 1 ? 's' : ''}
                  </p>
                )}
              </div>

              <ArrowUpRight className="h-6 w-6 shrink-0 text-neutral-500" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ContributorsList;
