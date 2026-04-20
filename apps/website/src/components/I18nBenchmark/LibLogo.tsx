import { Logo } from '@intlayer/design-system/logo';
import Image from 'next/image';
import type { FC } from 'react';
import type { StaticImport } from './constants';
import { LIB_COLORS, LIB_LOGOS } from './constants';

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
  return (
    <div
      className={`size-4 shrink-0 rounded-full ${className || ''}`}
      style={{ backgroundColor: LIB_COLORS[id] || '#94a3b8' }}
    />
  );
};
