import { getRouteApi } from '@tanstack/react-router';
import type { FC } from 'react';
import { useNumber } from 'react-intlayer/format';
import { useRevalidatedGithubStars } from './useRevalidatedGithubStars';

const rootRoute = getRouteApi('__root__');

/**
 * Renders the Intlayer repository star count next to the navbar GitHub link.
 *
 * The initial count comes from the root route loader, so it is already part of
 * the dehydrated router state by the time the navbar hydrates — reading the
 * static server function cache from here instead would open a request that only
 * starts once this chunk has been downloaded and run. Since that value is baked
 * into the prerendered HTML, `useRevalidatedGithubStars` asks the server for
 * the current count, which the server itself refreshes once a day.
 *
 * Renders nothing while GitHub could not be reached, so the link keeps its
 * icon-only layout.
 */
export const GithubStarCount: FC = () => {
  const { githubStars } = rootRoute.useLoaderData();

  const stars = useRevalidatedGithubStars(githubStars);

  const format = useNumber();

  if (stars === null) {
    return <></>;
  }

  const formattedStars = format(stars, {
    notation: 'compact',
    maximumFractionDigits: 1,
  });

  return (
    <strong className="text-xs tabular-nums leading-none">
      {formattedStars}
    </strong>
  );
};
