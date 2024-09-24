'use client';

import type { Dictionary as DictionaryAPI } from '@intlayer/backend';
import type { KeyPath, Dictionary } from '@intlayer/core';
import {
  Button,
  DictionaryFieldEditor,
  type FileContent,
  Loader,
  Modal,
  useAuth,
  useEditedContentStore,
  useEditionPanelStore,
} from '@intlayer/design-system';
import {
  useGetDictionaries,
  useUpdateDictionary,
} from '@intlayer/design-system/hooks';
import { ChevronRight, Plus } from 'lucide-react';
import { useIntlayer, useLocale } from 'next-intlayer';
import { Suspense, useEffect, useState, type FC } from 'react';
import { DictionaryCreationForm } from './DictionaryCreationForm';

export const ContentDashboardContent: FC = () => {
  const { session } = useAuth();
  const project = session?.project;
  const { getDictionaries } = useGetDictionaries();
  const { updateDictionary } = useUpdateDictionary();
  const [dictionaries, setDictionaries] = useState<DictionaryAPI[]>([]);
  const { editedContent, addEditedContent, clearEditedDictionaryContent } =
    useEditedContentStore((s) => ({
      editedContent: s.editedContent,
      addEditedContent: s.addEditedContent,
      getEditedContentValue: s.getEditedContentValue,
      clearEditedDictionaryContent: s.clearEditedDictionaryContent,
    }));
  const { focusedContent, setFocusedContent } = useEditionPanelStore((s) => ({
    focusedContent: s.focusedContent,
    setFocusedContent: s.setFocusedContent,
  }));
  const [keyPathEditionModal, setKeyPathEditionModal] = useState<
    KeyPath[] | null
  >(null);
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
                dictionaryId: String(dictionary._id),
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

  const dictionaryId: string = focusedContent.dictionaryId;
  const dictionary: Dictionary = dictionaries[
    dictionaryId as keyof typeof dictionaries
  ] as unknown as Dictionary;
  const dictionaryPath: string | undefined = dictionary.filePath;
  const editedDictionaryContent: FileContent[] | undefined = dictionaryId
    ? editedContent[dictionaryId]
    : undefined;

  const handleUpdateDictionary = () => {
    // updateDictionary();
  };

  return (
    <DictionaryFieldEditor
      dictionary={dictionary}
      keyPath={keyPathEditionModal ?? []}
      locale={locale}
      editedContent={editedDictionaryContent}
      onFocusKeyPath={(keyPath) => {
        setFocusedContent({ ...focusedContent, keyPath });
        setKeyPathEditionModal(keyPath);
      }}
      onContentChange={(keyPath, newValue) =>
        addEditedContent(dictionaryId, dictionaryPath, keyPath, newValue)
      }
      onValidEdition={handleUpdateDictionary}
      onCancelEdition={() => clearEditedDictionaryContent(dictionary?.id)}
    />
  );
};

export const ContentDashboard: FC = () => (
  <Suspense fallback={<Loader />}>
    <ContentDashboardContent />
  </Suspense>
);
