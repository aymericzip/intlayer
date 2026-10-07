import { createServerFn } from '@tanstack/react-start';
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions';
import { createRevalidatedMemo } from '~/utils/createRevalidatedMemo';

const GITHUB_REPOSITORY_URL =
  'https://api.github.com/repos/aymericzip/intlayer';

type GithubRepository = {
  stargazers_count: number;
};

/**
 * Reads the current star count of the Intlayer repository.
 *
 * @returns The number of stargazers, or `null` when GitHub is unreachable,
 * rate-limited, or answers with an unexpected payload.
 */
const fetchGithubStars = async (): Promise<number | null> => {
  try {
    const response = await fetch(GITHUB_REPOSITORY_URL, {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return null;
    }

    const repository: GithubRepository = await response.json();

    return typeof repository.stargazers_count === 'number'
      ? repository.stargazers_count
      : null;
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return null;
  }
};

/**
 * How long a fetched star count stays fresh. Revalidated globally on the
 * server rather than per browser, so GitHub's 60 requests/hour unauthenticated
 * quota stays out of the picture whatever the traffic.
 */
const GITHUB_STARS_REVALIDATION_INTERVAL_MS = 6 * 60 * 60 * 1000;

const fetchGithubStarsCached = createRevalidatedMemo(
  fetchGithubStars,
  GITHUB_STARS_REVALIDATION_INTERVAL_MS
);

/**
 * Resolved at build time: `staticFunctionMiddleware` writes the result to
 * `/__tsr/staticServerFnCache` while the pages are prerendered, and in
 * production the browser reads that static JSON rather than calling GitHub
 * itself.
 *
 * That payload is also baked into the prerendered HTML, so on its own it only
 * changes with a deployment — {@link revalidateGithubStars} is what keeps the
 * count current between two builds.
 */
export const loadGithubStars = createServerFn()
  .middleware([staticFunctionMiddleware])
  .handler(fetchGithubStarsCached);

/**
 * Runtime counterpart of {@link loadGithubStars}, deliberately without the
 * static middleware so the call reaches the server rather than the build-time
 * payload. The navbar calls it once per page load, and the server answers every
 * caller from the memo above — the count a visitor sees is therefore the same
 * one everybody else sees, refreshed every 6 hours for the whole site rather than
 * once per browser.
 */
export const revalidateGithubStars = createServerFn({
  method: 'GET',
}).handler(fetchGithubStarsCached);
