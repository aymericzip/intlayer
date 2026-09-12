import { getRouteApi } from '@tanstack/react-router';
import { animate, useReducedMotion } from 'framer-motion';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { useNumber } from 'react-intlayer/format';
import { useRevalidatedGithubStars } from './useRevalidatedGithubStars';

const rootRoute = getRouteApi('__root__');

const compactFormat: Intl.NumberFormatOptions = {
  notation: 'compact',
  maximumFractionDigits: 1,
};

/** Count the first page load counts up from. */
const COUNT_UP_START = 99;

/** Seconds the count-up lasts on the first page load. */
const COUNT_UP_DURATION = 2;

/** Expo ease-out: fast start, long settle on the final count. */
const COUNT_UP_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Count last shown on screen. Kept outside React so the navbar remounted by a
 * client-side navigation resumes from it instead of counting up again — only
 * the first page load, and a later revalidation, animate.
 */
let lastDisplayedStars = COUNT_UP_START;

/**
 * Renders the Intlayer repository star count next to the navbar GitHub link,
 * counting up on the first page load.
 *
 * The initial count comes from the root route loader, so it is part of the
 * dehydrated router state by the time the navbar hydrates. Since that value is
 * baked into the prerendered HTML, `useRevalidatedGithubStars` asks the server
 * for the current count, which the server itself refreshes once a day.
 *
 * Renders nothing while GitHub could not be reached, so the link keeps its
 * icon-only layout.
 */
export const GithubStarCount: FC = () => {
  const { githubStars } = rootRoute.useLoaderData();
  const stars = useRevalidatedGithubStars(githubStars);
  const format = useNumber();
  const reducedMotion = useReducedMotion();
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const counter = counterRef.current;
    if (stars === null || !counter) return;

    const showStars = (value: number): void => {
      lastDisplayedStars = value;
      counter.textContent = format(value, compactFormat);
    };

    if (reducedMotion || lastDisplayedStars === stars) {
      showStars(stars);
      return;
    }

    let animation: ReturnType<typeof animate> | undefined;
    // Hydration can block the main thread longer than the animation lasts, so
    // its clock only starts on a browser frame, once the effect work is done.
    const frame = requestAnimationFrame(() => {
      animation = animate(lastDisplayedStars, stars, {
        duration: COUNT_UP_DURATION,
        ease: COUNT_UP_EASE,
        onUpdate: (value) => showStars(Math.round(value)),
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      animation?.stop();
    };
  }, [stars, reducedMotion, format]);

  if (stars === null) {
    return <></>;
  }

  const formattedStars = format(stars, compactFormat);

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
        ref={counterRef}
        className="absolute inset-0 motion-reduce:hidden"
        aria-hidden="true"
      >
        {format(lastDisplayedStars, compactFormat)}
      </span>
    </strong>
  );
};
