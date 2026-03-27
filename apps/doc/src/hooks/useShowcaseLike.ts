import {
  useSession,
  useToggleShowcaseDownvote,
  useToggleShowcaseUpvote,
} from '@intlayer/design-system/hooks';
import { App_Auth_SignIn } from '@intlayer/design-system/routes';
import { useState } from 'react';
import type { ShowcaseProject } from '#/utils/projectActions/types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? '';

type VoteState = {
  upvotes: number;
  isUpVoted: boolean;
  downvotes: number;
  isDownVoted: boolean;
};

export const useShowcaseLike = (project: ShowcaseProject) => {
  const { session } = useSession();
  const { mutateAsync: toggleUpvote, isPending: isUpvotePending } =
    useToggleShowcaseUpvote({
      intlayerConfiguration: { editor: { backendURL: BACKEND_URL } } as any,
    });
  const { mutateAsync: toggleDownvote, isPending: isDownvotePending } =
    useToggleShowcaseDownvote({
      intlayerConfiguration: { editor: { backendURL: BACKEND_URL } } as any,
    });

  const [votes, setVotes] = useState<VoteState>({
    upvotes: project.upvotes,
    isUpVoted: project.isUpVoted,
    downvotes: project.downvotes,
    isDownVoted: project.isDownVoted,
  });

  const isPending = isUpvotePending || isDownvotePending;

  const createHandler =
    (toggle: (id: string) => Promise<{ data?: VoteState } | undefined>) =>
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (session === null) {
        const redirectUrl = encodeURIComponent(window.location.href);
        window.location.href = `${App_Auth_SignIn}?redirect_url=${redirectUrl}`;
        return;
      }
      if (session === undefined || isPending) return;

      try {
        const result = await toggle(project.id);
        if (result?.data) setVotes(result.data);
      } catch {
        // ignore
      }
    };

  const handleUpvote = createHandler(toggleUpvote as any);
  const handleDownvote = createHandler(toggleDownvote as any);

  const score = votes.upvotes - votes.downvotes;

  return {
    score,
    isUpvoted: votes.isUpVoted,
    isDownVoted: votes.isDownVoted,
    isPending,
    handleUpvote,
    handleDownvote,
  };
};
