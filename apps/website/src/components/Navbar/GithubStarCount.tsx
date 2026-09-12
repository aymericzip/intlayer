import { getRouteApi } from '@tanstack/react-router';
import { animate, useReducedMotion } from 'framer-motion';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useNumber } from 'react-intlayer/format';
import { useRevalidatedGithubStars } from './useRevalidatedGithubStars';

const rootRoute = getRouteApi('__root__');

/**
 * Renders the Intlayer repository star count next to the navbar GitHub link.
 *
 * The initial count comes from the root route loader, so it is already part of
 * the dehydrated router state by the time the navbar hydrates — reading the
 * static server function cache from here instead would open a request that only
 * starts once this chunk has been downloaded and run. Since that value is baked
 * into the prerendered HTML, `useRevalidatedGithubStars` asks the server for
 * the current count, which the server itself refreshes once a day.
 *
 * Renders nothing while GitHub could not be reached, so the link keeps its
 * icon-only layout.
 */
export const GithubStarCount: FC = () => {
  const { githubStars } = rootRoute.useLoaderData();

  const stars = useRevalidatedGithubStars(githubStars);

  const format = useNumber();
  const reducedMotion = useReducedMotion();
  // Keep the number hidden until the first animation frame after hydration.
  const [displayedStars, setDisplayedStars] = useState<number | null>(null);
  const currentStars = useRef(0);

  useEffect(() => {
    if (stars === null) return;

    if (reducedMotion) {
      currentStars.current = stars;
      setDisplayedStars(stars);
      return;
    }

    let animation: ReturnType<typeof animate> | undefined;
    // Hydration can block the main thread longer than the animation lasts.
    // Start its clock on a browser frame, after the effect work has finished.
    const frame = requestAnimationFrame(() => {
      animation = animate(currentStars.current, stars, {
        duration: 1,
        ease: 'easeOut',
        onUpdate: (value) => {
          currentStars.current = value;
          setDisplayedStars(Math.round(value));
        },
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      animation?.stop();
    };
  }, [stars, reducedMotion]);

  if (stars === null) {
    return <></>;
  }

  const formattedStars = format(stars, {
    notation: 'compact',
    maximumFractionDigits: 1,
  });

  return (
    <strong className="relative inline-grid text-right text-xs tabular-nums leading-none">
      {/* Reserve the final label's width; screen readers get only the final count. */}
      <span
        className="invisible col-start-1 row-start-1 motion-reduce:visible"
        aria-hidden="true"
      >
        {formattedStars}
      </span>
      {/* Intermediate values such as 999 can be wider than a compact target (1K). */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {format(stars, { useGrouping: false, maximumFractionDigits: 0 })}
      </span>
      <span className="sr-only">{formattedStars}</span>
      <span
        className="absolute inset-0 motion-reduce:hidden"
        aria-hidden="true"
      >
        {displayedStars !== null &&
          format(displayedStars, {
            notation: 'compact',
            maximumFractionDigits: 1,
          })}
      </span>
    </strong>
  );
};
