import { Logo } from '@intlayer/design-system/logo';
import type { FC } from 'react';
import { LIB_COLORS, LIB_LOGOS, type StaticImport } from './constants';

export const LibLogo: FC<{ id: string; className?: string }> = ({
  id,
  className,
}) => {
  if (id === 'intlayer' || id === 'next-intlayer') {
    return <Logo className={className} />;
  }
  const logo = LIB_LOGOS[id];
  if (logo) {
    const src = typeof logo === 'string' ? logo : (logo as StaticImport).src;
    const width =
      typeof logo === 'string' ? undefined : (logo as StaticImport).width;
    const height =
      typeof logo === 'string' ? undefined : (logo as StaticImport).height;

    return (
      <img
        src={src}
        alt={id}
        className={className}
        width={width}
        height={height}
        loading="lazy"
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
