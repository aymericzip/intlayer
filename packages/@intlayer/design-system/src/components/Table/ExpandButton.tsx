import { Popover, PopoverXAlign } from '@components/Popover';
import { MoveDiagonal } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { Button } from '../Button';

type ExpandButtonProps = {
  setIsModalOpen: (isOpen: boolean) => void;
};

export const ExpandButton: FC<ExpandButtonProps> = ({ setIsModalOpen }) => {
  const { modal: modalContent } = useIntlayer('table');

  return (
    <div className="pointer-events-none absolute inset-y-0 right-4 z-10">
      <div className="pointer-events-auto sticky top-48 pt-4">
        <Popover identifier="expand">
          <Button
            variant="hoverable"
            size="icon-md"
            onClick={() => {
              setIsModalOpen(true);
            }}
            label={modalContent.title}
            Icon={MoveDiagonal}
          />

          <Popover.Detail
            identifier="expand"
            className="flex min-w-64 flex-col gap-3 p-3 text-sm"
            xAlign={PopoverXAlign.END}
          >
            <strong>{modalContent.title}</strong>
            <p className="text-neutral">{modalContent.description}</p>
          </Popover.Detail>
        </Popover>
      </div>
    </div>
  );
};
