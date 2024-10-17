'use client';

import {
  Button,
  Loader,
  Modal,
  useEditionPanelStore,
  Container,
  H2,
} from '@intlayer/design-system';
import { useGetAllDictionaries } from '@intlayer/design-system/hooks';
import { ChevronRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { Suspense, useState, type FC } from 'react';
import { DictionaryCreationForm } from './DictionaryCreationForm';
import { PagesRoutes } from '@/Routes';

export const DictionaryListDashboardContent: FC = () => {
  const { setFocusedContent } = useEditionPanelStore((s) => ({
    setFocusedContent: s.setFocusedContent,
  }));
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { noDictionaryView, createDictionaryButton, dictionaryList } =
    useIntlayer('dictionary-form');
  const { online, isLoading } = useGetAllDictionaries();
  const dictionaries = Object.values(online) ?? [];
  const router = useRouter();

  if (isLoading) return <Loader />;

  if (dictionaries.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Container
          roundedSize="xl"
          className="flex size-full max-w-[400px] flex-col justify-center gap-10 p-6"
        >
          <span className="text-neutral-dark dark:text-neutral-dark text-sm">
            {noDictionaryView.title}
          </span>
          <Button
            label={createDictionaryButton.ariaLabel.value}
            IconRight={Plus}
            variant="default"
            color="text"
            onClick={() => setIsCreationModalOpen(true)}
          >
            {createDictionaryButton.text}
          </Button>
          <Modal
            isOpen={isCreationModalOpen}
            onClose={() => setIsCreationModalOpen(false)}
          >
            <DictionaryCreationForm />
          </Modal>
        </Container>
      </div>
    );
  }

  return (
    <Container
      roundedSize="xl"
      className="flex size-full max-w-[400px] flex-1 flex-col justify-center gap-2 p-6"
    >
      <H2 className="mb-6">{dictionaryList.title}</H2>
      {dictionaries.map((dictionary) => (
        <Button
          key={String(dictionary._id)}
          label="Select dictionary"
          IconRight={ChevronRight}
          variant="hoverable"
          color="text"
          onClick={() => {
            setFocusedContent({
              dictionaryId: dictionary.id,
              keyPath: [],
              dictionaryPath: undefined,
            });
            router.push(`${PagesRoutes.Dashboard_Content}/${dictionary.id}`);
          }}
        >
          {dictionary.id}
        </Button>
      ))}
    </Container>
  );
};

export const DictionaryListDashboard: FC = () => (
  <Suspense fallback={<Loader />}>
    <DictionaryListDashboardContent />
  </Suspense>
);
