'use client';

import { Modal } from '@intlayer/design-system/modal';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { SendInvitationForm } from './SendInvitationForm';

type SendInvitationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SendInvitationModal: FC<SendInvitationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const content = useIntlayer('send-invitation-modal');
  return (
    <Modal isOpen={isOpen} onClose={onClose} padding="md">
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-semibold text-xl">
            {content.sendAffiliateInvitation}
          </h2>
          <p className="text-neutral-600 text-sm dark:text-neutral-400">
            {content.inviteSomeoneToJoinThe}
          </p>
        </div>
        <SendInvitationForm onSuccess={onClose} />
      </div>
    </Modal>
  );
};
