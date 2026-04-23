import { Logo } from '@intlayer/design-system/logo';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import { getLibColors, LIB_LOGOS, type StaticImport } from './constants';

export const LibLogo: FC<{ id: string; className?: string }> = ({
  id,
  className,
}) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  if (id === 'intlayer' || id === 'next-intlayer') {
    return <Logo className={className} />;
  }
  const logo = LIB_LOGOS[id];
  if (logo) {
    return (
      <img
        src={(logo as StaticImport).src}
        alt={id}
        className={className}
        width={(logo as StaticImport).width}
        height={(logo as StaticImport).height}
      />
    );
  }
  return (
    <div
      className={`size-4 shrink-0 rounded-full ${className || ''}`}
      style={{ backgroundColor: getLibColors(isDarkMode)[id] || '#94a3b8' }}
    />
  );
};
