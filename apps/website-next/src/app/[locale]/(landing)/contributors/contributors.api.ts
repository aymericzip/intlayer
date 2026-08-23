import type { Contributor } from '@components/Contributors/ContributorsList';

/**
 * Fetches the repository contributors from the GitHub API.
 *
 * `'use cache'` is required by Cache Components: an uncached `fetch` during a
 * prerender returns a promise that never resolves, stalling every page that
 * renders the contributor cloud.
 */
export const getContributors = async () => {
  //   'use cache';

  let contributors: Contributor[] = [];
  try {
    const response = await fetch(
      'https://api.github.com/repos/aymericzip/intlayer/contributors'
    );

    if (response.ok) {
      const data = await response.json();
      contributors = data.filter(
        (contributor: Contributor) =>
          contributor.type !== 'Bot' && !contributor.login.includes('[bot]')
      );
    }
  } catch (error) {
    console.error('Error fetching contributors:', error);
  }

  return contributors;
};
