'use client';

import { Footer as UIFooter, type LinkGroup } from '@intlayer/design-system';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { FC } from 'react';

export const Footer: FC = () => {
  const { locale } = useLocale();
  const { content } = useIntlayer('footer');

  const links: LinkGroup[] = content.map((section) => ({
    title: section.title,
    links: section.links.map((link) => ({
      text: link.text,
      href: link.href.value,
      label: link.label.value,
    })),
  }));

  return <UIFooter links={links} key={locale} />;
};
