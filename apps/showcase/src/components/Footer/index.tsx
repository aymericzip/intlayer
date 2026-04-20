import {
  type LinkGroup,
  Footer as UIFooter,
} from '@intlayer/design-system/footer';
import { CHINESE } from '@intlayer/types/locales';
import type { FC } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';

export const Footer: FC = () => {
  const { locale } = useLocale();
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

  const isChinese = locale === CHINESE;

  return (
    <UIFooter
      links={links}
      footerText={isChinese ? '沪ICP备2026000734号-2' : undefined}
    />
  );
};
