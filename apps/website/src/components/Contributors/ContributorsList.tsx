import { ArrowRight, Bot, User } from 'lucide-react';
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
  <div className="relative flex items-center gap-4 overflow-hidden rounded-xl border border-neutral-700/50 bg-gradient-to-br from-neutral-900 to-black p-4">
    {/* Shimmer effect overlay */}
    <div className="-translate-x-full absolute inset-0 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-700/20 to-transparent" />

    {/* Avatar skeleton */}
    <div className="relative h-16 w-16 shrink-0 animate-pulse overflow-hidden rounded-xl bg-neutral-800" />

    {/* Content skeleton */}
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="h-5 w-32 animate-pulse rounded bg-neutral-800" />
      <div className="h-4 w-24 animate-pulse rounded bg-neutral-800" />
    </div>

    {/* Arrow skeleton */}
    <div className="h-5 w-5 shrink-0 animate-pulse rounded bg-neutral-800" />
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
          const isBot = contributor.type?.toLowerCase().includes('bot');

          return (
            <a
              key={contributor.login}
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 overflow-hidden rounded-xl border border-neutral-700/50 bg-gradient-to-br from-neutral-900 to-black p-4 transition-all duration-300 hover:scale-[1.02] hover:border-neutral-600 hover:shadow-neutral-900/50 hover:shadow-xl"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/0 via-neutral-800/0 to-neutral-800/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Avatar */}
              <div className="relative z-10 shrink-0">
                <div className="relative h-16 w-16 overflow-hidden rounded-xl border-2 border-neutral-700 transition-all duration-300 group-hover:scale-110 group-hover:border-neutral-500">
                  <Image
                    src={contributor.avatar_url}
                    alt={`${contributor.login}'s avatar`}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>

                {/* Type Badge */}
                <div
                  className={`-bottom-1 -right-1 absolute flex h-6 w-6 items-center justify-center rounded-full border-2 border-black shadow-lg ${
                    isBot
                      ? 'bg-gradient-to-br from-purple-400 to-purple-600'
                      : 'bg-gradient-to-br from-blue-400 to-blue-600'
                  }`}
                >
                  {isBot ? (
                    <Bot className="h-3 w-3 text-white" />
                  ) : (
                    <User className="h-3 w-3 text-white" />
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 min-w-0 flex-1">
                <h3 className="mb-1 truncate font-semibold text-base text-white transition-colors duration-300 group-hover:text-neutral-100">
                  {contributor.login}
                </h3>

                {contributor.contributions && (
                  <p className="text-neutral-400 text-sm">
                    <span className="font-semibold text-neutral-300">
                      {contributor.contributions.toLocaleString()}
                    </span>{' '}
                    contribution{contributor.contributions !== 1 ? 's' : ''}
                  </p>
                )}
              </div>

              {/* Arrow Icon */}
              <ArrowRight className="relative z-10 h-5 w-5 shrink-0 text-neutral-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-neutral-300" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ContributorsList;
