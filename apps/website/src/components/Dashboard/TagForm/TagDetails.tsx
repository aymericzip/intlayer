'use client';

import { Button, Container, H2, Loader } from '@intlayer/design-system';
import { useGetTags } from '@intlayer/design-system/hooks';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { TagEditionForm } from './TagEditionForm';
import { TagsDictionariesList } from './TagsDictionariesList';
import { PagesRoutes } from '@/Routes';

type TagDetailsProps = {
  tagKey: string;
};

export const TagDetailsContent: FC<TagDetailsProps> = ({ tagKey }) => {
  const { detailsTitle, dictionariesListTitle } = useIntlayer('tag-details');
  const { data: tagResponse, isLoading } = useGetTags({
    args: tagKey,
  });
  const tag = tagResponse?.data?.[0];

  if (isLoading) return <Loader />;

  return (
    <>
      <Container
        className="m-auto flex size-full max-w-3xl justify-center gap-10 p-6"
        roundedSize="xl"
      >
        <H2>{detailsTitle}</H2>
        {tag && <TagEditionForm tag={tag} />}
      </Container>
      <Container
        className="m-auto flex size-full max-w-3xl justify-center gap-10 p-6"
        roundedSize="xl"
      >
        <H2>{dictionariesListTitle}</H2>
        {tag && <TagsDictionariesList tagKey={tag.key} />}
      </Container>
    </>
  );
};

export const TagDetails: FC<TagDetailsProps> = ({ tagKey }) => {
  const router = useRouter();
  const { returnToTagList } = useIntlayer('tag-details');

  return (
    <div className="flex size-full flex-1 flex-col gap-10">
      <div className="flex items-center gap-2">
        <Button
          onClick={() => router.push(PagesRoutes.Dashboard_Tags)}
          variant="hoverable"
          size="icon-md"
          color="text"
          id="return-to-tag-list"
          Icon={ArrowLeft}
          label={returnToTagList.label.value}
        />
        <label
          className="cursor-pointer text-xs hover:underline"
          htmlFor="return-to-tag-list"
        >
          {returnToTagList.text}
        </label>
      </div>

      <TagDetailsContent tagKey={tagKey} />
    </div>
  );
};
