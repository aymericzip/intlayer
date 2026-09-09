import { Logo } from '@intlayer/design-system/logo';
import { cn } from '@intlayer/design-system/utils';
import type { FC } from 'react';
import { isIntlayerLib, LIB_LOGOS, type StaticImport } from './constants';

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

  const logo = LIB_LOGOS[id];

  if (logo) {
    return (
      <img
        src={typeof logo === 'string' ? logo : (logo as StaticImport).src}
        alt={id}
        className={className}
        width={
          typeof logo === 'string' ? 120 : ((logo as StaticImport).width ?? 120)
        }
        height={
          typeof logo === 'string' ? 20 : ((logo as StaticImport).height ?? 20)
        }
      />
    );
  }
  return <></>;
};
