'use client';

import { Button } from '@intlayer/design-system';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC } from 'react';
import { ExternalLinks, PagesRoutes } from '@/Routes';

export const ActionButtons: FC = () => {
  const {
    primaryBtn: { label: primaryLabel, content: primaryContent },
    secondaryBtn: { label: secondaryLabel, content: secondaryContent },
  } = useIntlayer('landing-section-action-button');
  const router = useRouter();

  return (
    <div className="mt-10 flex w-full flex-col gap-4 sm:flex-row">
      <Button
        label={secondaryLabel.value}
        variant="outline"
        onClick={() => router.push(PagesRoutes.Doc_Interest)}
        size="lg"
        color="text"
        className="w-full md:w-auto"
      >
        {secondaryContent}
      </Button>
      <Button
        label={primaryLabel.value}
        onClick={() => router.push(ExternalLinks.Github)}
        variant="default"
        size="lg"
        color="text"
        className="w-full md:w-auto"
      >
        {primaryContent}
      </Button>
    </div>
  );
};
