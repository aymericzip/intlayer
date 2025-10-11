'use client';

import { useGetDiscussions } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { useEffect } from 'react';
import { MessagesList } from '@/components/ChatBot/MessagesList';

type DiscussionAdminDetailProps = {
  discussionId?: string;
};

export const DiscussionAdminDetail: FC<DiscussionAdminDetailProps> = ({
  discussionId,
}) => {
  const { noDiscussionFound } = useIntlayer('discussion-admin-detail');

  const { data, isPending, refetch } = useGetDiscussions(
    {
      ids: discussionId ? [discussionId] : undefined,
      fetchAll: 'true',
      pageSize: '1',
      includeMessages: 'true',
    },
    {
      enabled: !!discussionId,
    }
  );

  useEffect(() => {
    if (discussionId) {
      void refetch();
    }
  }, [discussionId, refetch]);

  const discussion = (data as any)?.data?.[0];
  const msgs = (discussion?.messages ?? []) as Array<{
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp?: string | Date;
  }>;
  const messages = msgs.map((m) => ({
    role: m.role,
    content: m.content,
    timestamp: m.timestamp ? new Date(m.timestamp as any) : undefined,
  }));

  return (
    <div className="flex size-full min-h-[700px] flex-col px-10">
      {messages.length === 0 && !isPending ? (
        <div className="p-6 text-neutral-500 dark:text-neutral-400">
          {noDiscussionFound}
        </div>
      ) : (
        <MessagesList
          storedPrompt={messages}
          isLoading={isPending || discussion.id !== discussionId}
        />
      )}
    </div>
  );
};
