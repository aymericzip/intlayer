'use client';

import Image from 'next/image';
import { useIntlayer } from 'next-intlayer';
import { useTheme } from 'next-themes';
import type { FC } from 'react';
import DarkScreenshot from './assets/dark-screenshot.png';
import LightScreenshot from './assets/light-screenshot.png';

export const AsideImage: FC = () => {
  const { resolvedTheme } = useTheme();
  const { imageAlt } = useIntlayer('demo-page');

  const src = resolvedTheme === 'dark' ? LightScreenshot : DarkScreenshot;

  return <Image src={src} alt={imageAlt.value} className="rounded-md" />;
};
