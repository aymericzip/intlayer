'use client';

import {
  Button,
  KeyboardShortcut,
  Modal,
  PopoverStatic,
} from '@intlayer/design-system';
import { Search } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { SearchView } from './SearchView';

type SearchTriggerProps = {
  isMini?: boolean;
};

export const SearchTrigger: FC<SearchTriggerProps> = ({ isMini = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { searchButton } = useIntlayer('doc-search-trigger');

  return (
    <>
      {isMini ? (
        <PopoverStatic identifier="search-trigger">
          <Button
            label={searchButton.label.value}
            Icon={Search}
            variant="hoverable"
            size="icon-md"
            color="text"
            onClick={() => setIsModalOpen(true)}
          />
          <PopoverStatic.Detail identifier="search-trigger">
            <KeyboardShortcut
              shortcut="⌘ + F"
              onTriggered={() => setIsModalOpen(true)}
              size="sm"
            />
          </PopoverStatic.Detail>
        </PopoverStatic>
      ) : (
        <Button
          label={searchButton.label.value}
          Icon={Search}
          variant="input"
          color="custom"
          onClick={() => setIsModalOpen(true)}
          isFullWidth={false}
          className="mb-1 pr-1.5"
        >
          <span className="flex w-full items-center gap-2">
            {searchButton.text}
            <KeyboardShortcut
              shortcut="⌘ + F"
              onTriggered={() => setIsModalOpen(true)}
              size="sm"
              className="ml-auto"
            />
          </span>
        </Button>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={searchButton.text.value}
        size="lg"
      >
        <SearchView
          onClickLink={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
        />
      </Modal>
    </>
  );
};
