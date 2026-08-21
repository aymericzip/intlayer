import { type FC, use } from 'react';
import { useLocale } from 'react-intlayer';
import { loadGithubStars } from '~/serverFunctions/githubStars';

/**
 * Started as the module evaluates, but deliberately not awaited at the top
 * level: a top-level `await` makes this an async module, so a lazily loaded
 * chunk would only resolve once the request has landed. Suspending on the
 * promise from inside the component is the same wait, on a path React recovers
 * from during hydration.
 *
 * The request itself never reaches GitHub: the server function is resolved at
 * prerender time and the browser reads the static cache it wrote.
 */
let githubStarsPromise: Promise<number | null> | null = null;

const getGithubStarsPromise = () => {
  githubStarsPromise ??= loadGithubStars().catch((error: unknown) => {
    // A star count is decoration; a rejected promise read through `use()` is not.
    // Swallowing here keeps a missing static cache or an unreachable GitHub from
    // taking the whole navbar — and with it the page — into an error boundary.
    console.error('Error loading GitHub stars:', error);
    return null;
  });
  return githubStarsPromise;
};

/**
 * Renders the Intlayer repository star count next to the navbar GitHub link.
 *
 * Suspends until the count is available, and renders nothing when GitHub could
 * not be reached, so the link keeps its icon-only layout.
 */
export const GithubStarCount: FC = () => {
  const stars = use(getGithubStarsPromise());
  const { locale } = useLocale();

  if (stars === null) {
    return null;
  }

  const formattedStars = new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(stars);

  return (
    <strong className="text-xs tabular-nums leading-none">
      {formattedStars}
    </strong>
  );
};
