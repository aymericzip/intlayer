'use client';

import { Button, Container } from '@intlayer/design-system';
import { useAddPasskey, useDeletePasskey } from '@intlayer/design-system/hooks';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import { AddPasskeyModal } from './AddPasskeyModal';
import { PasskeyItem } from './PasskeyItem';
import type { Passkey } from './types';

type PasskeyManagementProps = {
  passkeys: Passkey[];
  onPasskeyAdded?: () => void;
  onPasskeyDeleted?: () => void;
};

export const PasskeyManagement: FC<PasskeyManagementProps> = ({
  passkeys,
  onPasskeyAdded,
  onPasskeyDeleted,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: addPasskey, isPending: isAddingPasskey } = useAddPasskey();
  const { mutate: deletePasskey } = useDeletePasskey();

  const {
    title,
    description,
    noPasskeysTitle,
    noPasskeysDescription,
    addPasskeyButton,
  } = useIntlayer('passkey-management');

  const handleAddPasskey = (data: { name: string }) => {
    addPasskey(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        onPasskeyAdded?.();
      },
    });
  };

  const handleDeletePasskey = (passkeyId: string) => {
    deletePasskey(
      { id: passkeyId },
      {
        onSuccess: () => {
          onPasskeyDeleted?.();
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-semibold text-2xl">{title}</h2>
        <p className="text-neutral-600 dark:text-neutral-400">{description}</p>
      </div>

      {passkeys.length === 0 ? (
        <Container className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{noPasskeysTitle}</h3>
            <p className="text-neutral-600 text-sm dark:text-neutral-400">
              {noPasskeysDescription}
            </p>
          </div>
        </Container>
      ) : (
        <div className="space-y-4">
          {passkeys.map((passkey) => (
            <PasskeyItem
              key={passkey.id}
              passkey={passkey}
              onDelete={handleDeletePasskey}
            />
          ))}
        </div>
      )}

      <Button onClick={() => setIsModalOpen(true)}>{addPasskeyButton}</Button>

      <AddPasskeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPasskey}
        isSubmitting={isAddingPasskey}
      />
    </div>
  );
};
