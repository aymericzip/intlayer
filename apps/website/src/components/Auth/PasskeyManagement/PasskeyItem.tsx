'use client';

import { Button, Container } from '@intlayer/design-system';
import { useIntlayer } from 'next-intlayer';
import { type FC, useState } from 'react';
import type { Passkey } from './types';

type PasskeyItemProps = {
  passkey: Passkey;
  onDelete: (passkeyId: string) => void;
};

export const PasskeyItem: FC<PasskeyItemProps> = ({ passkey, onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { createdAt, deleteButton, confirmDelete, cancelButton } =
    useIntlayer('passkey-item');

  const handleDelete = () => {
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }
    onDelete(passkey.id);
  };

  const formattedDate = new Date(passkey.createdAt).toLocaleDateString();

  return (
    <Container className="p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 space-y-1">
          <h3 className="font-semibold">{passkey.name}</h3>
          <p className="text-neutral-600 text-sm dark:text-neutral-400">
            {createdAt} {formattedDate}
          </p>
        </div>
        <div className="flex gap-2">
          {showConfirmation ? (
            <>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                label={confirmDelete.value}
              >
                {confirmDelete}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConfirmation(false)}
                label={cancelButton.value}
              >
                {cancelButton}
              </Button>
            </>
          ) : (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              label={deleteButton.value}
            >
              {deleteButton}
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
};
