import { useEffect, useState } from 'react';
import { revalidateGithubStars } from '~/serverFunctions/githubStars';

/**
 * The navbar mounts the count twice — once for the desktop bar, once for the
 * mobile menu — and both mount within the same frame, so the request is shared
 * through a module-level promise instead of being issued twice per page load.
 * A rejected call resolves to `null`, which leaves the build-time count on
 * screen.
 */
let pendingGithubStars: Promise<number | null> | null = null;

const revalidateGithubStarsOnce = (): Promise<number | null> =>
  (pendingGithubStars ??= revalidateGithubStars().catch(() => null));

/**
 * Runs `task` on the first idle period after the `load` event, so a decorative
 * request never competes with hydration.
 *
 * @param task - Callback to run once the page is idle.
 * @returns A cleanup function cancelling whatever is still pending.
 */
const runWhenIdle = (task: () => void): (() => void) => {
  let idleHandle: number | undefined;
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined;

  const schedule = (): void => {
    const requestIdle = window.requestIdleCallback;

    if (typeof requestIdle === 'function') {
      idleHandle = requestIdle(task, { timeout: 3000 });
      return;
    }

    timeoutHandle = setTimeout(task, 0);
  };

  // `readyState === 'complete'` means `load` already fired — the common case
  // here, since hydration can finish after it on a slow device.
  if (document.readyState === 'complete') {
    schedule();
  } else {
    window.addEventListener('load', schedule, { once: true });
  }

  return () => {
    window.removeEventListener('load', schedule);
    if (idleHandle !== undefined) window.cancelIdleCallback?.(idleHandle);
    if (timeoutHandle !== undefined) clearTimeout(timeoutHandle);
  };
};

/**
 * Keeps the GitHub star count current between two deployments.
 *
 * The count travels with the prerendered HTML, which freezes it at build time.
 * This hook asks the server for the current one once the page is idle; the
 * server holds a single count shared by every visitor and refreshes it from
 * GitHub at most once a day, so the value is revalidated globally rather than
 * per browser.
 *
 * @param buildTimeStars - Count resolved by the root route loader, rendered as
 * is on the server and on the first client render so hydration matches.
 * @returns The count to render, `null` while GitHub cannot be reached at all.
 */
export const useRevalidatedGithubStars = (
  buildTimeStars: number | null
): number | null => {
  const [stars, setStars] = useState(buildTimeStars);

  useEffect(() => {
    let isMounted = true;

    const cancelIdleTask = runWhenIdle(() => {
      revalidateGithubStarsOnce().then((freshStars) => {
        if (isMounted && freshStars !== null) setStars(freshStars);
      });
    });

    return () => {
      isMounted = false;
      cancelIdleTask();
    };
  }, []);

  return stars;
};
