import { Logo } from '@intlayer/design-system/logo';
import type { FC } from 'react';
import { LIB_LOGOS, type StaticImport } from './constants';

export const LibLogo: FC<{ id: string; className?: string }> = ({
  id,
  className,
}) => {
  if (id === 'intlayer' || id === 'react-intlayer') {
    return <Logo className={className} />;
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
