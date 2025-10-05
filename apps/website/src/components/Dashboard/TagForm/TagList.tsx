'use client';

import { Button, Container, H2, Loader, Modal } from '@intlayer/design-system';
import { useGetTags } from '@intlayer/design-system/hooks';
import { ChevronRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, Suspense, useState } from 'react';
import { PagesRoutes } from '@/Routes';
import { TagCreationForm } from './TagCreationForm';

export const TagList: FC = () => {
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { noTagView, createTagButton, tagList } = useIntlayer('tag-list');
  const { data: tagResponse, isFetching } = useGetTags();
  const router = useRouter();

  const tags = tagResponse?.data ?? [];

  return (
    <Loader isLoading={!tagResponse && isFetching}>
      <Container
        roundedSize="xl"
        className="flex w-full max-w-[400px] flex-col justify-center gap-2 p-6"
      >
        <H2 className="mt-2 mb-6">{tagList.title}</H2>

        {tags.length === 0 && (
          <span className="m-auto text-neutral text-sm">{noTagView.title}</span>
        )}
        {tags.map((tag) => (
          <Button
            key={String(tag.key)}
            label="Select tag"
            IconRight={ChevronRight}
            variant="hoverable"
            color="text"
            onClick={() => {
              router.push(`${PagesRoutes.Dashboard_Tags}/${tag.key}`);
            }}
          >
            <div className="flex flex-col gap-2 p-2">
              {tag.name && (
                <strong className="text-wrap text-sm">{tag.name}</strong>
              )}
              {tag.key && <span>{tag.key}</span>}
              {tag.description && (
                <span className="line-clamp-2 text-wrap text-neutral">
                  {tag.description}
                </span>
              )}
            </div>
          </Button>
        ))}
        <Button
          label={createTagButton.ariaLabel.value}
          IconRight={Plus}
          variant="default"
          className="mt-12 ml-auto"
          color="text"
          onClick={() => setIsCreationModalOpen(true)}
        >
          {createTagButton.text}
        </Button>
        <Modal
          isOpen={isCreationModalOpen}
          onClose={() => setIsCreationModalOpen(false)}
        >
          <TagCreationForm onTagCreated={() => setIsCreationModalOpen(false)} />
        </Modal>
      </Container>
    </Loader>
  );
};

export const TagListDashboard: FC = () => (
  <Suspense fallback={<Loader />}>
    <TagList />
  </Suspense>
);
