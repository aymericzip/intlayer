'use client';

import {
  Button,
  ButtonColor,
  ButtonVariant,
} from '@intlayer/design-system/button';
import { Container } from '@intlayer/design-system/container';
import { H2 } from '@intlayer/design-system/headers';
import { useGetTags } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { App_Dashboard_Tags } from '@intlayer/design-system/routes';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from '#/hooks/navigation';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { TagEditionForm } from './TagEditionForm';
import { TagsDictionariesList } from './TagsDictionariesList';

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
          onClick={() => router.push(App_Dashboard_Tags)}
          variant={ButtonVariant.HOVERABLE}
          className="z-10 mr-auto ml-5"
          color={ButtonColor.TEXT}
          Icon={ArrowLeft}
          label={returnToTagList.label.value}
        >
          {returnToTagList.text}
        </Button>
      </div>

      <TagDetailsContent tagKey={tagKey} />
    </div>
  );
};
