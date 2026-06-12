import { Logo } from '@intlayer/design-system/logo';
import Image from 'next/image';
import type { FC } from 'react';
import { LIB_LOGOS, type StaticImport } from './constants';

export const LibLogo: FC<{ id: string; className?: string }> = ({
  id,
  className,
}) => {
  if (id === 'intlayer' || id === 'next-intlayer') {
    return <Logo className={className} />;
  }
  const logo = LIB_LOGOS[id];
  if (logo) {
    return (
      <Image
        src={(logo as StaticImport).src}
        alt={id}
        className={className}
        width={(logo as StaticImport).width}
        height={(logo as StaticImport).height}
        unoptimized
      />
    );
  }
  return <></>;
};
