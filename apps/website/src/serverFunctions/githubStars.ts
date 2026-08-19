import { createServerFn } from '@tanstack/react-start';
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions';

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
 * The navbar renders on every page and every locale, while GitHub caps
 * unauthenticated callers at 60 requests an hour — one shared request per build
 * keeps the quota out of the picture. A failed attempt is deliberately not
 * memoized, so a rate-limited or timed-out call is retried by the next page
 * instead of freezing a starless navbar into the whole build.
 */
let pendingGithubStars: Promise<number | null> | null = null;

const fetchGithubStarsOnce = async (): Promise<number | null> => {
  pendingGithubStars ??= fetchGithubStars();

  const stars = await pendingGithubStars;

  if (stars === null) {
    pendingGithubStars = null;
  }

  return stars;
};

/**
 * Resolved at build time: `staticFunctionMiddleware` writes the result to
 * `/__tsr/staticServerFnCache` while the pages are prerendered, and in
 * production the browser reads that static JSON rather than calling GitHub
 * itself.
 */
export const loadGithubStars = createServerFn()
  .middleware([staticFunctionMiddleware])
  .handler(fetchGithubStarsOnce);
