'use client';

import { Loader } from '@intlayer/design-system';
import { useGetDiscussions } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { MessagesList } from '@/components/ChatBot/MessagesList';

type DiscussionAdminDetailProps = {
  discussionId?: string;
};

export const DiscussionAdminDetail: FC<DiscussionAdminDetailProps> = ({
  discussionId,
}) => {
  const { noDiscussionFound } = useIntlayer('discussion-admin-detail');

  const { data, isPending } = useGetDiscussions(
    { id: discussionId, fetchAll: 'true', pageSize: '1' },
    {
      enabled: !!discussionId,
    }
  );

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

  if (isPending) return <Loader />;

  if (!discussionId) {
    return (
      <div className="p-6 text-neutral-500 dark:text-neutral-400">
        {noDiscussionFound}
      </div>
    );
  }

  return (
    <div className="flex size-full min-h-[700px] flex-col">
      {messages.length === 0 && !isPending ? (
        <div className="p-6 text-neutral-500 dark:text-neutral-400">
          {noDiscussionFound}
        </div>
      ) : (
        <MessagesList storedPrompt={messages} isLoading={isPending} />
      )}
    </div>
  );
};
