'use client';

import { Button, Loader, Modal, Container, H2 } from '@intlayer/design-system';
import { useGetTags } from '@intlayer/design-system/hooks';
import { ChevronRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { Suspense, useState, type FC } from 'react';
import { TagCreationForm } from './TagCreationForm';
import { PagesRoutes } from '@/Routes';

export const TagList: FC = () => {
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { noTagView, createTagButton, tagList } = useIntlayer('tag-list');
  const { data: tagResponse, isLoading } = useGetTags();
  const router = useRouter();

  if (isLoading) return <Loader />;

  const tags = tagResponse?.data ?? [];

  return (
    <Container
      roundedSize="xl"
      className="flex w-full max-w-[400px] flex-col justify-center gap-2 p-6"
    >
      <H2 className="mb-6">{tagList.title}</H2>

      {tags.length === 0 && (
        <span className="text-neutral-dark dark:text-neutral-dark text-sm">
          {noTagView.title}
        </span>
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
              <span className="text-neutral dark:text-neutral-dark text-wrap">
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
        className="ml-auto mt-12"
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
  );
};

export const TagListDashboard: FC = () => (
  <Suspense fallback={<Loader />}>
    <TagList />
  </Suspense>
);
