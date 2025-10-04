import { getLocalizedUrl, type LocalesValues } from 'intlayer';
import type { FC } from 'react';
import { useLocale } from 'react-intlayer';
import { Link, type LinkProps, type To } from 'react-router';

const isExternalLink = (to: string) => /^(https?:)?\/\//.test(to);

export const locacalizeTo = (to: To, locale: LocalesValues): To => {
  if (typeof to === 'string') {
    if (isExternalLink(to)) {
      return to;
    }

    return getLocalizedUrl(to, locale);
  }

  if (isExternalLink(to.pathname ?? '')) {
    return to;
  }

  return {
    ...to,
    pathname: getLocalizedUrl(to.pathname ?? '', locale),
  };
};

export const LocalizedLink: FC<LinkProps> = (props) => {
  const { locale } = useLocale();

  return <Link {...props} to={locacalizeTo(props.to, locale)} />;
};
