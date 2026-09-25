import { Logo } from '@intlayer/design-system/logo';
import { cn } from '@intlayer/design-system/utils';
import type { FC } from 'react';
import { getLibLogoUrl, isIntlayerLib } from './constants';

export const LibLogo: FC<{ id: string; className?: string }> = ({
  id,
  className,
}) => {
  if (isIntlayerLib(id)) {
    return (
      <Logo
        className={cn('text-neutral-900 dark:text-neutral-100', className)}
      />
    );
  }

  const logoUrl = getLibLogoUrl(id);

  if (!logoUrl) return null;

  return (
    <img src={logoUrl} alt={id} className={className} width={120} height={20} />
  );
};
