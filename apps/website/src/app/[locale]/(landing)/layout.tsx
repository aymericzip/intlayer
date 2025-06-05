import { PageLayout } from '@layouts/PageLayout';
import type { NextLayoutIntlayer } from 'next-intlayer';
import { headers } from 'next/headers';
import { FC, PropsWithChildren } from 'react';

const SPECIAL_IP = '149.56.28.175';

const StatupFrame: FC<PropsWithChildren> = () => {
  return (
    <a
      href="https://startupfa.me/s/intlayer.org?utm_source=intlayer.org"
      target="_blank"
      className="absolute bottom-5 right-5"
    >
      <img
        src="https://startupfa.me/badges/featured/dark.webp"
        alt="Featured on Startup Fame"
        width="171"
        height="54"
      />
    </a>
  );
};

const LandingLayout: NextLayoutIntlayer<{
  isSpecial: boolean;
}> = async ({ children, params }) => {
  const { locale } = await params;

  // 1. Grab the raw headers object.
  const headersList = await headers();

  // 2. Look for the “x-forwarded-for” header first (common behind proxies).
  const xff = headersList.get('x-forwarded-for') ?? '';
  //    If there are multiple IPs, take the first one.
  const ipFromHeader = xff.split(',')[0].trim();

  // 3. If there's no XFF, fall back to x-real-ip (some proxies set this)
  const fallbackRealIp = headersList.get('x-real-ip') ?? '';

  // 4. If neither exist, we can’t know the client IP. Mark as “unknown.”
  const ip = ipFromHeader || fallbackRealIp || 'unknown';

  // 5. Determine if this is the “special” IP.
  const isSpecial = ip === SPECIAL_IP;

  return (
    <PageLayout locale={locale}>
      {isSpecial && <StatupFrame />}
      {children}
    </PageLayout>
  );
};

export default LandingLayout;
