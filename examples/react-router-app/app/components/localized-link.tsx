import { getLocalizedUrl } from 'intlayer';
import { useLocale } from 'react-intlayer';
// eslint-disable-next-line no-restricted-imports
import { Link, type LinkProps } from 'react-router';

type LocalizedLinkProps = {
  to: string;
} & Omit<LinkProps, 'to'>;

export default function LocalizedLink(props: LocalizedLinkProps) {
  const { locale } = useLocale();

  const isExternal = (to: string) => {
    return /^(https?:)?\/\//.test(to);
  };

  const to = isExternal(props.to)
    ? props.to
    : getLocalizedUrl(props.to, locale);

  return <Link {...props} to={to as LinkProps['to']} />;
}
