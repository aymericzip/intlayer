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

let contributorsPromise: Promise<Contributor[]> | null = null;

/**
 * Starts the request on the first render rather than as the module evaluates:
 * `loadContributors` is a server function, and on the server it only runs
 * inside the request's Start context. The module is evaluated by the
 * `React.lazy` import, outside that context, so a call at module scope throws
 * `No Start context found in AsyncLocalStorage`.
 *
 * It is still deliberately not awaited at the top level: a top-level `await`
 * makes this an async module, so the chunk the `React.lazy` boundary loads only
 * resolves once the request has landed. A boundary whose module resolves that
 * late during hydration keeps its fallback for good — React has already
 * replaced the server markup with the pending state and never retries.
 * Suspending on the promise from inside the component is the same wait, on a
 * path React does recover from.
 *
 * The promise is cached so every render suspends on the same one. It is never
 * reset — `use()` re-renders on resolution, so a cache cleared at that point
 * would hand the next render a fresh promise and suspend the section forever.
 *
 * The request itself never reaches GitHub in production: the server function is
 * resolved at prerender time and the browser reads the static cache it wrote.
 *
 * @returns The contributors to render, shuffled and capped.
 */
const getContributors = (): Promise<Contributor[]> => {
  contributorsPromise ??= loadContributors()
    .then(shuffleArray)
    .then((contributors) => contributors.slice(0, MAX_DISPLAYED_CONTRIBUTORS))
    .catch((error: unknown) => {
      // The section renders nothing on an empty list, so a rejection is better
      // absorbed here than read through `use()`: an unreachable GitHub or a
      // missing static cache would otherwise reach the page's error boundary.
      console.error('Error loading contributors:', error);
      return [];
    });

  return contributorsPromise;
};

export const ContributorSection: FC = () => {
  const contributors = use(getContributors());

  if (contributors.length === 0) {
    return null;
  }

  return <ContributorCloud contributors={contributors} />;
};
