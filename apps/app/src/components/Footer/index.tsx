'use client';

import {
  type LinkGroup,
  Footer as UIFooter,
} from '@intlayer/design-system/footer';
import { getLocalizedUrl } from 'intlayer';
import type { FC } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';

export const Footer: FC = () => {
  const { locale } = useLocale();
  const { content } = useIntlayer('footer');

  const links: LinkGroup[] = content.map((section) => ({
    title: section.title,
    links: section.links.map((link) => {
      const isLocaleLink = link.href.value?.startsWith('/') ?? false;
      return {
        text: link.text,
        href: isLocaleLink
          ? getLocalizedUrl(link.href.value, locale)
          : link.href.value,
        label: link.label.value,
      };
    }),
  }));

  return <UIFooter links={links} />;
};
