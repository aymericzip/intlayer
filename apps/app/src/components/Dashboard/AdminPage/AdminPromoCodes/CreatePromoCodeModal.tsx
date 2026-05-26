import { Modal } from '@intlayer/design-system/modal';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { CreatePromoCodeForm } from './CreatePromoCodeForm';

type CreatePromoCodeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  affiliateId?: string;
};

export const CreatePromoCodeModal: FC<CreatePromoCodeModalProps> = ({
  isOpen,
  onClose,
  affiliateId,
}) => {
  const content = useIntlayer('admin-promo-codes');
  return (
    <Modal isOpen={isOpen} onClose={onClose} padding="md" isScrollable>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-semibold text-xl">{content.modalTitle.value}</h2>
          <p className="text-neutral-600 text-sm dark:text-neutral-400">
            {content.modalDesc.value}
          </p>
        </div>
        <CreatePromoCodeForm onSuccess={onClose} affiliateId={affiliateId} />
      </div>
    </Modal>
  );
};
export default CreatePromoCodeModal;
