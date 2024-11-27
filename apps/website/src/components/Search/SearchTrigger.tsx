'use client';

import { Button, Modal } from '@intlayer/design-system';
import { Search } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { FC, useState } from 'react';
import { SearchView } from './SearchView';

type SearchTriggerProps = {};

export const SearchTrigger: FC<SearchTriggerProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { searchButton } = useIntlayer('search-trigger');

  return (
    <div className="m-auto px-5 py-2">
      <Button
        label={searchButton.label.value}
        Icon={Search}
        variant="input"
        color="custom"
        onClick={() => setIsModalOpen(true)}
      >
        {searchButton.text}
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Search Documentation"
        size="lg"
      >
        <SearchView onClickLink={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};
