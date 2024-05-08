'use client';

import { Footer as UIFooter } from '@intlayer/design-system';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { FC } from 'react';

export const Footer: FC = () => {
  const { locale } = useLocale();
  const { content } = useIntlayer('footer');

  return <UIFooter links={content} key={locale} />;
};
