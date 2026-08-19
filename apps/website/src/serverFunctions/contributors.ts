import { createServerFn } from '@tanstack/react-start';
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions';
import type { Contributor } from '~/components/Contributors/ContributorsList';

const GITHUB_CONTRIBUTORS_URL =
  'https://api.github.com/repos/aymericzip/intlayer/contributors';

type GithubContributor = Contributor & { type?: string };

/**
 * Keeps only the fields the UI reads. The GitHub payload carries a dozen API
 * URLs per contributor, all of which would otherwise be frozen into the static
 * cache the browser downloads.
 *
 * @param contributor - A contributor entry as returned by the GitHub API.
 * @returns The same contributor, reduced to the rendered fields.
 */
const toContributor = ({
  login,
  avatar_url,
  html_url,
  contributions,
}: GithubContributor): Contributor => ({
  login,
  avatar_url,
  html_url,
  contributions,
});

const fetchContributors = async (): Promise<Contributor[]> => {
  try {
    const response = await fetch(GITHUB_CONTRIBUTORS_URL, {
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return [];
    }

    const contributors: GithubContributor[] = await response.json();

    return contributors
      .filter(({ type, login }) => type !== 'Bot' && !login.includes('[bot]'))
      .map(toContributor);
  } catch (error) {
    console.error('Error fetching contributors:', error);
    return [];
  }
};

/**
 * Prerendering renders the contributor cloud once per landing page and per
 * locale, while GitHub caps unauthenticated callers at 60 requests an hour —
 * one shared request per build keeps the quota out of the picture. An empty
 * result is deliberately not memoized, so a rate-limited or timed-out attempt
 * is retried by the next page instead of freezing an empty cloud into the
 * whole build.
 */
let pendingContributors: Promise<Contributor[]> | null = null;

const fetchContributorsOnce = async (): Promise<Contributor[]> => {
  pendingContributors ??= fetchContributors();

  const contributors = await pendingContributors;

  if (contributors.length === 0) {
    pendingContributors = null;
  }

  return contributors;
};

/**
 * Resolved at build time: `staticFunctionMiddleware` writes the result to
 * `/__tsr/staticServerFnCache` while the pages are prerendered, and in
 * production the browser reads that static JSON rather than calling GitHub
 * itself.
 */
export const loadContributors = createServerFn()
  .middleware([staticFunctionMiddleware])
  .handler(fetchContributorsOnce);
