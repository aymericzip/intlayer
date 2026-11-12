import { useGetTags } from '@intlayer/design-system/api';
import { Button } from '@intlayer/design-system/button';
import { H2 } from '@intlayer/design-system/headers';
import { App_Dashboard_Tags_Path } from '@intlayer/design-system/routes';
import { ArrowLeft } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';
import { TagDetailsSkeleton } from './TagDetailsSkeleton';
import { TagEditionForm } from './TagEditionForm';
import { TagsDictionariesList } from './TagsDictionariesList';

type TagDetailsProps = {
  tagKey: string;
};

export const TagDetailsContent: FC<TagDetailsProps> = ({ tagKey }) => {
  const navigate = useLocalizedNavigate();
  const { dictionariesListTitle, returnToTagList } = useIntlayer('tag-details');
  const { data: tagResponse, isLoading } = useGetTags({
    search: tagKey,
  });
  const tag = tagResponse?.data?.[0];

  if (isLoading) return <TagDetailsSkeleton />;

  if (!tag) {
    return (
      <div className="flex size-full flex-1 flex-col gap-10">
        <div className="flex items-center gap-2 px-10">
          <Button
            type="button"
            onClick={() => navigate({ to: App_Dashboard_Tags_Path })}
            variant="hoverable"
            className="z-10 me-auto"
            color="text"
            Icon={ArrowLeft}
            label={returnToTagList.label.value}
          >
            {returnToTagList.text}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 flex-col gap-4">
      <TagEditionForm tag={tag} />

      <H2 className="px-10">{dictionariesListTitle}</H2>
      <TagsDictionariesList tagKey={tag.key} />
    </div>
  );
};

export const TagDetails: FC<TagDetailsProps> = ({ tagKey }) => (
  <div className="flex size-full flex-1 flex-col gap-10">
    <TagDetailsContent tagKey={tagKey} />
  </div>
);
