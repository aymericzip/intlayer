'use client';

import { Button } from '@intlayer/design-system';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { ExternalLinks } from '@/Routes';

export const ActionButtons: FC = () => {
  const {
    primaryBtn: { label: primaryLabel, content: primaryContent },
    secondaryBtn: { label: secondaryLabel, content: secondaryContent },
  } = useIntlayer('landing-section-action-button');
  const router = useRouter();
  return (
    <div className="mt-10 flex w-full flex-row gap-4">
      <Button
        label={secondaryLabel}
        variant="outline"
        onClick={() => router.push(ExternalLinks.InterestOfIntlayer)}
        size="lg"
        color="text"
      >
        {secondaryContent}
      </Button>
      <Button
        label={primaryLabel}
        onClick={() => router.push(ExternalLinks.Github)}
        variant="default"
        size="lg"
        color="text"
      >
        {primaryContent}
      </Button>
    </div>
  );
};
