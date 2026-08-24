import { getRouteApi } from '@tanstack/react-router';
import type { FC } from 'react';
import { useNumber } from 'react-intlayer/format';

const rootRoute = getRouteApi('__root__');

/**
 * Renders the Intlayer repository star count next to the navbar GitHub link.
 *
 * The count comes from the root route loader, so it is already part of the
 * dehydrated router state by the time the navbar hydrates — reading the static
 * server function cache from here instead would open a request that only starts
 * once this chunk has been downloaded and run.
 *
 * Renders nothing when GitHub could not be reached at build time, so the link
 * keeps its icon-only layout.
 */
export const GithubStarCount: FC = () => {
  const { githubStars } = rootRoute.useLoaderData();

  const format = useNumber();

  if (githubStars === null) {
    return <></>;
  }

  const formattedStars = format(githubStars, {
    notation: 'compact',
    maximumFractionDigits: 1,
  });

  return (
    <strong className="text-xs tabular-nums leading-none">
      {formattedStars}
    </strong>
  );
};
