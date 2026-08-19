import { type FC, use } from 'react';
import type { Contributor } from '~/components/Contributors/ContributorsList';
import { loadContributors } from '~/serverFunctions/contributors';
import { ContributorCloud } from './ContributorCloud';

const MAX_DISPLAYED_CONTRIBUTORS = 40;

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

/**
 * Started as the module evaluates, but deliberately not awaited at the top
 * level: a top-level `await` makes this an async module, so the chunk the
 * `React.lazy` boundary loads only resolves once the request has landed. A
 * boundary whose module resolves that late during hydration keeps its fallback
 * for good — React has already replaced the server markup with the pending
 * state and never retries. Suspending on the promise from inside the component
 * is the same wait, on a path React does recover from.
 *
 * The request itself never reaches GitHub: the server function is resolved at
 * prerender time and the browser reads the static cache it wrote.
 */
const contributorsPromise = loadContributors()
  .then(shuffleArray)
  .then((contributors) => contributors.slice(0, MAX_DISPLAYED_CONTRIBUTORS))
  .catch((error: unknown) => {
    // The section renders nothing on an empty list, so a rejection is better
    // absorbed here than read through `use()`: an unreachable GitHub or a
    // missing static cache would otherwise reach the page's error boundary.
    console.error('Error loading contributors:', error);
    return [];
  });

export const ContributorSection: FC = () => {
  const contributors = use(contributorsPromise);

  if (contributors.length === 0) {
    return null;
  }

  return <ContributorCloud contributors={contributors} />;
};
