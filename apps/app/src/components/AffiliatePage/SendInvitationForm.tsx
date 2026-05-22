'use client';

import { Button } from '@intlayer/design-system/button';
import { useSendAffiliateInvitation } from '@intlayer/design-system/hooks';
import { Input } from '@intlayer/design-system/input';
import type { FC } from 'react';
import { useState } from 'react';
import { useIntlayer } from 'react-intlayer';

type SendInvitationFormProps = {
  onSuccess?: () => void;
};

export const SendInvitationForm: FC<SendInvitationFormProps> = ({
  onSuccess,
}) => {
  const content = useIntlayer('send-invitation-form');
  const {
    mutateAsync: sendInvitation,
    isPending,
    error,
  } = useSendAffiliateInvitation();

  const [email, setEmail] = useState('');
  const [commissionRate, setCommissionRate] = useState('10');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendInvitation({
      email,
      commissionRate: Number(commissionRate),
      commissionType: 'recurring',
    });
    setEmail('');
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="invite-email" className="font-medium text-sm">
          {content.emailAddress}
        </label>
        <Input
          id="invite-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={content.partnerEmailPlaceholder.value}
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="invite-rate" className="font-medium text-sm">
          {content.commissionRate}
        </label>
        <Input
          id="invite-rate"
          type="number"
          min="1"
          max="100"
          value={commissionRate}
          onChange={(e) => setCommissionRate(e.target.value)}
          required
        />
      </div>

      {error && (
        <p className="text-destructive text-sm">
          {content.failedToSendInvitationPlease}
        </p>
      )}

      <Button
        type="submit"
        isLoading={isPending}
        disabled={isPending || !email}
        color="text"
        label={content.sendInvitationLabel.value}
      >
        {isPending ? content.sending : content.sendInvitation}
      </Button>
    </form>
  );
};
