import { cn } from '@intlayer/design-system/utils';
import { useRouterState } from '@tanstack/react-router';
import { type FC, useEffect, useState } from 'react';

/** Delay before the bar appears, so instant navigations never flash it. */
const SHOW_DELAY_MILLISECONDS = 120;
/** Time the bar stays at 100% before fading out. */
const COMPLETE_DURATION_MILLISECONDS = 300;

type ProgressPhase = 'idle' | 'loading' | 'completing';

/**
 * Thin indeterminate bar pinned to the top of the dashboard while a route
 * navigation is pending. The router keeps `status: 'pending'` until the next
 * route has rendered (loaders and the React transition included), so the old
 * page staying on screen is always paired with visible feedback.
 */
export const NavigationProgressBar: FC = () => {
  const isNavigationPending = useRouterState({
    select: (routerState) => routerState.status === 'pending',
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const visibilityTimeout = setTimeout(
      () => setIsVisible(isNavigationPending),
      isNavigationPending
        ? SHOW_DELAY_MILLISECONDS
        : COMPLETE_DURATION_MILLISECONDS
    );

    return () => clearTimeout(visibilityTimeout);
  }, [isNavigationPending]);

  const getPhase = (): ProgressPhase => {
    if (!isVisible) return 'idle';

    return isNavigationPending ? 'loading' : 'completing';
  };
  const phase = getPhase();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-100 h-0.5"
    >
      <div
        className={cn(
          'h-full bg-text ease-out',
          phase === 'idle' && 'w-0 opacity-0 transition-none',
          phase === 'loading' &&
            'w-4/5 opacity-100 transition-[width] duration-[8000ms]',
          phase === 'completing' &&
            'w-full opacity-0 transition-[width,opacity] duration-300'
        )}
      />
    </div>
  );
};
