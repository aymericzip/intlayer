'use client';

import { Button } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import type { FC, HTMLAttributes } from 'react';

export const ActionButtons: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const {
    primaryBtn: {
      label: primaryLabel,
      content: primaryContent,
      url: primaryUrl,
    },
    secondaryBtn: {
      label: secondaryLabel,
      content: secondaryContent,
      url: secondaryUrl,
    },
  } = useIntlayer('landing-section-action-button');
  const router = useRouter();

  return (
    <div
      className={cn('flex w-full flex-col gap-4 sm:flex-row', className)}
      {...props}
    >
      <Button
        label={secondaryLabel.value}
        variant="outline"
        onClick={() => router.push(secondaryUrl.value)}
        color="text"
        className="w-full md:w-auto"
      >
        {secondaryContent}
      </Button>
      <Button
        label={primaryLabel.value}
        onClick={() => router.push(primaryUrl.value)}
        variant="default"
        color="text"
        className="w-full md:w-auto"
      >
        {primaryContent}
      </Button>
    </div>
  );
};
