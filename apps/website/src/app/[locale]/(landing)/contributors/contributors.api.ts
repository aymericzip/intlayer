'use server';

import type { Contributor } from '@components/Contributors/ContributorsList';
import { cacheLife } from 'next/cache';

export const getContributors = async () => {
  'use cache';
  cacheLife('weeks');

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
