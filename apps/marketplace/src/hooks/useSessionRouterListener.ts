import { useQuery } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { sessionQueryOptions } from '#utils/auth.tsx';

/**
 * Hook to invalidate router when session changes
 */
export const useSessionRouterListener = () => {
  const router = useRouter();

  // Subscribe to the session query
  const { data: session } = useQuery(sessionQueryOptions);

  // Keep track of the previous state to compare against
  const prevSession = useRef(session);

  useEffect(() => {
    const prev = prevSession.current;
    const curr = session;

    // Define what constitutes a routing-relevant change
    const isUserChanged = prev?.user?.id !== curr?.user?.id;
    const isOrgChanged = prev?.organization?.id !== curr?.organization?.id;
    const isProjectChanged = prev?.project?.id !== curr?.project?.id;

    // Skip invalidation when the user just signed IN (prev had no user, curr has one).
    // The SignIn component already calls router.invalidate() + navigate() itself;
    // firing a second invalidation here races with that navigation and causes the
    // not-authenticated AuthenticationBarrier to redirect back to "/" while the
    // explicit navigate() is trying to land on the target — producing an infinite
    // /login → / → /organization → /login loop.
    const isSignIn = !prev?.user && !!curr?.user;

    // Skip invalidation when the user just signed OUT (prev had a user, curr has none).
    // AuthenticationBarrierClient already calls navigate({ replace: true }) to /login
    // when it sees sessionClient === null. Firing router.invalidate() concurrently
    // races with that navigate() call: the invalidation re-runs all loaders for the
    // current dashboard URL, potentially resurrecting a stale session via
    // refetchFreshSession (better-auth cookie cache), and then the dashboard
    // re-renders while the navigate() is in-flight — producing an infinite
    // /dashboard → /login → /dashboard redirect loop that freezes the page.
    const isSignOut = !!prev?.user && !curr?.user;

    if (
      !isSignIn &&
      !isSignOut &&
      (isUserChanged || isOrgChanged || isProjectChanged)
    ) {
      router.invalidate();
    }

    // Update the ref for the next render cycle
    prevSession.current = curr;
  }, [session, router]);
};
