import type { Contributor } from '@components/Contributors/ContributorsList';
import type { FC } from 'react';
import { getContributors } from '@/app/[locale]/(landing)/contributors/contributors.api';
import { ContributorCloud } from './ContributorCloud';

const shuffleArray = (array: Contributor[]): Contributor[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const x = Math.sin(1) * 10000;
    const seed = x - Math.floor(x);

    const j = Math.floor(seed * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const contributors = await getContributors()
  .then(shuffleArray)
  .then((array) => array.slice(0, 40));

export const ContributorSection: FC = () => {
  if (contributors.length === 0) {
    return null;
  }

  return <ContributorCloud contributors={contributors} />;
};
