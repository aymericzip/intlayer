'use client';

import { MoveDiagonal } from 'lucide-react';
import { HTMLAttributes, useState, type FC } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { ExpandCollapse } from '../ExpandCollapse';
import { Modal, ModalSize } from '../Modal';

type TableProps = HTMLAttributes<HTMLTableElement> & {
  isRollable?: boolean;
};

export const Table: FC<TableProps> = ({ className, isRollable, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative">
      <div className="sticky top-48 z-10">
        <div className="absolute top-4 right-2">
          <Button
            variant="hoverable"
            size="icon-md"
            onClick={() => {
              setIsModalOpen(true);
            }}
            label="Move"
            Icon={MoveDiagonal}
          />
        </div>
      </div>
      <ExpandCollapse isRollable={isRollable}>
        <table
          className={cn(
            'max-w-full table-auto text-left min-w-full',
            className
          )}
          {...props}
        />
      </ExpandCollapse>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={ModalSize.XL}
        hasCloseButton
      >
        {isModalOpen ? (
          <div className="grid">
            <table
              className={cn(
                'max-w-full table-auto text-left min-w-full',
                className
              )}
              {...props}
            />
          </div>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};
