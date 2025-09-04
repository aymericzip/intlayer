import { getLocalizedUrl } from 'intlayer';
import React from 'react';
import { useLocale } from 'react-intlayer';
// eslint-disable-next-line no-restricted-imports
import { Link, useLocation } from 'react-router';

type RouterLinkProps = React.ComponentProps<typeof Link>;

export default function LocalizedLink({ to, ...props }: RouterLinkProps) {
  const { locale } = useLocale();
  const location = useLocation();

  const isExternal = (p: string) =>
    /^([a-z][a-z0-9+.-]*:)?\/\//i.test(p) || p.startsWith('mailto:');

  if (typeof to === 'string') {
    if (to.startsWith('/') && !isExternal(to)) {
      return <Link to={getLocalizedUrl(to, locale)} {...props} />;
    }
    return <Link to={to} {...props} />;
  }

  if (to && typeof to === 'object') {
    const pathname = (to as { pathname?: string }).pathname;
    if (pathname && pathname.startsWith('/') && !isExternal(pathname)) {
      return (
        <Link
          to={{
            ...to,
            pathname: getLocalizedUrl(pathname, locale),
          }}
          {...props}
        />
      );
    }
    return <Link to={to} {...props} />;
  }

  // fallback: current location
  return (
    <Link
      to={getLocalizedUrl(location.pathname + location.search, locale)}
      {...props}
    />
  );
}
