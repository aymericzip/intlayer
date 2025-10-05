'use client';

import { Link } from '@components/Link/Link';
import { LinkColor, LinkVariant } from '@intlayer/design-system';
import { cn } from '@utils/cn';
import { ArrowRight } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC, HTMLAttributes } from 'react';
import { PagesRoutes } from '@/Routes';

export const ActionButtons: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const { supportButton, getStartedButton } = useIntlayer(
    'landing-section-action-button'
  );

  return (
    <div
      // className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center ${className || ''}`}
      className={cn(
        'flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center',
        className
      )}
      {...props}
    >
      <Link
        href="https://github.com/aymericzip/intlayer"
        variant={LinkVariant.BUTTON}
        label={supportButton.value}
        className="hover:scale-105 px-4 py-2 rounded-full border-2 border-neutral-300 dark:border-neutral-600 bg-transparent hover:bg-transparent"
        isExternalLink
      >
        <span className="flex items-center justify-center gap-2 text-black dark:text-white">
          <span className="block text-lg">{supportButton}</span>
        </span>
      </Link>
      <Link
        href={PagesRoutes.Doc}
        variant={LinkVariant.BUTTON}
        color={LinkColor.CUSTOM}
        label={getStartedButton.value}
        className="hover:scale-105 px-4 py-2 rounded-full"
      >
        <span className="flex items-center justify-center gap-2">
          <span className="text-lg">{getStartedButton}</span>
          <ArrowRight width={20} height={20} />
        </span>
      </Link>
    </div>
  );
};
