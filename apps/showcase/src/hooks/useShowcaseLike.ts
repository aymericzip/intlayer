import {
  useSession,
  useToggleShowcaseLike,
} from '@intlayer/design-system/hooks';
import { useState } from 'react';
import { AppRoutes } from '#/Routes';
import type { Project } from '@/server/projectActions/types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? '';

export const useShowcaseLike = (project: Project) => {
  const { session } = useSession();
  const { mutateAsync: toggleLike, isPending } = useToggleShowcaseLike({
    intlayerConfiguration: { editor: { backendURL: BACKEND_URL } } as any,
  });

  const [upvotes, setUpvotes] = useState(project.upvotes);
  const [isLiked, setIsLiked] = useState(project.upvoters.length > 0);

  const handleVote = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // session === undefined → still loading, do nothing
    // session === null     → confirmed unauthenticated, redirect
    if (session === null) {
      const redirectUrl = encodeURIComponent(window.location.href);
      window.location.href = `${AppRoutes.Auth_SignIn}?redirect_url=${redirectUrl}`;
      return;
    }
    if (session === undefined || isPending) return;

    try {
      const result = await toggleLike(project._id);
      if (result?.data) {
        setUpvotes(result.data.upvotes);
        setIsLiked(result.data.isLiked);
      }
    } catch {
      // ignore
    }
  };

  // Buttons are disabled while loading the session or a request is in flight.
  // If auth is disabled, always allow interaction (no loading state to wait on).
  const isDisabled = isPending;

  return { upvotes, isLiked, isPending, isDisabled, handleVote };
};
