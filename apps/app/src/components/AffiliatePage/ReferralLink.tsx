'use client';

import { CopyButton } from '@intlayer/design-system/copy-button';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

type ReferralLinkProps = {
  referralLink: string;
};

export const ReferralLink: FC<ReferralLinkProps> = ({ referralLink }) => {
  const content = useIntlayer('referral-link');

  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-sm">{content.yourReferralLink}</p>
      <div className="flex items-center gap-2 rounded-lg border border-neutral/20 bg-card px-3 py-2">
        <span className="flex-1 truncate text-sm">{referralLink}</span>
        <CopyButton content={referralLink} />
      </div>
      <p className="text-neutral/60 text-xs">
        {content.shareThisLinkWhenSomeone}
      </p>
    </div>
  );
};
