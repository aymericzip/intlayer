// eslint-disable-next-line no-restricted-imports
import { Link, type LinkProps } from '@tanstack/react-router';
import { getLocalizedUrl } from 'intlayer';
import { useLocale } from 'react-intlayer';

type LocalizedLinkProps = {
  to: string;
} & Omit<LinkProps, 'to'>;

export function LocalizedLink(props: LocalizedLinkProps) {
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const to = isExternal(props.to)
    ? props.to
    : getLocalizedUrl(props.to, locale);

  return <Link {...props} to={to as LinkProps['to']} />;
}
