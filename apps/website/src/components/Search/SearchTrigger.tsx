'use client';

import { Button, Modal } from '@intlayer/design-system';
import { Search } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { FC, useState } from 'react';
import { SearchView } from './SearchView';

type SearchTriggerProps = {
  isMini?: boolean;
};

export const SearchTrigger: FC<SearchTriggerProps> = ({ isMini = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { searchButton } = useIntlayer('search-trigger');

  return (
    <>
      {isMini ? (
        <Button
          label={searchButton.label.value}
          Icon={Search}
          variant="hoverable"
          size="icon-md"
          color="text"
          onClick={() => setIsModalOpen(true)}
        />
      ) : (
        <Button
          label={searchButton.label.value}
          Icon={Search}
          variant="input"
          color="custom"
          onClick={() => setIsModalOpen(true)}
          isFullWidth={false}
        >
          {searchButton.text}
        </Button>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={searchButton.text.value}
        size="lg"
      >
        <SearchView onClickLink={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};
