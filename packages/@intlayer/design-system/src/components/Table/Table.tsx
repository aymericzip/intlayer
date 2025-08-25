'use client';

import { MoveDiagonal } from 'lucide-react';
import { HTMLAttributes, useEffect, useRef, useState, type FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { cn } from '../../utils/cn';
import { Button } from '../Button';
import { MaxHeightSmoother } from '../MaxHeightSmoother';
import { Modal, ModalSize } from '../Modal';

type TableProps = HTMLAttributes<HTMLTableElement>;

const MIN_HEIGHT = 700;

export const Table: FC<TableProps> = ({ className, ...props }) => {
  const [isDeployed, setIsDeployed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { show, hide } = useIntlayer('table');
  const [tableHeight, setTableHeight] = useState(0);
  const tableRef = useRef<HTMLTableElement>(null);
  const isTooBig = (tableHeight ?? 0) > MIN_HEIGHT;

  useEffect(() => {
    if (tableRef.current) {
      setTableHeight(tableRef.current.clientHeight);
    }
  }, []);

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
      {isTooBig ? (
        <MaxHeightSmoother
          isHidden={!isDeployed}
          minHeight={MIN_HEIGHT}
          className="w-full overflow-x-scroll overflow-y-hidden"
        >
          <table
            className={cn(
              'max-w-full table-auto text-left min-w-full',
              className
            )}
            ref={tableRef}
            {...props}
          />
          <button
            className={cn(
              'absolute bottom-0 right-0 flex justify-center cursor-pointer w-full px-2 py-0.5 hover:py-1 transition-all duration-300 text-md text-neutral-700 dark:text-neutral-400 items-center shadow-[0_0_10px_-15px_rgba(0,0,0,0.3)] backdrop-blur rounded-t-2xl bg-gradient-to-t from-card/80 to-transparent',
              isDeployed && 'w-auto'
            )}
            onClick={() => setIsDeployed((prev) => !prev)}
          >
            {isDeployed ? hide : show}
          </button>
        </MaxHeightSmoother>
      ) : (
        <table
          className={cn(
            'max-w-full table-auto text-left min-w-full',
            className
          )}
          ref={tableRef}
          {...props}
        />
      )}
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
              ref={tableRef}
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
