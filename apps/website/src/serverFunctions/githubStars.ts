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
 * How long a fetched star count stays fresh. The number moves slowly enough
 * that a day-old value is indistinguishable from a live one, and refreshing it
 * more often would spend the GitHub quota on a decoration.
 */
const GITHUB_STARS_REVALIDATION_INTERVAL_MS = 24 * 60 * 60 * 1000;

type MemoizedGithubStars = {
  readonly stars: Promise<number | null>;
  readonly fetchedAt: number;
};

/**
 * The single count the whole site reads: every page, every locale and every
 * visitor is answered from this memo, and GitHub is called again only once it
 * has aged past a day. GitHub caps unauthenticated callers at 60 requests an
 * hour, so revalidating globally here — rather than per browser — keeps the
 * quota out of the picture whatever the traffic.
 *
 * A failed attempt is deliberately not memoized, so a rate-limited or timed-out
 * call is retried by the next caller instead of freezing a starless navbar into
 * the whole build.
 */
let memoizedGithubStars: MemoizedGithubStars | null = null;

const fetchGithubStarsCached = async (): Promise<number | null> => {
  const now = Date.now();

  if (
    memoizedGithubStars === null ||
    now - memoizedGithubStars.fetchedAt >= GITHUB_STARS_REVALIDATION_INTERVAL_MS
  ) {
    memoizedGithubStars = { stars: fetchGithubStars(), fetchedAt: now };
  }

  const memoized = memoizedGithubStars;
  const stars = await memoized.stars;

  // Only drop the entry this call installed: a concurrent call may already have
  // replaced it with a newer one while this request was in flight.
  if (stars === null && memoizedGithubStars === memoized) {
    memoizedGithubStars = null;
  }

  return stars;
};

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
 * one everybody else sees, refreshed once a day for the whole site rather than
 * once per browser.
 */
export const revalidateGithubStars = createServerFn({
  method: 'GET',
}).handler(fetchGithubStarsCached);
