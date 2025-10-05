'use client';

import {
  Button,
  Container,
  DictionaryCreationForm,
  H2,
  Loader,
  Modal,
} from '@intlayer/design-system';
import { useGetDictionaries } from '@intlayer/design-system/hooks';
import { useFocusDictionaryActions } from '@intlayer/editor-react';
import { ChevronRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { type FC, Suspense, useState } from 'react';
import { PagesRoutes } from '@/Routes';

export const DictionaryListDashboardContent: FC = () => {
  const { setFocusedContent } = useFocusDictionaryActions();
  const { selectDictionaryButton } = useIntlayer('dictionary-form');
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { noDictionaryView, createDictionaryButton, dictionaryList } =
    useIntlayer('dictionary-form');
  const { data, isPending } = useGetDictionaries();
  const router = useRouter();

  if (isPending) return <Loader />;

  return (
    <Container
      roundedSize="xl"
      className="flex w-full max-w-[400px] flex-col justify-center gap-2 p-6"
    >
      <H2 className="mt-2 mb-6">{dictionaryList.title}</H2>

      {data?.data?.length === 0 && (
        <span className="m-auto text-neutral text-sm">
          {noDictionaryView.title}
        </span>
      )}
      {data?.data?.map((dictionary) => (
        <Button
          key={String(dictionary.localId)}
          label={selectDictionaryButton.label.value}
          variant="hoverable"
          color="text"
          IconRight={ChevronRight}
          onClick={() => {
            setFocusedContent({
              dictionaryKey: dictionary.key,
              dictionaryLocalId: dictionary.localId,
              keyPath: [],
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
              <span className="line-clamp-2 text-wrap text-neutral">
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
        className="mt-12 ml-auto"
        color="text"
        onClick={() => setIsCreationModalOpen(true)}
      >
        {createDictionaryButton.text}
      </Button>
      <Modal
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
      >
        <div className="w-full py-3">
          <DictionaryCreationForm
            onDictionaryCreated={() => setIsCreationModalOpen(false)}
          />
        </div>
      </Modal>
    </Container>
  );
};

export const DictionaryListDashboard: FC = () => (
  <Suspense fallback={<Loader />}>
    <DictionaryListDashboardContent />
  </Suspense>
);
