import {
  type LinkGroup,
  Footer as UIFooter,
} from '@intlayer/design-system/footer';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';

export const Footer: FC = () => {
  const { content } = useIntlayer('footer');

  const links: LinkGroup[] = content.map((section: (typeof content)[0]) => ({
    title: section.title,
    links: section.links.map((link: (typeof content)[0]['links'][0]) => {
      return {
        text: link.text,
        href: link.href.value,
        label: link.label.value,
      };
    }),
  }));

  return <UIFooter links={links} />;
};
