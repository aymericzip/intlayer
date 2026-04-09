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

    // 1. Define what constitutes a routing-relevant change
    const isUserChanged = prev?.user?.id !== curr?.user?.id;
    const isOrgChanged = prev?.organization?.id !== curr?.organization?.id;
    const isProjectChanged = prev?.project?.id !== curr?.project?.id;

    // 2. Invalidate router only if a critical entity changed
    if (isUserChanged || isOrgChanged || isProjectChanged) {
      router.invalidate();
    }

    // 3. Update the ref for the next render cycle
    prevSession.current = curr;
  }, [session, router]);
};
