import type { Contributor } from '@components/Contributors/ContributorsList';

export const getContributors = async () => {
  let contributors: Contributor[] = [];
  try {
    const response = await fetch(
      'https://api.github.com/repos/aymericzip/intlayer/contributors',
      {
        next: { revalidate: 86400 },
      }
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
