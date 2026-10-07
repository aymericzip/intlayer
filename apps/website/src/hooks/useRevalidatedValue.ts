import { useEffect, useState } from 'react';

/**
 * In-flight revalidations, keyed by fetcher. A value rendered several times on
 * the same page (e.g. desktop navbar + mobile menu) mounts every consumer in
 * the same frame, so they share one request per page load. A rejected call
 * resolves to `null`, which leaves the base value on screen.
 */
const pendingRevalidations = new WeakMap<
  () => Promise<unknown>,
  Promise<unknown>
>();

const revalidateOnce = <Value>(
  revalidate: () => Promise<Value | null>
): Promise<Value | null> => {
  let pending = pendingRevalidations.get(revalidate) as
    | Promise<Value | null>
    | undefined;

  if (!pending) {
    pending = revalidate().catch(() => null);
    pendingRevalidations.set(revalidate, pending);
  }

  return pending;
};

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
 * Keeps a value baked into the prerendered HTML current between deployments.
 *
 * Renders `baseValue` on the server and on the first client render, so
 * hydration matches and first paint never waits on the network. Once the page
 * is idle, `revalidate` (a runtime server function backed by a server-side
 * memo) is called once per page load and its answer replaces the base value.
 *
 * @param baseValue - Value known at build time.
 * @param revalidate - Stable (module-level) fetcher resolving to the fresh
 * value, or `null` to keep the base one.
 * @returns The value to render.
 */
export const useRevalidatedValue = <Value>(
  baseValue: Value,
  revalidate: () => Promise<Value | null>
): Value => {
  const [value, setValue] = useState(baseValue);

  useEffect(() => {
    let isMounted = true;

    const cancelIdleTask = runWhenIdle(() => {
      revalidateOnce(revalidate).then((freshValue) => {
        if (isMounted && freshValue !== null) setValue(freshValue);
      });
    });

    return () => {
      isMounted = false;
      cancelIdleTask();
    };
  }, [revalidate]);

  return value;
};
