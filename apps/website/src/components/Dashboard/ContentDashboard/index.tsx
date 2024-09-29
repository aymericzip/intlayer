'use client';

import type { Dictionary as DictionaryAPI } from '@intlayer/backend';
import {
  Button,
  DictionariesSelector,
  Loader,
  Modal,
  useAuth,
  useEditionPanelStore,
} from '@intlayer/design-system';
import { useGetDictionaries } from '@intlayer/design-system/hooks';
import { ChevronRight, Plus } from 'lucide-react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { Suspense, useEffect, useState, type FC } from 'react';
import { DictionaryCreationForm } from './DictionaryCreationForm';

export const ContentDashboardContent: FC = () => {
  const { session } = useAuth();
  const project = session?.project;
  const { getDictionaries } = useGetDictionaries();
  const [dictionaries, setDictionaries] = useState<DictionaryAPI[]>([]);
  const { focusedContent, setFocusedContent } = useEditionPanelStore((s) => ({
    focusedContent: s.focusedContent,
    setFocusedContent: s.setFocusedContent,
  }));
  const { locale } = useLocale();
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const { noDictionaryView, createDictionaryButton } =
    useIntlayer('dictionary-form');

  useEffect(() => {
    getDictionaries({}).then((response) => {
      setDictionaries(response.data ?? []);
    });
  }, [getDictionaries]);

  if (!project) {
    return <>No project</>;
  }

  if (!focusedContent) {
    if (dictionaries.length === 0) {
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-10">
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
        </div>
      );
    }

    return (
      <>
        {dictionaries.map((dictionary: DictionaryAPI) => (
          <Button
            key={String(dictionary._id)}
            label="Select dictionary"
            IconRight={ChevronRight}
            variant="hoverable"
            color="text"
            onClick={() =>
              setFocusedContent({
                dictionaryId: dictionary.key,
                keyPath: [],
                dictionaryPath: undefined,
              })
            }
          >
            {dictionary.key}
          </Button>
        ))}
      </>
    );
  }

  return <DictionariesSelector locale={locale} />;
};

export const ContentDashboard: FC = () => (
  <Suspense fallback={<Loader />}>
    <ContentDashboardContent />
  </Suspense>
);
