import {
  type LinkGroup,
  Footer as UIFooter,
} from '@intlayer/design-system/footer';
import { cn } from '@intlayer/design-system/utils';
import { CHINESE } from '@intlayer/types/locales';
import { getLocalizedUrl } from 'intlayer';
import type { FC } from 'react';
import { useIntlayer, useLocale } from 'react-intlayer';

export type FooterProps = {
  className?: string;
};

export const Footer: FC<FooterProps> = ({ className }) => {
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

  const isChinese = locale === CHINESE;

  return (
    <div className={cn('flex w-full flex-0 flex-col', className)}>
      <UIFooter
        links={links}
        footerText={isChinese ? '津ICP备2026006672号' : undefined}
      />
    </div>
  );
};
