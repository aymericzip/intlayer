'use client';

import { TagAPI } from '@intlayer/backend';
import { Container, Loader } from '@intlayer/design-system';
import { useGetTags } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { type FC } from 'react';
import { TagEditionForm } from './TagEditionForm';

type TagFormContentProps = {
  tagKey: TagAPI['key'];
};

export const TagForm: FC<TagFormContentProps> = ({ tagKey }) => {
  const { noAdminMessage } = useIntlayer('tag-form');
  const { data: tagResponse, isLoading } = useGetTags({
    args: { key: tagKey },
  });

  const isTagAdmin = true;

  if (isLoading) return <Loader />;

  const tag = tagResponse?.data?.[0];

  return (
    <div className="flex size-full max-w-[500px] flex-col items-center justify-center gap-4">
      {!isTagAdmin && (
        <Container
          roundedSize="xl"
          className="flex size-full justify-center p-6"
        >
          <p className="text-neutral dark:text-neutral-dark text-sm">
            {noAdminMessage}
          </p>
        </Container>
      )}

      <Container roundedSize="xl" className="flex size-full justify-center p-6">
        {tag && <TagEditionForm tag={tag} />}
      </Container>
    </div>
  );
};
