'use client';

import {
  Button,
  Loader,
  Modal,
  useEditionPanelStore,
  Container,
  H2,
  DictionaryCreationForm,
} from '@intlayer/design-system';
import { useGetAllDictionaries } from '@intlayer/design-system/hooks';
import { ChevronRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { Suspense, useState, type FC } from 'react';
import { PagesRoutes } from '@/Routes';

export const DictionaryListDashboardContent: FC = () => {
  const { setFocusedContent } = useEditionPanelStore((s) => ({
    setFocusedContent: s.setFocusedContent,
  }));
  const { selectDictionaryButton } = useIntlayer('dictionary-form');
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { noDictionaryView, createDictionaryButton, dictionaryList } =
    useIntlayer('dictionary-form');
  const { online, isLoading } = useGetAllDictionaries();
  const dictionaries = Object.values(online ?? {}) ?? [];
  const router = useRouter();

  if (isLoading) return <Loader />;

  return (
    <Container
      roundedSize="xl"
      className="flex w-full max-w-[400px] flex-col justify-center gap-2 p-6"
    >
      <H2 className="mb-6">{dictionaryList.title}</H2>

      {dictionaries.length === 0 && (
        <span className="text-neutral-dark dark:text-neutral-dark text-sm">
          {noDictionaryView.title}
        </span>
      )}
      {dictionaries.map((dictionary) => (
        <Button
          key={String(dictionary.key)}
          label={selectDictionaryButton.label.value}
          variant="hoverable"
          color="text"
          IconRight={ChevronRight}
          onClick={() => {
            setFocusedContent({
              dictionaryKey: dictionary.key,
              keyPath: [],
              dictionaryPath: dictionary.filePath,
            });
            router.push(`${PagesRoutes.Dashboard_Content}/${dictionary.key}`);
          }}
        >
          <div className="flex flex-col gap-2 p-2">
            {dictionary.title && (
              <strong className="text-wrap text-sm">{dictionary.title}</strong>
            )}
            {dictionary.key && <span>{dictionary.key}</span>}
            {dictionary.description && (
              <span className="text-neutral dark:text-neutral-dark line-clamp-2 text-wrap">
                {dictionary.description}
              </span>
            )}
          </div>
        </Button>
      ))}
      <Button
        label={createDictionaryButton.ariaLabel.value}
        IconRight={Plus}
        variant="default"
        className="ml-auto mt-12"
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
  );
};

export const DictionaryListDashboard: FC = () => (
  <Suspense fallback={<Loader />}>
    <DictionaryListDashboardContent />
  </Suspense>
);
